let canvGame, ctxGame

alt_array = [[1,2,3,4,5]];
quest_array = [["why"]];
questions = []


// setup config variables and start the program
function init_game() {
	
	canvGame = document.getElementById('gameCanvas')
	resolutionX = window.innerWidth*0.60;
	resolutionY = window.innerHeight*0.70;
	canvGame.width = resolutionX;
	canvGame.height = resolutionY;
	canvGame.setAttribute('style', "position: absolute;  left: 20%; top: 90%; border:2px solid blue");
	ctxGame = canvGame.getContext('2d')
	ctxGame.globalCompositeOperation = 'destination-over';
	
}

init_game();

function Question(alt_array, question){
	this.alt_array = alt_array;
	this.question = question;
}


function draw_Question(){
	
	ctxGame.clearRect(0, 0, canvGame.width, canvGame.height); 


	var question = new Question([1,2,question_flag,question_flag, question_flag], "Why?");



	ctxGame.beginPath();
	ctxGame.moveTo(0, canvGame.height*0.8);
	ctxGame.lineWidth = 3;
	ctxGame.lineTo(canvGame.width, canvGame.height*0.8);
	ctxGame.stroke();
	ctxGame.closePath();

	questions_num = 5;

	for(i=0; i<=questions_num; i++){
		ctxGame.beginPath();
		ctxGame.moveTo((canvGame.width/questions_num)*i, canvGame.height);
		ctxGame.lineWidth = 3;
		ctxGame.lineTo((canvGame.width/questions_num)*i, canvGame.height*0.8);
		ctxGame.stroke();
		ctxGame.closePath();

		ctxGame.font = 'italic 18px Arial';

		ctxGame.textBaseline = 'middle';
		ctxGame.fillStyle = 'red';
		ctxGame.fillText(question.alt_array[i], ((canvGame.width/questions_num)*i)+10, canvGame.height*0.9);

	}
}



