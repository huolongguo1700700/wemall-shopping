FROM mysql:5.7
COPY ./sql/new-wemall.sql /docker-entrypoint-initdb.d/wemall.sql

EXPOSE 3306