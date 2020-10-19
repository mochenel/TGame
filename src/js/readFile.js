
/*	player: contain the current  position of the player
 *	[
 *	row:- ith index of the player
 *	col:-jth index of the player
 *	]
 *	status: stores the value of the square before player moves onto it to put it back once player leaves and store new one from where player is moving to.
 *	left:stores info about the square after the player
 *	right:stores info about the square before the player
 *	up:stores info about the square above the player
 *	down:stores info about the square below the player
 *	index:the jth index of left, right, down, and up.
 *
 * */

let Matrix = {
			 player:{row:0,col:0},
			 status:'.',
			 left:{index:0,value:'.'},
			 up:{index:0,value:'.'},
			 right:{index:0,value:'.'},
			 down:{index:0,value:'.'}
};

const obstacle = ['V', 'H', 'P', 'x', 'X']; // touching any of this will end the game
const nonObstacle = ['v', 'h', 'p', '.', 'k','K']; // touching any of this won't end the game
let CurrentBoard = [];
// update the CurrentBoard array 
function setBoard(board) {
	CurrentBoard = board.slice();
}
let level = 1;

function instruct() {
	let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

	open('./instructions.html', 'test', params);
}

function btnUp(){
	toggleVerticalSwitch()
	up(Matrix);
}
function btnDown(){
	toggleVerticalSwitch()
	down(Matrix);
}
function btnLeft(){
	toggleHorizontalSwitch()
	left(Matrix);
}
function btnRight(){
	toggleHorizontalSwitch()
	right(Matrix);
}


// key listeners
document.onkeydown= function(event){

	var x = event.keyCode;
	if (String.fromCharCode(x) == 'h') {
		toggleVerticalSwitch()
		up(Matrix);
	}
	if (String.fromCharCode(x) == 'b') {
		toggleVerticalSwitch()
		down(Matrix);
	}
	if (String.fromCharCode(x) == 'd') {
		toggleHorizontalSwitch()
		left(Matrix);
	}
	if (String.fromCharCode(x) == 'f') {
		toggleHorizontalSwitch()
		right(Matrix);
	}
	
}
/*
 reads file and  copy the content to the CurrentBoard array.
 each level is a file(created by following the standards) from the board folder
 */
function loadData(path) {
		let board = [];
		let data = null;
		let row = 0;
		let xmlhttp = new XMLHttpRequest();
		console.log(xmlhttp);
		let file = path;
		xmlhttp.open('GET',file,true);
		xmlhttp.onload = function(){
			if(this.status === 200){
				data = xmlhttp.responseText.toString().split('\n');
				row = data.length-1;
				for(var i = 2; i < row; i++){
					board.push(data[i])
				
				}
				drawBoard(board);
				setBoard(board);
			}
			
			document.getElementById("Start").style.visibility = "hidden";
		}
		xmlhttp.send();
		
		
}
/*
 * this function computes the level if player hits the target
*/

function nextLevel() {
	
		level = level+1;
		document.getElementById("levelNo").innerHTML = `Level ${level}`;
		var loc;
		if(level < 18){

			 loc = `https://traversalconfiglevel.herokuapp.com/level?id=${level}`;
			
		}
		
		else{
			document.getElementById("game-board").style.visibility = "hidden";
			document.getElementById("next-l").style.visibility = "hidden";
			document.getElementById("levelNo").innerHTML = "Congradulations";
			document.getElementById("levelNo").style.color = "green";
			document.getElementById("levelNo").style.fontSize = "150%";
			return;
		}

		
		var parent = document.getElementById("game-board");
		while(parent.firstChild){
			parent.firstChild.remove();
		}
		board = [];
		loadData(loc);
		
}
/* this function reads the CurrentBoard array and display the specific images in the squares.
 * the array is 1D, but it will treated as 2D array. 
 * each charracter in the array represents an image(maps to a specific image)
 * 
 * */

