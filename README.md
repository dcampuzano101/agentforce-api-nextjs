# Agentforce Chat Deployment

A Next.js application that enables Salesforce/MuleSoft Solution Engineers to quickly deploy and test their Agentforce Agents. This application provides a clean interface for interacting with Agentforce Agents through the Salesforce Agent API.

## Features

- Quick deployment with Heroku Button
- Real-time chat interface with Agentforce Agents
- Seamless integration with Salesforce Agent API
- Environment variable configuration
- Typing indicators and loading states

## Prerequisites

Before deploying this application, ensure you have:

1. A Heroku account (Available via Salesforce SSO)
2. An active Agentforce Agent
3. A Salesforce Connected App that supports the client credential flow
   - For more information, see [Create a Connected App](https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm) in Salesforce Help
4. The Connected App added to your Agent

## Required Configuration

You'll need the following information to configure the application:

- `SF_CLIENT_ID`: Your Salesforce Connected App Client ID
- `SF_CLIENT_SECRET`: Your Salesforce Connected App Client Secret
- `SF_AGENT_ID`: Your Agent's 18-character ID (found in the Agent Overview Page URL)
  - Example: From URL `https://mydomain.my.salesforce.com/lightning/setup/EinsteinCopilot/0XxSB000000IPCr0AO/edit`
  - Agent ID would be `0XxSB000000IPCr0AO`
- `SF_BASE_URL`: The Salesforce Einstein AI Agent API Base URL (default: https://api.salesforce.com/einstein/ai-agent/v1)
- `SF_DOMAIN`: Your Salesforce My Domain URL (found in Setup > My Domain)

## Quick Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy/?template=https://github.com/dcampuzano101/agentforce-api-nextjs)

1. Click the "Deploy to Heroku" button above
2. Fill in the required environment variables
3. Deploy your application
4. Start chatting with your Agent!

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/agentforce-deployment.git
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

## API Flow

1. User initiates chat by clicking "Start Chat"
2. Application makes an API call to get Access Token
3. Creates a new session with the Agent
4. Subsequent messages are routed to the Agentforce `/messages` endpoint

## Support

For issues related to:

- The application: Please open an issue in this repository
- Salesforce Agentforce: Contact Salesforce Support
- API access: Review the [Salesforce Agent API Documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm)
