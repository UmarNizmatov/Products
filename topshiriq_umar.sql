CREATE TABLE students( 
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    age INT CHECK (age>0),
    email VARCHAR(100) UNIQUE,
    enrolled_at DATE
);

CREATE TABLE courses( 
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    duration_hours INT CHECK (duration_hours>0),
    price NUMERIC
);

CREATE TABLE enrollments(
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    course_id INT REFERENCES courses(id),
    grade NUMERIC
);

INSERT INTO students (full_name, age, email, enrolled_at)
VALUES
('Umar Aliyev', 20, 'umar@gmail.com', '2026-03-01'),
('Abduvoris Rasulov', 19, 'abduvoris@gmail.com', '2026-03-02'),
('Muhammad Karimov', 21, 'muhammad@gmail.com', '2026-03-03'),
('Laylo Tursunova', 22, 'laylo@gmail.com', '2026-03-04'),
('Sardor Hikmatov', 20, 'sardor@mail.uz', '2026-03-02'),
('Azizbek Davronov', 18, 'azizbek@gmail.com', '2026-03-05');

INSERT INTO courses (title, duration_hours, price)
VALUES
('Mathematics 101', 40, 150.00),
('Physics 101', 35, 130.00),
('Programming Basics', 50, 200.00),
('English Language', 30, 100.00);

INSERT INTO enrollments (student_id, course_id, grade)
VALUES
(1, 1, 85),
(1, 3, 92),
(2, 2, 78),
(2, 4, 88),
(3, 1, 29),
(3, 3, 95),
(4, 2, 82),
(5, 4, 45);

SELECT * FROM students;

SELECT full_name,email FROM students;

SELECT * FROM students WHERE age>21;

SELECT * FROM students WHERE age BETWEEN 20 AND 25;

SELECT * FROM courses ORDER BY price DESC;

SELECT * FROM courses ORDER BY price ;

SELECT * FROM students WHERE full_name LIKE 'M%';

SELECT * FROM students WHERE email LIKE '%mail.uz';

UPDATE students SET age = age + 1 WHERE id = 2;

UPDATE courses SET price = price + (price * 0.10);

ALTER TABLE students ADD COLUMN phone_number VARCHAR(15);

UPDATE students SET phone_number = '+998939998888' WHERE id = 2 OR id = 3;

DELETE FROM enrollments WHERE id%2=0;

SELECT * FROM enrollments;

SELECT * FROM enrollments WHERE grade<70;
