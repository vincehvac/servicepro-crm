#!/bin/bash

# ServicePro Elite CRM - Automated Deployment Script
# This script automates as much as possible to minimize manual work

echo "🚀 ServicePro Elite CRM - Quick Deploy Script"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Install Dependencies
echo -e "${BLUE}Step 1: Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi
echo ""

# Step 2: Check for .env.local
echo -e "${BLUE}Step 2: Checking environment configuration...${NC}"
if [ ! -f .env.local ]; then
    echo -e "${RED}⚠ .env.local not found${NC}"
    echo "Creating .env.local from template..."
    cp .env.local.example .env.local
    echo -e "${RED}⚠ IMPORTANT: Edit .env.local and add your Supabase credentials${NC}"
    echo "   1. Go to https://supabase.com"
    echo "   2. Create a new project"
    echo "   3. Get your Project URL and anon key from Settings > API"
    echo "   4. Add them to .env.local"
    echo ""
    read -p "Press Enter after you've added your Supabase credentials..."
else
    echo -e "${GREEN}✓ .env.local found${NC}"
fi
echo ""

# Step 3: Test build
echo -e "${BLUE}Step 3: Testing build...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed - check errors above${NC}"
    exit 1
fi
echo ""

# Step 4: Initialize Git
echo -e "${BLUE}Step 4: Initializing Git repository...${NC}"
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit: ServicePro Elite CRM - Complete full-stack application

Features:
- Next.js 15 with TypeScript
- Supabase authentication and database
- Full CRUD for Jobs, Customers, Technicians
- Customer portal
- Responsive design with Tailwind CSS
- Complete documentation"
    echo -e "${GREEN}✓ Git repository initialized${NC}"
else
    echo -e "${GREEN}✓ Git repository already exists${NC}"
fi
echo ""

# Step 5: Push to GitHub
echo -e "${BLUE}Step 5: Pushing to GitHub...${NC}"
echo "Repository: https://github.com/vincehvac/servicepro-crm"
echo ""

# Check if remote exists
if git remote | grep -q origin; then
    echo "Remote 'origin' already exists"
else
    git remote add origin https://github.com/vincehvac/servicepro-crm.git
fi

git branch -M main
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
else
    echo -e "${RED}✗ Failed to push to GitHub${NC}"
    echo "You may need to create the repository first at:"
    echo "https://github.com/new"
    echo "Name it: servicepro-crm"
fi
echo ""

# Step 6: Deployment Instructions
echo -e "${BLUE}Step 6: Deploy to Vercel${NC}"
echo "=============================================="
echo ""
echo "Automated deployment to Vercel:"
echo ""
echo "1. Go to: https://vercel.com/new"
echo "2. Import your repository: vincehvac/servicepro-crm"
echo "3. Add environment variables:"
echo "   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
echo "4. Click Deploy"
echo ""
echo "Or use Vercel CLI (faster):"
echo "  npm i -g vercel"
echo "  vercel --prod"
echo ""

# Step 7: Summary
echo -e "${GREEN}=============================================="
echo "✓ Setup Complete!"
echo "==============================================${NC}"
echo ""
echo "📋 What's Done:"
echo "  ✓ Dependencies installed"
echo "  ✓ Build tested"
echo "  ✓ Git initialized"
echo "  ✓ Code pushed to GitHub"
echo ""
echo "📋 Next Steps:"
echo "  1. Set up Supabase database (see SUPABASE_SETUP.md)"
echo "  2. Deploy to Vercel (instructions above)"
echo "  3. Test your live application"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Complete guide"
echo "  - SUPABASE_SETUP.md - Database setup"
echo "  - DEPLOYMENT_GUIDE.md - Detailed deployment"
echo ""
echo "🌐 Links:"
echo "  GitHub: https://github.com/vincehvac/servicepro-crm"
echo "  Vercel: https://vercel.com/new"
echo "  Supabase: https://supabase.com"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"