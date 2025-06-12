# 🚀 Deployment Summary: Netlify + Subdomain Setup

## ✅ What's Ready to Deploy

### **Frontend (React App)**
- **Location**: Root directory of this project
- **Hosting**: Netlify
- **Domain**: `leads.lw-builders.com` or `app.lw-builders.com`
- **Status**: ✅ Ready to deploy

### **Backend (Express API)**
- **Location**: `server/` directory
- **Hosting**: Render.com
- **Domain**: `https://legacy-wealth-api.onrender.com`
- **Status**: ✅ Ready to deploy

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    www.lw-builders.com                      │
│                     (Squarespace)                           │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │  Main Website   │    │   "Get Free Guide" Button      │ │
│  │   Content       │    │   Links to subdomain ────────┐ │ │
│  └─────────────────┘    └─────────────────────────────────┘ │ │
└─────────────────────────────────────────────────────────────┘ │
                                                               │
                                                               ▼
┌─────────────────────────────────────────────────────────────┐
│                leads.lw-builders.com                        │
│                     (Netlify)                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              React Lead Capture App                     │ │
│  │  • Beautiful form with animations                      │ │
│  │  • Form validation                                      │ │
│  │  • Success/error handling                              │ │
│  │  • Mobile responsive                                   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                │ API calls
                                ▼
┌─────────────────────────────────────────────────────────────┐
│            legacy-wealth-api.onrender.com                   │
│                     (Render)                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Express.js API                           │ │
│  │  • Receives form submissions                            │ │
│  │  • Sends admin notification email                      │ │
│  │  • Sends user confirmation email + PDF                 │ │
│  │  • Serves PDF downloads                                │ │
│  │  • CORS configured for subdomain                       │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Deployment Checklist

### **Step 1: Deploy Backend to Render**
- [ ] Push code to GitHub: `git push origin main`
- [ ] Go to [Render.com](https://render.com)
- [ ] Connect GitHub repository
- [ ] Deploy from `server/` directory
- [ ] Set environment variables:
  - `EMAIL_USER` = your email
  - `EMAIL_PASS` = your app password
  - `ADMIN_EMAIL` = info@lw-builders.com
  - `NODE_ENV` = production
- [ ] Note your Render URL (e.g., `https://legacy-wealth-api.onrender.com`)

### **Step 2: Deploy Frontend to Netlify**
- [ ] Go to [Netlify.com](https://netlify.com)
- [ ] Connect GitHub repository
- [ ] Deploy from root directory
- [ ] Build settings (auto-detected from `netlify.toml`):
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Note your Netlify URL (e.g., `https://amazing-name-123456.netlify.app`)

### **Step 3: Set Up Custom Domain**
- [ ] In Netlify: Add custom domain `leads.lw-builders.com`
- [ ] In Squarespace DNS: Add CNAME record:
  - Name: `leads`
  - Value: `your-netlify-site.netlify.app`
- [ ] Wait for SSL certificate (up to 24 hours)

### **Step 4: Link from Squarespace**
- [ ] Edit your main Squarespace site
- [ ] Add a button/link to `https://leads.lw-builders.com`
- [ ] Use compelling text like "Get Your Free Wealth Guide"

### **Step 5: Test Everything**
- [ ] Visit `https://leads.lw-builders.com`
- [ ] Submit the form
- [ ] Check admin email received
- [ ] Check user confirmation email with PDF
- [ ] Test PDF download

## 🔧 Configuration Files

### **Frontend Configuration**
- `netlify.toml` - Netlify build settings and redirects
- `.env.production` - Production API URL
- `vite.config.ts` - Build configuration

### **Backend Configuration**
- `server/render.yaml` - Render deployment settings
- `server/.env` - Environment variables (not in git)

## 🌟 Benefits of This Setup

✅ **Professional URLs**: Custom subdomain maintains your brand  
✅ **Fast Performance**: Netlify's global CDN for frontend  
✅ **Reliable Backend**: Render's managed Node.js hosting  
✅ **Easy Updates**: Push to GitHub → Auto-deploy  
✅ **Free Hosting**: Both services have generous free tiers  
✅ **SSL Included**: Automatic HTTPS on both platforms  
✅ **Scalable**: Can handle high traffic  
✅ **Maintainable**: Clean separation of concerns  

## 🚨 Important Notes

1. **Environment Variables**: Make sure to set all required env vars in Render
2. **CORS**: Backend is configured to allow your subdomain
3. **DNS Propagation**: Custom domain may take up to 24 hours to work
4. **PDF File**: Ensure `legacy-wealth-guide.pdf` is in `server/public/`
5. **Email Credentials**: Use app-specific passwords for Gmail

## 🔗 Quick Deploy Commands

```bash
# Build and prepare for deployment
./deploy-netlify.sh

# Push to GitHub (triggers auto-deploy)
git push origin main
```

## 📞 Support

If you encounter issues:
1. Check the deployment guides in `netlify-deployment-guide.md`
2. Verify all environment variables are set
3. Check browser console for errors
4. Test API endpoints directly

**Your lead capture system is ready to go live! 🎉** 