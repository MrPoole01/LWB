# 🚀 Netlify Setup Guide - Final Steps

## ✅ What We've Done

We've switched from the problematic Render backend to **Netlify Functions**, which will solve all the CORS and email issues.

## 🔧 Environment Variables Setup

To enable email functionality, you need to set these environment variables in your Netlify dashboard:

### 1. Go to Netlify Dashboard
- Visit [netlify.com](https://netlify.com)
- Go to your site dashboard
- Click on **"Site settings"**
- Click on **"Environment variables"** in the left sidebar

### 2. Add These Variables

**Required for Email Functionality:**
```
EMAIL_USER = your-gmail-address@gmail.com
EMAIL_PASS = your-app-specific-password
ADMIN_EMAIL = info@lw-builders.com
```

### 3. Gmail App Password Setup

If you don't have a Gmail app password yet:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **"Security"** in the left sidebar
3. Under **"Signing in to Google"**, click **"2-Step Verification"**
4. Scroll down and click **"App passwords"**
5. Select **"Mail"** and **"Other (Custom name)"**
6. Enter **"Netlify Functions"** as the name
7. Copy the generated 16-character password
8. Use this password as your `EMAIL_PASS` value

## 🎯 How It Works Now

### **Form Submission Flow:**
1. User fills out form on `https://legacywealthbuilders.org`
2. Form submits to `/.netlify/functions/submit-lead`
3. Netlify function processes the data
4. Sends admin notification email to `info@lw-builders.com`
5. Sends confirmation email to the user
6. Returns success message to user

### **No More CORS Issues:**
- ✅ Same domain (legacywealthbuilders.org)
- ✅ Netlify handles CORS automatically
- ✅ No external API calls

### **Email Functionality:**
- ✅ Admin gets notified of new leads
- ✅ User gets confirmation email
- ✅ Professional email templates

## 🧪 Testing

After setting up the environment variables:

1. **Redeploy your site** (Netlify will automatically redeploy when you push to GitHub)
2. **Test the form** on your live site
3. **Check your email** for both admin notification and user confirmation

## 🔍 Debugging

If emails aren't working:

1. Check Netlify function logs:
   - Go to your Netlify dashboard
   - Click **"Functions"** tab
   - Click on **"submit-lead"**
   - Check the logs for any errors

2. Verify environment variables are set correctly
3. Make sure Gmail app password is correct

## 📧 Expected Emails

### Admin Email (to info@lw-builders.com):
```
Subject: New Lead Form Submission - Legacy Wealth Builders

New Lead Form Submission
Name: [First] [Last]
Email: [email]
Phone: [phone] (if provided)
Submission Time: [timestamp]
Source: Legacy Wealth Builders Website
```

### User Email (to submitted email):
```
Subject: Thank you for your interest in Legacy Wealth Builders

Thank you for your interest!
Dear [First Name],

Thank you for requesting our Legacy Wealth Guide to Precious Metals. 
We have received your information and will be in touch with you shortly.

In the meantime, if you have any questions, please don't hesitate to 
contact us at info@lw-builders.com or call us directly.

Best regards,
The Legacy Wealth Builders Team
```

## 🎉 Benefits of This Solution

- ✅ **No CORS issues** - Same domain
- ✅ **Reliable hosting** - Netlify's global CDN
- ✅ **Automatic scaling** - Serverless functions
- ✅ **Easy debugging** - Built-in logs
- ✅ **Cost effective** - Free tier includes functions
- ✅ **Fast deployment** - Instant updates

## 🚀 Next Steps

1. Set up environment variables in Netlify
2. Wait for automatic redeployment (2-3 minutes)
3. Test the form on your live site
4. Verify emails are being sent
5. Celebrate! 🎉

The form should now work perfectly without any CORS errors and emails should be delivered reliably. 