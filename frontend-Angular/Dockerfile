FROM nginx

COPY ./dist/frontend-angular/browser /usr/share/nginx/html/
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
