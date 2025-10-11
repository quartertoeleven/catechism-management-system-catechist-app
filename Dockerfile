# builder
FROM node:24.7-alpine AS builder
WORKDIR /app
ADD . /app/
RUN npm i -g pnpm
RUN pnpm install && pnpm build

#runner
FROM node:24.7-alpine AS runner
WORKDIR /app
RUN npm i -g serve
COPY --from=builder /app/dist/pwa ./
CMD ["serve", "-s"]