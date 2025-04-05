import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// Use hardcoded values from the .env file for now
const supabaseUrl = 'https://guafuutwjluavxwkfvbk.supabase.co';
// You'll need to replace this with the anon key from your guafuutwjluavxwkfvbk project
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YWZ1dXR3amx1YXZ4d2tmdmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDc0NzIsImV4cCI6MjAyOTQ4MzQ3Mn0.eTVsWAuDDNW_DGQRq7-4UQK_Ckss4HnfVzGOG2hANMQ';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helper functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const isAdmin = async () => {
  const user = await getCurrentUser();
  console.log('Current user:', user);
  
  if (!user) {
    console.log('No user found, not admin');
    return false;
  }
  
  // Explicitly list admin email addresses here
  const adminEmails = [
    // Only this email address will have admin access
    'artifaks@gmail.com'
  ];
  
  console.log('User email:', user.email);
  console.log('Admin emails:', adminEmails);
  console.log('Is admin?', adminEmails.includes(user.email || ''));
  
  // Check if user's email is in the admin list
  return adminEmails.includes(user.email || '');
};
