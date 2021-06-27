const x_class = 'x';
const circle_class ='circle';
const winning_message_text  = document.querySelector('[data-winning-message-text]')
const cellElements =document.querySelectorAll("[data-cell]")
const board = document.querySelector('#board')
const winMain = document.querySelector('#winu')
const restartBtn = document.querySelector('#restart')
const winner = [
    [0,1,2] , [3,4,5] , [6,7,8], [0,3,6] , [1,4,7] , [2,5,8], [2,4,6] , [0,4,8]
]


let circleTurn 

// the main function on which the whole game is defined
starter()

// on cicking the btn the strater frunction is revokes=d and the game is renewed
restartBtn.addEventListener('click' , starter)

function starter()
{
    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener('click' , handleClick)
        cell.addEventListener('click', handleClick , {once:true})
    })
    boardHoverEffect()
    winMain.classList.remove('show')

}

function handleClick(e)
{
    //mark the thing 
    const cell = e.target
    const currentClass   = circleTurn ? circle_class:x_class
    marker(cell , currentClass)

    //check win 

    if(winCheck(currentClass))
    {
        endGame(false) //if someones win
    }
    else if(isDraw()) // checking the draw
    {
        //if there is a draw
        endGame(true)
    }
    else{
        //switch turn if there is no draw or win
        nextTurn()
        boardHoverEffect()
    }

    
}

function isDraw()
{
    return [...cellElements].every( cell => {
        // this return true when there is a draw
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

function endGame(draw)
{
    if(draw)
    {
        winning_message_text.innerText = 'Draw!!'
    }
    else{
        winning_message_text.innerText = `${circleTurn ? "O's Win!!" : "X's Win!!"}`
    }
    winMain.classList.add('show')
}

function marker(cell , cc)
{
    cell.classList.add(cc)
}

function nextTurn()
{
    circleTurn = !circleTurn
}

function boardHoverEffect()
{
    board.classList.remove(x_class)
    board.classList.remove(circle_class)
    if(circleTurn)
    {
        board.classList.add(circle_class)
    }
    else
    {
        board.classList.add(x_class)
    }
}

function winCheck(cc)
{
    return winner.some(winOne =>{
        return winOne.every(index =>{
            return cellElements[index].classList.contains(cc)
        })
    })
}

