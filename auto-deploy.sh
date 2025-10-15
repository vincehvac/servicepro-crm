#!/bin/bash

# ServicePro Elite CRM - Fully Automated Deployment
# Run this script to deploy everything automatically

set -e  # Exit on error

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   ServicePro Elite CRM - Automated Deployment             ║"
echo "║   Minimizing manual work as much as possible              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to print status
print_status() {
    echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm install --silent
print_success "Dependencies installed"
echo ""

# Step 2: Check environment
print_status "Checking environment configuration..."
if [ ! -f .env.local ]; then
    print_warning ".env.local not found, creating from template..."
    cp .env.local.example .env.local
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "⚠  IMPORTANT: Supabase Configuration Required"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Please complete these steps:"
    echo ""
    echo "1. Go to: https://supabase.com"
    echo "2. Create a new project named: servicepro-crm"
    echo "3. Go to: Settings > API"
    echo "4. Copy your Project URL and anon key"
    echo ""
    echo "Then edit .env.local and add:"
    echo "  NEXT_PUBLIC_SUPABASE_URL=your-url-here"
    echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    read -p "Press Enter after you've configured .env.local..."
else
    print_success "Environment configured"
fi
echo ""

# Step 3: Build test
print_status "Testing build..."
npm run build > /dev/null 2>&1
print_success "Build successful"
echo ""

# Step 4: Git setup
print_status "Setting up Git repository..."
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit: ServicePro Elite CRM

Complete full-stack HVAC Service Management System

Features:
- Next.js 15 with TypeScript and Tailwind CSS
- Supabase authentication and database
- Full CRUD operations for Jobs, Customers, Technicians
- Customer portal with service request tracking
- Responsive design for mobile and desktop
- Role-based access control
- Complete documentation

Tech Stack:
- Frontend: Next.js 15, React 18, TypeScript
- Styling: Tailwind CSS
- Backend: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Deployment: Vercel-ready

Documentation:
- README.md - Complete guide
- SUPABASE_SETUP.md - Database setup
- DEPLOYMENT_GUIDE.md - Deployment instructions
- ONE_CLICK_DEPLOY.md - Quick start guide"
    print_success "Git repository initialized"
else
    print_success "Git repository already exists"
fi
echo ""

# Step 5: GitHub push
print_status "Preparing to push to GitHub..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "GitHub Repository Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Please create a GitHub repository:"
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: servicepro-crm"
echo "3. Description: Complete HVAC Service Management CRM"
echo "4. Visibility: Public (or Private)"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Press Enter after you've created the repository..."

# Add remote and push
if git remote | grep -q origin; then
    git remote remove origin
fi

git remote add origin https://github.com/vincehvac/servicepro-crm.git
git branch -M main

print_status "Pushing to GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    print_success "Code pushed to GitHub"
else
    print_error "Failed to push to GitHub"
    echo "You can manually push later with:"
    echo "  git push -u origin main"
fi
echo ""

# Step 6: Deployment summary
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    🎉 Setup Complete!                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "✓ Dependencies installed"
echo "✓ Build tested successfully"
echo "✓ Git repository initialized"
echo "✓ Code pushed to GitHub"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Set up Supabase Database (10 minutes)"
echo "   - Follow instructions in SUPABASE_SETUP.md"
echo "   - Run the SQL to create tables"
echo ""
echo "2. Deploy to Vercel (5 minutes)"
echo "   - Go to: https://vercel.com/new"
echo "   - Import: vincehvac/servicepro-crm"
echo "   - Add environment variables from .env.local"
echo "   - Click Deploy"
echo ""
echo "   Or use Vercel CLI:"
echo "   $ npm i -g vercel"
echo "   $ vercel --prod"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Your Links:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "GitHub Repository:"
echo "  https://github.com/vincehvac/servicepro-crm"
echo ""
echo "Vercel Deployment (after deploy):"
echo "  https://servicepro-crm.vercel.app"
echo ""
echo "Original ServicePro Elite:"
echo "  https://vincehvac.github.io/servicepro-elite/"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation:"
echo "  - ONE_CLICK_DEPLOY.md - Quick start guide"
echo "  - README.md - Complete documentation"
echo "  - SUPABASE_SETUP.md - Database setup"
echo "  - DEPLOYMENT_GUIDE.md - Detailed deployment"
echo ""
echo "🚀 Happy deploying!"
echo ""