// Scene. Updates and draws a single scene of the game.

function InstructionsScene()
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
	this.music = AudioFX('sounds/2 - Select.mp3', { loop: true });

}


InstructionsScene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;

	if(interacted)
		this.music.play();
	
}

InstructionsScene.prototype.actualizarOpcion = function(keycode){

	switch(keycode) {
	    case 13:
	    		activo = 3;
	    		this.music.stop();
	    break;

	  default:
	    // code block
	}

}

InstructionsScene.prototype.draw = function ()
{
	
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	this.bottle.draw();

    //titulo
    var opcion2 = "INSTRUCTIONS";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion2,160,88);
    
    //Message
    var message = "PRESS 'ENTER' TO RETURN";
	context.fillText(message,72,400);
    
	context.fillText("<-/->",80,128+16);
    context.fillText("      ARROW KEYS",80,128);
	context.fillText("      TO MOVE PILL",80,160-8);

	context.fillText("  Z   TO ROTATE PILL",80,192+8);

	context.fillText("DOWN",80,240);
    context.fillText("TO PULL DOWN PILL",176,256);
	context.fillText("ARROW",80,272-8);

}



