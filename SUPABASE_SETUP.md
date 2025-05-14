# Supabase Setup for CulinAIry Email Collection

This document provides instructions for setting up Supabase to collect and store emails from users interested in CulinAIry.

## Prerequisites

- A Supabase account (free tier is sufficient to start)
- Access to the CulinAIry project codebase

## Supabase Setup

1. **Create a new Supabase project**
   - Go to [https://supabase.com](https://supabase.com) and sign in
   - Click "New Project" and follow the setup wizard
   - Choose a name for your project (e.g., "culinairy-waitlist")
   - Set a secure database password
   - Choose the region closest to your target audience

2. **Create the waitlist table**
   - In your Supabase dashboard, go to the "Table Editor" section
   - Click "New Table"
   - Name the table `waitlist`
   - Add the following columns:
     - `id`: uuid (primary key, default: `uuid_generate_v4()`)
     - `email`: text (set as UNIQUE)
     - `created_at`: timestamp with time zone (default: `now()`)
   - Enable Row Level Security (RLS)

3. **Set up Row Level Security policies**
   - After creating the table, go to "Authentication" > "Policies"
   - Find your `waitlist` table and add the following policies:
     - For INSERT: Allow authenticated service role only
     - For SELECT: Allow authenticated service role only

## Environment Setup

1. **Get your Supabase credentials**
   - In your Supabase dashboard, go to "Settings" > "API"
   - Copy your "Project URL" and "anon" key

2. **Set up environment variables**
   - Create a `.env.local` file in the root of your project (if it doesn't exist)
   - Add the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Testing the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the page with the email collection form

3. Submit a test email and verify:
   - The form submission works without errors
   - The email appears in your Supabase `waitlist` table
   - Duplicate emails are handled correctly

## Troubleshooting

- If you encounter CORS errors, check your Supabase project settings
- Ensure your environment variables are correctly set and accessible
- Check browser console for any JavaScript errors
- Verify network requests in the browser's developer tools