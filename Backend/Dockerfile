# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your backend code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]