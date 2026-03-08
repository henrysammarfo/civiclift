#!/bin/bash
# CivicLift OCI Deployment Script

# 1. Update and install Docker
sudo apt-get update
sudo apt-get install -y docker.io

# 2. Build the Docker image
sudo docker build -t civiclift-agent .

# 3. Create a .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Error: .env file missing. Please create it first with your keys."
  exit 1
fi

# 4. Stop existing container
sudo docker stop civiclift-agent || true
sudo docker rm civiclift-agent || true

# 5. Run the container in detached mode
sudo docker run -d \
  --name civiclift-agent \
  --restart always \
  --env-file .env \
  -p 18790:18790 \
  civiclift-agent

echo "CivicLift is now running in the background on OCI!"
sudo docker ps
