# ===================================================
# STAGE 1: BUILDER
# ===================================================
FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@11.8.0

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/contracts/package.json ./packages/contracts/

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY tsconfig.json ./
COPY packages/contracts/ ./packages/contracts/
COPY src/ ./src/


# 2. Biên dịch Backend App
RUN pnpm build

# ===================================================
# STAGE 2: RUNNER
# ===================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN npm install -g pnpm@11.8.0

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/contracts/package.json ./packages/contracts/

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy code đã biên dịch của cả App lẫn Contracts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/packages/contracts/dist ./packages/contracts/dist
COPY src/docs/swagger.yaml ./src/docs/swagger.yaml

USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]
