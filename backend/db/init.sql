CREATE TABLE IF NOT EXISTS foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO foods (name, price, description, image) VALUES ('Mac & Cheese', 8.99, 'Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.', 'mac-and-cheese.jpg');
INSERT INTO foods (name, price, description, image) VALUES ('Margherita Pizza', 12.99, 'A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.', 'margherita-pizza.jpg');


CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

