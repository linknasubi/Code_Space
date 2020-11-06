let canvGame, ctxGame




// setup config variables and start the program
function init() {
	
	canvGame = document.getElementById('gameCanvas')
	canvGame.width = window.innerWidth*0.60;
	canvGame.height = window.innerHeight*0.70;
	canvGame.setAttribute('style', "position: absolute;  left: 20%; top: 90%; border:2px solid blue");
	ctxGame = canvGame.getContext('2d')
	ctxGame.globalCompositeOperation = 'destination-over';
}

init();
