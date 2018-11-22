'use strict';

let Data = new Date(),
    DataHours,
    DataMinutes,
    DataSeconds;

function plusZero(times) {
    times < 10 ? times = '0' + times : times
    return times;
}

document.getElementById('time-day').innerHTML = plusZero(Data.getHours()) + ':' + plusZero(Data.getMinutes()) + ':'  + plusZero(Data.getSeconds()) 
                        + ' ' +  plusZero(Data.getDate()) + '.' + plusZero(Data.getMonth() + 1) + '.' + plusZero(Data.getFullYear()) + '</br>';


let textWeek;

function dayWeek(num) {
    
    switch (num) {
        case 0: textWeek = 'Воскресенье';
        break;
        case 1: textWeek = 'Понедельник';
        break;
        case 2: textWeek = 'Вторник';
        break;
        case 3: textWeek = 'Среда';
        break;
        case 4: textWeek = 'Четверг';
        break;
        case 5: textWeek = 'Пятница';
        break;
        case 6: textWeek = 'Суббота';
        break;
    }
}
dayWeek(Data.getDay());

document.getElementById('time-day').innerHTML += textWeek;

let oneNumber = document.getElementById('one-number'),
    twoNumber = document.getElementById('two-number'),
    difference = document.getElementById('difference');

let addTimeOne,
    addTimeTwo;

function addtimeOne() {
    addTimeOne = new Date(oneNumber.value);
    if (addTimeTwo) {
        appendDay();
    }   
}
function addtimeTwo() {
    addTimeTwo = new Date(twoNumber.value);
    if (addTimeOne) {
        appendDay();
    }
}

oneNumber.addEventListener('change', () => {addtimeOne();});
twoNumber.addEventListener('change', () => {addtimeTwo();});

function appendDay () {
    difference.value = Math.abs(addTimeTwo.getTime() - addTimeOne.getTime()) / (1000 * 3600 * 24);    
}


