# Use Node.js 20+ as the base image
FROM node:20-slim

# Install OpenClaw globally
RUN npm install -g @openclawd/cli

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the agent code
COPY . .

# Create the OpenClaw config directory if needed
RUN mkdir -p /root/.openclaw

# Set environment variables
ENV NODE_ENV=production
ENV OPENCLAW_HOME=/app/.openclaw

# Expose the gateway port
EXPOSE 18790

# Start the OpenClaw gateway
CMD ["openclaw", "gateway"]
