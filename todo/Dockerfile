FROM node
WORKDIR /app/todo
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8002

CMD [ "npm", "start" ]