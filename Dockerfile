FROM node:21-alpine as builder

RUN mkdir /src
WORKDIR /src
COPY . /src
RUN npm install && npm run build

FROM nginx:1.25.3-alpine
RUN mkdir /etc/nginx/templates
COPY ./nginx/default.conf.template /etc/nginx/templates
COPY --from=0 /src/dist /usr/share/nginx/html