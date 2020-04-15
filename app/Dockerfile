# Base the image off of the NodeJS image
FROM node:dubnium as builder

# Set the working directory to be the HOME directory
WORKDIR /mealsocial

# Install NPM dependencies early in the build process
COPY ./package.json ./
COPY ./package-lock.json ./
COPY . ./
RUN rm -rf ./node_modules
RUN npm install

CMD ["npm", "run", "serve"]