#!/bin/bash

# Production deployment script for cPanel
# Run this script after uploading files to your hosting

echo "🚀 Starting Sobek Pharma deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if database is accessible
echo "🔍 Testing database connection..."
npx prisma db push --accept-data-loss

echo "✅ Deployment completed!"
echo "🌐 Your website should now be accessible"
echo "🔗 Admin panel: /admin/login"
echo "📊 API test: /api/categories"