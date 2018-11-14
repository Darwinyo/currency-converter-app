# base image
FROM node:10.4.0-alpine

# set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# install and cache app dependencies
COPY package.json /usr/src/package.json
RUN npm install
RUN npm install react-scripts@2.1.1 -g

# start app
CMD ["npm", "start"]