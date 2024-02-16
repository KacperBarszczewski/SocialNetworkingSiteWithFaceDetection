FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY ./dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
