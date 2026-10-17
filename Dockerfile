# syntax=docker/dockerfile:1

# ---- Stage 1: compile TypeScript -------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN node ace build --production

# ---- Stage 2: runtime image (compiled JS + production dependencies only) ----
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
# WORKDIR creates /app as root; the unprivileged user must own it to create node_modules.
RUN chown node:node /app

COPY --from=build --chown=node:node /app/build ./
USER node
RUN npm ci --omit=dev

EXPOSE 3333

# Apply pending migrations, then start the server.
# (Fine for a single instance; run migrations as a separate job when scaling out.)
CMD ["sh", "-c", "node ace migration:run --force && node server.js"]
