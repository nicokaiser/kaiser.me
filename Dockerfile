FROM nginx:1-alpine
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY public /var/www/html
