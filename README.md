# Naughts and Crosses UI

## Starting the UI locally

To start up the UI you can run :

```bash
npm start
```

Note - this depends on [the api](https://github.com/michaelruocco/naughts-and-crosses-api)
running on port 3002 and will start the UI application on [local port 3001](http://localhost:3001)

## Building docker image

To build the UI into a docker image you can run:

```bash
docker build -t naughts-and-crosses-ui .
```

## Running the docker image

After building the docker image, to run it you can run:

```bash
docker run -d -p 8080:80 --rm -e NGINX_PROXY_API_BASE_URL=http://naughts-and-crosses-api:80 naughts-and-crosses-ui
```

Note - this expects the backend API to be available at the url provided in `API_BASE_URL`

## Running the UI and API in docker

Assuming you have built the API docker image following the instructions in the `README.md`
in [the api](https://github.com/michaelruocco/naughts-and-crosses-api) repo, and you have
followed the steps above to build the UI docker image, then you should be able to run
both the UI and API docker containers connected together using docker compose by running:

```bash
docker-compose up -d
```

running this command will make the UI available on [local port 3001](http://localhost:3001)
