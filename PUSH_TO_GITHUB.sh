#!/bin/bash

# Simple script to push ServicePro CRM to GitHub
# Run this from the servicepro-crm directory

echo "🚀 Pushing ServicePro CRM to GitHub..."
echo ""

# Initialize git if needed
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
fi

# Add all files
echo "Adding files..."
git add .

# Commit
echo "Creating commit..."
git commit -m "Initial commit: Complete ServicePro Elite CRM

Full-stack HVAC Service Management System

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

Includes:
- 25+ application files
- 5 comprehensive documentation guides
- Automated deployment scripts
- Database schema with RLS policies
- Production-ready code"

# Set remote
echo "Setting remote repository..."
git remote add origin https://github.com/vincehvac/servicepro-crm.git 2>/dev/null || git remote set-url origin https://github.com/vincehvac/servicepro-crm.git

# Push
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your code is now on GitHub"
echo "🌐 Repository: https://github.com/vincehvac/servicepro-crm"
echo ""
echo "Next steps:"
echo "1. Set up Supabase (see SUPABASE_SETUP.md)"
echo "2. Deploy to Vercel (see ONE_CLICK_DEPLOY.md)"