let button = document.getElementById('start'),
    budgetText = document.getElementsByClassName('budget')[0],
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    income = document.querySelector('#income'),
    checkSavings = document.querySelector('.checksavings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

countBudgetBtn.disabled = true;
expensesItemBtn.disabled = true;
optionalexpensesBtn.disabled = true;

expensesItem[0].addEventListener('input', function () {
    expensesItemBtn.disabled = false;
});

optionalexpensesItem[0].addEventListener('input', function () {
    optionalexpensesBtn.disabled = false;
});

button.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.moneyData = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    countBudgetBtn.disabled = false;
});

for (let i = 1; i < 4; i+=2) {
    expensesItem[i].addEventListener('input', function(){
        if (/^[0-9]*?$/.test(expensesItem[i].value)) {
            expensesItem[i].defaultValue = expensesItem[i].value;
        } else {
            expensesItem[i].value = expensesItem[i].defaultValue;
        }
    });
};

expensesItemBtn.addEventListener('click', function () {
    let sum = 0;
    
    for (let i = 0; i < expensesItem.length; i++) {
        let expensesName = expensesItem[i].value,
            expensesMoney = +expensesItem[++i].value;

        if ((typeof (expensesName)) === 'string' && Number(expensesMoney) === expensesMoney &&
            expensesName != null && expensesMoney != null &&
            expensesName != '' && expensesMoney != '' && expensesName.length < 50) {
            appData.expenses[expensesName] = expensesMoney;
            sum += +expensesMoney;
            expensesItemBtn.disabled = false;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
    appData.sumDop = sum;
});

for ( let i = 0; i < 3; i++) {
    optionalexpensesItem[i].addEventListener('input', function(){
        if (/^[а-яА-ЯЁё-і]*?$/.test(optionalexpensesItem[i].value)) {
            optionalexpensesItem[i].defaultValue = optionalexpensesItem[i].value;
        } else {
            optionalexpensesItem[i].value = optionalexpensesItem[i].defaultValue;
        }
    });
}


optionalexpensesBtn.addEventListener('click', function () {
    optionalexpensesValue.textContent = '';
    for (let i = 0; i < optionalexpensesItem.length; i++) {
        let optExpensesName = optionalexpensesItem[i].value;
        if ((typeof (optExpensesName)) === 'string' && optExpensesName != null &&
            optExpensesName != '' && optExpensesName.length < 50) {
            appData.optionalExpenses[i + 1] = optExpensesName;
        } else {
            i--;
        }
        optionalexpensesValue.textContent += appData.optionalExpenses[i + 1] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function () {
    if (appData.moneyData != undefined) {
        appData.moneyPerDay = ((appData.moneyData - appData.sumDop) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        daybudgetValue.textContent = "Произошла ошибка";
    }
});

income.addEventListener('input', function(){
    for (let i = 0; i < 1; i++) {
        let items = income.value;
        if ((typeof (items)) === 'string' && items != null && items != '') {
            appData.income = items.split(', ');
        } else {
            i--;
        }
        incomeValue.textContent = appData.income;
    }
});

sumValue.disabled = true;
percentValue.disabled = true;

checkSavings.addEventListener('click', function(){
    if (appData.savings == true) {
        appData.savings = false;
        sumValue.disabled = true;
        percentValue.disabled = true;
        sumValue.value = '';
        percentValue.value = '';
        monthsavingsValue.textContent = '';
        yearsavingsValue.textContent = '';
    } else {
        appData.savings = true;
        sumValue.disabled = false;
        percentValue.disabled = false;
    }
});

sumValue.addEventListener('input', function(){
    if (/^[0-9]*?$/.test(sumValue.value)) {
        sumValue.defaultValue = sumValue.value;
    } else {
        sumValue.value = sumValue.defaultValue;
    }
});

percentValue.addEventListener('input', function(){
    if (/^[0-9]*?$/.test(percentValue.value)) {
        percentValue.defaultValue = percentValue.value;
    } else {
        percentValue.value = percentValue.defaultValue;
    }
});

sumValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100  * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100  * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    moneyData: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
    };


button.style.background = '#eb1919';
budgetText.style.fontSize = '21px';