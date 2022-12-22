FROM nginx:alpine
COPY /dist/dnd-essentials-frontend /usr/share/nginx/html
EXPOSE 80