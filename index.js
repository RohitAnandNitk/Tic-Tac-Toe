const boxes = document.querySelectorAll(".cell");
const turns = document.querySelector(".turn");
const newGameBtn = document.querySelector(".startbtn");  
const gameName = document.querySelector(".game");

// variable
let currentPlayer; // 0 / x
let gameGrid;
let colorInterval;

const winingPositions = [
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
];

let  gameColorInterval;
gameNameAnimation();

function gameNameAnimation() {
    let hue = 0;
    clearInterval(gameColorInterval); // Clear any existing interval to avoid multiple intervals running

        gameColorInterval = setInterval(() => {
        hue = (hue + 1) % 360; // Increment hue and wrap around at 360
        gameName.style.color =  `hsl(${hue}, 100%, 50%)`;
    }, 10); // Change color every 100ms
}



// let's create a funtion initilize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // before the start a new game we have to empty all boxes on UI. 
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        stopColorChange()
        turns.style.borderColor = "gray";
        // when someone will win the match then for new game we have to remove the green color / reset css property
        box.classList = `cell box${index + 1}`; 
    })

    newGameBtn.classList.remove("active");
    turns.innerText = `Current Player - ${currentPlayer}`;
}

// call the function
initGame();



//srart  animation color
function startBorderAnimation() {
    let hue = 0;
    clearInterval(colorInterval); // Clear any existing interval to avoid multiple intervals running

    colorInterval = setInterval(() => {
        hue = (hue + 1) % 360; // Increment hue and wrap around at 360
        turns.style.borderColor = `hsl(${hue}, 100%, 50%)`;
    }, 10); // Change color every 100ms
}
// stoping color border change
function stopColorChange() {
    clearInterval(colorInterval);
}

// apply event on boxes
function checkGameOver(){
    console.log("checkst");
    let ans = ""; 
    winingPositions.forEach((Positions) => {
        if( (gameGrid[Positions[0]] != "" || gameGrid[Positions[1]] != "" || gameGrid[Positions[2]] != "" ) &&  
        (gameGrid[Positions[0]] === gameGrid[Positions[1]]) && (gameGrid[Positions[1]]=== gameGrid[Positions[2]])){
           
            if(gameGrid[Positions[0]] === "X"){
                ans = "X";
            }
            else{
                ans = "O";
            }
            //  now we know who is winner
             // disable click event
             boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
             })
            boxes[Positions[0]].classList.add("win");
            boxes[Positions[1]].classList.add("win");
            boxes[Positions[2]].classList.add("win");
            console.log("check end")
        }
    });
    // someone won the match
    if(ans != ""){
        turns.innerText = `Winner  - ${ans}`;  
        newGameBtn.classList.add("active");
        startBorderAnimation();
        return; 
    }
    // when there is no wnnier
    let emptyCount = 0;
    gameGrid.forEach((box) =>{
        if(box != "") emptyCount++;
    });
    if(emptyCount == 9){
        turns.innerText = "Game Tied";  
        newGameBtn.classList.add("active");
        return; 
    }
}


function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    turns.innerText = `Current Player - ${currentPlayer}`;
}


function handleClick(index){   
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        // when cell will filled disable cursor pointer
        boxes[index].style.pointerEvents = "none";
        // swap the role/ turn  
        swapTurn();
        // check for game over
        checkGameOver();
        
    }
}

// when someone click on the cell
boxes.forEach((cell,index) =>{
    cell.addEventListener("click",() =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

