FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci
COPY src/ ./src/
RUN npm run build

FROM node:18-alpine AS production

RUN npm install -g pm2 && apk add --no-cache curl

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
COPY ecosystem.config.js ./

RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["pm2-runtime", "start", "ecosystem.config.js"]