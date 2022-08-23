/*
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Exercise 1: Write a function called toCelcius that takes in a number representing 
    temperature in Fahrenheit and converts the number into Celcius.
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Ex 1. toCelcius(32) // 0
    Ex 2. toCelcius(212) // 100
    Ex 3. toCelcius(50) // 10
*/

function toCelcius (degrees_fahrenheit) {
    return (degrees_fahrenheit - 32)*5/9;
}

{
    let ex1 = toCelcius(32); 
    let ex2 = toCelcius(212); 
    let ex3 = toCelcius(50); 

    console.log(ex1);   // 0
    console.log(ex2);   // 100
    console.log(ex3);   // 10
}

/*
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Exercise 2: Create a class for a User that sets username and password property
    on creation. Add a method to change the user's password. The method should take in 
    the old password and new password. If the old password is wrong do not reset the password.
    Create an instance of the new user and then change their password using the method.
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

class User {
    constructor(username, password) {
        this.username = String(username);
        this.password = String(password);
    }

    changePassword(old_password, new_password) {
        if (this.password === old_password) {
            this.password = String(new_password);
            console.log("Password changed.")
        } else {
            console.log("Incorrect password. No changes occurred.")
        }
    }
}

testuser1 = new User(username="NotARealUser",password="secretpassword"); 
testuser1.changePassword(old_password="SECRETPASSWORD",new_password="betterpassword"); // Incorrect password. No changes occurred.
testuser1.changePassword(old_password="secretpassword",new_password="betterpassword"); // Password changed.

/*
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Exercise 3: Write a function that takes in an array of integers and returns
    an array of the negative integers squared using Array methods

    Ex 1. squareNegatives([-10, -3, 4, -2, 8, 9, -3]) // [100, 9, 4, 9]
    Ex 2. squareNegatives([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]) // [25, 16, 9, 4, 1]
    Ex 3. squareNegatives([2, 4, 6, 8, 10]) // []
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

function squareNegatives1(arr) {
    return arr.filter(i => i < 0).map(i => i**2);
}

{
    let ex1 = squareNegatives1([-10, -3, 4, -2, 8, 9, -3]);
    let ex2 = squareNegatives1([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
    let ex3 = squareNegatives1([2, 4, 6, 8, 10]);

    console.log(ex1);   // [100, 9, 4, 9]
    console.log(ex2);   // [25, 16, 9, 4, 1]
    console.log(ex3);   // []
}