function drawBoard(board) {
	
				let hv = ['u','d','l','r','U','D','L','R']; // vertical and horizontal movers
	// load screen with some icons

	remove();
	document.getElementById("btn-controls").style.visibility = "visible";
	for (var i = 0; i < board.length; i++){
					var rw = document.createElement("tr"); // tr element
					var dt;
				for(var j = 0; j < board[i].length; j ++){
					dt = document.createElement("td"); // td element
					var img = document.createElement("img");
					var curr = board[i].charAt(j);
					if(curr.toLowerCase() =='x'){
						img.src = "../images/tvl_x.png"; // wall pic
						img.title = "wall";
					}
					else if (curr == '.' || hv.find(c => c == board[i].charAt(j)) != undefined) {
						img.src = "../images/tvl_e.png"; // square pic
						img.title = "";
					}
					else if(curr =='t' || curr =='T'){
						img.src = "../images/tvl_t.png"; // target pic
						img.title = "target";
					}
					else if(curr =='s' || curr =='S'){
						img.src = "../images/tvl_s.png"; // player pic
						img.title = "player";
					}
					else if(curr =='h'){
						img.src = "../images/tvl_sh0.png"; // closed horizontal switch
						img.title = "closed horizontal switch";
					}
					else if(curr =='H'){
						img.src = "../images/tvl_sh1.png"; // open horizontal switch
						img.title = "open horizontal switch";
					}
					else if(curr =='v'){
						img.src = "../images/tvl_sv0.png"; // colsed vertical switch
						img.title = "closed vertical switch";
					}
					else if(curr =='V'){
						img.src = "../images/tvl_sv1.png"; // open vertical switch
						img.title = "open vertical switch";
					}
					else if(curr =='k'){
						img.src = "../images/tvl_k1.png"; // available key(small k)
						img.title = "available key";
					}
					else if(curr =='K'){
						img.src = "../images/tvl_k0.png"; // unavailable key(big K)
						img.title = "unavailable key";
					}
					else if(curr =='p'){
						img.src = "../images/tvl_p0.png"; // closed port(small p)
						img.title = "closed port";
					}
					else if(curr =='P'){
						img.src = "../images/tvl_p1.png"; // open port(big P)
						img.title = "open port";
					}
					else {
						
					}
					dt.appendChild(img);
					// var dta = document.createTextNode(board[i][j]); 
					//dt.appendChild(dta); // add character into a cell
					rw.appendChild(dt); // apppend to complete a row
		}
		console.log("###",rw)
				document.getElementById("game-board").appendChild(rw); // adding row to a table
			}
			matrix(board)
}
/*
 * this function updates the Matrix object.
 * everytime drawboard gets invoked, it will call this function to update the Matrix object based on new position of player

*/
function matrix(board){
	

	for (var i = 0; i <board.length ;  i++) {
		for (var j = 0; j <board[i].length ;  j++) {
			if(board[i].charAt(j) == 's' || board[i].charAt(j) == 'S'){
				Matrix.player.row = i;
				Matrix.player.col = j;
				// left
				if(j-1 >=0){
				Matrix.left.index = j-1;
				Matrix.left.value = board[i].charAt(j-1);
				}else{
					Matrix.left.index = -1; 
					Matrix.left.value = null;
				}
				// up
				if(i-1 >=0){
				Matrix.up.index = i-1;
				Matrix.up.value =board[i-1].charAt(j); 
				} else {
					Matrix.up.index = board[i].length - 1;
					Matrix.up.value = board[board[i].length - 1].charAt(j);
				}
				//right
				if(j+1 <board[i].length){
				Matrix.right.index = j+1;
				Matrix.right.value = board[i].charAt(j+1);
				}else{
					Matrix.right.index = -1;
					Matrix.right.value = null;
				}
				//down
				if(i+1 <board.length){
				Matrix.down.index = i+1;
				Matrix.down.value = board[i+1].charAt(j);
				}else{
					Matrix.down.index = 0;
					Matrix.down.value = board[0].charAt(j);
				}



			}



	}
	}
}
/*
 8 pressed

 */ 
