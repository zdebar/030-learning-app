CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS courses ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL, 
    class_id INT,
    subject_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS chapters ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL,
    course_id INT,
    explanation_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (explanation_id) REFERENCES explanations(id)
);

CREATE TABLE IF NOT EXISTS exercises ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position INT NOT NULL, 
    chapter_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    max_score INT,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);

CREATE TABLE IF NOT EXISTS user_exercises ( 
    user_id UUID,
    exercise_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score INT,
    PRIMARY KEY (user_id, exercise_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

CREATE TABLE IF NOT EXISTS explanations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

