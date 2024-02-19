// step 1: fetching all cells
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
// these are winning positions
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

let circleTurn // if this variable true circle turn else x turn

startGame()


// last step: restart click button so game restart we have to modify startGame to it's intial state

restartButton.addEventListener('click', startGame)

// first chance x ki

// for each cell when click on it marking it true so that we can't click on it again. one click handleClick functionality occur
function startGame(){
    circleTurn = false
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS) // modifying
        cell.classList.remove(CIRCLE_CLASS)// modifying
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}



// step 2: defining handleClick function

function handleClick(e){
    // target property returns the element where the event occured.
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // step 3: placemark cell
    placeMark(cell, currentClass)

    // step 3.1: checking for winner
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if (isDraw()){
        endGame(true)
    }
    else{
        // step 4: swapping turns 
        swapTurns()

        // for hover effect o and x turns lightgrey hovereffect
        setBoardHoverClass()
        // step 5: checking for winners if in row three of them same
        // if in col three of them same
        // if in diagonal three of them same
    }
    
}


function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }
    else{
        winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}


function isDraw(){
// all cells are filled then only draw will be happen
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


// defining placeMark
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
// swapTurns
function swapTurns(){
    circleTurn = !circleTurn
}
function setBoardHoverClass(){
    // removing if class is there
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    // now adding kisaki chance hai
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    // for some combinations in winner_combinations
    return WINNING_COMBINATIONS.some(combination =>{
        // kisi ek combination ki all index of combination are matching
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}