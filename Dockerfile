# Usar una imagen base ligera de Nginx para servir contenido estático
FROM nginx:alpine

# Etiqueta de mantenimiento y metadatos
LABEL maintainer="Gelly Skin Studio"
LABEL description="Sitio web oficial de Gelly Skin Studio"

# Eliminar el contenido predeterminado de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar todos los archivos del proyecto (html, css, js, imgs) al directorio de Nginx
# Excluyendo lo mencionado en el .dockerignore
COPY . /usr/share/nginx/html/

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# El comando por defecto de la imagen nginx:alpine ya inicia nginx, 
# pero podemos declararlo explícitamente por buenas prácticas
CMD ["nginx", "-g", "daemon off;"]
