# ServicePro Elite CRM - Complete Deployment Guide

## Overview
This guide will walk you through deploying the ServicePro Elite CRM application from start to finish.

---

## Part 1: Local Development Setup

### Step 1: Install Dependencies
```bash
cd servicepro-crm
npm install
```

This will install all required packages including:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Supabase client libraries

### Step 2: Set Up Supabase Database

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for a free account
   - Create a new project

2. **Get API Credentials**
   - Go to Project Settings > API
   - Copy your Project URL
   - Copy your anon/public key

3. **Create Environment File**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Add Credentials to .env.local**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. **Create Database Tables**
   - Open Supabase SQL Editor
   - Copy and paste the SQL from `SUPABASE_SETUP.md`
   - Run each section:
     1. Create tables
     2. Create indexes
     3. Enable RLS
     4. Create policies
     5. (Optional) Insert sample data

### Step 3: Test Locally
```bash
npm run dev
```

Visit http://localhost:3000 and test:
- [ ] Home page loads
- [ ] Can register new user
- [ ] Can log in
- [ ] Dashboard displays
- [ ] Can create/edit/delete jobs
- [ ] Can create/edit/delete customers
- [ ] Can create/edit/delete technicians
- [ ] Customer portal works

---

## Part 2: GitHub Setup

### Step 1: Initialize Git Repository
```bash
# Make sure you're in the servicepro-crm directory
cd servicepro-crm

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ServicePro Elite CRM"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name it: `servicepro-crm`
4. Description: "Complete HVAC Service Management System"
5. Keep it Public or Private (your choice)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create Repository"

### Step 3: Push to GitHub
```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/servicepro-crm.git

# Push code
git branch -M main
git push -u origin main
```

---

## Part 3: Vercel Deployment

### Step 1: Connect to Vercel

1. Go to https://vercel.com
2. Sign up or log in (use GitHub account for easy integration)
3. Click "Add New Project"
4. Import your `servicepro-crm` repository

### Step 2: Configure Project

1. **Framework Preset**: Next.js (should auto-detect)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables

Click "Environment Variables" and add:

```
NEXT_PUBLIC_SUPABASE_URL = your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-anon-key
```

**Important**: Add these for all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Once deployed, you'll get a URL like: `https://servicepro-crm.vercel.app`

### Step 5: Configure Supabase for Production

1. Go to your Supabase project
2. Navigate to Authentication > URL Configuration
3. Add your Vercel URL to:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

---

## Part 4: Post-Deployment Testing

### Test Checklist

Visit your deployed application and verify:

**Authentication**
- [ ] Can register new internal user
- [ ] Can log in as internal user
- [ ] Can log out
- [ ] Can register as customer
- [ ] Can log in as customer

**Internal Dashboard**
- [ ] Dashboard loads with statistics
- [ ] Can create new job
- [ ] Can edit existing job
- [ ] Can delete job
- [ ] Can filter jobs by status
- [ ] Can create new customer
- [ ] Can edit customer
- [ ] Can delete customer
- [ ] Can search customers
- [ ] Can create new technician
- [ ] Can edit technician
- [ ] Can toggle technician status
- [ ] Can delete technician

**Customer Portal**
- [ ] Customer dashboard loads
- [ ] Can view service requests
- [ ] Quick actions display

**Mobile Responsiveness**
- [ ] Test on mobile device or browser dev tools
- [ ] All pages are responsive
- [ ] Navigation works on mobile
- [ ] Forms are usable on mobile

---

## Part 5: Custom Domain (Optional)

### Step 1: Purchase Domain
- Use Vercel Domains, Namecheap, GoDaddy, etc.

### Step 2: Add to Vercel
1. Go to your Vercel project
2. Settings > Domains
3. Add your domain
4. Follow DNS configuration instructions

### Step 3: Update Supabase
- Add your custom domain to Supabase redirect URLs

---

## Part 6: Monitoring & Maintenance

### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor page views, performance, and errors

### Supabase Monitoring
1. Check Database > Usage for storage and bandwidth
2. Monitor Auth > Users for user growth
3. Review Logs for errors

### Regular Updates
```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will automatically deploy on push to main branch.

---

## Troubleshooting

### Build Fails on Vercel
- Check build logs for specific errors
- Verify all environment variables are set
- Ensure package.json has correct dependencies
- Try building locally: `npm run build`

### Database Connection Issues
- Verify Supabase URL and key are correct
- Check if Supabase project is active
- Ensure RLS policies are set up correctly
- Check Supabase logs for errors

### Authentication Not Working
- Verify redirect URLs in Supabase
- Check that environment variables are set in Vercel
- Clear browser cache and cookies
- Check browser console for errors

### 404 Errors
- Ensure all routes are properly defined
- Check that files are in correct directories
- Verify deployment completed successfully

---

## Security Best Practices

1. **Never commit .env.local to Git** (already in .gitignore)
2. **Use strong passwords** for Supabase database
3. **Enable 2FA** on Vercel and Supabase accounts
4. **Regularly update dependencies**: `npm update`
5. **Monitor for security vulnerabilities**: `npm audit`
6. **Review RLS policies** to ensure data security
7. **Use HTTPS only** (Vercel provides this automatically)

---

## Scaling Considerations

### When to Upgrade Supabase
- Free tier: 500MB database, 2GB bandwidth
- Upgrade when approaching limits
- Consider Pro plan for production apps

### When to Upgrade Vercel
- Free tier: 100GB bandwidth, unlimited deployments
- Upgrade for team features or higher limits
- Consider Pro plan for commercial use

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## Success Checklist

- [x] Application built and tested locally
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables configured
- [ ] Supabase database set up
- [ ] All features tested in production
- [ ] Mobile responsiveness verified
- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled

---

**Congratulations! Your ServicePro Elite CRM is now live! 🎉**