# Use Node.js 20+ as the base image
FROM node:20-slim
# Install git (required for npm to fetch certain dependencies)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the agent code
COPY . .

# Create the OpenClaw config directory
RUN mkdir -p /app/.openclaw

# Set environment variables
ENV NODE_ENV=production
ENV OPENCLAW_HOME=/app/.openclaw

# Expose the gateway port
EXPOSE 18790

# Start the OpenClaw gateway
CMD ["npm", "start"]
