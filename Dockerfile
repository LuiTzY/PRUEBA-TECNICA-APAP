#STAGE BUILDER
FROM node:current-alpine3.22 AS builder

# Declaramos espacio de trabajo en APP
WORKDIR /app

#Primero copiamos las dependencias
COPY package*.json ./

#Realizamos un clean install usando npm ci
RUN npm ci

# Ahora copiamos los archivos necesarios que son (test y src)
COPY ./test /app/test
COPY ./src /app/src

# Corremos los test, si estos fallan no se seguira con el build
RUN npm test


# STAGE PROD
FROM node:current-alpine3.22 AS production

#establecemos el espacio de trabajo
WORKDIR /app

# Declaramos 2 variables de entorno, como el stage donde estamos y el puerto a utilizar
ENV NODE_ENV=production
ENV PORT=3000

# Copiamos solo package.json para instalar las dep de prod
COPY package*.json ./

# Hacemos la instalacion obviando las deps de desarrollo
RUN npm ci --omit=dev

# Copiamos el codigo de la app del stage del build
COPY --from=builder /app/src ./src

# Usamos el user que node crea siendo este no root
USER node

# exponemos el puerto de la api
EXPOSE 3000

#Healthcheck que da un intervalo de 30 segs entre 3 intentos con un periodo de gracia de 10 segs al iniciar el contenedor
#y espera una respuesta en un rango de menos de 5s si no se detiene basicamente
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Iniciamos el api
CMD ["npm", "start"]