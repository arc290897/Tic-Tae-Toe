let gameActive=true;
let currentPlayer="X";
let gameState=["","","","","","","","",""];
statusDisplay=document.querySelector(".game--status");


function handleRestartGame(){
	gameActive=true;
	currentPlayer="X";
	gameState=["","","","","","","","",""];
	document.querySelectorAll(".cell").forEach((cell)=>cell.innerText="");
	statusDisplay.innerText=`It's ${currentPlayer}'s turn`;
}

function handleCellClick(clickedEvent){
	const clickedCell=clickedEvent.target;
	const clickedCellIndex=parseInt(clickedCell.getAttribute("data-cell-index"));
	if(gameState[clickedCellIndex] !== "" || !gameActive){
		return;
	}
	handleCellPlayer(clickedCell,clickedCellIndex);
	handleResultValidation();
}

function handleCellPlayer(clickedCell,clickedCellIndex){
	gameState[clickedCellIndex]=currentPlayer;
	clickedCell.innerText=currentPlayer;
}

const winningCondition=[
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]

function handleResultValidation(){
	let roundWon=false;
	for(let i=0;i<=7;i++){
		const winCondition=winningCondition[i];
		let a=gameState[winCondition[0]];
		let b=gameState[winCondition[1]];
		let c=gameState[winCondition[2]];

		if(a==="" || b==="" || c===""){
			continue;
		}

		if(a===b && b===c){
			roundWon=true;
			break;
		}
	}

	if(roundWon){
		statusDisplay.innerText=`player ${currentPlayer} has won`;
		gameActive=false;
		return;
	}

	let roundDraw=!gameState.includes("");
	if(roundDraw){
		statusDisplay.innerText=`It's a draw`;
		gameActive=false;
		return;
	}


	handlePlayerChange();
}


function handlePlayerChange(){
	// if(currentPlayer === "X"){
	// 	currentPlayer = "O";
	// }else{
	// 	currentPlayer="X"
	// }

	currentPlayer= currentPlayer === "X" ? "O" : "X";
	statusDisplay.innerText=`It's ${currentPlayer}'s turn`;
}

document.querySelector(".game--restart").addEventListener("click",handleRestartGame);
document.querySelectorAll(".cell").forEach((cell)=>cell.addEventListener("click",handleCellClick));