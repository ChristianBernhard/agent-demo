#!/bin/bash

echo "🚀 Starting AI-nleuchtend Agent Demo..."
echo "📍 Opening http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
npm run dev
