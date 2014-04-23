// global variables
var game_canvas;
var game_context;
var timer_canvas;
var timer_context;
var timerID = 0;
var startTime;
var timeLeft = 0;
var Spiece = new Image(); Spiece.src =  "images/start.gif";//6
var Epiece = new Image(); Epiece.src ="images/end.gif";    //7
var Ipiece1 = new Image(); Ipiece1.src = "images/I1.gif";  //0
var Ipiece2 = new Image(); Ipiece2.src = "images/I2.gif";  //1
var Lpiece1 = new Image(); Lpiece1.src = "images/L1.gif";  //2
var Lpiece2 = new Image(); Lpiece2.src = "images/L2.gif";  //3
var Lpiece3 = new Image(); Lpiece3.src = "images/L3.gif";  //4
var Lpiece4 = new Image(); Lpiece4.src = "images/L4.gif";  //5
var mouse_x;
var mouse_y;
var clickedX;
var clickedY;
var rotations;
var answers;

//Settings class
var settings = {
	rows: 10,
	columns: 10,
	width: 40,
	height: 40
};



//Runs when the window loads
window.onload = function() {
	//Load game_canvas and game_context
	game_canvas = document.getElementById("game_canvas");
	game_context = game_canvas.getContext("2d");
	console.log("Game canvas loaded!");

	//Load timer canvas and context
	timer_canvas = document.getElementById("timer_canvas");
	timer_context = timer_canvas.getContext("2d");
	console.log("Timer canvas loaded!");
	timer_context.font = "bold 20px Time New Roman";
	timer_context.fillText("Time Left:", 55, 20);
	setupTimer();
	updateTimer();

	init();
}

//Mouse even listener
window.onclick = function(e) {
	mouse_x = e.pageX;
	mouse_y = e.pageY;

	if (Math.floor(mouse_x / settings.width) < settings.columns 
		&& Math.floor(mouse_y / settings.height) < settings.height) {
		clickedX = Math.floor(mouse_x/settings.width);
		clickedY = Math.floor(mouse_y/settings.height);

		if (timerID !== 0) {
			switch(rotations[clickedX][clickedY]) {
			case 0:
				rotations[clickedX][clickedY] = 1;
				break;
			case 1:
				rotations[clickedX][clickedY] = 0;
				break;
			case 2:
				rotations[clickedX][clickedY] = 3;
				break;
			case 3:
				rotations[clickedX][clickedY] = 4;
				break;
			case 4:
				rotations[clickedX][clickedY] = 5;
				break;
			case 5:
				rotations[clickedX][clickedY] = 2;
				break;
			default:
				break;
			}
		}
		

		
		console.log(clickedX + ", " + clickedY + " rotation = " + rotations[clickedX][clickedY]);
		console.log(clickedX + ", " + clickedY + " answer = " + answers[clickedX][clickedY]);
	}

	drawCanvas();
	if (checkAnswer() && timerID !== 0) {
		endGame();
	}
}

function checkAnswer() {
	for (var x = 0; x < settings.rows; x++) {
		for (var y = 0; y < settings.columns; y++) {
			if (rotations[x][y] === answers[x][y]) {
				console.log("true")
			} else {
				console.log("false");
				return false;
			}
		}
	}
	return true;
}

//ends the game and stops timemr
function endGame() {
	alert("YOU WON A LIFE!");
	clearTimeout(timerID);
	timerID = 0;
}

function init() {
	answers = new Array(10);
	rotations = new Array(10);
	for (var x = 0; x < settings.rows; x++) {
		rotations[x] = new Array(10);
		answers[x] = new Array(10);
	}

	for (var x = 0; x < settings.rows; x++) {
		for (var y = 0; y < settings.columns; y++) {
			if (x === 0 && y === 9) {
				rotations[x][y] = 6;
			} else if (x === 9 && y === 9) {
				rotations[x][y] = 7;
			} else {
				//rotations[x][y] = Math.floor(Math.random() * 6);
				rotations[x][y] = -1;
			}

			answers[x][y] = -1;
		}
	}

	setupAnswer();
	drawCanvas();
}

function setupAnswer() {
	answers[0][9] = 6; //start
	answers[9][9] = 7; //end
	answers[0][6] = 3;
	answers[0][5] = 4;
	answers[1][5] = 1;
	answers[1][6] = 1;
	answers[1][9] = 1;
	answers[2][5] = 1;
	answers[2][6] = 5;
	answers[2][7] = 0;
	answers[2][8] = 0;
	answers[2][9] = 2;
	answers[3][5] = 1;
	answers[4][5] = 1;
	answers[5][5] = 5;
	answers[5][6] = 0;
	answers[5][7] = 0;
	answers[5][8] = 3;
	answers[6][8] = 1;
	answers[7][8] = 1;
	answers[8][8] = 5;
	answers[8][9] = 3;

	//testing
	rotations[0][9] = 6; //start
	rotations[9][9] = 7; //end
	rotations[0][6] = 4;
	rotations[0][5] = 2;
	rotations[1][5] = 0;
	rotations[1][6] = 1;
	rotations[1][9] = 0;
	rotations[2][5] = 0;
	rotations[2][6] = 3;
	rotations[2][7] = 0;
	rotations[2][8] = 1;
	rotations[2][9] = 5;
	rotations[3][5] = 1;
	rotations[4][5] = 0;
	rotations[5][5] = 3;
	rotations[5][6] = 0;
	rotations[5][7] = 1;
	rotations[5][8] = 4;
	rotations[6][8] = 0;
	rotations[7][8] = 1;
	rotations[8][8] = 3;
	rotations[8][9] = 2;
}

//Draws cubes onto game canvas
function drawCanvas() {
	console.log("redrawn canvas");
	game_context.clearRect(0, 0, 400, 400);

	for (var i = 0; i < settings.rows; i++) {
		for (var j = 0; j < settings.columns; j++) {
			var x = j * settings.width;
			var y = i * settings.height;

			switch (rotations[Math.floor(x / settings.width)][Math.floor(y / settings.height)]) {
				case 0:
					game_context.drawImage(Ipiece1, x, y);
					break;
				case 1:
					game_context.drawImage(Ipiece2, x, y);
					break;
				case 2:
					game_context.drawImage(Lpiece1, x, y);
					break;
				case 3:
					game_context.drawImage(Lpiece2, x, y);
					break;
				case 4:
					game_context.drawImage(Lpiece3, x, y);
					break;
				case 5:
					game_context.drawImage(Lpiece4, x, y);
					break;
				case 6:
					game_context.drawImage(Spiece, x, y);
					break;
				case 7:
					game_context.drawImage(Epiece, x, y);
					break;
				default:
					break;
			}
		}
	}
}

//Initializes and starts the timer
function setupTimer() {
	startTime = Date.now();
	timerID = setInterval("updateTimer()", 1000);
}

//Updates the on screen timer.
function updateTimer() {
	timeLeft = Math.round((30000 - (Date.now() - startTime)) / 1000); // 30 second limit
	timer_context.clearRect(0, 22, 200, 100);  // clear timer canvas area before redrawing

	timer_context.fillStyle = "rgb(0,0,0)";
	timer_context.font = "40px Time New Roman";
	if (timeLeft >= 100) {
		timer_context.fillText(timeLeft, 70, 60);
	} else if (timeLeft >= 10) {
		timer_context.fillText(timeLeft, 80, 60);
	} else {
		timer_context.fillText(timeLeft, 90, 60);
	}

	if(timeLeft <= 0) {
		clearInterval(timerID);
		alert("TIME IS UP!");
	}
}