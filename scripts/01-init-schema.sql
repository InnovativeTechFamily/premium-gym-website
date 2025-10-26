-- Create users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  membership_tier TEXT DEFAULT 'free',
  membership_start_date TIMESTAMP,
  membership_end_date TIMESTAMP,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create membership tiers table
CREATE TABLE IF NOT EXISTS membership_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_days INTEGER NOT NULL,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  instructor_name TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  difficulty_level TEXT DEFAULT 'intermediate',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create class schedules table
CREATE TABLE IF NOT EXISTS class_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create class bookings table
CREATE TABLE IF NOT EXISTS class_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_schedule_id UUID NOT NULL REFERENCES class_schedules(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, class_schedule_id, booking_date)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_membership_tier ON users(membership_tier);
CREATE INDEX IF NOT EXISTS idx_class_bookings_user_id ON class_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_class_bookings_booking_date ON class_bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_class_schedules_class_id ON class_schedules(class_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_tiers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- RLS Policies for classes (public read)
CREATE POLICY "Anyone can view classes" ON classes
  FOR SELECT USING (TRUE);

-- RLS Policies for class_schedules (public read)
CREATE POLICY "Anyone can view class schedules" ON class_schedules
  FOR SELECT USING (TRUE);

-- RLS Policies for class_bookings
CREATE POLICY "Users can view their own bookings" ON class_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON class_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their bookings" ON class_bookings
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for membership_tiers (public read)
CREATE POLICY "Anyone can view membership tiers" ON membership_tiers
  FOR SELECT USING (TRUE);
