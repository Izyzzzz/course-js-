'use strict';

let str = "урок-3-был слишком легким";

let strNew = (str[0].toUpperCase() + str.slice(1)).replace(/-/g, " ");

console.log(strNew);

console.log(strNew.slice(19,23).padEnd(6, "о"));

let arr = [20, 33, 1, "Человек", 2, 3];

let result = Math.sqrt( arr.filter((number) => typeof(number) != 'string')
                        .reduce((x, y) => x + Math.pow(y, 3), 0));

console.log(result);

//Функция с фильтром
function atOneArgument(oneArgument) {
    console.log( typeof(oneArgument) != 'string' ? "Вы ввели неправельное значение" : 
                ( oneArgument.trim().length > 50 ? oneArgument.trim().slice(0, 50) + "..." : oneArgument.trim()));
};
atOneArgument(" Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ");
