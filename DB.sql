
DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES	('Milk','Dairy','2.50','100'),
		    ('Apples','Produce','.50','500'),
		    ('Pears','Produce','.75','200'),
		    ('Macbook Pro','Electronics','1500','20'),
		    ('iPhone','Electronics','1000','3');

