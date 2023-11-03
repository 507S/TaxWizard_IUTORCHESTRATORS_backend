# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express app will run on
EXPOSE 5001

# Define the command to start your Express app
CMD [ "npm", "start" ]