#!/bin/bash

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb

# Install Redis
sudo apt-get install -y redis-server

# Install Nginx
sudo apt-get install -y nginx

# Clone the repository
git clone https://github.com/your-repo/vontres-ai.git
cd vontres-ai

# Install dependencies
npm install

# Build the application
npm run build

# Set up environment variables
cp .env.example .env
# Edit .env file with production values

# Initialize the database
npm run db:init

# Configure Nginx
sudo cp deployment/nginx.conf /etc/nginx/sites-available/vontres-ai
sudo ln -s /etc/nginx/sites-available/vontres-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Set up SSL with Let's Encrypt
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# Set up PM2
npm install -g pm2
pm2 start ecosystem.config.js --env production

# Set up monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

echo "Production environment setup complete!"