
# pull official base image
FROM node:15.8.0-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# add app
COPY . .

RUN npm install
RUN npm install react-scripts
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# start app
CMD ["npm", "start"]