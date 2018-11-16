'use strict';

let number = 33721;

let resultMultiplication = number.toString().split("").reduce((times, current) => times * current);

let resultTwoFirstNumber = parseInt((resultMultiplication ** 3 + '').charAt(0))+''+parseInt((resultMultiplication ** 3 + '').charAt(1));

console.log(resultMultiplication);

alert(resultTwoFirstNumber);