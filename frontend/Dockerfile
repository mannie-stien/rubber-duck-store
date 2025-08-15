# --- Stage 1: Build the React Application ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: Serve the app with Nginx ---
FROM nginx:stable-alpine
# Copy the custom Nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copy the static files from the 'builder' stage
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80