'use strict';

let number = 33721;

let numbers = number.toString()
                    .split("")
                    .map(num => parseInt(num));

let resultMultiplication = numbers.reduce((times, current) => times * current);

let exp = resultMultiplication ** 3;

let resultTwoFirstNumber = parseInt((exp + '').charAt(0))+''+parseInt((exp + '').charAt(1));

console.log(resultMultiplication);
alert(resultTwoFirstNumber);