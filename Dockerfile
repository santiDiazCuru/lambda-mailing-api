FROM node:10.9.0-alpine
COPY package.json api/package.json
WORKDIR /api
RUN npm i
COPY . /api
EXPOSE 3000
CMD ["npm", "run", "dev"]