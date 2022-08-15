-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_car(
--	car_id SERIAL PRIMARY KEY
	serial_number VARCHAR(17)
	,color VARCHAR(50)
	,make VARCHAR(50)
	,model VARCHAR(50)
	,year INTEGER
	,for_sale sale_type	
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO car(serial_number, color, make, model, year, for_sale)
	VALUES(serial_number, color, make, model, year, for_sale);
END;
$$;

CALL add_car('4Y1SL65848Z411439','white','Nissan','Altima',2018,'used');
CALL add_car('ZAM45KLA0C0063537','black','Honda','Accord',2022,'new');
CALL add_car('1GNFC13007R262794','blue','Volkswagen','Atlas Cross Sport',2021,'no');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_salesperson(
--	salesperson_id SERIAL PRIMARY KEY
	first_name VARCHAR(50)
	,last_name VARCHAR(50)
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO salesperson(first_name, last_name)
	VALUES(first_name, last_name);
END;
$$;

CALL add_salesperson('Cliff', 'Boumont');
CALL add_salesperson('Mauro', 'Gonzalez');
CALL add_salesperson('Tiffany', 'Miller');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_customer(
--	customer_id SERIAL PRIMARY KEY
	first_name VARCHAR(50)
	,last_name VARCHAR(50)
	,phone_number VARCHAR(10)
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO customer(first_name, last_name, phone_number)
	VALUES(first_name, last_name, phone_number);
END;
$$;

CALL add_customer('Jonathan', 'Short', '8085553127');
CALL add_customer('Jill', 'Dosch', '8095657889');
CALL add_customer('Samantha', 'Abernathy', '8084541199');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_mechanic(
--	mechanic_id SERIAL PRIMARY KEY
	first_name VARCHAR(50)
	,last_name VARCHAR(50)
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO mechanic(first_name, last_name)
	VALUES(first_name, last_name);
END;
$$;

CALL add_mechanic('Dale', 'Bridges');
CALL add_mechanic('Bobby', 'Johnson');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_service(
--	service_id SERIAL PRIMARY KEY
	service_name VARCHAR(100)
	,description TEXT
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO service(service_name, description)
	VALUES(service_name, description);
END;
$$;

CALL add_service('Oil Change', 'routine car maintenance');
CALL add_service('Air Filter Replacement', 'routine car maintenance');
CALL add_service('Battery Replacement', 'routine car maintenance');
CALL add_service('Tire Replacement', 'routine car maintenance');
CALL add_service('Windshield Wipers and Fluid', 'routine car maintenance');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_mechanic_service(
--	mechanic_service_id SERIAL PRIMARY KEY
	mechanic_id INTEGER
	,service_id INTEGER
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO mechanic_service(mechanic_id, service_id)
	VALUES(mechanic_id, service_id);
END;
$$;

CALL add_mechanic_service(1,1);
CALL add_mechanic_service(1,5);
CALL add_mechanic_service(2,4);
CALL add_mechanic_service(2,2);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_sale_invoice(
--	invoice_id SERIAL PRIMARY KEY
	car_id INTEGER
	,customer_id INTEGER
	,salesperson_id INTEGER
	,total_amount INTEGER
	,sale_date DATE
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO sale_invoice(car_id, customer_id, salesperson_id, total_amount, sale_date)
	VALUES(car_id, customer_id, salesperson_id, total_amount, sale_date);
END;
$$;

CALL add_sale_invoice(1,1,3,19042,'05/18/2022');
CALL add_sale_invoice(2,2,1,28615,'07/21/2022');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
CREATE OR REPLACE PROCEDURE add_service_ticket(
--	ticket_id SERIAL PRIMARY KEY
	service_id INTEGER
	,car_id INTEGER
	,customer_id INTEGER
	,date_opened DATE
	,date_closed DATE
)
LANGUAGE plpgsql 
AS $$ 
BEGIN 
	INSERT INTO service_ticket(service_id, car_id, customer_id, date_opened, date_closed)
	VALUES(service_id, car_id, customer_id, date_opened, date_closed);
END;
$$;

CALL add_service_ticket(4,3,3,'08/02/2022','08/02/2022');
CALL add_service_ticket(5,3,3,'08/02/2022','08/02/2022');
