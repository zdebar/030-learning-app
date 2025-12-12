CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,    
    created_at TIMESTAMPTZ DEFAULT (now() at time zone 'utc'),
    updated_at TIMESTAMPTZ DEFAULT (now() at time zone 'utc'),
    deleted_at TIMESTAMPTZ,    
    FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- Subjects like Math, Physics, etc.
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
);

-- School levels like Elementary, Middle School, High School
CREATE TABLE IF NOT EXISTS school_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL
);

-- Classes like Grade 1, Grade 2, etc.
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    school_level_id INT,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL, 
    FOREIGN KEY (school_level_id) REFERENCES school_levels(id)
);

-- Courses like Algebra, Geometry, etc.
CREATE TABLE IF NOT EXISTS courses ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL, 
    class_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- Chapters within courses
CREATE TABLE IF NOT EXISTS chapters ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL,
    course_id INT NOT NULL,
    explanation_id INT,
    points_required INTEGER NOT NULL DEFAULT 0,   
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (explanation_id) REFERENCES explanations(id)
);

-- User progress in chapters
CREATE TABLE IF NOT EXISTS user_chapters (
    user_id UUID,
    chapter_id INT,
    points_achieved INT[],
    created_at TIMESTAMPTZ DEFAULT (now() at time zone 'utc'),
    updated_at TIMESTAMPTZ DEFAULT (now() at time zone 'utc'),
    next_at TIMESTAMPTZ,
    finished_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, chapter_id)
);

-- Exercises within chapters
CREATE TABLE IF NOT EXISTS exercises ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('introduction', 'practice')),
    points INT NOT NULL DEFAULT 0,
    content JSONB NOT NULL,
    position INT NOT NULL,
    chapter_id INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);

-- User score on exercises
CREATE TABLE IF NOT EXISTS user_exercises ( 
    user_id UUID,
    exercise_id INT ,
    points_achieved INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT (now() at time zone 'utc'),
    updated_at TIMESTAMPTZ DEFAULT (now() at time zone 'utc'),
    finished_at TIMESTAMPTZ,    
    PRIMARY KEY (user_id, exercise_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- Explanations for chapters
CREATE TABLE IF NOT EXISTS explanations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    content JSONB NOT NULL
);

-- Update triggers
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = (now() at time zone 'utc');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON user_chapters
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON user_exercises
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();


