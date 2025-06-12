# Netlify Deployment Guide for Lead Capture App

## Step 1: Deploy to Netlify

### Option A: Drag & Drop (Quick Start)
1. Build your project locally:
   ```bash
   npm run build
   ```
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Drag the `dist` folder to the Netlify deploy area
4. Your app will be deployed with a random URL like `https://amazing-name-123456.netlify.app`

### Option B: Git Integration (Recommended)
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```
2. In Netlify:
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Build settings should auto-detect from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

## Step 2: Set Up Custom Domain

### In Netlify Dashboard:
1. Go to your site settings
2. Click "Domain management"
3. Click "Add custom domain"
4. Enter your subdomain: `leads.lw-builders.com` or `app.lw-builders.com`
5. Netlify will provide DNS instructions

### In Squarespace (DNS Settings):
1. Go to Settings → Domains → [your domain] → DNS Settings
2. Add a CNAME record:
   - **Name/Host**: `leads` (or `app`)
   - **Value/Points to**: `your-netlify-site.netlify.app`
   - **TTL**: 3600 (or default)

**Example:**
- If your Netlify site is `amazing-name-123456.netlify.app`
- And you want `leads.lw-builders.com`
- Create CNAME: `leads` → `amazing-name-123456.netlify.app`

## Step 3: SSL Certificate

Netlify will automatically provision an SSL certificate for your custom domain. This usually takes a few minutes to an hour.

## Step 4: Environment Variables (if needed)

If you need to override the API URL:
1. In Netlify: Site settings → Environment variables
2. Add: `VITE_API_URL` = `https://your-render-app.onrender.com/api`

## Step 5: Test Your Deployment

1. Visit your custom domain (e.g., `https://leads.lw-builders.com`)
2. Test the lead capture form
3. Verify emails are being sent
4. Check PDF download functionality

## Step 6: Link from Squarespace

### Add a Button/Link on Your Main Site:
1. Edit your main Squarespace page
2. Add a Button block
3. Set the URL to your subdomain: `https://leads.lw-builders.com`
4. Use text like:
   - "Get Your Free Wealth Guide"
   - "Download Legacy Wealth Guide"
   - "Access Your Free Guide"

### Or Create a Menu Item:
1. Go to Design → Navigation
2. Add a new link to `https://leads.lw-builders.com`
3. Label it "Free Guide" or "Resources"

## Architecture Overview

```
www.lw-builders.com (Squarespace)
├── Main website content
├── Link/Button to → leads.lw-builders.com (Netlify)
│
leads.lw-builders.com (Netlify)
├── React Lead Capture App
├── Submits to → your-app.onrender.com/api (Render)
│
your-app.onrender.com (Render)
├── Express API
├── Email sending
├── PDF serving
```

## Benefits of This Setup

✅ **Professional URLs**: `leads.lw-builders.com` looks professional
✅ **Fast Performance**: Netlify's global CDN
✅ **Easy Updates**: Push to GitHub → Auto-deploy
✅ **Free Hosting**: Netlify free tier is generous
✅ **SSL Included**: Automatic HTTPS
✅ **Custom Domain**: Maintains your brand
✅ **Scalable**: Can handle high traffic
✅ **Analytics**: Built-in Netlify analytics

## Troubleshooting

### Domain Not Working:
- Check DNS propagation (can take up to 24 hours)
- Verify CNAME record is correct
- Try accessing the .netlify.app URL directly

### Form Not Submitting:
- Check browser console for CORS errors
- Verify API URL in environment variables
- Ensure backend is deployed and running

### SSL Certificate Issues:
- Wait up to 24 hours for provisioning
- Check that DNS is properly configured
- Contact Netlify support if needed

## Next Steps After Deployment

1. **Analytics**: Set up Google Analytics or use Netlify Analytics
2. **SEO**: Add meta tags and optimize for search engines
3. **Performance**: Monitor Core Web Vitals
4. **A/B Testing**: Test different versions of your form
5. **Monitoring**: Set up uptime monitoring for your API

Your lead capture app will be live at your custom subdomain and ready to convert visitors! 