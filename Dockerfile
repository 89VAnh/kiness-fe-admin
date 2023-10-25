	# Use an official Node.js LTS version as the base image
FROM node:18-alpine as build-stage
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json to the working directory
COPY package.json pnpm-lock.yaml yarn.lock ./
 
# Install dependencies
RUN npm i -g pnpm
RUN	pnpm install
 
# Copy the rest of the application code to the working directory
COPY . .
RUN pnpm run build

# Expose the port that the React app will run on
EXPOSE 3465

FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY /config/nginx.conf  /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
