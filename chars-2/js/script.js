'use strict';

let week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"];

for (let i = 0; i < week.length; i++) {

    if ( i == 5 || i == 6) {
        document.write( week[i].bold() + "<br>" );
    } else if ( i== 4 ) {
        document.write( week[i].italics() + "<br>" );
    } else {
        document.write( week[i] + "<br>" );
    }
};

let arr = ["311", "232", "333", "744", "575", "666", "777"];

for (let i = 0; i < arr.length; i++){
    if ( parseInt(arr[i].charAt(0)) == 3 || parseInt(arr[i].charAt(0)) == 7){
        console.log(arr[i]);
    };
};
