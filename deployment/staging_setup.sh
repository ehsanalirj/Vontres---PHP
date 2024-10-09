#!/bin/bash

# Create staging environment
heroku create vontres-ai-staging --remote staging

# Set environment variables
heroku config:set NODE_ENV=staging --remote staging
heroku config:set DATABASE_URL=$(heroku config:get DATABASE_URL --remote staging) --remote staging

# Deploy to staging
git push staging main

# Run database migrations
heroku run npm run migrate --remote staging

# Seed staging database with test data
heroku run npm run seed:staging --remote staging

echo "Staging environment is set up and deployed!"