CREATE TABLE IF NOT EXISTS people (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO people (first_name, last_name, email, phone) VALUES
('Aarav', 'Sharma', 'aarav.sharma@example.com', '9876543210'),
('Diya', 'Patel', 'diya.patel@example.com', '9822001100'),
('Rohan', 'Mehta', 'rohan.mehta@example.com', '9811122233'),
('Isha', 'Verma', 'isha.verma@example.com', '9898989898');
