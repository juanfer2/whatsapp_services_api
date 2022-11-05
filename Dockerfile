FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

COPY . .

# EXPOSE 4001

RUN npm install

CMD ["npm", "run", "dev"]
