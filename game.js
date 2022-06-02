
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var contador_top = 0;
var scene = new Scene(contador_top,0,1);
var mainMenuScene = new MainMenuScene();
var instructionsScene = new InstructionsScene();
var creditsScene = new CreditsScene();
var activo = 3;
var previousTimestamp;
var keyboard = [];
var interacted;


// Control keyboard events

function keyDown(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;

	switch(activo){
			case 3:
                scene = new Scene(contador_top,0,1);
				mainMenuScene.actualizarOpcion(keycode.which);
			break;
            case 1:
				//instructionsScene.update(TIME_PER_FRAME);
				instructionsScene.actualizarOpcion(keycode.which);
			break;
            case 2:
				//creditsScene.update(TIME_PER_FRAME);
				creditsScene.actualizarOpcion(keycode.which);
			break;
			case 0:
				//scene.update(TIME_PER_FRAME);
				scene.actualizarOpcion(keycode.which);
			break;
		}


        		
}

function keyUp(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
}

function click()
{
	interacted = true;
}

// Initialization

function init()
{
	for(var i=0; i<256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp)
{
	var deltaTime = timestamp - previousTimestamp;
	if(deltaTime > TIME_PER_FRAME)
	{
		switch(activo){
			case 3:
				mainMenuScene.update(TIME_PER_FRAME);
				previousTimestamp += TIME_PER_FRAME
				mainMenuScene.draw();
			break;
            case 1:
				instructionsScene.update(TIME_PER_FRAME);
				previousTimestamp += TIME_PER_FRAME
				instructionsScene.draw();
			break;
            case 2:
				creditsScene.update(TIME_PER_FRAME);
				previousTimestamp += TIME_PER_FRAME
				creditsScene.draw();
			break;
			case 0:
				scene.update(TIME_PER_FRAME);
				previousTimestamp += TIME_PER_FRAME
				scene.draw();
			break;
		}

		
	}
	window.requestAnimationFrame(frameUpdate)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

