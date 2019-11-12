DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INTEGER(6) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(15),
  price FLOAT(11), 
  stock_quantity INTEGER(11),
  product_sales FLOAT(6),
  PRIMARY KEY (item_id)
);
CREATE TABLE departments(
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL, 
    department_name VARCHAR (15),
    over_head_costs FLOAT(6),
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Life Jacket", "Boating", 25.99, 30, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Paddle Boat", "Boating", 635.99, 15, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Surf Board", "Sports", 901.25, 40, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Swimming Trunks", "Clothing", 30.99, 50, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Tankini", "Clothing", 49.99, 50, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Towel", "Accessories", 10.00, 60, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Paddle", "Boating", 99.89, 45, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Snorkle", "Diving", 25.00, 30, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Swim Flipper", "Diving", 29.99, 62, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) values ("Water Skis", "Sports", 199.99, 20, 0);