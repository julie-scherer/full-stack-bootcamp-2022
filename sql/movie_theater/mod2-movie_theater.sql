CREATE TABLE movie (
	movie_id SERIAL PRIMARY KEY,
	movie_name VARCHAR(50),
	release_date DATE NOT NULL,
	age_rating VARCHAR(5)
);

CREATE TABLE show_time (
	show_time_id SERIAL PRIMARY KEY,
	show_time TIME,
	show_date DATE
);

CREATE TABLE movie_time (
	movie_time_id SERIAL PRIMARY KEY,
	FOREIGN KEY(movie_id) REFERENCES movie(movie_id),
	FOREIGN KEY(show_time_id) REFERENCES show_time(show_time_id)
);

CREATE TABLE customer (
	customer_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	age_ INTEGER, -- accepts NULL values
	rewards BOOLEAN
--	FOREIGN KEY ticket_id REFERENCES ticket(ticket_id)
);

CREATE TABLE ticket (
	ticket_id SERIAL PRIMARY KEY,
	order_date DATE NOT NULL,
	price NUMERIC(4,2)
--	FOREIGN KEY(customer_id) REFERENCES customer(customer_id),
--	FOREIGN KEY(movie_id) REFERENCES movie(movie_id);
);

ALTER TABLE ticket
ADD FOREIGN KEY(customer_id) REFERENCES customer(customer_id),
ADD FOREIGN KEY(movie_id) REFERENCES movie(movie_id);

ALTER TABLE customer
ADD FOREIGN KEY(ticket_id) REFERENCES ticket(ticket_id);
