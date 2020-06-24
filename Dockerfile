FROM node:10

WORKDIR /udec-educa

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5000

CMD [ "npm", "start"]