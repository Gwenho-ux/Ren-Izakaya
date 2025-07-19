# Environment Variables for Vercel Deployment

For the AI functionality to work on Vercel, you need to configure the following environment variable:

## Required Environment Variable

```
XAI_API_KEY=your_actual_xai_api_key_here
```

## How to Set Up on Vercel

1. **Deploy your project to Vercel** (connect your GitHub repository)

2. **Go to your Vercel project dashboard**
   - Navigate to your project
   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add the environment variable:**
   - **Name:** `XAI_API_KEY`
   - **Value:** Your actual X.AI API key
   - **Environments:** Select Production, Preview, and Development

4. **Redeploy your application** after adding the environment variable

## Local Development

For local development, create a `.env.local` file in your project root:

```
XAI_API_KEY=your_actual_xai_api_key_here
```

## Getting X.AI API Key

1. Sign up at [X.AI](https://x.ai/)
2. Navigate to API settings
3. Generate a new API key
4. Copy the key and use it in your environment variables

## Important Notes

- Never commit your actual API keys to version control
- The `.env` and `.env.local` files are already in `.gitignore`
- The application will fall back to sample responses if the API key is missing
- Make sure to restart your development server after adding environment variables locally 