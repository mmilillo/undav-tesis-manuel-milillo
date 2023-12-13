# undav-tesis-manuel-milillo

### Herramienta basada en contenedores con el fin de emular ambientes de trabajo reales destinados a la enseñanza universitaria

 Proyecto de tesis de la carrera Ingeniería informática de la Universidad Nacional de Avellaneda.

## Propuesta

Aprovechar las ventajas de utilizar contenedores y control de versiones en materias de programación dictadas en ingenierías. Con el fin de aprender en un entorno de trabajo similar al real. Utilizando una herramienta, desarrollada como contenido principal de la tesis, que permita abstraerse de estas tecnologías de forma tal que el estudiante no necesite poseer conocimiento de estas tecnologías.


## La herramienta

Se diagramaron las pantallas de la aplicación y su funcionalidad utilizando la herramienta [Excalidraw](https://excalidraw.com). 

![Diagrama](/images/diagrama-pantallas.svg)

Para ver el diagrama en mas detalle puede importar el archivo `/diagrams/diagrama-pantallas.excalidraw` a [Excalidraw](https://excalidraw.com) o acceder a este [link](https://excalidraw.com/#json=utYk9w-Lt_lDz0vpjlv6j,tRiqt-LgAY7Is0AQR3Wu0w).


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

```bash
# WIP endpoints

```

## borrador, comandos utilizados en el desarrollo

docker-compose up -d
desde terminar o docker desktop

psql -U myuser -d mydatabase -h postgres
mypassword

emilinar contenedores
docker-compose down -v

docker-compose up -d
