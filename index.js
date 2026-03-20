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

addBtnNode.addEventListener('click', function() {
    getValue();
    clearInput();
    sum = calculateSum(expenses);
    
    renderSum(sum);
    renderHistory(expenses);
    renderStatus(sum);
});

resetBtnNode.addEventListener('click', function () {
    resetAll();
    renderStatus(sum);
});

numberAddBtnNode.addEventListener ('click', function () {
    editLimit();
    renderStatus(sum);
})


function getValue() {
    let inputCategoryValue = inputCategoryNode.value;
    let inputSumValue = parseInt(inputSumNode.value);
    expenses.push({
        sum: inputSumValue,
        category: inputCategoryValue,
});}

function clearInput() {
    inputSumNode.value = '';
}

function calculateSum(expenses) {
    let sumB = 0;
    expenses.forEach(element => {
        sumB += element.sum;
});
    return sumB;
}

function renderSum(sum) {
    sumNode.innerText = `${sum}`; 
}

function renderHistory(expenses) {
    let historyHTML = '';

    expenses.forEach(element => {
        historyHTML += `<li>${element.sum} ${currency} - ${element.category}</li>`;
});

    historyNode.innerHTML = `<ol>${historyHTML}</ol>`;
}

function renderStatus(sum) {
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

function resetAll() {
    expenses = [];
    historyNode.innerHTML = '';
    sum = 0;
    sumNode.innerText = `0`;
}

function editLimit() {
    let numberValue = numberNode.value;
    limitNode.innerText = numberValue;
}
