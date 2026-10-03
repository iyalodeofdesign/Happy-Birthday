# Deploy with Docker

## Requirements

- Nix with access to `nixpkgs`
- A running Docker daemon (for example, Docker Desktop on macOS or the Docker service on NixOS)
- A Resend API key for the birthday-wish email notifications

Enter a temporary shell with the Docker client and Compose:

```sh
nix shell nixpkgs#docker nixpkgs#docker-compose
```

Run the commands below from that shell. The Nix shell supplies the command-line tools; it does not start the Docker daemon.

## Configure

Copy the example environment file and add your Resend API key:

```sh
cp .env.example .env
```

For local development, `DATABASE_URL` points to `prisma/dev.db`. Compose overrides it to use `/app/data/wishes.db` in a persistent named volume.

Edit `.env` and replace `your_resend_api_key` with your key. Keep this file private; it is excluded from the Docker build context and should not be committed.

## Build and start

From the repository root, run:

```sh
colima start

docker-compose up --build -d
```

Open [http://localhost:3000](http://localhost:3000). The app listens on port 3000 inside the container; change the left-hand port in `docker-compose.yml` to use a different host port.

View application logs:

```sh
docker-compose logs -f app
```

Stop the deployment:

```sh
docker-compose down
```

## Deploying to a server

Install Nix on the server and ensure its Docker daemon is running (on NixOS, enable `virtualisation.docker`). Copy the project to the server, configure `.env` there as above, and enter the Nix shell shown earlier. Start the service with `docker-compose up --build -d`, then route your domain to the server and proxy HTTPS traffic to port 3000 using your preferred reverse proxy. Do not expose the app directly to the internet without HTTPS.

The container uses Next.js standalone output and serves on `0.0.0.0:3000`. The Resend API key is supplied at container runtime through Compose, not included in the image. Ensure your deployment platform provides the same `RESEND_API_KEY` environment variable if you deploy without Compose.

## Updating

After pulling new application code, rebuild and recreate the container:

```sh
docker-compose up --build -d
```

## Wish storage

The app saves wishes in SQLite before attempting email notifications. Docker applies database migrations on startup and stores the database in the `wishes-data` volume, which survives rebuilds and `docker-compose down`. Removing that volume deletes the saved wishes.

For development outside Docker, configure `.env`, then run:

```sh
npm ci
npx prisma generate
touch prisma/dev.db
npx prisma migrate deploy
npm run dev
```

View saved wishes at `/wishes`. Submissions made before database saving was implemented were only sent through email and cannot be recovered from the database.

## Prisma / OpenSSL container errors

The Docker image uses Debian Bookworm with OpenSSL installed in every stage. Prisma generates its engine inside that image, and the build checks it with a SQLite query before packaging the app.

After updating from the Alpine image, rebuild without cached layers and recreate the container:

```sh
docker-compose build --pull --no-cache app
docker-compose up -d --force-recreate app
docker-compose logs --tail=100 app
```

The existing `wishes-data` volume is reused.
