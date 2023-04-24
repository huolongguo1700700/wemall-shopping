FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/mime.types /etc/nginx/uwsgi_params /etc/nginx/fastcgi_params /etc/nginx/scgi_params
COPY ./nginx/conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/conf /etc/nginx
COPY ./nginx/WWW /root/WWW

COPY ./webmall/build /var/www/html