# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Vite React application
RUN npm run build

# Stage 2: Serve the static build with Nginx
FROM nginx:alpine

# Copy Nginx configuration (optional, if you have a custom config)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5174
EXPOSE 5174

# Start Nginx in the foreground
CMD ["npm", "run", "start"]
