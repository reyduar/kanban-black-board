# Kanban Black Board

This is a project created by Next.js 13 and PrimeReact.

### Author

© 2023 Reynaldo Ariel Duarte

## Getting Started

### Run local database with Docker:

```bash
docker-compose up -d
```

> -d means: **detached**

### Database url

```bash
mongodb://localhost:27017/kanbandb
```

### Run endpoint to populate test data

```bash
GET http://localhost:3000/api/seed
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Deployment

#### Create App Image

```bash
docker build -t <app-name> .
```

> docker build -t kanban-app-image .

#### Run App Image

```bash
docker run --name=kanban-app -p 80:3000 kanban-app-image
```

### Dockerfile with npm

```
FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
```

### Dockerfile Next.js Recommended

Fuente: https://github.com/vercel/next.js/blob/canary/examples/with-docker/README.md

```
# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]
```
