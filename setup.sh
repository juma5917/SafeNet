#!/bin/bash

# SafeNet Application Setup Script

echo "🚀 SafeNet - Digital Literacy & Safety Platform"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend

# Install dependencies
npm install

# Seed database (optional)
echo ""
read -p "Would you like to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    node seed.js
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

# Install dependencies
npm install

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🎯 To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "📝 Don't forget to:"
echo "  1. Ensure MongoDB is running"
echo "  2. Update .env files with your configuration"
echo "  3. Visit http://localhost:3000 in your browser"
