FROM node:20-bookworm-slim AS base
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

FROM base AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN DATABASE_URL=file:./dev.db npm run build

# Fail the build if the generated engine cannot run with this image's OpenSSL.
RUN touch /tmp/prisma-engine-check.db \
    && DATABASE_URL=file:/tmp/prisma-engine-check.db node -e 'const { PrismaClient } = require("@prisma/client"); const db = new PrismaClient(); db.$queryRawUnsafe("SELECT 1").then(() => console.log("Prisma engine verified")).catch(error => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());' \
    && rm /tmp/prisma-engine-check.db

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "touch /app/data/wishes.db && node node_modules/prisma/build/index.js migrate deploy && node server.js"]
