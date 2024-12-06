#!/bin/bash

# Función para comprobar y ejecutar comandos de instalación
function check_and_install {
  # $1 es el nombre del paquete, $2 es la versión mínima requerida
  PACKAGE=$1
  VERSION=$2

  if command -v $PACKAGE &> /dev/null; then
    CURRENT_VERSION=$($PACKAGE --version | awk '{print $NF}')
    if [[ "$(printf '%s\n' "$VERSION" "$CURRENT_VERSION" | sort -V | head -n1)" != "$VERSION" ]]; then
      echo "$PACKAGE está instalado, pero la versión es anterior a la requerida ($VERSION). Actualizando..."
      return 1
    else
      echo "$PACKAGE ya está instalado y cumple con la versión requerida ($VERSION)."
      return 0
    fi
  else
    echo "$PACKAGE no está instalado. Instalando..."
    return 1
  fi
}

# Instalar NPM y Node.js
echo "Comprobando Node.js y NPM..."
check_and_install node "v20.11.0"
if [ $? -eq 1 ]; then
  apt-get update
  apt-get install -y nodejs npm
fi

# Instalar o actualizar Podman a través de pip3
echo "Comprobando Podman..."
check_and_install podman "5.2.0"
if [ $? -eq 1 ]; then
  # Verificar si pip3 está instalado, si no, instalarlo
  if ! command -v pip3 &> /dev/null; then
    echo "pip3 no está instalado. Instalando pip3..."
    apt-get install -y python3-pip
  fi
  
  echo "Instalando Podman..."
  pip3 install --user podman
fi

# Instalar o actualizar Podman-Compose a través de pip3
echo "Comprobando Podman-Compose..."
check_and_install podman-compose "1.2.0"
if [ $? -eq 1 ]; then
  echo "Instalando Podman-Compose..."
  pip3 install --user podman-compose
fi

echo "Instalación completada."

# Comprobación final
echo "Verificando versiones..."
node -v
npm -v
podman --version
podman-compose --version
