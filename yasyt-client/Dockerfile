# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle your app source
COPY . .

# Build TypeScript (if applicable)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3006

# Command to run your app using Node.js
CMD ["npm", "start"]
