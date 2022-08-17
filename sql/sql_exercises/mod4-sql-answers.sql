-- *** Week 5 - Thursday Questions ***


--1. Create a Stored Procedure that will insert a new film into the film table with the following arguments: title, description, release_year, language_id, rental_duration, rental_rate, length, replace_cost, rating
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--DROP PROCEDURE add_film(character varying,text,year,integer,integer,numeric,integer,numeric,rating_types);
--CREATE TYPE mpaa_rating AS ENUM('G', 'PG', 'PG-13', 'R', 'NC-17');

-- -- -- create procedure -- -- -- 
CREATE OR REPLACE PROCEDURE add_film(
	title VARCHAR(255)
	,description TEXT
	,release_year YEAR
	,language_id INTEGER
	,rental_duration INTEGER
	,rental_rate NUMERIC(4,2)
	,length INTEGER
	,replacement_cost NUMERIC(5,2)
	,rating mpaa_rating
)
LANGUAGE plpgsql 
AS 
$$ 
BEGIN 
	INSERT INTO film(title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, last_update)
	VALUES(title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, NOW());
END;
$$;

-- -- -- call procedure -- -- --
CALL add_film(
	'First House on the Right Down the Street on the Left'
	,'A tale of a lost boy who never found his way home'
	,2022
	,1
	,3
	,4.99
	,178
	,19.99
	,'PG-13'
);

-- -- -- check procedure -- -- -- 
SELECT * 
FROM film
WHERE title LIKE 'First%';
--1001|First House on the Right Down the Street on the Left|A tale of a lost boy who never found his way home| 2022| 1| 3| 4.99| 178| 19.99|PG-13 |2022-08-11 18:47:34.242



--2. Create a Stored Function that will take in a category_id and return the number of films in that category
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--DROP FUNCTION count_films_in_category(integer);

-- -- -- create function -- -- --
CREATE OR REPLACE FUNCTION count_films_in_category(cat_id INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
AS
$$
	DECLARE category_count INTEGER;
BEGIN
	SELECT COUNT(*) INTO category_count
	FROM film_category fc
	GROUP BY fc.category_id
	HAVING fc.category_id = cat_id;

	RETURN category_count;
END;
$$;

-- -- -- call function -- -- --
SELECT count_films_in_category(1); --64
SELECT count_films_in_category(2); --66
SELECT count_films_in_category(3); --60
SELECT count_films_in_category(4); --57
SELECT count_films_in_category(5); --58

-- -- -- check query -- -- -- 
SELECT category_id, COUNT(*)
FROM film_category
GROUP BY category_id
HAVING category_id = 1;
