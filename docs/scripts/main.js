const MAX_SQUARES = 9;
var allSquares;

window.onload = function(){
	InitAllSquares();
	
	document.getElementById("btn-new").addEventListener("click", function(){
		console.log("New Clicked");
	});
	document.getElementById("btn-solve").addEventListener("click", function(){
		console.log("Solve Clicked");
	});
	document.getElementById("btn-clear").addEventListener("click", function(){
		console.log("Clear Clicked");
	});
	document.getElementById("btn-submit").addEventListener("click", function(){
		console.log("Submit Clicked");
		console.log(CheckValid(4, 4));
	});
	
	//Testing
	for(let i = 0; i < allSquares.length; i++){
		for(let j = 0; j < allSquares[i].length; j++){
			allSquares[i][j].value = (i*9)+j;
		}
	}
}

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
			sectionOffset += 18;
		}
	}
}

function CheckValidCell(cellX, cellY){
	console.log(allSquares[cellX][cellY].value);
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
