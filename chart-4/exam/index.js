function getFriendlyNumbers(start, end) {

    if (typeof(start) != 'string' && typeof(end) != 'string' && start <= end && start > 0 && end > 0 && (start ^ 0) === start && (end ^ 0) === end ) {
        let full = [];
        if ( start == 1){start = 2;}
        for (let i = start; i <= end; i++) {
            for (let j = start + 1; j <= end; j++) {
                if (sumDivisors(divisors(i)) == j && i == sumDivisors(divisors(j))) {
                    full.push([i, j]);
                }            
            };
            start++;
        }
    return full;
    } else {
        return false;
    }
}

function divisors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        if (num % i == 0 ) {
           arr.push(i);
        }
   }
   return arr;
}

function sumDivisors(arr) {    
    return arr.reduce((x,y) => x + y);    
}

module.exports = {
    firstName: 'Name',
    secondName: 'Surname',
    task: getFriendlyNumbers
}
