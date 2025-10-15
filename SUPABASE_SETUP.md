# Supabase Database Setup Guide

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: servicepro-crm
   - Database Password: (create a strong password)
   - Region: (choose closest to your users)
5. Wait for project to be created

## 2. Get API Keys

1. Go to Project Settings > API
2. Copy the following:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
3. Add these to your `.env.local` file

## 3. Create Database Tables

Go to SQL Editor in Supabase dashboard and run the following SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'technician', 'dispatcher', 'customer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Technicians table
CREATE TABLE public.technicians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Available', 'Busy', 'Offline')),
  skills TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  tech_id UUID REFERENCES public.technicians(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('Open', 'Scheduled', 'In Progress', 'Completed')),
  scheduled_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_jobs_customer_id ON public.jobs(customer_id);
CREATE INDEX idx_jobs_tech_id ON public.jobs(tech_id);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_scheduled_time ON public.jobs(scheduled_time);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 4. Set Up Row Level Security (RLS)

Run the following SQL to enable RLS and create policies:

```sql
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Customers policies
CREATE POLICY "Authenticated users can view customers"
  ON public.customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON public.customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON public.customers FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete customers"
  ON public.customers FOR DELETE
  TO authenticated
  USING (true);

-- Technicians policies
CREATE POLICY "Authenticated users can view technicians"
  ON public.technicians FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert technicians"
  ON public.technicians FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update technicians"
  ON public.technicians FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete technicians"
  ON public.technicians FOR DELETE
  TO authenticated
  USING (true);

-- Jobs policies
CREATE POLICY "Authenticated users can view jobs"
  ON public.jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert jobs"
  ON public.jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update jobs"
  ON public.jobs FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete jobs"
  ON public.jobs FOR DELETE
  TO authenticated
  USING (true);
```

## 5. Create Sample Data (Optional)

```sql
-- Insert sample customers
INSERT INTO public.customers (name, phone, email, address) VALUES
  ('John Smith', '(555) 123-4567', 'john@example.com', '123 Main St, City, State 12345'),
  ('Jane Doe', '(555) 234-5678', 'jane@example.com', '456 Oak Ave, City, State 12345'),
  ('Bob Johnson', '(555) 345-6789', 'bob@example.com', '789 Elm St, City, State 12345');

-- Insert sample technicians
INSERT INTO public.technicians (name, status, skills) VALUES
  ('Mike Rodriguez', 'Available', 'HVAC, Plumbing, Electrical'),
  ('Sarah Chen', 'Busy', 'HVAC, Refrigeration'),
  ('David Park', 'Available', 'Electrical, HVAC');

-- Insert sample jobs
INSERT INTO public.jobs (title, description, customer_id, tech_id, status, scheduled_time)
SELECT 
  'HVAC Maintenance',
  'Annual HVAC system maintenance and inspection',
  (SELECT id FROM public.customers WHERE name = 'John Smith'),
  (SELECT id FROM public.technicians WHERE name = 'Mike Rodriguez'),
  'Scheduled',
  NOW() + INTERVAL '2 days';
```

## 6. Configure Authentication

1. Go to Authentication > Settings in Supabase dashboard
2. Enable Email authentication
3. Configure email templates (optional)
4. Set up redirect URLs for your application

## 7. Test Connection

After setting up, test your connection by:
1. Starting your Next.js app: `npm run dev`
2. Try registering a new user
3. Try logging in
4. Check if data appears in Supabase dashboard

## Troubleshooting

### Connection Issues
- Verify your API keys are correct in `.env.local`
- Check if Supabase project is active
- Ensure you're using the correct project URL

### RLS Issues
- If you can't see data, check RLS policies
- Temporarily disable RLS for testing (not recommended for production)
- Verify user is authenticated before making requests

### Data Not Appearing
- Check browser console for errors
- Verify SQL queries in Supabase SQL Editor
- Check if tables were created successfully

## Next Steps

1. Customize RLS policies for your specific needs
2. Add more tables as needed (invoices, payments, etc.)
3. Set up real-time subscriptions for live updates
4. Configure storage for file uploads
5. Set up database backups