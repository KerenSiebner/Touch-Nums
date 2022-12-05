// User sees a board with 16 cells, containing numbers 1..16, in a random order
// o Hint: use an HTML table
// o Hint: Nice technique for building the board:
// place the 16 numbers in a simple array, shuffle it, then build the <table> by popping a number from the nums array.
// o Note: there is no need to use as matrix in this exercise
// • User should click the buttons in a sequence (1, 2, 3,... 16)
// var gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
var gSize = 6
var gNums = []
var gPrevNum = 0
var gCount = 0

//Initial Time
var gClickTime = []
var seconds = 0;
var milisecs = 0;
const timeValue = document.querySelector(".time");
var interval;

function createNums() {
    for (var i = 1; i <= (gSize ** 2); i++) {
        gNums.push(i)
        console.log(gNums)
    }
    return gNums
}

function onInit() {
    gNums = createNums()
    console.log(gNums)
    createBoard()
}

function createBoard() {
    shuffle(gNums)
    //call table from html and change inner html to add row and columns with nums
    var strHTML = ''
    var idx = 0
    var cell
    for (var i = 0; i < gSize; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gSize; j++) {
            cell = gNums[idx++]
            console.log('idx', idx)
            strHTML += `<td data-num="${cell}" onclick="cellClicked(this)">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    var elTable = document.querySelector('tbody.board')
    console.log(elTable)
    console.log('strHTML', strHTML)
    elTable.innerHTML = strHTML
}

// • When user clicks the a button - call a function cellClicked(clickedNum)
function cellClicked(clickedNum) {
    const currNum = +clickedNum.dataset.num
    if (gPrevNum === 0) {
        var currTime = [Date.now()];
        gClickTime = gClickTime.push(currTime);
        interval = setInterval(timeGenerator, 10)
    }
    var desiredNum = gPrevNum + 1
    // o If right –the button changes its color
    if (currNum === desiredNum) {
        clickedNum.style.backgroundColor = 'white'
        gPrevNum = desiredNum
        gCount++
        //when board is full
        if (gCount === gNums.length) clearInterval(interval)
    }
    // o When user clicks the wrong button noting happen
}

function newGame() {
    gCount = 0
    gPrevNum = 0
    var elTable = document.querySelector('tbody.board')
    elTable.style.backgroundColor = 'rgba(137, 43, 226, 0.212)'
    onInit()
}


//create game timer////////////
// • When user clicks the first number, game time starts and presented (3 digits after the dot, like in: 12.086)
function timeGenerator() {
    milisecs += 1;
    //minutes logic
    if (milisecs >= 100) {
        seconds += 1;
        milisecs = 0;
    }
    resetTimerDisplay()
}

//format time before displaying
function resetTimerDisplay() {
    var secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    var milisecsValue = milisecs < 10 ? `0${milisecs}` : milisecs;
    timeValue.innerHTML = `<span>Time: </span>${secondsValue}:${milisecsValue}`;
}


// • Add difficulties (larger boards: 25, 36)
function chooseDifficulty(diff) {
    if (diff.dataset.difficulty === 'easy') gSize = 4
    if (diff.dataset.difficulty === 'medium') gSize = 5
    if (diff.dataset.difficulty === 'hard') gSize = 6
    createBoard()
}

function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i >= 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
