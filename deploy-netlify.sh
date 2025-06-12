#!/bin/bash

# Netlify Deployment Script
# This script builds the project and prepares it for Netlify deployment

echo "🚀 Building React app for Netlify..."

# Build the project
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Show build output
echo "📋 Build files created in 'dist/' directory:"
ls -la dist/

echo ""
echo "🌐 Ready for Netlify deployment!"
echo ""
echo "📝 Next steps:"
echo "   1. Push to GitHub: git push origin main"
echo "   2. Go to https://netlify.com"
echo "   3. Connect your GitHub repository"
echo "   4. Deploy with these settings:"
echo "      - Build command: npm run build"
echo "      - Publish directory: dist"
echo "   5. Set up custom domain (leads.lw-builders.com)"
echo ""
echo "🔗 Or drag & drop the 'dist' folder to Netlify for quick deployment"
echo ""
echo "✨ Your lead capture app will be live soon!" 