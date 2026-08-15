-- Seed Demo Data for Vidyalaya CAS

-- 1. Create Demo School
INSERT INTO schools (name, logo_url, address, contact_person, phone, email, academic_year, remedial_threshold, status)
VALUES (
  'Shining Stars Primary School',
  'https://via.placeholder.com/200',
  '123 Education Road, Kathmandu, Nepal',
  'Mr. Ramesh Sharma',
  '+977-1-4234567',
  'info@shiningstars.edu.np',
  '2026',
  4,
  'active'
)
ON CONFLICT DO NOTHING
RETURNING id AS school_id;

-- Get the school ID we just created (or use existing)
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
)
INSERT INTO users (email, password_hash, role, school_id, status)
SELECT 
  'admin@vidyalaya.edu',
  '$2b$10$z0VLvM6iQJfQSVDw7kJ.MeL5E7S2IY0.AaAtnkHLESjcJ5E2vBgMS',
  'super_admin',
  NULL,
  'active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@vidyalaya.edu')
ON CONFLICT DO NOTHING;

-- 2. Create School Admin User
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
)
INSERT INTO users (email, password_hash, role, school_id, status)
SELECT 
  'admin@shiningstars.edu.np',
  '$2b$10$Bv8gnXPxEfMZNyMu1HmKnOvR1olLApgT4F52j/xqJ0ycimBdHU0UG',
  'school_admin',
  demo_school.id,
  'active'
FROM demo_school
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@shiningstars.edu.np')
ON CONFLICT DO NOTHING;

-- 3. Create Subject Data
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
)
INSERT INTO subjects (school_id, name, display_order)
SELECT demo_school.id, subject_name, order_num
FROM demo_school
CROSS JOIN (
  VALUES 
    ('Nepali', 1),
    ('English', 2),
    ('Mathematics', 3),
    ('Science & Technology', 4),
    ('Social Studies & Moral Education', 5),
    ('Health, Physical & Creative Arts', 6),
    ('Mother Tongue', 7)
) AS subjects(subject_name, order_num)
WHERE NOT EXISTS (
  SELECT 1 FROM subjects 
  WHERE school_id = demo_school.id AND name = subjects.subject_name
)
ON CONFLICT DO NOTHING;

-- 4. Create Classes
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
)
INSERT INTO classes (school_id, grade, section, academic_year)
SELECT demo_school.id, grade, section, '2026'
FROM demo_school
CROSS JOIN (
  VALUES 
    (1, 'A'),
    (1, 'B'),
    (2, 'A'),
    (2, 'B'),
    (3, 'A'),
    (4, 'A'),
    (5, 'A')
) AS class_info(grade, section)
WHERE NOT EXISTS (
  SELECT 1 FROM classes 
  WHERE school_id = demo_school.id AND grade = class_info.grade AND section = class_info.section
)
ON CONFLICT DO NOTHING;

-- 5. Create Teacher User and Teacher Record
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
),
teacher_user AS (
  INSERT INTO users (email, password_hash, role, school_id, status)
  SELECT 
    'teacher@shiningstars.edu.np',
    '$2b$10$re4q3CxPmsKUWkoYNjdzg.N01yUAcICDo4wDegmCSaAhwRVWH2C5u',
    'teacher',
    demo_school.id,
    'active'
  FROM demo_school
  WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'teacher@shiningstars.edu.np')
  RETURNING id AS user_id, school_id
)
INSERT INTO teachers (school_id, user_id, first_name, last_name, phone)
SELECT teacher_user.school_id, teacher_user.user_id, 'Priya', 'Poudel', '+977-98xxxx1234'
FROM teacher_user
WHERE NOT EXISTS (
  SELECT 1 FROM teachers WHERE user_id = teacher_user.user_id
)
ON CONFLICT DO NOTHING;

-- 6. Create Student Records
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
),
class_1a AS (
  SELECT id FROM classes WHERE school_id = demo_school.id AND grade = 1 AND section = 'A' LIMIT 1
),
class_2a AS (
  SELECT id FROM classes WHERE school_id = demo_school.id AND grade = 2 AND section = 'A' LIMIT 1
)
INSERT INTO students (school_id, class_id, roll_number, first_name, last_name, date_of_birth)
SELECT 
  demo_school.id,
  CASE WHEN row_num <= 3 THEN class_1a.id ELSE class_2a.id END,
  CASE WHEN row_num <= 3 THEN ('1-' || row_num::text)::text ELSE ('2-' || (row_num - 3)::text)::text END,
  first_names.name,
  'Student',
  '2018-05-15'::date + ((row_num - 1) * 10 || ' days')::interval
FROM demo_school
CROSS JOIN class_1a
CROSS JOIN class_2a
CROSS JOIN (
  VALUES ('Arun'), ('Bimala'), ('Chetan'), ('Deepa'), ('Ekta')
) AS first_names(name)
CROSS JOIN (SELECT generate_series(1, 5) AS row_num)
WHERE NOT EXISTS (
  SELECT 1 FROM students 
  WHERE school_id = demo_school.id 
    AND first_name = first_names.name 
    AND last_name = 'Student'
)
ON CONFLICT DO NOTHING;

