FROM node:6.9.5

RUN mkdir -p /usr/src/ln-api
WORKDIR /usr/src/ln-api
COPY package.json /usr/src/ln-api/
RUN npm install
COPY . /usr/src/ln-api

EXPOSE 3003

CMD ["npm", "start"]
