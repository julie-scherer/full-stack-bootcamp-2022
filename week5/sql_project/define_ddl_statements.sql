CREATE TYPE sale_type AS ENUM('used','new','no')

CREATE TABLE car (
	car_id SERIAL PRIMARY KEY
	,serial_number INTEGER
	,color VARCHAR(50)
	,make VARCHAR(50)
	,model VARCHAR(50)
	,year INTEGER
	,for_sale sale_type
);

ALTER TABLE car 
ALTER COLUMN serial_number TYPE VARCHAR(17);

CREATE TABLE salesperson (
	salesperson_id SERIAL PRIMARY KEY
	,first_name VARCHAR(50)
	,last_name VARCHAR(50)
);

CREATE TABLE customer (
	customer_id SERIAL PRIMARY KEY
	,first_name VARCHAR(50)
	,last_name VARCHAR(50)
	,phone_number VARCHAR(10)
);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE TABLE mechanic (
	mechanic_id SERIAL PRIMARY KEY
	,first_name VARCHAR(50)
	,last_name VARCHAR(50)
);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE TABLE service (
	service_id SERIAL PRIMARY KEY
	,service_name VARCHAR(50)
	,descrption TEXT
);

ALTER TABLE service 
RENAME COLUMN descrption TO description;
ALTER TABLE service 
ALTER COLUMN service_name TYPE VARCHAR(100);


--Tables below have foreign keys
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE TABLE mechanic_service (
	mechanic_service_id SERIAL PRIMARY KEY
	,mechanic_id INTEGER NOT NULL
	,service_id INTEGER NOT NULL
	,FOREIGN KEY(mechanic_id) REFERENCES mechanic(mechanic_id)
	,FOREIGN KEY(service_id) REFERENCES service(service_id)
	,hours INTEGER
);

ALTER TABLE mechanic_service 
DROP COLUMN hours;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE TABLE sale_invoice (
	invoice_id SERIAL PRIMARY KEY
	,car_id INTEGER NOT NULL
	,customer_id INTEGER NOT NULL
	,salesperson_id INTEGER NOT NULL
	,FOREIGN KEY(car_id) REFERENCES car(car_id)
	,FOREIGN KEY(customer_id) REFERENCES customer(customer_id)
	,FOREIGN KEY(salesperson_id) REFERENCES salesperson(salesperson_id)
	,total_amount NUMERIC(4,2)
	,sale_date DATE
);

ALTER TABLE sale_invoice 
ALTER COLUMN total_amount TYPE INTEGER;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE TABLE service_ticket (
	ticket_id SERIAL PRIMARY KEY
	,service_id INTEGER NOT NULL
	,car_id INTEGER NOT NULL
	,customer_id INTEGER NOT NULL
	,FOREIGN KEY(service_id) REFERENCES service(service_id)
	,FOREIGN KEY(car_id) REFERENCES car(car_id)
	,FOREIGN KEY(customer_id) REFERENCES customer(customer_id)
	,date_opened DATE
	,date_closed DATE
);