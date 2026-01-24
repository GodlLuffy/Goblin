CREATE DATABASE IF NOT EXISTS goblin_db;
USE goblin_db;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  subject VARCHAR(255),
  phone VARCHAR(50),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contacts (name, email, subject, phone, message)
VALUES (
  'Seed User',
  'seed@example.com',
  'Welcome to Goblin DB',
  '+00 0000000000',
  'Hello from initial seed'
);
