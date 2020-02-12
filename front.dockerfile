# build environment
FROM node:lts
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./front/package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY ./front /app

EXPOSE 3000

ENTRYPOINT ["npm", "start"]

