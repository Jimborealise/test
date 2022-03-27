/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

// TODO: Update this gameboard by giving better naming (use A1, A2 etc insteaed of 1,2,3)
// 1,2,3 is very confusing and not sure which position it is denoting
let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    let a = [];
    let j = 0;
    for (let i = 1; i <= 9; i++) {
      if(board[i] == ' '){
        a.push(i);
      } else{
        a.push(board[i])
      }
    }
  
    for (let i = 0; i < 3; i++) {
      if(i == 2){
        console.log(a[j] + ' | ' + a[j+1] + ' | ' + a[j+2]);
      }else{
        console.log(a[j] + ' | ' + a[j+1] + ' | ' + a[j+2]);
        console.log("---------");
      }
      j += 3
    } 
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    let positionNumber = Number(position);

    if(isNaN(positionNumber)){
        return false
    }else if(positionNumber < 1 || positionNumber > 9){
        return false;
    }else if(board[positionNumber] == "X" || board[positionNumber] == "O"){
        return false;
    }else{
        return true;
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], 
    [1, 4, 7], [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    checker = false;
    for(let i = 0; i < 8; i++){
        let winCom = winCombinations[i];
        const a = winCom[0];
        const b = winCom[1];
        const c = winCom[2];

        if(board[a] == player && board[b] == player && board[c] == player){
            checker = true;
        }
    }
    return checker;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for(let i = 1; i <= 9; i++){
        if(board[i] == ' '){
          return false;
        }
      }
    return true
}


// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {

    if(!checkFull()){
        let loop = true;
        do{
            const move = prompt("\n" + player + '\'s turn, input: ');

            if(validateMove(move)){

                loop = false;
                console.log("");
                markBoard(move, player);
                printBoard();
    
                if(checkWin(player)){
                    console.log("\n" + player + "\'s WIN \n")
                    restart();
                }
            }else{
                console.log("\nPlease enter different number \n");
                printBoard();
                loop = true;
            }
        }while(loop == true);
    }else{
        console.log("It\'s a TIE. \n");
        restart();
    }
}

// clear the 'X' and 'O' on the board 
function clearBoard(){
    for(let i = 1; i <=9; i++){
        board[i] = ' ';
    }
}

// ask user to restart the game function by receiving input 'y' or 'n'
function restart(){
    console.log("");
    const askPlayer = prompt('Do you want to play again? \'y\' or \'n\' :');
    if(askPlayer == 'y'){
        clearBoard();
        console.log('Game started: \n\n' +
                    ' 1 | 2 | 3 \n' +
                    ' --------- \n' +
                    ' 4 | 5 | 6 \n' +
                    ' --------- \n' +
                    ' 7 | 8 | 9 \n');

        winnerIdentified = false;
        currentTurnPlayer = 'X';
        return true;
    }else if(askPlayer == 'n'){
        winnerIdentified = true;
    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer); 
    // feel free to add logic here if needed, e.g. announcing winner or tie
    if(currentTurnPlayer == 'X'){
        currentTurnPlayer = 'O';
    }else{
        currentTurnPlayer = 'X';
    }
    
}



