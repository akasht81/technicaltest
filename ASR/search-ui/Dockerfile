# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN yarn build

# Use Nginx to serve the built static files
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