function up(Matrix) {

	if (Matrix.up.index === parseInt(CurrentBoard.length - 1)) {


		if (nonObstacle.includes(Matrix.up.value)) {
			/*replace the player with status, player appears at the bottom and the previous position gets occupied by the status.
			 * remember, row is not array it's a string, so replacing player character will require 
			 * substiting initial ith row with new row containing status in place of player(string is immutable)
			 */

			var i = parseInt(Matrix.player.row);
			var j = parseInt(Matrix.player.col);
			if (Matrix.up.value === 'k') {
				togglePorts();
				Matrix.up.value = 'K';
			}
			CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, Matrix.status);  // first row containing status in place of player
			CurrentBoard[parseInt(CurrentBoard.length - 1)] = replaceCharBy(CurrentBoard[parseInt(CurrentBoard.length - 1)], j, 's'); // bottom row 
			Matrix.status = Matrix.up.value; // update the status
		}
		else if (obstacle.includes(Matrix.up.value)) {
			alert("you lost")
			level = level - 1;
			nextLevel();
		}
		else if (Matrix.up.value == 't' || Matrix.up.value == 'T') {
			alert("you Won")
			nextLevel();
		} else {

		}


	}
	else if (nonObstacle.includes(Matrix.up.value)) {
		/*replace the player with status, player moves up and the previous position gets occupied by the status.
		 * remember, row is not array it's a string, so replacing player character will require 
		 * substiting initial ith row with new row containing status in place of player(string is immutable)
		 */
		
		var i = parseInt(Matrix.player.row);
		var j = parseInt(Matrix.player.col);
		if (Matrix.up.value === 'k') {
			togglePorts();
			Matrix.up.value = 'K';
		}
		CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, Matrix.status);  // ith row containing status in place of player
		CurrentBoard[i - 1] = replaceCharBy(CurrentBoard[i - 1], j, 's'); // ith top row 
		Matrix.status = Matrix.up.value; // update the status
	}
	else if (obstacle.includes(Matrix.up.value)){
		alert("you lost")
		level = level - 1;
		nextLevel();
	}
	else if(Matrix.up.value == 't' || Matrix.up.value == 'T'){
		alert("you Won")
		nextLevel();
	} else {

	}
	remove();
	drawBoard(CurrentBoard);
	
}

// pressed 2 (down)
function down(Matrix) {
	if (Matrix.down.index == 0) {


		if (nonObstacle.includes(Matrix.down.value)) {
			/*replace the player with status, player appears at the top and the previous position gets occupied by the status.
			 * remember, row is not array it's a string, so replacing player character will require
			 * substiting initial ith row with new row containing status in place of player(string is immutable)
			 */
			var i = parseInt(Matrix.player.row);
			var j = parseInt(Matrix.player.col);
			if (Matrix.down.value === 'k') {
				togglePorts();
				Matrix.down.value = 'K';
			}
			CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, Matrix.status);  // ith row containing status in place of player
			CurrentBoard[0] = replaceCharBy(CurrentBoard[0], j, 's'); // the first row
			Matrix.status = Matrix.down.value; // update the status
		}
		else if (obstacle.includes(Matrix.down.value)) {
			alert("you lost")
			level = level - 1;
			nextLevel();
		
		}
		else if (Matrix.down.value == 't' || Matrix.down.value == 'T') {
			alert("you Won")
			nextLevel();
		} else {

		}


	}
	else if (nonObstacle.includes(Matrix.down.value)) {
	/*replace the player with status, player moves down and the previous position gets occupied by the status.
	 * remember, row is not array it's a string, so replacing player character will require
	 * substiting initial ith row with new row containing status in place of player(string is immutable)
	 */
		var i = parseInt(Matrix.player.row);
		var j = parseInt(Matrix.player.col);
		if (Matrix.down.value === 'k') {
			togglePorts();
			Matrix.down.value = 'K';
		}
		CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, Matrix.status);  // ith row containing status in place of player
		CurrentBoard[i + 1] = replaceCharBy(CurrentBoard[i + 1], j, 's'); // ith down row
		Matrix.status = Matrix.down.value; // update the status
	}
	else if (obstacle.includes(Matrix.down.value)) {
		alert("you lost")
		level = level - 1;
		nextLevel();
		
	}
	else if (Matrix.down.value == 't' || Matrix.down.value == 'T') {
		alert("you Won")
		nextLevel();
	} else {

	}
	remove();
	drawBoard(CurrentBoard);

}

