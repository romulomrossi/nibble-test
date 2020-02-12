# build environment
FROM node:lts
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./api/package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY ./api /app

EXPOSE 8080

ENTRYPOINT ["npm", "start"]

