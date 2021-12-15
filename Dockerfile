FROM node:16-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1-alpine
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/public /usr/share/nginx/html
