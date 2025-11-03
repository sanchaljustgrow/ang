# 🧱 Stage 1: Build Angular app
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build
COPY . .
RUN npm run build --configuration=production

# 🧱 Stage 2: Serve with Nginx
FROM nginx:1.25-alpine

# Copy build output to Nginx’s html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a default config.json into assets
COPY src/assets/config.json /usr/share/nginx/html/assets/config.json

# Copy your nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
