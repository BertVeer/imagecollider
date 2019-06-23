// 
//  IMAGECOLLIDER.JS v0.1
//  Demo program
//

var canvas;
var image1 = new Image();
var image2 = new Image();
var mouse = { x:0, y:0 };
var collider = new ImageCollider();


function nextFrame() {

	let pos1 = { x: mouse.x - image1.width/2, y: mouse.y - image1.height/2 };
	let pos2 = { x: 0, y: 50 };

	let context = canvas.getContext("2d");
	context.clearRect(0,0, canvas.width, canvas.height);
    context.drawImage(image1, pos1.x, pos1.y);
    context.drawImage(image2, pos2.x, pos2.y);

    let collision = collider.collide(
    	image1, pos1.x, pos1.y, 
    	image2, pos2.x, pos2.y
    );

    canvas.style.background = collision ? "#e0f0ff" : "#60d0ff"; 
	requestAnimationFrame(nextFrame);
}


function run() {

	canvas = document.createElement("canvas");
	canvas.width = 640;
	canvas.height = 480;
	canvas.addEventListener("mousemove", function(e) { mouse = { x: e.offsetX, y: e.offsetY }; });
	document.body.appendChild(canvas);	

	image1.src = "bird.png";
	image2.src = "branch.png";

	nextFrame();
}