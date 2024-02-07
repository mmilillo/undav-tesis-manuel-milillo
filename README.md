# undav-tesis-manuel-milillo

### Herramienta basada en contenedores con el fin de emular ambientes de trabajo reales destinados a la enseñanza universitaria

 Proyecto de tesis de la carrera Ingeniería informática de la Universidad Nacional de Avellaneda.

## Propuesta

Aprovechar las ventajas de utilizar contenedores y control de versiones en materias de programación dictadas en ingenierías. Con el fin de aprender en un entorno de trabajo similar al real. Utilizando una herramienta, desarrollada como contenido principal de la tesis, que permita abstraerse de estas tecnologías de forma tal que el estudiante no necesite poseer conocimiento de estas tecnologías.


## La herramienta

Se diagramaron las pantallas de la aplicación y su funcionalidad utilizando la herramienta [Excalidraw](https://excalidraw.com). 

![Diagrama](/images/diagrama-pantallas.svg)

Para ver el diagrama en mas detalle puede importar el archivo `/diagrams/diagrama-pantallas.excalidraw` a [Excalidraw](https://excalidraw.com) o acceder a este [link](https://excalidraw.com/#json=utYk9w-Lt_lDz0vpjlv6j,tRiqt-LgAY7Is0AQR3Wu0w).


## Prerrequisitos


* NPM >= 10.2.4 [Link instalación](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Nodejs >= v20.11.0 - [Link instalación](https://nodejs.org/en/download/package-manager)
* Podman >= 3.4.4 [Link instalación](https://podman.io/docs/installation)
* Podman-compose >= 1.0.6 [TO-DO: buscar guía instalación]()


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test code

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Using the app

### Open API

Una vez que la API se encuentra ejecutándose es posible consultar la definición de la misma a través de una interfaz grafica en http://localhost:3000/api#/ o bien descargar el archivo en formato JSON en http://localhost:3000/api-json

### Generar archivo podman-compose-yaml

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"os": "ubuntu", "db": "postgres"}' http://localhost:3000/yaml-generator
```

### Conectarse al sistema operativo seleccionado 

```bash
podman exec -it mi_ubuntu_container /bin/bash
```

### Probar conectividad a la base de datos 

```bash
apt install inetutils-ping
ping mi_postgres_container 5432
```








## borrador, comandos utilizados en el desarrollo

docker-compose up -d
desde terminar o docker desktop

psql -U myuser -d mydatabase -h postgres
mypassword

emilinar contenedores
docker-compose down -v

docker-compose up -d
