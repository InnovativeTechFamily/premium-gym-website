-- Seed membership tiers
INSERT INTO membership_tiers (name, description, price, duration_days, features) VALUES
(
  'Starter',
  'Perfect for beginners',
  29.99,
  30,
  ARRAY['Gym access', 'Basic equipment', 'Email support', '1 free class/week']
),
(
  'Premium',
  'Most popular choice',
  59.99,
  30,
  ARRAY['Unlimited gym access', 'All equipment', 'Priority support', 'Unlimited classes', 'Personal trainer consultation']
),
(
  'Elite',
  'For serious athletes',
  99.99,
  30,
  ARRAY['VIP gym access', 'All equipment', '24/7 support', 'Unlimited classes', 'Personal trainer (2x/week)', 'Nutrition planning']
);

-- Seed sample classes
INSERT INTO classes (name, description, instructor_name, capacity, duration_minutes, difficulty_level) VALUES
('HIIT Training', 'High-intensity interval training for maximum results', 'Alex Johnson', 20, 45, 'advanced'),
('Yoga Flow', 'Relaxing yoga session for flexibility and mindfulness', 'Sarah Chen', 25, 60, 'beginner'),
('Strength & Power', 'Build muscle and increase strength', 'Mike Rodriguez', 15, 60, 'intermediate'),
('Spin Cycle', 'Indoor cycling class with energetic music', 'Emma Wilson', 30, 45, 'intermediate');

-- Seed class schedules
INSERT INTO class_schedules (class_id, day_of_week, start_time, end_time) VALUES
((SELECT id FROM classes WHERE name = 'HIIT Training'), 1, '06:00:00', '06:45:00'),
((SELECT id FROM classes WHERE name = 'HIIT Training'), 3, '06:00:00', '06:45:00'),
((SELECT id FROM classes WHERE name = 'HIIT Training'), 5, '06:00:00', '06:45:00'),
((SELECT id FROM classes WHERE name = 'Yoga Flow'), 2, '17:30:00', '18:30:00'),
((SELECT id FROM classes WHERE name = 'Yoga Flow'), 4, '17:30:00', '18:30:00'),
((SELECT id FROM classes WHERE name = 'Strength & Power'), 1, '19:00:00', '20:00:00'),
((SELECT id FROM classes WHERE name = 'Strength & Power'), 3, '19:00:00', '20:00:00'),
((SELECT id FROM classes WHERE name = 'Strength & Power'), 5, '19:00:00', '20:00:00'),
((SELECT id FROM classes WHERE name = 'Spin Cycle'), 2, '08:00:00', '08:45:00'),
((SELECT id FROM classes WHERE name = 'Spin Cycle'), 4, '08:00:00', '08:45:00'),
((SELECT id FROM classes WHERE name = 'Spin Cycle'), 6, '08:00:00', '08:45:00');
