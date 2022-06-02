// Scene. Updates and draws a single scene of the game.

function MainMenuScene()
{
	// Loading spritesheet

	var bottleTexture = new Texture("imgs/main_menu.png");
	var corazonTexture = new Texture("imgs/heart.png");
	//this.bottle = new StaticImage(0, 0, 256*3, 240, bottleTexture);


	this.bottle = new Sprite(0,0,512,480,1,bottleTexture);
	this.bottle.addAnimation();
	this.bottle.addKeyframe(0, [0, 0, 512, 480]);

	this.corazon = new StaticImage(128,336,16,16,corazonTexture);
    this.posHeart = 0;

	// Store current time
	this.currentTime = 0
	
	this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
	this.capsuleTimerX = 0;

	this.music = AudioFX('sounds/1 - Title Theme.mp3', { loop: true });
	this.moveHeart = AudioFX('sounds/SFX 8.mp3');

		
}


MainMenuScene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	

	if(interacted)
		this.music.play();

	
}

MainMenuScene.prototype.actualizarOpcion = function(keycode){

	switch(keycode) {
  		case 40:

	    	if (this.corazon.y<= 336+32*2-32) {
            this.corazon.y=this.corazon.y+32;
            this.posHeart = this.posHeart+1;
            this.corazon.draw();
            this.moveHeart.stop();
            this.moveHeart.play();
        	}

	    break;
	  	case 38:
		    if (this.corazon.y-32 >= 336) {
	            this.corazon.y=this.corazon.y-32;
	            this.posHeart = this.posHeart-1;
	            this.corazon.draw();
	            this.moveHeart.stop();
	            this.moveHeart.play();
	        }
	    break;
	    case 13:
	    		activo = this.posHeart;
	    		this.music.stop();
	    break;
	    case 32:
	    		activo = this.posHeart;
	    		this.music.stop();
	    break;

	  default:
	    // code block
	}

}

MainMenuScene.prototype.draw = function ()
{
	
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	this.bottle.draw();

	var opcion1 = "START GAME";
	context.font = "16px Atari";
	//var textSize = context.measureText(opcion1);
	context.fillStyle = "white";
	context.fillText(opcion1,160,352);

	var opcion2 = "INSTRUCTIONS";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion2,160,384);

	var opcion3 = "CREDITS";
	context.font = "16px Atari";
	context.fillStyle = "white";
	context.fillText(opcion3,160,416);

	this.corazon.draw();

}



