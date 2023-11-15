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
docker run -d -p 3001:80 --rm -e NGINX_PROXY_BACKEND_BASE_URL=http://host.docker.internal:3002 naughts-and-crosses-ui
```

Note - this expects the backend API to be available at the url provided in `NGINX_PROXY_BACKEND_BASE_URL` the
example above assumes it is running on the host machine on port 3002

## Running the UI and API in docker

Assuming you have built the API docker image following the instructions in the `README.md`
in [the api](https://github.com/michaelruocco/naughts-and-crosses-api) repo, and you have
followed the steps above to build the UI docker image, then you should be able to run
both the UI and API docker containers connected together using docker compose by running:

```bash
docker-compose up -d
```

running this command will make the UI available on [local port 3001](http://localhost:3001)

## Running a multi node set up for the UI and API in docker

As above, assuming you have built the API and UI docker images, you can run a multi node set
up with 2 instances of the API and UI running by running the following command

```bash
docker-compose --profile multi-node up -d
```

running this command will make the UI available on both [local port 3001](http://localhost:3001)
and [local port 3002](http://localhost:3002)
