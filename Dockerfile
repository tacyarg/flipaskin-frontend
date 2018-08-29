# START FROM NODE VERSION 8.x
FROM node:carbon-alpine 
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]