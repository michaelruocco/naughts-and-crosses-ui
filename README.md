# Naughts and Crosses UI

## Starting the UI locally

To start up the UI you can run :

```bash
npm start
```

Note - this depends on [the api](https://github.com/michaelruocco/naughts-and-crosses-api)
running on port 3002

## Building docker image

To build the UI into a docker image you can run:

```bash
docker build -t nac-ui .
```

## Running the docker image

After building the docker image, to run it you can run:

```bash
docker run -d -p 8080:80 --rm --name nac-ui -e API_BASE_URL=http://nac-api:8080 nac-ui
```

Note - this expects the backend API to be available at the url provided in `API_BASE_URL`
