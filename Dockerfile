FROM node:21-alpine as builder

RUN mkdir /src
WORKDIR /src
COPY . /src
RUN npm install && npm run build

FROM nginx:1.25.3
COPY ./nginx/start-nginx.sh /usr/bin/start-nginx.sh
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html
COPY --from=0 /src/dist .
ENTRYPOINT [ "start-nginx.sh" ]