DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price INTEGER(11), 
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Life Jacket", "Boating", 25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Paddle Boat", "Boating", 600, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Surf Board", "Sports", 900, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Swimming Trunks", "Clothing", 25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Tankini", "Clothing", 25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Towel", "Accessories", 25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Paddle", "Boating", 100, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Snorkle", "Diving", 25, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Swim Fins", "Diving", 30, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Water Skis", "Sports", 200, 20);