// src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hnthjpwzvqozjmzuxcyo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudGhqcHd6dnFvemptenV4Y3lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjIwMjAwOCwiZXhwIjoyMDQxNzc4MDA4fQ.NQXPukhu7vIfjPKAW8mEfdBmaU2_T57NPqb-qb9IBrc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
