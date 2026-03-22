const inputSumNode = document.querySelector('.js-input__sum');
const inputCategoryNode = document.querySelector('.js-input__category');
const addBtnNode = document.querySelector('.js-add__btn');
const historyNode = document.querySelector('.js-history');
const resetBtnNode = document.querySelector('.js-reset__btn');
const sumNode = document.querySelector('.js-sum');
const numberNode = document.querySelector('.js-input__number');
const numberAddBtnNode = document.querySelector('.js-number-add__btn');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');


const currency = `руб.`;
const goodStatus = `Все хорошо`;
const badStatus = `Все плохо`;


let expenses = [];
let sum = 0;


const clickAddBtn = () => {
    if (!checkValue(inputSumNode)) {
        return;
    } else {
        getValue();
        clearInput();
        sum = calculateSum(expenses);
        render();
    }
}

const clickResetBtn = () => {
    resetAll();
    renderStatus(sum);
}

const addNumberBtn = () => {
    if (!checkValue(numberNode)) {
        return;
    } else {
        editLimit();
        renderStatus(sum);
    }
}

const render = () => {
    renderSum(sum);
    renderHistory(expenses);
    renderStatus(sum);
}

const getValue = () => {
    let inputCategoryValue = inputCategoryNode.value;
    let inputSumValue = parseInt(inputSumNode.value);
    expenses.push({
        sum: inputSumValue,
        category: inputCategoryValue,
    });
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem('history', expensesString);
}
const clearInput = () => {
    inputSumNode.value = '';
}

const calculateSum = (expenses) => {
    let sumB = 0;
    expenses.forEach(element => {
        sumB += element.sum;
    });
    return sumB;
}

const renderSum = (sum) => {
    sumNode.innerText = `${sum}`; 
}

const renderHistory = (expenses) => {
    let historyHTML = '';

    expenses.forEach(element => {
        historyHTML += `<li>${element.sum} ${currency} - ${element.category}</li>`;
    });

    historyNode.innerHTML = `<ol>${historyHTML}</ol>`;
}

const renderStatus = (sum) => {    
    let limitNumber = parseInt(limitNode.textContent);
    let sumNumber = sum;
        
    if (limitNumber >= sumNumber) {
        statusNode.innerText = goodStatus;
        statusNode.classList.remove('text__red');
    } else {
        let difference = sumNumber - limitNumber;
        statusNode.innerText = `${badStatus} (-${difference}) ${currency}`;
        statusNode.classList.add('text__red');
    }  
}

const resetAll = () => {
    expenses = [];
    historyNode.innerHTML = '';
    sum = 0;
    sumNode.innerText = `0`;
    localStorage.removeItem('history');
}

const editLimit = () => {
    let numberValue = numberNode.value;
    limitNode.innerText = numberValue;
    localStorage.setItem('limit', numberValue);
}

const checkValue = (inputSumNode) => {
    let valueCheck = parseInt(inputSumNode.value);
    return valueCheck > 0; 
}

const getLimitFromStorage = () => {
    const limitFromStorage = parseInt(localStorage.getItem('limit'));
    if (!limitFromStorage) {
        return;
    } else {
        limitNode.innerText = limitFromStorage;
    }
}

const getHistoryFromStorage = () => {
    const HistoryFromStorageString = localStorage.getItem('history')
    const HistoryFromStorage = JSON.parse(HistoryFromStorageString);
    if (!HistoryFromStorage) {
        return;
    } else {
        HistoryFromStorage.forEach(element => {
            expenses.push(element); 
        });
    }
}

const init = () => {
    getLimitFromStorage();
    getHistoryFromStorage();
    sum = calculateSum(expenses);
    render();
}

init();

addBtnNode.addEventListener('click', clickAddBtn);

resetBtnNode.addEventListener('click', clickResetBtn);

numberAddBtnNode.addEventListener ('click', addNumberBtn);


