# Use Node.js 20+ as the base image
FROM node:20-slim



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
