# =============================
# Stage 1: Build Angular app
# =============================
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build for production
COPY . .
RUN npm run build --configuration=production

# =============================
# Stage 2: Serve with Nginx
# =============================
FROM nginx:1.25-alpine

# Install envsubst (used to replace environment variables into config.json)
RUN apk add --no-cache gettext

# Copy built Angular app from build stage
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Copy the runtime config template & startup script
COPY src/assets/config.json /usr/share/nginx/html/assets/config.template.json
COPY docker/startup.sh /docker-entrypoint.d/startup.sh

# Make startup script executable
RUN chmod +x /docker-entrypoint.d/startup.sh

# Expose port 80 for Nginx
EXPOSE 80

# Nginx will automatically run the startup script before serving
