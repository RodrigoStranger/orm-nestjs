FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci
COPY src/ ./src/
RUN npm run build

FROM node:18-alpine AS production

RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
COPY ecosystem.config.js ./

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]