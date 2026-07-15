-- ==========================================
-- GuruFinder Database Schema for Supabase
-- ==========================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- 2. Create Base Tables
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name TEXT NOT NULL UNIQUE
);

CREATE TABLE education_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE teacher_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  photo_url TEXT,
  phone TEXT,
  education TEXT,
  experience TEXT,
  description TEXT,
  hourly_rate NUMERIC DEFAULT 0,
  city_id UUID REFERENCES cities(id) ON DELETE SET NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Many-to-Many Tables
CREATE TABLE teacher_subjects (
  teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  PRIMARY KEY (teacher_id, subject_id)
);

CREATE TABLE teacher_levels (
  teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  level_id UUID REFERENCES education_levels(id) ON DELETE CASCADE,
  PRIMARY KEY (teacher_id, level_id)
);

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, teacher_id)
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Users can read their own data, Admins can read all
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
-- Public can read verified teacher profiles
CREATE POLICY "Public read teacher_profiles" ON teacher_profiles FOR SELECT USING (verified = TRUE);
-- Teachers can manage their own profile
CREATE POLICY "Teachers can manage own profile" ON teacher_profiles FOR ALL USING (user_id = auth.uid());
-- Reference tables are publicly readable
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (TRUE);
CREATE POLICY "Public read levels" ON education_levels FOR SELECT USING (TRUE);
CREATE POLICY "Public read subjects" ON subjects FOR SELECT USING (TRUE);
CREATE POLICY "Public read teacher_subjects" ON teacher_subjects FOR SELECT USING (TRUE);
CREATE POLICY "Public read teacher_levels" ON teacher_levels FOR SELECT USING (TRUE);
-- Students can manage their own favorites
CREATE POLICY "Students manage favorites" ON favorites FOR ALL USING (student_id = auth.uid());

-- 6. Insert Initial Data (Seed)
INSERT INTO cities (city_name) VALUES 
('Jakarta'), ('Bandung'), ('Surabaya'), ('Semarang'), ('Yogyakarta'), 
('Medan'), ('Palembang'), ('Makassar'), ('Denpasar'), ('Malang');

INSERT INTO education_levels (name) VALUES 
('SD'), ('SMP'), ('SMA'), ('SMK'), ('Mahasiswa'), ('Profesional');

INSERT INTO subjects (name) VALUES 
('Matematika'), ('Fisika'), ('Kimia'), ('Biologi'), ('Bahasa Inggris'), 
('Bahasa Indonesia'), ('Ekonomi'), ('Akuntansi'), ('Pemrograman'), ('Statistika');
