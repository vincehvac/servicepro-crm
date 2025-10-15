# ServicePro Elite CRM

A complete HVAC Service Management System built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

### Internal Team Portal
- **Dashboard Overview**: Real-time statistics and activity feed
- **Job Management**: Create, assign, track, and complete service jobs
- **Customer Management**: Comprehensive customer database with full CRUD operations
- **Technician Management**: Track technician availability, skills, and assignments
- **Role-Based Access**: Admin, Dispatcher, and Technician roles with appropriate permissions

### Customer Portal
- **Service Requests**: Submit and track service requests
- **Appointment Scheduling**: Book and reschedule appointments
- **Job History**: View past and current service jobs
- **Invoice Access**: View and download invoices
- **Real-time Updates**: Get notified of job status changes

### Technical Features
- **Authentication**: Secure login/registration with Supabase Auth
- **Real-time Data**: Live updates using Supabase real-time subscriptions
- **Responsive Design**: Mobile-first design that works on all devices
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Beautiful interface with Tailwind CSS
- **Role-Based Security**: Row Level Security (RLS) policies in Supabase

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vincehvac/servicepro-crm.git
   cd servicepro-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Follow the instructions in `SUPABASE_SETUP.md` to create tables and policies
   - Get your API keys from Project Settings > API

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
servicepro-crm/
├── app/                          # Next.js App Router
│   ├── customer/                 # Customer portal routes
│   │   ├── login/               # Customer login page
│   │   ├── register/            # Customer registration
│   │   └── dashboard/           # Customer dashboard
│   ├── dashboard/               # Internal team dashboard
│   │   ├── jobs/                # Jobs management
│   │   ├── customers/           # Customers management
│   │   └── technicians/         # Technicians management
│   ├── login/                   # Team login page
│   ├── register/                # Team registration
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   └── DashboardLayout.tsx      # Dashboard layout wrapper
├── lib/                         # Utility functions
│   └── supabase.ts              # Supabase client and helpers
├── public/                      # Static assets
├── .env.local.example           # Environment variables template
├── SUPABASE_SETUP.md           # Database setup guide
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Usage

### Internal Team Access

1. Navigate to `/login`
2. Register a new account or use existing credentials
3. Access the dashboard to manage jobs, customers, and technicians

### Customer Access

1. Navigate to `/customer/login`
2. Register a new customer account
3. Submit service requests and track jobs

## Database Schema

### Tables

- **users**: User authentication and profile data
- **customers**: Customer information and contact details
- **technicians**: Technician profiles, skills, and availability
- **jobs**: Service jobs with status tracking and assignments

See `SUPABASE_SETUP.md` for detailed schema and setup instructions.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy!

3. **Configure Supabase**
   - Add your Vercel deployment URL to Supabase Auth settings
   - Update redirect URLs in Supabase dashboard

### Environment Variables on Vercel

Add these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Features Roadmap

- [ ] Real-time notifications
- [ ] Email notifications for job updates
- [ ] SMS alerts for urgent jobs
- [ ] Invoice generation and payment processing
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] Calendar integration
- [ ] Route optimization for technicians
- [ ] Inventory management
- [ ] Equipment tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@servicepro-elite.com or open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)