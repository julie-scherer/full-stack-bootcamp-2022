-- SELECT <column>
-- FROM <table>
-- ON
-- WHERE <condition>
-- GROUP BY <condition>
-- HAVING <condition>
-- ORDER BY <condition>
-- OFFSET <no. of rows>
-- LIMIT <no. of rows>

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- -- -- -- -- -- -- 
--1. How many actors are there with the last name ‘Wahlberg’? 
SELECT COUNT(last_name)
FROM actor
WHERE last_name = 'Wahlberg';
--Output: 2


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--2. How many payments were made between $3.99 and $5.99? 
SELECT COUNT(amount)
FROM payment
WHERE amount BETWEEN 2.99 AND 5.99;
--Output: 8848


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--3. What films have exactly 7 copies? (search in inventory) 
SELECT film_id, COUNT(film_id)
FROM inventory
GROUP BY film_id
HAVING COUNT(film_id) = 7;
--Output
	--273
	--951
	--22
	--556
	--57
	--644
	--366
	--841
	--305
	--181
	--10
	--35
	--823
	--285
	--391
	--922
	--563
	--143
	--228
	--814
	--850
	--320
	--115
	--555
	--816
	--172
	--409
	--521
	--443
	--39
	--317
	--476
	--374
	--12
	--154
	--234
	--270
	--970
	--263
	--843
	--447
	--624
	--723
	--902
	--892
	--78
	--852
	--863
	--114
	--715
	--119
	--376
	--37
	--891
	--979
	--760
	--218
	--554
	--670
	--641
	--733
	--502
	--43
	--349
	--677
	--4
	--698
	--735
	--985
	--810
	--450
	--408
	--982
	--11
	--687
	--245
	--895
	--484
	--471
	--464
	--167
	--284
	--367
	--247
	--869
	--625
	--941
	--135
	--665
	--879
	--311
	--875
	--845
	--755
	--244
	--397
	--786
	--804
	--467
	--771
	--159
	--857
	--890
	--319
	--162
	--330
	--112
	--590
	--579
	--720
	--274
	--833
	--993
	--122
	--901
	--790


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--4. How many customers have the first name ‘Willie’? 
SELECT first_name, COUNT(first_name) 
FROM customer
WHERE first_name = 'Willie'
GROUP BY first_name;
--Output: 2

--4b. Which customers?
SELECT first_name, last_name
FROM customer
WHERE first_name = 'Willie'
GROUP BY first_name, last_name;
--Output: 
-- Willie Howell
-- Willie Markham

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--5. What store employee (get the id) sold the most rentals (use the rental table)? 
SELECT * 
FROM rental;

SELECT staff_id
FROM rental
GROUP BY staff_id 
ORDER BY COUNT(staff_id) DESC
LIMIT 1;
--Output: 1


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--6. How many unique district names are there? 
SELECT * 
FROM address;

SELECT COUNT(DISTINCT district)
FROM address
--Output: 378


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--7. What film has the most actors in it? (use film_actor table and get film_id) 
SELECT * 
FROM film_actor;

SELECT film_id, COUNT(film_id)
FROM film_actor
GROUP BY film_id
ORDER BY COUNT(film_id) DESC
LIMIT 1;
--Output: 508


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--8. From store_id 1, how many customers have a last name ending with ‘es’? (use customer table) 
SELECT * 
FROM customer 
WHERE store_id = 1;

SELECT COUNT(store_id)
FROM customer 
WHERE store_id = 1 AND first_name LIKE '%es'
GROUP BY store_id;
--Output: 2

--8b. Which customers?
SELECT first_name, last_name
FROM customer 
WHERE store_id = 1 AND first_name LIKE '%es';
--Output: 
-- Frances Parker
-- Charles Kowalski


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--9. How many payment amounts (4.99, 5.99, etc.) had a number of rentals above 250 
--	 for customers with ids between 380 and 430? (use group by and having > 250) 
SELECT *
FROM payment;

SELECT amount
FROM payment
WHERE customer_id BETWEEN 380 AND 430
GROUP BY amount
HAVING COUNT(amount) > 250;
--Output: 3

--Payment Amounts
-- 2.99
-- 4.99
-- 0.99


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
--10. Within the film table, how many rating categories are there? 
--    And what rating has the most movies total?
SELECT *
FROM film;

SELECT rating, COUNT(rating)
FROM film
GROUP BY rating
ORDER BY COUNT(rating) DESC
LIMIT 1;
--Output: PG-13

--Ratings & Counts
-- PG-13	223
-- NC-17	210
-- R		195
-- PG		194
-- G		178



