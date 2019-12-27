const MAX_SQUARES = 9;
var allSquares;

window.onload = function(){
	InitAllSquares();
	//NewPuzzle();
	
	for(let x = 0; x < allSquares.length; x++){
		for(let y = 0; y < allSquares[x].length; y++){
			allSquares[x][y].onchange = function(){
				CheckValidValue(allSquares[x][y]);
			}
		}
	}
	
	document.getElementById("btn-new").addEventListener("click", function(){
		NewPuzzle();
	});
	document.getElementById("btn-solve").addEventListener("click", function(){
		console.log("Solve Puzzle");
	});
	document.getElementById("btn-clear").addEventListener("click", function(){
		ClearPuzzle();
	});
	document.getElementById("btn-submit").addEventListener("click", function(){
		CheckValidPuzzle();
		console.log(CheckValidPuzzle());
	});
}

//Creates and orders an array of all squares in the puzzle
function InitAllSquares(){
	allSquares = new Array(MAX_SQUARES);
	for(let i = 0; i < allSquares.length; i++){
		allSquares[i] = new Array(MAX_SQUARES)
	}
	
	sectionOffset = 0;
	for(let i = 0; i < allSquares.length; i++){
		for(let j = 0; j < 3; j++){
			allSquares[i][j] = document.getElementsByClassName("square")[j + (i*3) + sectionOffset];
		}
		for(let j = 0; j < 3; j++){
			allSquares[i][j+3] = document.getElementsByClassName("square")[j + 9 + (i*3) + sectionOffset];
		}
		for(let j = 0; j < 3; j++){
			allSquares[i][j+6] = document.getElementsByClassName("square")[j + 18 + (i*3) + sectionOffset];
		}
		
		if((i + 1) % 3 == 0){
			sectionOffset += MAX_SQUARES * 2;
		}
	}
}

//Fills puzzle squares with random numbers between 1 and 9
function NewPuzzle(){
	ClearPuzzle();
	
	for(let x = 0; x < allSquares.length; x++){
		for(let y = 0; y < allSquares[x].length; y++){
			
			var repeatValue = allSquares[x][y].value;
			allSquares[x][y].value = GetRandomValue() + 1;
			var matchValue = allSquares[x][y].value;
			
			while(CheckValidCell(x, y) == false){
				allSquares[x][y].value++;
				
				if(allSquares[x][y].value > 9){
					allSquares[x][y].value = 1;
				}
				
				//Go back a cell
				if(matchValue == allSquares[x][y].value || repeatValue == allSquares[x][y].value){ //OR IF VALUE REPEATES
					allSquares[x][y].value = "";
				
					if(y - 1 >= 0){
						y -= 2;
						continue;
					}
					else{
						x--;
						y = 7;
					}
				}
				
			}
			
		}
	}
}

//Sets value of all squares in the puzzle to ""
function ClearPuzzle(){
	for(let x = 0; x < allSquares.length; x++){
		for(let y = 0; y < allSquares[x].length; y++){
			allSquares[x][y].readOnly = false;
			allSquares[x][y].value = "";
		}
	}
}

//Checks that all squares in the puzzle are valid
function CheckValidPuzzle(){
	var isValid = true;
	
	for(let x = 0; x < allSquares.length; x++){
		for(let y = 0; y < allSquares[x].length; y++){
			if(isValid == false){
				break;
			}
			
			isValid = CheckValidCell(x, y);
		}
	}
	
	return isValid;
}

//Checks for squares with matching values within the cells row, column, and nonet
function CheckValidCell(cellX, cellY){
	let boxX = cellX;
	let boxY = cellY;
	
	//Check Vertical
	for(let i = 0; i < MAX_SQUARES; i++){
		if(i == cellX)
			continue;
		if(allSquares[i][cellY].value == allSquares[cellX][cellY].value)
			return false;
	}
	
	//Check Horizontal
	for(let i = 0; i < MAX_SQUARES; i++){
		if(i == cellY)
			continue;
		if(allSquares[cellX][i].value == allSquares[cellX][cellY].value)
			return false;
	}
	
	//Check Within Box
	while(boxX % 3 != 0){
		boxX--;
	}
	while(boxY % 3 != 0){
		boxY--;
	}
	
	for(let x = 0; x < 3; x++){
		for(let y = 0; y < 3; y++){		
			if((boxX + x) == cellX && (boxY + y) == cellY)
				continue;
			if(allSquares[boxX + x][boxY + y].value == allSquares[cellX][cellY].value)
				return false;
		}
	}
	
	return true;
}

function CheckValidValue(square){
	isValid = false;
	
	for(let i = 0; i < 9; i++){
		if(square.value == i + 1 || square.value == (i+1).toString()){
			isValid = true;
		}
	}
	
	if(!isValid){
		console.log("Entered value not valid");
		square.value = "";
	}
}

function GetRandomValue(max = 9){
	return Math.floor(Math.random() * Math.floor(max));
}