// pressed 4 (left)
function left(Matrix) {
	if (Matrix.left.value == null) {
		
	}
	else if (nonObstacle.includes(Matrix.left.value)) {
		var i = parseInt(Matrix.player.row);
		var j = parseInt(Matrix.player.col);
		if (Matrix.left.value === 'k') {
			togglePorts();
			Matrix.left.value = 'K';
		}
		CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, Matrix.status); // replace player by status
		CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j-1,'s'); // replace the left value by player
		Matrix.status = Matrix.left.value;
	}
	else if (obstacle.includes(Matrix.left.value)) {
		alert("you lost")
		level = level - 1;
		nextLevel();
	}
	else if (Matrix.left.value == 't' || Matrix.left.value == 'T') {
		alert("you Won")
		nextLevel();
	} else {
		
	}
	remove();
	drawBoard(CurrentBoard);

}

// pressed 6 (right)
function right(Matrix) {
	if (Matrix.right.value == null) {
		
	}
	else if (nonObstacle.includes(Matrix.right.value)) {
		var i = parseInt(Matrix.player.row);
		var j = parseInt(Matrix.player.col);
		if (Matrix.right.value === 'k') {
			togglePorts();
			Matrix.right.value = 'K';
		}
		CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, Matrix.status); // replace player by status
		CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j + 1, 's'); // replace right value by player
		Matrix.status = Matrix.right.value;
	}
	else if (obstacle.includes(Matrix.right.value)) {
		alert("you lost")
		level = level - 1;
		nextLevel();
	}
	else if (Matrix.right.value == 't' || Matrix.right.value == 'T') {
		alert("you Won")
		nextLevel();
	} else {
		alert(CurrentBoard[i])
	}
	remove();
	drawBoard(CurrentBoard);

}

/* replace a character in a string by another character
 * replace ith character by value
 */ 
function replaceCharBy(row,j,value) {
	var start = row.substr(0, j) + value;
	var end = "";
	if (row.length > j + 1) {
		end = row.substr(j+1, row.length-1);
	} else {
		end = "";
	}
	console.log(start,end,"%%%",value)
	row = start + end;
	return row;
}
// clean board before rerendering 
function remove() {
	var parent = document.getElementById("game-board");
	parent.innerHTML = "";
}
// toggle horizontal switches
function toggleHorizontalSwitch() {
	for (var i = 0; i < CurrentBoard.length; i++) {
		for (var j = 0; j < CurrentBoard[i].length; j++) {
			if (CurrentBoard[i].charAt(j) === 'H') {
				CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, 'h');
			}
			else if (CurrentBoard[i].charAt(j) === 'h') {
				CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, 'H');
			}
			else {

            }
		}
    }
}

// toggle vertical switches
function toggleVerticalSwitch() {
	for (var i = 0; i < CurrentBoard.length; i++) {
		for (var j = 0; j < CurrentBoard[i].length; j++) {
			if (CurrentBoard[i].charAt(j) === 'V') {
				CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, 'v');
			}
			else if (CurrentBoard[i].charAt(j) === 'v') {
				CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, 'V');
			}
			else {

			}
		}
	}
}

// toggle ports
function togglePorts() {
	for (var i = 0; i < CurrentBoard.length; i++) {
		for (var j = 0; j < CurrentBoard[i].length; j++) {
			if (CurrentBoard[i].charAt(j) === 'p') {
				CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, 'P');
			}
			else if (CurrentBoard[i].charAt(j) === 'P') {
				CurrentBoard[i] = replaceCharBy(CurrentBoard[i], j, 'p');
			}
			else {

			}
		}
	}
}
