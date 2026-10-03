# Deploy with Vercel

The app uses hosted PostgreSQL. Local SQLite files cannot persist writable data on Vercel Functions.

1. Connect a PostgreSQL database to your Vercel project through the Marketplace (for example, Neon), or use an existing hosted PostgreSQL database.
2. In the project's environment variables, set `DATABASE_URL` to a PostgreSQL connection URL that supports both application requests and Prisma migrations. If your provider's pooled URL does not support migrations, use its direct connection URL for `DATABASE_URL`. Use ordinary `postgresql://` or `postgres://` URLs for this project's Prisma 5 client.
3. Apply these variables to Production. Use a separate database or database branch for Preview, because each deployment applies migrations to its configured database.
4. Optionally add `RESEND_API_KEY` for email notifications.
5. Redeploy. `vercel.json` runs the asset preparation, Prisma client generation, pending database migrations, and Next.js build. Clear any manually overridden Vercel Build Command so the checked-in command takes effect.

Copying `.env.example` does not configure Vercel's environment variables. Keep database credentials in Vercel and your ignored local `.env` file.

The PostgreSQL migration initializes a new database. Existing SQLite data and its migration history are not converted automatically; keep any existing SQLite database backed up before moving data separately.

References: [Vercel SQLite support](https://vercel.com/kb/guide/is-sqlite-supported-in-vercel), [Prisma migration deployment](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-migrations-from-a-local-environment).

# Deploy with Docker

## Requirements

- Nix with access to `nixpkgs`
- A running Docker daemon (for example, Docker Desktop on macOS or the Docker service on NixOS)
- Optionally, a Resend API key for the birthday-wish email notifications

Enter a temporary shell with the Docker client and Compose:

```sh
nix shell nixpkgs#docker nixpkgs#docker-compose
```

Run the commands below from that shell. The Nix shell supplies the command-line tools; it does not start the Docker daemon.

## Configure

If you do not already have a `.env` file, copy the example:

```sh
cp .env.example .env
```

Compose starts a local PostgreSQL database and sets the app's `DATABASE_URL` to `postgresql://birthday:birthday@db:5432/birthday`, overriding any value in `.env`. No hosted database is needed for Docker Compose. The database is accessible only within the Compose network and stores wishes in the `postgres_data` volume.

For email notifications, set `RESEND_API_KEY` in `.env` to your key; otherwise leave it empty. Keep this file private; it is excluded from the Docker build context and should not be committed.

## Build and start

From the repository root, run:

```sh
colima start

docker-compose up --build -d
```

Open [http://localhost:3000](http://localhost:3000). The app listens on port 3000 inside the container; change the left-hand port in `docker-compose.yml` to use a different host port.

Compose waits for PostgreSQL to be healthy before starting the app. The app then applies database migrations before listening on port 3000.

View application logs:

```sh
docker-compose logs -f app
```

Stop the deployment:

```sh
docker-compose down
```

The database volume survives container rebuilds and `docker-compose down`. Running `docker-compose down -v` deletes the saved wishes.

## Deploying to a server

Install Nix on the server and ensure its Docker daemon is running (on NixOS, enable `virtualisation.docker`). Copy the project to the server, configure `.env` there as above, and enter the Nix shell shown earlier. Start the service with `docker-compose up --build -d`, then route your domain to the server and proxy HTTPS traffic to port 3000 using your preferred reverse proxy. Do not expose the app directly to the internet without HTTPS.

The container uses Next.js standalone output and serves on `0.0.0.0:3000`. The Resend API key is supplied at container runtime through Compose, not included in the image. Ensure your deployment platform provides the same `RESEND_API_KEY` environment variable if you deploy without Compose.

## Updating

After pulling new application code, rebuild and recreate the container:

```sh
docker-compose up --build -d
```

## Wish storage

The app saves wishes in PostgreSQL before attempting email notifications. Docker Compose manages the local database and applies migrations on app startup. Its bundled database credentials are intended for local development; configure private credentials before deploying to a shared server.

For development outside Docker, set `DATABASE_URL` in `.env` to a PostgreSQL database reachable from your host, then run:

```sh
npm ci
npx prisma generate
npx prisma migrate deploy
npm run dev
```

View saved wishes at `/wishes`. Submissions made before database saving was implemented were only sent through email and cannot be recovered from the database.

## Prisma / OpenSSL container errors

The Docker image uses Debian Bookworm with OpenSSL installed in every stage. Prisma generates its engine inside that image.

After updating from the Alpine image, rebuild without cached layers and recreate the container:

```sh
docker-compose build --pull --no-cache app
docker-compose up -d --force-recreate app
docker-compose logs --tail=100 app
```

Database contents stay in the PostgreSQL volume when rebuilding the app.
