CREATE DATABASE IF NOT EXISTS goblin_db;
USE goblin_db;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contacts (name,email,message) VALUES ('Seed User','seed@example.com','Hello from initial seed');
