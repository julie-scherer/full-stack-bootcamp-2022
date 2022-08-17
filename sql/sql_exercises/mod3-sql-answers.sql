-- *** Week 5 - Wednesday Questions ***

--1. List all customers who live in Texas (use JOINs) 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
SELECT customer.customer_id, customer.first_name, customer.last_name, address.district
FROM customer
JOIN address
ON customer.address_id = address.address_id 
WHERE address.district = 'Texas';
--Output
--6...Jennifer...Davis...Texas
--118...Kim...Cruz...Texas
--305...Richard...Mccrary...Texas
--400...Bryan...Hardison...Texas
--561...Ian...Still...Texas



--2. Get all payments above $6.99 with the Customer’s full name 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
SELECT payment.amount, CONCAT(customer.first_name, ' ',customer.last_name) AS full_name
FROM payment
JOIN customer
ON payment.customer_id = customer.customer_id 
WHERE payment.amount > 6.99;
--Output
--7.99...Peter Menard
--7.99...Peter Menard
--7.99...Peter Menard
--8.99...Douglas Graf
--8.99...Ryan Salisbury
--8.99...Ryan Salisbury
--7.99...Ryan Salisbury
--8.99...Roger Quintanilla
--8.99...Joe Gilliland
--7.99...Jonathan Scarborough



--3. Show all customer names who have made payments over $175 (use subqueries)
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--Check customer IDs
SELECT payment.customer_id, SUM(payment.amount)
FROM payment
GROUP BY payment.customer_id
HAVING SUM(payment.amount) > 175;
--Output
--144...189.60
--526...208.58
--178...194.61
--459...183.63
--137...191.62
--148...211.55

--Answer
SELECT CONCAT(customer.first_name, ' ', customer.last_name) AS full_name
FROM customer
WHERE customer_id IN (
	SELECT payment.customer_id
	FROM payment
	GROUP BY payment.customer_id
	HAVING SUM(payment.amount) > 175
);
--Output
--Rhonda Kennedy
--Clara Shaw
--Eleanor Hunt
--Marion Snyder
--Tommy Collazo
--Karl Seal


 
--4. List all customers that live in Argentina (use the city table)
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--Keys
--FK customer.address_id REFERENCES address.address_id
--FK address.city_id REFERENCES city.city_id
--FK city.country_id REFERENCES country.country_id

--Answer
SELECT CONCAT(customer.first_name, ' ', customer.last_name)
FROM customer 
WHERE customer.address_id IN (	
	
	-- get address_ids where (city.country_id matches (country.country = argentina))
	SELECT address.address_id
	FROM address  
	JOIN city 
	ON address.city_id  = city.city_id
	
	-- get country_id for Argentina
	WHERE city.country_id = ( 
		SELECT country.country_id 
		FROM country
		WHERE country.country = 'Argentina'
	)
);
--Output
--Eric Robert
--Willie Howell
--Julia Flores
--Lydia Burke
--Darryl Ashcraft
--Florence Woods
--Micheal Forman
--Jason Morrissey
--Leonard Schofield
--Willie Markham
--Jordan Archuleta
--Perry Swafford
--Kimberly Lee

---To get data from multiple tables, use join instead of subquery
SELECT customer.first_name, customer.last_name, address.district, country.country 
FROM customer
JOIN address
ON customer.address_id  = address.address_id 
JOIN city
ON city.city_id = address.city_id 
JOIN country
ON country.country_id = city.country_id 
WHERE country.country = 'Argentina';



--5. Which film category has the most movies in it (show with the count)? 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
SELECT film_category.category_id, COUNT(*)
FROM film
JOIN film_category
ON film.film_id = film_category.film_id
GROUP BY film_category.category_id
ORDER BY COUNT(*) DESC
LIMIT 1;
--Output: category = 15, count = 74

--To get category name, join category table on category_id 
SELECT film_category.category_id, category.name, COUNT(*)
FROM category 
JOIN film_category
ON category.category_id  = film_category.category_id
GROUP BY film_category.category_id, category.name
ORDER BY COUNT(*) DESC
LIMIT 1;
--Output: category = 15, name = Sports



--6. What film had the most actors in it (show film info)? 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
SELECT film.film_id, film.title, film.description, film.release_year, COUNT(*) AS actor_count
FROM film 
JOIN film_actor 
ON film.film_id = film_actor.film_id 
GROUP BY film.film_id
ORDER BY actor_count DESC
LIMIT 1;
--Output
--508,Lambs Cincinatti,A Insightful Story of a Man And a Feminist who must Fight a Composer in Australia,2006,15



--7. Which actor has been in the least movies? 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
SELECT actor.actor_id, actor.first_name, actor.last_name , COUNT(*) AS film_count
FROM actor 
JOIN film_actor 
ON actor.actor_id = film_actor.actor_id 
GROUP BY actor.actor_id
ORDER BY film_count DESC
LIMIT 1;
--Output
--107, Gina, Degeneres, 42

--This answer gives the film with the least number of actors in it
SELECT film.film_id, film.title, film.description, film.release_year, COUNT(*) AS actor_count
FROM film 
JOIN film_actor 
ON film.film_id = film_actor.film_id 
GROUP BY film.film_id
ORDER BY actor_count ASC
LIMIT 1;
--Output
--556,Maltese Hope,A Fast-Paced Documentary of a Crocodile And a Sumo Wrestler who must Conquer a Explorer in California,2006,1



--8. Which country has the most cities? 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
SELECT country.country, COUNT(*) AS total_cities
FROM city 
JOIN country 
ON city.country_id = country.country_id
GROUP BY country.country
ORDER BY total_cities DESC;
--India



--9. List the actors who have been in more than 23 films but less than 26.
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--Step 1: Get actor_id for actors who've been in 24 or 25 films
--Solution 1
SELECT actor_id 
FROM (SELECT actor_id, COUNT(*) AS actor_count
	 FROM film_actor
	 GROUP BY actor_id
	) AS actors_in_films
WHERE actors_in_films.actor_count > 23 AND actors_in_films.actor_count < 26
ORDER BY actor_id;

--Solution 2
SELECT actor_id
FROM film_actor
GROUP BY actor_id
HAVING COUNT(*) > 23 AND COUNT(*) < 26
ORDER BY actor_id ;

--Step 2: Get actor names associated with actor_id
--Solution 1
SELECT CONCAT(actor.first_name, ' ', actor.last_name), actor.actor_id
FROM actor 
WHERE actor_id IN (
	SELECT actor_id
	FROM film_actor
	GROUP BY actor_id
	HAVING COUNT(*) > 23 AND COUNT(*) < 26
	ORDER BY actor_id );

--Solution 2
SELECT CONCAT(actor.first_name, ' ', actor.last_name), actor.actor_id 
FROM (SELECT actor_id, COUNT(*) AS actor_count
	  FROM film_actor
	  GROUP BY actor_id
	  ) AS actors_in_films
JOIN actor 
ON actor.actor_id = actors_in_films.actor_id
WHERE actors_in_films.actor_count > 23 AND actors_in_films.actor_count < 26
LIMIT 10;

--Output
--Nick Wahlberg
--Joe Swank
--Zero Cage
--Bob Fawcett
--Cameron Streep
--Milla Peck
--Audrey Olivier
--Tom Mckellen
--Parker Goldberg
--Julia Barrymore