-- 7. Create Parent Users and Records
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
),
parent_user_1 AS (
  INSERT INTO users (email, password_hash, role, school_id, status)
  SELECT 
    'parent1@shiningstars.edu.np',
    '$2b$10$ETgr1Lac8mR.kh7l/BVp0uqer/gw.SZfvsGuZ4oPnRHdTAdMWLjyG',
    'parent',
    demo_school.id,
    'active'
  FROM demo_school
  WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'parent1@shiningstars.edu.np')
  RETURNING id AS user_id, school_id
),
parent_rec_1 AS (
  INSERT INTO parents (school_id, user_id, first_name, last_name, phone)
  SELECT parent_user_1.school_id, parent_user_1.user_id, 'Ramesh', 'Sharma', '+977-98xxxx5678'
  FROM parent_user_1
  WHERE NOT EXISTS (SELECT 1 FROM parents WHERE user_id = parent_user_1.user_id)
  RETURNING id AS parent_id, school_id
)
INSERT INTO parent_student_links (school_id, parent_id, student_id)
SELECT 
  parent_rec_1.school_id,
  parent_rec_1.parent_id,
  students.id
FROM parent_rec_1
CROSS JOIN students
WHERE students.first_name = 'Arun' AND students.last_name = 'Student'
  AND NOT EXISTS (
    SELECT 1 FROM parent_student_links 
    WHERE parent_id = parent_rec_1.parent_id AND student_id = students.id
  )
ON CONFLICT DO NOTHING;

-- 8. Create Units and Learning Indicators for one subject
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
),
nepali_subject AS (
  SELECT id FROM subjects 
  WHERE school_id = demo_school.id AND name = 'Nepali' LIMIT 1
)
INSERT INTO units (school_id, subject_id, name, "order")
SELECT 
  demo_school.id,
  nepali_subject.id,
  unit_name,
  unit_order
FROM demo_school
CROSS JOIN nepali_subject
CROSS JOIN (
  VALUES 
    ('Listening and Speaking', 1),
    ('Reading Comprehension', 2),
    ('Writing Skills', 3)
) AS unit_info(unit_name, unit_order)
WHERE NOT EXISTS (
  SELECT 1 FROM units 
  WHERE school_id = demo_school.id 
    AND subject_id = nepali_subject.id 
    AND name = unit_info.unit_name
)
ON CONFLICT DO NOTHING;

-- 9. Create Learning Indicators for first unit
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
),
first_unit AS (
  SELECT id FROM units 
  WHERE school_id = demo_school.id AND name = 'Listening and Speaking' LIMIT 1
)
INSERT INTO learning_indicators (school_id, unit_id, description, "order")
SELECT 
  demo_school.id,
  first_unit.id,
  indicator_desc,
  indicator_order
FROM demo_school
CROSS JOIN first_unit
CROSS JOIN (
  VALUES 
    ('Understands and responds to simple instructions', 1),
    ('Participates actively in classroom discussions', 2),
    ('Speaks clearly and confidently', 3),
    ('Listens attentively and comprehends main ideas', 4)
) AS indicator_info(indicator_desc, indicator_order)
WHERE NOT EXISTS (
  SELECT 1 FROM learning_indicators 
  WHERE school_id = demo_school.id 
    AND unit_id = first_unit.id 
    AND description = indicator_info.indicator_desc
)
ON CONFLICT DO NOTHING;

-- 10. Create a Term
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
)
INSERT INTO terms (school_id, name, start_date, end_date, academic_year)
SELECT 
  demo_school.id,
  'Term 1',
  '2026-01-15'::date,
  '2026-04-15'::date,
  '2026'
FROM demo_school
WHERE NOT EXISTS (
  SELECT 1 FROM terms 
  WHERE school_id = demo_school.id AND name = 'Term 1' AND academic_year = '2026'
)
ON CONFLICT DO NOTHING;

-- 11. Create sample assessments
WITH demo_school AS (
  SELECT id FROM schools WHERE name = 'Shining Stars Primary School' LIMIT 1
),
student_sample AS (
  SELECT id FROM students 
  WHERE school_id = demo_school.id AND first_name = 'Arun' LIMIT 1
),
indicator_sample AS (
  SELECT id FROM learning_indicators 
  WHERE school_id = demo_school.id 
    AND description = 'Understands and responds to simple instructions'
  LIMIT 1
),
teacher_sample AS (
  SELECT id FROM teachers WHERE school_id = demo_school.id LIMIT 1
),
term_sample AS (
  SELECT id FROM terms 
  WHERE school_id = demo_school.id AND name = 'Term 1' LIMIT 1
)
INSERT INTO assessments (school_id, student_id, learning_indicator_id, term_id, score, notes, teacher_id)
SELECT 
  demo_school.id,
  student_sample.id,
  indicator_sample.id,
  term_sample.id,
  3,
  'Good understanding of instructions',
  teacher_sample.id
FROM demo_school
CROSS JOIN student_sample
CROSS JOIN indicator_sample
CROSS JOIN teacher_sample
CROSS JOIN term_sample
WHERE NOT EXISTS (
  SELECT 1 FROM assessments 
  WHERE school_id = demo_school.id 
    AND student_id = student_sample.id 
    AND learning_indicator_id = indicator_sample.id
)
ON CONFLICT DO NOTHING;
