#!/bin/bash

# Check if running with sudo
if [ "$EUID" -ne 0 ]
  then echo "Please run as root or with sudo"
  exit
fi

# Update system packages
apt-get update
apt-get upgrade -y

# Install Docker
apt-get install -y docker.io

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone the repository
git clone https://github.com/your-repo/all-in-one-ai-crm-system.git
cd all-in-one-ai-crm-system

# Create .env file
cat > .env << EOL
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongo:27017/crm
JWT_SECRET=$(openssl rand -base64 32)
OPENAI_API_KEY=your_openai_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
EOL

echo "Please edit the .env file with your API keys and other sensitive information."
read -p "Press enter to continue"

# Build and start the Docker containers
docker-compose up -d

echo "Installation complete! The system is now running on http://localhost:3000"