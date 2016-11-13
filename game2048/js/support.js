//屏幕可使用的宽度
var documentWidth=window.screen.availWidth;
var gridContainerWidth=documentWidth*0.92;
var cellSideLength=0.18*documentWidth;
var cellSpace=0.04*documentWidth;
function getPositionY(i,j) {
	return cellSpace*(i+1)+cellSideLength*i;
}

function getPositionX(i,j) {
	return cellSpace*(j+1)+cellSideLength*j;
}



function canMoveTop (board) {
	for (var i=1;i<4;i++) {
		for (var j=0;j<4;j++) {
			if(board[i][j]!=0){
				if(board[i-1][j]==0||board[i][j]==board[i-1][j]){
					return true;
				}
			}
		}
	}
	
	return false;
}
function canMoveBottom (board) {
	for (var i=0;i<3;i++) {
		for (var j=0;j<4;j++) {
			if(board[i][j]!=0){
				if(board[i+1][j]==0||board[i][j]==board[i+1][j]){
					return true;
				}
			}
		}
	}
	
	return false;
}
function canMoveLeft (board) {
	for (var i=0;i<4;i++) {
		for (var j=1;j<4;j++) {
			if(board[i][j]!=0){
				if(board[i][j-1]==0||board[i][j]==board[i][j-1]){
					return true;
				}
			}
		}
	}
	
	return false;
}
function canMoveRight (board) {
	for (var i=0;i<4;i++) {
		for (var j=0;j<3;j++) {
			if(board[i][j]!=0){
				if(board[i][j+1]==0||board[i][j]==board[i][j+1]){
					return true;
				}
			}
		}
	}
	
	return false;
}


function noBlockHorizontal (row,col1,clo2,board) {
	for(var i=col1+1;i<clo2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}

function noBlockVertical (col,row1,row2,board) {
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}


function hasEmpty () {
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if(board[i][j]==0){
				return true;
			}
		}
	}
	return false;
}


























