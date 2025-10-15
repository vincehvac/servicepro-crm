# ServicePro Elite CRM

Complete HVAC Service Management System built with Next.js, TypeScript, and Supabase.

## 🚀 ONE-CLICK DEPLOY

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvincehvac%2Fservicepro-crm&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20required&envLink=https%3A%2F%2Fsupabase.com%2Fdocs%2Fguides%2Fgetting-started&project-name=servicepro-crm&repository-name=servicepro-crm)

**Click the button above to deploy in 2 minutes!**

---

## ⚡ Quick Setup (5 Minutes Total)

### Step 1: Deploy to Vercel (2 minutes)
1. Click the "Deploy with Vercel" button above
2. Sign in with GitHub
3. Click "Create" (don't add environment variables yet)
4. Wait for deployment

### Step 2: Set Up Supabase (3 minutes)
1. Go to https://supabase.com
2. Create new project: `servicepro-crm`
3. Wait 2 minutes for project creation
4. Go to Settings > API
5. Copy:
   - Project URL
   - anon/public key

### Step 3: Add Environment Variables (1 minute)
1. Go to your Vercel project
2. Settings > Environment Variables
3. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-key
   ```
4. Redeploy (Deployments > ... > Redeploy)

### Step 4: Create Database Tables (2 minutes)
1. In Supabase, go to SQL Editor
2. Copy SQL from `SUPABASE_SETUP.md` in this repo
3. Paste and run
4. Done!

---

## 🎉 That's It!

Your app will be live at: `https://servicepro-crm.vercel.app`

**Total time: ~8 minutes**

---

## Features

### Internal Team Portal
- 📊 Dashboard with real-time statistics
- 📋 Jobs management (full CRUD)
- 👥 Customers management (full CRUD)
- 👷 Technicians management (full CRUD)
- 🔐 Role-based access (admin, technician, dispatcher)

### Customer Portal
- 🏠 Customer dashboard
- 📝 Service request tracking
- 📅 Appointment management
- 💰 Invoice access

### Technical Features
- ⚡ Next.js 15 with App Router
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🗄️ Supabase (PostgreSQL)
- 🔐 Supabase Auth
- 📱 Fully responsive
- 🚀 Production-ready

---

## Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel

---

## Documentation

- `SUPABASE_SETUP.md` - Database setup guide
- `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
- `ONE_CLICK_DEPLOY.md` - Quick start guide

---

## Support

For issues or questions, check the documentation files in this repository.

---

## License

MIT License - feel free to use for your projects!

---

**Built with ❤️ for HVAC service professionals**