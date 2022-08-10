CREATE TABLE movie (
	movie_id SERIAL PRIMARY KEY
	movie_name VARCHAR(50)
	release_date DATE NOT NULL
	show_time TIME NOT NULL
	theater INTEGER NOT NULL
	age_rating VARCHAR(5)
)

CREATE TABLE customer (
	customer_id SERIAL PRIMARY KEY
	first_name VARCHAR(50)
	last_name VARCHAR(50)
	age INTEGER
	rewards BOOLEAN
	FOREIGN KEY movie_id REFERENCES movie(movie_id) INTEGER
)

CREATE TABLE ticket (
	ticket_id SERIAL PRIMARY KEY
	order_date DATE NOT NULL
	FOREIGN KEY customer_id REFERENCES customer(customer_id)
	FOREIGN KEY movie_id REFERENCES movie(movie_id)
	price NUMERIC(4,2)
)