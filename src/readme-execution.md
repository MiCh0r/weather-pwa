# Execution of the Weather-PWA

You need a angular CLI build and a web-server for using the PWA.

## http-server

You can look at the angular tutorial [Serving with http-server](https://angular.io/guide/service-worker-getting-started#serving-with-http-server). The following steps are necessary:

* Go to the directory [weeather-pwa](./weather-pwa/)
* Build ionic angular web app with `ng build`
* Serve the http-server with `npx http-server www`

With these above steps the web app is build with angular and served with a local https-server over npm `npx`.

## asp.net core with angular SPA and docker

Take the following steps to build a docker image and serve the PWA as docker container:

* Go to the directory [src](./), there is a **Dockerfile** located
* Build the docker image `docker build -t weather-pwa:v2 . --no-cache`
* Serve the docker container `docker run -p 51000:80 -d weather-pwa:v2` (without -d **--detach** the container process is blocking the CLI and logs into it.)
* `docker stop` stopped the container process