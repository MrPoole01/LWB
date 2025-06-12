#!/bin/bash

# Deploy Widget Script for Squarespace Embedding
# This script builds the widget and copies files to the server directory

echo "🚀 Building embeddable widget..."

# Build the project
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Copy widget files to server public directory
echo "📁 Copying widget files to server..."
cp -r dist/* server/public/widget/

echo "✅ Widget files copied!"

# Show the files that were created
echo "📋 Widget files available at:"
echo "   - CSS: server/public/widget/assets/index-*.css"
echo "   - JS: server/public/widget/assets/index-*.js"
echo "   - Embed: server/public/widget/embed.js"

echo ""
echo "🌐 After deploying to Render, your widget will be available at:"
echo "   https://legacy-wealth-api.onrender.com/widget/"

echo ""
echo "📝 Next steps:"
echo "   1. Deploy your backend to Render"
echo "   2. Copy the code from 'squarespace-embed-code.html'"
echo "   3. Paste it into a Squarespace Code Block"
echo "   4. Update the URLs if your Render app name is different"

echo ""
echo "✨ Deployment preparation complete!" 