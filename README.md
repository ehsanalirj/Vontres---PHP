# All-in-One AI-Powered CRM and Cold Calling System

This system is a comprehensive solution for outsource companies, cold calling agencies, customer service agents, remote workers, and startups. It functions as a complete CRM with advanced AI-powered features for cold calling and customer management.

## Features

- User management with role-based access control
- Company and contact management
- AI-powered call script generation
- Integrated VoIP calling with Twilio
- Real-time call analysis and sentiment scoring
- Automatic call transcription
- Performance analytics and reporting
- Customizable fields for companies and contacts
- Tagging system for easy organization
- Real-time updates with WebSocket integration
- Automated daily reports and data cleanup

## Installation

### Cloud Installation

1. Sign up for a cloud provider (AWS, Google Cloud, or Azure)
2. Set up a virtual machine with Ubuntu
3. SSH into your virtual machine
4. Run the following commands:

```bash
wget https://raw.githubusercontent.com/your-repo/all-in-one-ai-crm-system/main/install.sh
chmod +x install.sh
sudo ./install.sh
```

5. Follow the prompts to complete the installation

### Shared Hosting Installation

1. Ensure your shared hosting provider supports Docker
2. Upload the project files to your hosting account
3. SSH into your hosting account
4. Navigate to the project directory
5. Run the installation script:

```bash
chmod +x install.sh
./install.sh
```

6. Follow the prompts to complete the installation

## Usage

After installation, you can access the system by navigating to `http://your-domain.com` in your web browser. Log in with the admin credentials you set during the installation process.

## Customization

You can customize the system by modifying the source code. Key areas for customization include:

- `src/models`: Define custom fields for companies and contacts
- `src/services/AIService.ts`: Adjust AI prompts and analysis
- `src/cron`: Add or modify scheduled tasks

## Support

For support, please open an issue on the GitHub repository or contact our support team at support@your-company.com.

## License

This project is licensed under the MIT License. See the LICENSE file for details.