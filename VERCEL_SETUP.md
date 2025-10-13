# Vercel Deployment Setup

## Environment Variables

When deploying to Vercel, you need to configure the following environment variables in your Vercel project settings.

### How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable below:

### Required Variables

#### PostHog Analytics

```
REACT_APP_PUBLIC_POSTHOG_KEY=phc_V9OhfAiJ8gED5QTrln0hVRMF9lWyR4VV3hmfplT6Ew7
REACT_APP_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

#### Build Configuration

```
SKIP_PREFLIGHT_CHECK=true
```

### Environment Scope

For each variable, select the appropriate environments:
- ✅ **Production** - For your production deployments
- ✅ **Preview** - For pull request previews
- ✅ **Development** - For local development (optional, can use .env instead)

## How It Works

- **Create React App** (used in this project) automatically reads environment variables starting with `REACT_APP_` at **build time**
- Vercel injects these variables during the build process
- The variables are **baked into** the JavaScript bundle during build
- No runtime configuration needed!

## Important Notes

⚠️ **Security**: Variables starting with `REACT_APP_` are **public** and will be visible in your client-side JavaScript bundle. Never put sensitive secrets (like API keys with write access) in these variables.

✅ **Safe for client-side**: PostHog keys are designed to be public and used on the client side.

## Local Development

For local development:
1. Copy `.env.example` to `.env`
2. Fill in your actual values
3. **Never commit `.env`** to git (it's already in `.gitignore`)

## Vercel CLI (Optional)

You can also set environment variables using the Vercel CLI:

```bash
vercel env add REACT_APP_PUBLIC_POSTHOG_KEY
vercel env add REACT_APP_PUBLIC_POSTHOG_HOST
vercel env add SKIP_PREFLIGHT_CHECK
```

## Troubleshooting

If your environment variables aren't working:

1. **Check the variable names**: They must start with `REACT_APP_` for Create React App
2. **Redeploy**: Environment variables are applied at build time, so you need to trigger a new deployment
3. **Verify in Vercel dashboard**: Check that variables are set for the correct environment (Production/Preview)
4. **Clear cache**: In Vercel settings, you can clear the build cache and redeploy

## Reference

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

