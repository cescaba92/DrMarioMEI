// Scene. Updates and draws a single scene of the game.

function CreditsScene()
{
	// Loading spritesheet

	var bottleTexture = new Texture("imgs/fondo_menu.png");
	var corazonTexture = new Texture("imgs/heart.png");
	//this.bottle = new StaticImage(0, 0, 256*3, 240, bottleTexture);


	this.bottle = new Sprite(0,0,512,480,1,bottleTexture);
	this.bottle.addAnimation();
	this.bottle.addKeyframe(0, [0, 0, 512, 480]);

	// Store current time
	this.currentTime = 0;

	this.music = AudioFX('sounds/10 - Ending Theme.mp3', { loop: true });
	
}


CreditsScene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	if(interacted)
		this.music.play();

	
}

CreditsScene.prototype.actualizarOpcion = function(keycode){

	switch(keycode) {
	    case 13:
	    		activo = 3;
	    		this.music.stop();
	    break;

	  default:
	    // code block
	}

}
CreditsScene.prototype.draw = function ()
{
	
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	this.bottle.draw();

    //titulo
    var opcion2 = "CREDITS";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion2,200,88);
    
	var opcion1 = "CREATED BY:";
	context.font = "16px Atari";
	//var textSize = context.measureText(opcion1);
	context.fillStyle = "white";
	context.fillText(opcion1,120,192);

	var opcion3 = "OLIVER URIEL";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion3,80,224);
    
    var opcion3 = "  ANDRANGO CARRILLO";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion3,80,240);
    
    var opcion4 = "CÉSAR JAVIER";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion4,80,272);
    
    var opcion4 = "  CABANILLAS DEL AGUILA";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion4,80,288);
    
    //Message
    var message = "PRESS 'ENTER' TO RETURN";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(message,72,400);

}
