// Exercise 1 - Closures
// Update the createAdder function below so that
// the below code works as intended

console.log("Exercise 1");
function createAdder(x){
    function addTo(y){
        return x + y;
    }
    return addTo;
};

console.log("Start addEight...");
const addEight = createAdder(8);
console.log(addEight(10)); // 18
console.log(addEight(17)); // 25
console.log(addEight(50)); // 58
console.log(addEight(100)); // 108
console.log(addEight(92)); // 100

console.log("Start addThree...");
const addThree = createAdder(3);
console.log(addThree(10)); // 13
console.log(addThree(17)); // 20
console.log(addThree(50)); // 53
console.log(addThree(100)); // 103
console.log(addThree(92)); // 95


// Exercise 2 - Promises 
// Using the below getMovieInfo function, which is a Promised-base function, write an asynchronous function (.then().catch() or async/await)
// called printMovieInfo that will take in a movie title and then either displays the movie information or logs an error with a console.warn().

console.log("Exercise 2");
function getMovieInfo(movieName){
    return new Promise((resolve, reject) => {
        if (movieName.length > 5){
            let movie = {
                id: 123,
                title: movieName,
                director: 'Christopher Spielberg',
                runtime: 157,
                description: 'Good vs Evil'
            };
            resolve(movie);
        } else {
            reject(`${movieName} cannot be accessed because it is too short.`);
        }
    })
}

// Example 1
// printMovieInfo('Indiana Jones and the Dark Knight')
// Output: Indiana Jones and the Dark Knight directed by Christopher Spielberg. A story of Good vs Evil that runs for 157 minutes.
console.log("Start example 1...");
const printMovieInfo1 = getMovieInfo('Indiana Jones and the Dark Knight');
printMovieInfo1.then(m => console.log(`${m.title} directed by ${m.director}. A story of ${m.description} that runs for ${m.runtime} minutes.`)).catch(e => console.warn(e));


// Example 2
// printMovieInfo('ET')
// Output: *Warning* ET cannot be accessed because it it too short
console.log("Start example 2...");
const printMovieInfo2 = getMovieInfo('ET');
printMovieInfo2.then(m => console.log(m)).catch(e => console.warn(e));