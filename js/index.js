// initialize config variables here
let canvas, ctx

var circle_nodes = [];
var line_nodes = [];
var out_circles = [];
var mouse_click = [{x:0, y:0}];



// setup config variables and start the program
function init() {
	
	

	// set our config variables
	canvas = document.getElementById('gameCanvas')
	canvas.width = window.innerWidth;
	var heightRatio = 0.5;
	canvas.height = canvas.width * heightRatio;

	ctx = canvas.getContext('2d')
	ctx.globalCompositeOperation = 'destination-over';
	window.requestAnimationFrame(draw);

}

init();


function distance(xo, x, yo, y, radius, i){
	dist = Math.sqrt(((x-xo) ** 2) + ((y - yo) ** 2))

	if (dist <= radius*1.1){
		circle_nodes[i].color = "green";
	}

}



canvas.addEventListener('click', (e) => {
	pos = {
	  x: e.clientX-5,
	  y: e.clientY-15
	};

	for(var i = 0; i < circle_nodes.length; i++){
		distance(pos.x, circle_nodes[i].x, pos.y, circle_nodes[i].y, circle_nodes[i].radius, i);
		console.log(circle_nodes[i].x)
	}
	
});


function Line(){
	this.xo = 0;
	this.yo = 0;
	this.x = 0;
	this.y = 0;

}


Line.prototype.update = function(i){
	
	this.xo = circle_nodes[i].x;
	this.yo = circle_nodes[i].y;
	this.x = circle_nodes[i+1].x;
	this.y = circle_nodes[i+1].y;
	
	ctx.beginPath();
	ctx.moveTo(this.xo, this.yo);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
	ctx.closePath();
	


}

function Circle(xPos, yPos){

	var sign = 0
	var sign_aux = Math.round(Math.random()*2);
	if(sign_aux == 1){
		sign = 1;
	}

	else{
		sign = -1;
	}
	this.x = xPos;
	this.y = yPos;
	this.velocity = sign * 0.005;
	this.radius = Math.round(Math.random()*((canvas.width/60)-(canvas.width/90)) + (canvas.width/90));
	this.range = Math.random()/8
	this.radians = 0
	this.color = 'gray';
	
	
}


Circle.prototype.update = function(){

	

	this.radians += this.velocity;

	

	if(this.radians > 20){
		this.velocity *= -1;
	}

	if(this.radians < -20){
		this.velocity *= -1;
	}

	ctx.beginPath();
	ctx.fillStyle = this.color;
	this.x += Math.cos(this.radians) * this.range;
	this.y += Math.sin(this.radians) * this.range;
	ctx.arc(this.x , this.y , this.radius, 0, 2 * Math.PI, false)
	ctx.fill();
	ctx.stroke();
	ctx.closePath();

	
	
}




function draw_circle(){

	number_points = 10
	var rel_distance_x = [-(canvas.width/6.4), -(canvas.width/6.4)]
	var rel_distance_y = [-(canvas.width/6.4), -(canvas.width/6.4)]

	for(var i = 0; i < number_points; i++){

		sectionXo = ((canvas.width+rel_distance_x[0])*(i+1))/number_points;
		sectionX = ((canvas.width+rel_distance_x[1])*(i+2)/number_points);
		sectionYo = ((canvas.height+rel_distance_y[0])*(number_points-i+2)/number_points);
		sectionY = ((canvas.height+rel_distance_y[1])*(number_points-i+1)/number_points);
		randomX = Math.round(Math.random()*(sectionX - sectionXo) + sectionXo);
		randomY = Math.round(Math.random()*(sectionY - sectionYo) + sectionYo);
		var circle = new Circle(randomX, randomY);
		circle_nodes.push(circle);
	}

	for(var i = 0; i < (circle_nodes.length - 1); i++){
		var line = new Line()
		line_nodes.push(line)

	}
	
}


draw_circle();



function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
	

	for(i=0; i<circle_nodes.length; i++){
		circle_nodes[i].update();


	}

	for(i=0; i<line_nodes.length; i++){
		line_nodes[i].update(i);

	}
	

	
	window.requestAnimationFrame(draw);
}




// wait for the HTML to load
document.addEventListener('DOMContentLoaded', init)


