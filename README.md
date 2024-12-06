# undav-tesis-manuel-milillo

### Herramienta basada en contenedores con el fin de emular ambientes de trabajo reales destinados a la enseñanza universitaria

 Proyecto de tesis de la carrera Ingeniería informática de la Universidad Nacional de Avellaneda.

## Propuesta

Aprovechar las ventajas de utilizar contenedores y control de versiones en materias de programación dictadas en ingenierías. Con el fin de aprender en un entorno de trabajo similar al real. Utilizando una herramienta, desarrollada como contenido principal de la tesis, que permita abstraerse de estas tecnologías de forma tal que el estudiante no necesite poseer conocimiento de estas tecnologías.


## La herramienta

Se diagramaron las pantallas de la aplicación y su funcionalidad utilizando la herramienta [Excalidraw](https://excalidraw.com). 

![Diagrama](/documentation/images/diagrama-pantallas.svg)

Para ver el diagrama en mas detalle puede importar el archivo `/diagrams/diagrama-pantallas.excalidraw` a [Excalidraw](https://excalidraw.com) o acceder a este [link](https://excalidraw.com/#json=utYk9w-Lt_lDz0vpjlv6j,tRiqt-LgAY7Is0AQR3Wu0w).



## Prerrequisitos

La aplicacion requiere los siguiente prerrequisitos. Estos pueden ser instalados de forma manual en el servidor donde se ejecutará la aplicacion o bien utilizar el script que se presenta en esta seccion. 

* NPM >= 10.8.1 [Link instalación](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Nodejs >= v20.11.0 - [Link instalación](https://nodejs.org/en/download/package-manager)
* Podman >= 3.4.4 [Link instalación](https://podman.io/docs/installation)
* Podman-compose >= 1.2.0 [podman compose](https://github.com/containers/podman-compose)


Script de instalacion de dependencias (Ubuntu)

```bash
$ sudo ./scripts/install_dependencies.sh
```
Este script instalará o actualizará las dependencias segun sea necesario.


## Running the app

Para ejecutar este repositorio basta con ejecutar el siguiente comando

```bash
$ npm run deploy
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

Una vez que la API se encuentra ejecutándose es posible consultar la definición de la misma a través de una interfaz grafica en http://localhost:3001/api#/ o bien descargar el archivo en formato JSON en http://localhost:3001/api-json

### Generar archivo podman-compose-yaml

```bash
curl --location --request PUT 'http://localhost:3000/yaml-generator' \
--header 'Content-Type: application/json' \
--data '{
    "laboratoryName": "demoGit",
    "os": "ubuntu",
    "db": "postgres"
}'
```

### Crear contenedores

```bash
curl --location 'http://localhost:3000/command' \
--header 'Content-Type: application/json' \
--data '{
    "laboratoryName": "demoGit",
    "operation": "up"
}'
```

### destruir contenedores

```bash
curl --location 'http://localhost:3000/command' \
--header 'Content-Type: application/json' \
--data '{
    "laboratoryName": "demoGit",
    "operation": "down"
}'
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


### Consultar estado del trabajo en el laboratorio


```bash
curl --location 'http://localhost:3000/version-control/status' \
--header 'Content-Type: application/json' \
--data '{
    "laboratoryName": "demoGit",
    "operation": "status"
}'
```


### Confirmar los cambios del trabajo en el laboratorio

```bash
curl --location 'http://localhost:3000/version-control/commit' \
--header 'Content-Type: application/json' \
--data '{
    "laboratoryName": "demoGit",
    "message": "primer commit"
}'
```

### Descartar los cambios del trabajo en el laboratorio

```bash
curl --location 'http://localhost:3000/version-control/reset' \
--header 'Content-Type: application/json' \
--data '{
    "laboratoryName": "demoGit"
}'
```

### Para mas funcionalidades consultar carpeta de documentacion



