# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application using Yarn
RUN yarn build

# Use a lightweight web server for serving the static files
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the default port for the Nginx server
EXPOSE 3000

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
