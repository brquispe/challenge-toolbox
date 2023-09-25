# Toolbox Challenge - Braian Quispe

Este monorepo contiene el server y el cliente. Cada uno con su respectivo package.json. A continuación detallo los pasos para levantar la aplicación.

## Prerequisitos

Antes de comenzar, asegurate de tener Node.js instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Pasos de instalación

Seguí los siguientes pasos para inicializar la app:

### 1. Clonar el repositorio

Cloná este repositorio:

```bash
git clone https://github.com/brquispe/challenge-toolbox
```

### 2. Instalá las dependencias del server

Dirigite a la carpeta del server

```bash
cd challenge-toolbox/server
```

Instalá las dependencias usando npm:

```bash
npm install
```

### 4. Instalá las dependencias del cliente

Dirigite a la carpeta del cliente:

```bash
cd ../client
```

Instalá las dependencias del cliente usando npm:

```bash
npm install
```

### 6. Iniciando

El servidor y la aplicación de React se levantan separadamente

#### Levantando el server

En la carpeta del servidor:

```bash
npm start
```

El servidor iniciará en el puerto 3001

#### Levantar la aplicación

En la carpeta de la app:

```bash
npm start
```

La aplicación del cliente estará disponible en el puerto 3000.
