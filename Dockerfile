FROM nginx:1
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY public /var/www/html
