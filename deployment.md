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
