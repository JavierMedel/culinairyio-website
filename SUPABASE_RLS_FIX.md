# Fixing Supabase RLS Policy for Waitlist

## Issue
The current Row Level Security (RLS) policy is preventing email submissions to the waitlist table. The error message indicates that the current policy is too restrictive.

## Solution Steps

1. **Update Environment Variables**
   - Create or update `.env.local` file in your project root
   - Add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Update Supabase RLS Policies**
   - Go to your Supabase Dashboard
   - Navigate to Authentication > Policies
   - Find the `waitlist` table
   - Delete any existing policies
   - Add these new policies:

   a. Enable inserts from API routes (using service role):
   ```sql
   CREATE POLICY "Enable insert for service role" ON public.waitlist
   FOR INSERT TO authenticated
   WITH CHECK (auth.role() = 'service_role');
   ```

   b. Enable reads for service role only:
   ```sql
   CREATE POLICY "Enable select for service role" ON public.waitlist
   FOR SELECT TO authenticated
   USING (auth.role() = 'service_role');
   ```

3. **Update Supabase Client Configuration**
   - Update `src/lib/supabase.ts` to use service role key for API routes
   - Keep using anon key for client-side operations

## Verification
- Test the waitlist form submission
- Check Supabase table for successful email insertions
- Monitor the API response in browser dev tools

## Security Notes
- The service role key should NEVER be exposed to the client
- Always use environment variables for sensitive keys
- Keep RLS policies as restrictive as necessary while allowing required operations