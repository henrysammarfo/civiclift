# Use Node.js 22+ as the base image (Required by OpenClaw)
FROM node:22-slim
# Install git (required for npm to fetch certain dependencies)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Set environment variables
ENV NODE_ENV=production
ENV OPENCLAW_HOME=/app

# Install plugins BEFORE copying our "strict" config to avoid validation errors
RUN npx openclaw plugins install @openclawd/flock

# Now copy the rest of the agent code (including openclaw.json)
COPY . .

# Expose the gateway port
EXPOSE 18790

# Start the OpenClaw gateway
CMD ["npm", "start"]
