#!/bin/bash

# One-click deployment script

# AWS Deployment
deploy_to_aws() {
  aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin your-aws-account-id.dkr.ecr.us-west-2.amazonaws.com
  docker build -t your-repo-name .
  docker tag your-repo-name:latest your-aws-account-id.dkr.ecr.us-west-2.amazonaws.com/your-repo-name:latest
  docker push your-aws-account-id.dkr.ecr.us-west-2.amazonaws.com/your-repo-name:latest
  # Add ECS or EKS deployment commands here
}

# Google Cloud Deployment
deploy_to_gcp() {
  gcloud auth configure-docker
  docker build -t gcr.io/your-project-id/your-image-name .
  docker push gcr.io/your-project-id/your-image-name
  # Add GKE deployment commands here
}

# Azure Deployment
deploy_to_azure() {
  az acr login --name your-azure-container-registry
  docker build -t your-azure-container-registry.azurecr.io/your-image-name .
  docker push your-azure-container-registry.azurecr.io/your-image-name
  # Add AKS deployment commands here
}

# Prompt user for deployment target
echo "Select deployment target:"
echo "1) AWS"
echo "2) Google Cloud"
echo "3) Azure"
read -p "Enter your choice (1-3): " choice

case $choice in
  1) deploy_to_aws ;;
  2) deploy_to_gcp ;;
  3) deploy_to_azure ;;
  *) echo "Invalid choice. Exiting." ;;
esac