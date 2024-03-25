FROM node:18-alpine AS builder
COPY package*.json ./
RUN npm install --save-dev ts-node
COPY . .
FROM node:18-alpine
COPY package*.json ./
COPY --from=builder /app/node_modules /app/node_modules
EXPOSE 3000
CMD [ "ts-node", "index.ts" ]
