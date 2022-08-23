//==================Exercise #1 ==========//
/*
    Given the array [1, 2, 3, 5, 6, 7],  finds the index of the first non-consecutive element in the array.
    It should log out 3 because the array at index 3 is 5 which is not consecutive.
*/


{
    let exerciseOneArr = [1, 2, 3, 5, 6, 7];
    for (i = 0; i < exerciseOneArr.length; i++){
        if (exerciseOneArr[i]+1 != exerciseOneArr[i+1]){
            console.log(exerciseOneArr[i]);
            break;
        };
    };
}

//============Exercise #2 ============//
/*
Given the two array of numbers below, loop through them both individually 
    and sum all of the positives elements.

Example 1:
Input: [10, 12, -9, 3, -1, 0, 15] 
Output: 40
Explain: 10 + 12 + 3 + 15 = 40

Example 2:
Input: [3, 5, 7, 9, -10, 2, -22, -1] 
Output: 26

Note: if there is nothing to sum, the sum is default to 0.
*/


function SumPosNums1 (numbers) {
    let i = 0; let sum = 0;
    if (numbers.length === 0) {
        return console.log(0);
    } else if (numbers.length === 1) {
        return console.log(numbers[0]);
    }
    while (i < numbers.length) {
        if (numbers[i] > 0) {
            sum += numbers[i]
        }
        i++;
    };
    return sum;
}

let numbers1 = [10, 12, -9, 3, -1, 0, 15];
SumPosNums1(numbers1);
SumPosNums1([])
SumPosNums1([7])

// - - - - - - - - - - - - - - - - - - - - 

function SumPosNums2 (numbers) {
    sum = 0;
    for (num of numbers) {
        // for (num in numbers) {    // 'in' will give you indices as string types
        // num = Number(num);
        if (num > 0) {
            // console.log(num, typeof num);
            sum += num;
        };
    };
    return sum;
}

let numbers2 = [3, 5, 7, 9, -10, 2, -22, -1]; 
SumPosNums2(numbers2);

