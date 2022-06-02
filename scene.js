const VIRUS_ANIMATION = 0;
const VIRUS_BIG_ANIMATION = 0;

const CAPSULE_INIT_TIMER_X = 5;
const CAPSULE_INIT_TIMER_Y = 15;
const CAPSULE_INIT_TIMER_ROTATE = 15;

// Scene. Updates and draws a single scene of the game.

function Scene(top, score, level)
{
	//Sonidos
	this.music = AudioFX('sounds/5 - Chill.mp3', { loop: true });
	this.movercapsula = AudioFX('sounds/SFX 10.mp3');
	this.girarcapsula = AudioFX('sounds/SFX 12.mp3');
	this.borrarcapsula = AudioFX('sounds/SFX 9.mp3');
	this.golpevirus = AudioFX('sounds/SFX 13.mp3');
	this.muertevirus = AudioFX('sounds/SFX 16.mp3');
	this.gameover = AudioFX('sounds/7 - Game Over.mp3');
	this.ganarnivel = AudioFX('sounds/SFX 2.mp3');
	// Loading spritesheet
	var bluevirus = new Texture("imgs/virus_blue_sprite.png");
	var redvirus = new Texture("imgs/virus_red_sprite.png");
	var yellowvirus = new Texture("imgs/virus_yellow_sprite.png");
	var bottleTexture = new Texture("imgs/screens_game.png");
	var blankTexture = new Texture("imgs/black8x8.png")
	var blueBigvirus = new Texture("imgs/virus_blue_sprite_big.png");
	var yellowBigvirus = new Texture("imgs/virus_yellow_sprite_big.png");
	var redBigvirus = new Texture("imgs/virus_red_sprite_big.png");
    var marioPoses = new Texture("imgs/marioPoses.png");

	//this.bottle = new StaticImage(0, 0, 256*3, 240, bottleTexture);

	//Crear fondo de juego
	this.bottle = new Sprite(0,0,512,480,1,bottleTexture);
	this.bottle.addAnimation();
	this.bottle.addKeyframe(0, [512, 0, 512, 480]);

	//Texturas de la botella
	this.blank = new StaticImage(0, 0, 16, 16, blankTexture);

	this.bluevirusSprite = new Sprite(160, 136, 16, 16, 3, bluevirus);

	this.bluevirusSprite.addAnimation();
	this.bluevirusSprite.addKeyframe(VIRUS_ANIMATION, [0, 0, 16, 16]);
	this.bluevirusSprite.addKeyframe(VIRUS_ANIMATION, [0, 16, 16,16]);

	this.bluevirusSprite.setAnimation(VIRUS_ANIMATION);

	this.redvirusSprite = new Sprite(160, 128, 16, 16, 3, redvirus);

	this.redvirusSprite.addAnimation();
	this.redvirusSprite.addKeyframe(VIRUS_ANIMATION, [0, 0, 16, 16]);
	this.redvirusSprite.addKeyframe(VIRUS_ANIMATION, [0, 16, 16,16]);

	this.redvirusSprite.setAnimation(VIRUS_ANIMATION);

	this.yellowvirusSprite = new Sprite(160, 120, 16, 16, 3, yellowvirus);

	this.yellowvirusSprite.addAnimation();
	this.yellowvirusSprite.addKeyframe(VIRUS_ANIMATION, [0, 0, 16, 16]);
	this.yellowvirusSprite.addKeyframe(VIRUS_ANIMATION, [0, 16, 16,16]);

	this.yellowvirusSprite.setAnimation(VIRUS_ANIMATION);

	// Loading texture to use in a TileMap
	this.tilesheet = new Texture("imgs/tiles_fn.png");
	
	this.colorIzq = getRandomInt(1,4);
    this.colorDer = getRandomInt(1,4);
    this.next_colorIzq = getRandomInt(1,4);
    this.next_colorDer = getRandomInt(1,4);

	//Capsula Inicial
	this.capsulalado1 = new Sprite(192+16*3, 160,16,16,1,this.tilesheet);
    this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(0,[16*0,112,16,16]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(1,[16*0,0,14,16]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(2,[16*1,0,14,16]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(3,[16*2,0,14,16]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(4,[16*0,16,14,16]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(5,[16*1,16,14,16]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(6,[16*2,16,14,16]);
    this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(7,[16*0,32,16,14]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(8,[16*1,32,16,14]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(9,[16*2,32,16,14]);
    this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(10,[16*0,48,16,14]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(11,[16*1,48,16,14]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(12,[16*2,48,16,14]);
    this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(13,[16*0,64,16,14]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(14,[16*1,64,16,14]);
	this.capsulalado1.addAnimation();
	this.capsulalado1.addKeyframe(15,[16*2,64,16,14]);
	this.capsulalado1.setAnimation(6+this.colorIzq)

	this.capsulalado2 = new Sprite(192+16*3+16, 160,16,16,1,this.tilesheet);
    this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(0,[16*0,112,16,16]);
    this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(1,[16*0,0,14,16]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(2,[16*1,0,14,16]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(3,[16*2,0,14,16]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(4,[16*0,16,14,16]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(5,[16*1,16,14,16]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(6,[16*2,16,14,16]);
    this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(7,[16*0,32,16,14]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(8,[16*1,32,16,14]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(9,[16*2,32,16,14]);
    this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(10,[16*0,48,16,14]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(11,[16*1,48,16,14]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(12,[16*2,48,16,14]);
    this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(13,[16*0,64,16,14]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(14,[16*1,64,16,14]);
	this.capsulalado2.addAnimation();
	this.capsulalado2.addKeyframe(15,[16*2,64,16,14]);
	this.capsulalado2.setAnimation(9+this.colorIzq)

    //Capsula Siguiente
 	this.next_capsulalado1 = new Sprite(384-4,144+8-16+4,16,14,1,this.tilesheet);
    this.next_capsulalado1.addAnimation();
	this.next_capsulalado1.addKeyframe(0,[16*0,112,16,14]);
	this.next_capsulalado1.addAnimation();
	this.next_capsulalado1.addKeyframe(1,[16*0,32,16,14]);
    this.next_capsulalado1.addAnimation();
	this.next_capsulalado1.addKeyframe(2,[16*1,32,16,14]);
    this.next_capsulalado1.addAnimation();
	this.next_capsulalado1.addKeyframe(3,[16*2,32,16,14]);
	this.next_capsulalado1.setAnimation(this.next_colorIzq);

	this.next_capsulalado2 = new Sprite(384-4+16,144+8-16+4,16,14,1,this.tilesheet);
    this.next_capsulalado2.addAnimation();
	this.next_capsulalado2.addKeyframe(0,[16*0,112,16,14]);
	this.next_capsulalado2.addAnimation();
	this.next_capsulalado2.addKeyframe(1,[16*0,48,16,14]);
    this.next_capsulalado2.addAnimation();
	this.next_capsulalado2.addKeyframe(2,[16*1,48,16,14]);
    this.next_capsulalado2.addAnimation();
	this.next_capsulalado2.addKeyframe(3,[16*2,48,16,14]);
	this.next_capsulalado2.setAnimation(this.next_colorDer);

	this.currentTime= 0;
	this.capsuleTimerX = 0;
	this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
    this.capsuleTimerRotate = 0;
	this.multiplicadorY = 1;

	//Crear Animacion Lupa
	this.blueBigvirusSprite = new Sprite(88-24,336-24,48,48,3,blueBigvirus);
	this.blueBigvirusSprite.addAnimation(); //BAILE POR DEFECTO
	this.blueBigvirusSprite.addKeyframe(0, [0,0,48,48]);
	this.blueBigvirusSprite.addKeyframe(0, [48,0,48,48]);
	this.blueBigvirusSprite.addKeyframe(0, [96,0,48,48]);
    this.blueBigvirusSprite.addAnimation(); //RISA JUGADOR PIERDE
    this.blueBigvirusSprite.addKeyframe(1, [48,0,48,48]);
    this.blueBigvirusSprite.addKeyframe(1, [144,0,48,48]);
    this.blueBigvirusSprite.addAnimation(); //HERIDO
    this.blueBigvirusSprite.addKeyframe(2, [192,0,48,48]);
    this.blueBigvirusSprite.addKeyframe(2, [240,0,48,48]);
    this.blueBigvirusSprite.addAnimation(); //DESAPARICION (eliminación del último virus de este color)
    this.blueBigvirusSprite.addKeyframe(3, [336,0,48,48]);
    this.blueBigvirusSprite.addKeyframe(3, [288,0,48,48]);
    this.blueBigvirusSprite.addKeyframe(3, [336,0,48,48]);
    this.blueBigvirusSprite.addAnimation(); //ESCONDIDO (no quedan virus de este color en el tilemap)
    this.blueBigvirusSprite.addKeyframe(4, [336,0,48,48]);
	this.blueBigvirusSprite.setAnimation(0);
    
	this.yellowBigvirusSprite = new Sprite(88-24,336-24,48,48,3,yellowBigvirus);
	this.yellowBigvirusSprite.addAnimation();
	this.yellowBigvirusSprite.addKeyframe(0, [0,0,48,48]);
	this.yellowBigvirusSprite.addKeyframe(0, [48,0,48,48]);
	this.yellowBigvirusSprite.addKeyframe(0, [96,0,48,48]);
    this.yellowBigvirusSprite.addAnimation();
    this.yellowBigvirusSprite.addKeyframe(1, [48,0,48,48]);
    this.yellowBigvirusSprite.addKeyframe(1, [144,0,48,48]);
    this.yellowBigvirusSprite.addAnimation();
    this.yellowBigvirusSprite.addKeyframe(2, [192,0,48,48]);
    this.yellowBigvirusSprite.addKeyframe(2, [240,0,48,48]);
    this.yellowBigvirusSprite.addAnimation(); //DESAPARICION (eliminación del último virus de este color)
    this.yellowBigvirusSprite.addKeyframe(3, [336,0,48,48]);
    this.yellowBigvirusSprite.addKeyframe(3, [288,0,48,48]);
    this.yellowBigvirusSprite.addKeyframe(3, [336,0,48,48]);
    this.yellowBigvirusSprite.addAnimation(); //ESCONDIDO (no quedan virus de este color en el tilemap)
    this.yellowBigvirusSprite.addKeyframe(4, [336,0,48,48]);
	this.yellowBigvirusSprite.setAnimation(0);

	this.redBigvirusSprite = new Sprite(88-24,336-24,48,48,3,redBigvirus);
	this.redBigvirusSprite.addAnimation();
	this.redBigvirusSprite.addKeyframe(0, [0,0,48,48]);
	this.redBigvirusSprite.addKeyframe(0, [48,0,48,48]);
	this.redBigvirusSprite.addKeyframe(0, [96,0,48,48]);
    this.redBigvirusSprite.addAnimation();
    this.redBigvirusSprite.addKeyframe(1, [48,0,48,48]);
    this.redBigvirusSprite.addKeyframe(1, [144,0,48,48]);
    this.redBigvirusSprite.addAnimation();
    this.redBigvirusSprite.addKeyframe(2, [192,0,48,48]);
    this.redBigvirusSprite.addKeyframe(2, [240,0,48,48]);
    this.redBigvirusSprite.addAnimation(); //DESAPARICION (eliminación del último virus de este color)
    this.redBigvirusSprite.addKeyframe(3, [336,0,48,48]);
    this.redBigvirusSprite.addKeyframe(3, [288,0,48,48]);
    this.redBigvirusSprite.addKeyframe(3, [336,0,48,48]);
    this.redBigvirusSprite.addAnimation(); //ESCONDIDO (no quedan virus de este color en el tilemap)
    this.redBigvirusSprite.addKeyframe(4, [336,0,48,48]);
	this.redBigvirusSprite.setAnimation(0);

    this.marioSprite = new Sprite(368,144+8,64,80,6,marioPoses);
	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(0, [0,0,64,80]);
	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(1, [0,0,64,80]);
	this.marioSprite.addKeyframe(1, [64,0,64,80]);
	this.marioSprite.addKeyframe(1, [128,0,64,80]);
    
    this.marioSprite.setAnimation(0);
    
    this.marioSpriteStatic = new Sprite(368,144+8,64,80,3,marioPoses);
	this.marioSpriteStatic.addAnimation();
	this.marioSpriteStatic.addKeyframe(VIRUS_BIG_ANIMATION, [0,0,64,80]);
	//this.marioSprite.addKeyframe(VIRUS_BIG_ANIMATION, [64,0,64,80]);
	//this.marioSprite.addKeyframe(VIRUS_BIG_ANIMATION, [128,0,64,80]);
    
	this.marioSpriteStatic.setAnimation(VIRUS_BIG_ANIMATION);
    
    this.fondo_game_over = new Sprite(192,160,128,256,1,new Texture("imgs/fondo_game_over.png"));
    


    this.level = level;
    this.virus = this.level*6;
    this.score = score;
    this.top = top;
    this.heGanado = false;
    this.hePerdido = false;
    this.opcionEnter = -1;
    this.movimiento = true;
    this.cosenoBlue = 0;
    this.senoBlue = 0;
    this.cosenoYellow = 0;
    this.senoYellow = 0;
    this.cosenoRed = 0;
    this.senoRed = 0;
    
    //Movimiento de DrMario al lanzar la capsula
    this.lanzarCapsula = true;
    this.pausaporbajada = false;
    this.timeLanzamiento = 500;
    this.timeInicimientoLanzamiento = 0;
	this.animacionCapsula = false;

    this.huerfanos = [];
    this.objetobajar = new Sprite(450,450,16,16,1,this.tilesheet);
    this.sprite_herido = [];
    this.moverhuerfano = false;
    this.musicaactiva = false;
    //Tiempos de Virus sprites heridos
    this.timeBlueHerido = 0;
    this.timeRedHerido = 0;
    this.timeYellowHerido = 0;
    this.booleanBlueHerido = false;
    this.booleanRedHerido = false;
    this.booleanYellowHerido = false;
    this.existsBlueVirus = true;
    this.existsRedVirus = true;
    this.existsYellowVirus = true;
    this.booleanCapsuleToBlank = true;
    this.timeCapsuleToBlank = 0;


    //reset mapa de tiles (poniendo todo a black)
    for(var i=0; i<128; ++i) {
        level01.layers[0].data[i] = 0;
    }

	this.map = new Tilemap(this.tilesheet, [16, 16], [3, 8], [192, 160], level01, this.level, this.redvirusSprite,this.yellowvirusSprite,this.bluevirusSprite,this.blank);


	
	// Store current time
	this.currentTime = 0
	
	this.capsuleTimerY = CAPSULE_INIT_TIMER_Y;
	this.capsuleTimerX = 0;
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
		if(interacted && !this.musicaactiva){
		console.log("es por esto");
		this.musicaactiva = true;
		this.music.play();
		}


    if(this.movimiento && !this.heGanado) {
        if(keyboard[40] && !this.animacionCapsula) // KEY_DOWN EXTREME
            {
                this.multiplicadorY = 6;
            }

        //Keep capsule down
        this.capsuleTimerY--;

        if(this.capsuleTimerY <= 0 && !this.pausaporbajada && this.booleanCapsuleToBlank)
        {
            this.capsuleTimerY = CAPSULE_INIT_TIMER_Y/this.multiplicadorY;
            this.capsulalado1.y += 16;
            this.capsulalado2.y += 16;


            if(this.map.collisionMoveDown(this.capsulalado1) || this.map.collisionMoveDown(this.capsulalado2)) {
                this.capsulalado1.y -= 16;
                this.capsulalado2.y -= 16;

                this.hePerdido = this.map.updateMap(this.capsulalado1);
                this.hePerdido = this.map.updateMap(this.capsulalado2);
                this.sprite_herido = this.map.searchCombinations();

                if(this.sprite_herido.length >0){
                	console.log("Hubo Colisión");
                	this.borrarcapsula.stop();
                	this.borrarcapsula.play();
                }

                if(this.sprite_herido.includes(1,0)){
                	console.log("Mato uno");
                	this.booleanRedHerido = true;
                	this.borrarcapsula.stop();
                	this.borrarcapsula.play();
                }

                if(this.sprite_herido.includes(2,0)){
                		console.log("Mato dos");
                		this.booleanYellowHerido = true;
                   		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                }

                if(this.sprite_herido.includes(3,0)){
                		console.log("Mato tres");
                		this.booleanBlueHerido = true;
                   		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                }

              
                this.huerfanos = this.map.getDownObjects();
                
                
                //console.log("cuantos huerfanos:"+this.huerfanos)
                

				//Animacion Mario
				if( this.huerfanos.length  > 0){
					//console.log("SI HAY HUERFANOS");
               		this.lanzarCapsula = false;
               		this.pausaporbajada = true;
               		this.map.bajarHuerfanos(this.huerfanos);
                }else{
                	this.lanzarCapsula = true;
                	this.pausaporbajada = false;
                }

            }

            if((this.capsulalado1.y > 160+15*16) || (this.capsulalado2.y > 160+15*16)){
	            //console.log("valor de y: "+this.capsulalado1.y);

	            this.capsulalado1.y -= 16;
	            this.capsulalado2.y -= 16;

				this.hePerdido = this.map.updateMap(this.capsulalado1);
                this.hePerdido = this.map.updateMap(this.capsulalado2);
                this.sprite_herido = this.map.searchCombinations();
                //console.log("entra aqui deberia");


                if(this.sprite_herido.length >0){
                	console.log("Hubo Colisión");
                	this.borrarcapsula.stop();
                	this.borrarcapsula.play();
                }

                if(this.sprite_herido.includes(1,0)){
                	console.log("Mato uno");
                	this.booleanRedHerido = true;
                	this.borrarcapsula.stop();
                	this.borrarcapsula.play();
                }

                if(this.sprite_herido.includes(2,0)){
                		console.log("Mato dos");
                		this.booleanYellowHerido = true;
                   		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                }

                if(this.sprite_herido.includes(3,0)){
                		console.log("Mato tres");
                		this.booleanBlueHerido = true;
                   		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                }

                this.huerfanos = this.map.getDownObjects();
                //console.log("cuantos huerfanos:"+this.huerfanos)
                

				//Animacion Mario
				if( this.huerfanos.length  > 0){
					//console.log("SI HAY HUERFANOS");
               		this.lanzarCapsula = false;
               		this.pausaporbajada = true;
               		this.map.bajarHuerfanos(this.huerfanos);
                }else{
                	this.lanzarCapsula = true;
                	this.pausaporbajada = false;
                }

        	}
        }else{
        		this.huerfanos = this.map.getDownObjects();
        		if(this.capsuleTimerY <= 0 && this.huerfanos.length  > 0){
               		this.capsuleTimerY = CAPSULE_INIT_TIMER_Y/this.multiplicadorY;
               		this.lanzarCapsula = false;
               		this.pausaporbajada = true;
               		this.map.bajarHuerfanos(this.huerfanos);
               		console.log('entro en el else cuanto va huerfanos: '+this.huerfanos.length);
                }

                if( this.huerfanos.length  <= 0 && this.pausaporbajada){
               		
                	this.sprite_herido = this.map.searchCombinations();

                	if(this.sprite_herido.length >0){
                		console.log("Hubo Colisiónx2");
                		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                	}

                	if(this.sprite_herido.includes(1,0)){
                		console.log("Mato rojox2");
                		this.booleanRedHerido = true;
                		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                	}

                	if(this.sprite_herido.includes(2,0)){
                		console.log("Mato amarillox2");
                		this.booleanYellowHerido = true;
                   		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                	}

                	if(this.sprite_herido.includes(3,0)){
                		console.log("Mato bluex2");
                		this.booleanBlueHerido = true;
                   		this.borrarcapsula.stop();
                		this.borrarcapsula.play();
                	}

              
                	this.huerfanos = this.map.getDownObjects();

                	if( this.huerfanos.length  > 0){
               			this.lanzarCapsula = false;
               			this.pausaporbajada = true;
               			this.map.bajarHuerfanos(this.huerfanos);
                	}else{
                		this.lanzarCapsula = true;
                		this.pausaporbajada = false;
                	}

                }
        }
        
        


        //console.log(this.capsulalado1.x);
        //console.log(this.capsulalado2.x);

        // Move capsule left & right
        if(this.capsuleTimerX <= 0)
        {
            if(keyboard[37]) // KEY_LEFT
            {
                if((this.capsulalado1.x >= 192+16) && (this.capsulalado2.x >= 192+16)){
                    //console.log((this.capsulalado1.x >= 192+16) + ',' + (this.capsulalado2.x >= 192+16));
                    this.capsulalado1.x -= 16;
                    this.capsulalado2.x -= 16;
                    if(this.map.collisionMoveLeft(this.capsulalado1) || this.map.collisionMoveLeft(this.capsulalado2)) {
                        this.capsulalado1.x += 16;
                        this.capsulalado2.x += 16;
                    }
                }
                this.movercapsula.stop();
                this.movercapsula.play();
                this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
            }
            else if(keyboard[39]) // KEY_RIGHT
            {
                if((this.capsulalado1.x <= 192+16+16*8-3*16) && (this.capsulalado2.x <= 192+16+16*8-3*16)){
                    this.capsulalado1.x += 16;
                    this.capsulalado2.x += 16;
                    if(this.map.collisionMoveRight(this.capsulalado1) || this.map.collisionMoveRight(this.capsulalado2)) {
                        this.capsulalado1.x -= 16;
                        this.capsulalado2.x -= 16;
                    }
                }
                this.movercapsula.stop();
                this.movercapsula.play();
                this.capsuleTimerX = CAPSULE_INIT_TIMER_X;
            }
        }
        else{
            this.capsuleTimerX--;
        }

        if(this.capsuleTimerRotate <= 0)
        {
            if(keyboard[90] && !this.animacionCapsula) //Z
            {
                var columna2 = ((this.capsulalado2.currentAnimation-1)%3)+1;
                var animacion = this.capsulalado1.currentAnimation;
                var columna1 = ((animacion-1)%3)+1;
                var fila = Math.floor((animacion-1)/3)+1;
                //console.log(animacion+','+columna1+','+fila);
                switch (fila){
                    //Posicion A
                    case 1:
                        this.capsulalado1.setAnimation(3*2+columna1);
                        this.capsulalado2.setAnimation(3*3+columna2);
                        this.capsulalado2.x += 16;
                        this.capsulalado1.y += 16;
                    break;
                    //Posicion B
                    case 2:
                        this.capsulalado1.setAnimation(3*3+columna1);
                        this.capsulalado2.setAnimation(3*2+columna2);
                        this.capsulalado1.x += 16;
                        this.capsulalado2.y += 16;
                    break;
                    case 3:
                        this.capsulalado1.setAnimation(3*1+columna1);
                        this.capsulalado2.setAnimation(3*0+columna2);
                        this.capsulalado2.x -= 16;
                        this.capsulalado2.y -= 16;
                    break;
                    case 4:
                        this.capsulalado1.setAnimation(3*0+columna1);
                        this.capsulalado2.setAnimation(3*1+columna2);
                        this.capsulalado1.x -= 16;
                        this.capsulalado1.y -= 16;
                    break;
                }
                //Para no atravesar la pared de la derecha al rotar
                if (this.capsulalado1.x >= 320 || this.capsulalado2.x >= 320) {
                    this.capsulalado1.x -= 16;
                    this.capsulalado2.x -= 16;
                }

                this.capsuleTimerRotate = CAPSULE_INIT_TIMER_ROTATE;
                this.girarcapsula.stop();
            	this.girarcapsula.play();
            }
        }
        else{
            this.capsuleTimerRotate--;
        }

        this.multiplicadorY = 1;
    }

	// Update sprites
	this.bluevirusSprite.update(deltaTime);
	this.redvirusSprite.update(deltaTime);
	this.yellowvirusSprite.update(deltaTime);
	this.blueBigvirusSprite.update(deltaTime);
	this.yellowBigvirusSprite.update(deltaTime);
	this.redBigvirusSprite.update(deltaTime);
    this.marioSprite.update(deltaTime);
    this.marioSpriteStatic.update(deltaTime);
    this.fondo_game_over.update(deltaTime);
    this.next_capsulalado1.update(deltaTime);
    this.next_capsulalado2.update(deltaTime);
}


Scene.prototype.actualizarOpcion = function(keycode){

	switch(keycode) {
	    case 27:
	    		activo = 3;
	    		this.music.stop();
	    break;
        case 32:
            this.hePerdido = true;
            this.music.stop();
            this.gameover.play();
        break;
        case 38:
            this.lanzarCapsula = true;
        break;
        case 13:
            if (!this.movimiento && this.opcionEnter == 0) activo = 3;this.gameover.stop();
            if (this.level<5 && !this.movimiento && this.opcionEnter == 1) scene = new Scene(this.top,this.score,this.level+1);this.ganarnivel.stop();
        break;

        case 40:
                this.multiplicadorY = 6;
         break;

         case 78: //N
            if(this.level<5){scene = new Scene(this.top,this.score,this.level+1);this.music.stop();this.musicaactiva = false;}
        break;

        case 69: //E
            if (this.level < 10) scene = new Scene(this.top,this.score,this.level);this.ganarnivel.stop();
        break;
        case 82: //R
            this.next_colorIzq = 1;
            this.next_colorDer = 1;
            this.lanzarCapsula = true;
        break;
        case 84: //T
            this.next_colorIzq = 3;
            this.next_colorDer = 3;
            this.lanzarCapsula = true;
        break;
        case 89: //Y
            this.next_colorIzq = 2;
            this.next_colorDer = 2;
            this.lanzarCapsula = true;
        break;

	  default:
	    // code block
	}

}

Scene.prototype.draw = function ()
{
	
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	this.bottle.draw();

	var Nvirus = this.map.draw();
    if (this.virus > Nvirus) {
        var diferencia = this.virus-Nvirus;
        var points = 200;
        if (diferencia >= 2) points = points+diferencia*100*Math.pow(2, diferencia-1)*this.level;
        this.score = this.score+points;
        this.virus = Nvirus;
    }
    this.marioSprite.draw();

    var radio = 36;

    if (this.movimiento) {
        this.cosenoBlue = Math.cos(this.currentTime / 3600);
        this.senoBlue = Math.sin(this.currentTime / 3600);
        this.cosenoYellow = Math.cos((this.currentTime / 3600)+90);
        this.senoYellow = Math.sin((this.currentTime / 3600)+90);
        this.cosenoRed = Math.cos((this.currentTime / 3600)-90);
        this.senoRed = Math.sin((this.currentTime / 3600)-90);
    }

    context.save();
    //context.translate(-36 * Math.cos(this.currentTime / 4000),36 * Math.sin(this.currentTime / 4000));
    context.translate(-radio * this.cosenoBlue,radio * this.senoBlue);
    this.blueBigvirusSprite.draw();
    context.restore();

    context.save();
    context.translate(-radio * this.cosenoYellow,radio * this.senoYellow);
    this.yellowBigvirusSprite.draw();
    context.restore();

    context.save();
    context.translate(-radio * this.cosenoRed,radio * this.senoRed);
    this.redBigvirusSprite.draw();
    context.restore();

	if (this.hePerdido) { //PERDÍ? Sí, pues cargo el nuevo sprite de risa

        this.lanzarCapsula = false;
        var marioPoses = new Texture("imgs/marioPoses.png");
        var fondo_game_over = new Texture("imgs/fondo_game_over.png");

        this.blueBigvirusSprite.setFPS(12);
        this.blueBigvirusSprite.setAnimation(1);

        this.yellowBigvirusSprite.setFPS(12);
        this.yellowBigvirusSprite.setAnimation(1);
        
        this.redBigvirusSprite.setFPS(12);
        this.redBigvirusSprite.setAnimation(1);

        this.marioSprite = new Sprite(368,144+8,80,80,1,marioPoses);
        this.marioSprite.addAnimation();
        this.marioSprite.addKeyframe(VIRUS_BIG_ANIMATION, [192,0,80,80]);
        this.marioSprite.setAnimation(VIRUS_BIG_ANIMATION);
        
        this.fondo_game_over = new Sprite(192,160,128,256,1,fondo_game_over);
        this.fondo_game_over.addAnimation();
        this.fondo_game_over.addKeyframe(VIRUS_BIG_ANIMATION, [0,0,128,256]);
        this.fondo_game_over.setAnimation(VIRUS_BIG_ANIMATION);

        this.next_capsulalado1.setAnimation(0);
        this.next_capsulalado2.setAnimation(0);

        this.capsulalado1.setAnimation(0);
        this.capsulalado2.setAnimation(0);
        debugger;
        this.music.stop();

        this.gameover.play();


        this.hePerdido = false;
        this.movimiento = false;
        this.opcionEnter = 0;
    }
    
    if(this.pausaporbajada){
    	this.capsulalado1.y = 600;
		this.capsulalado2.y = 600;
			/*	
						if(!this.moverhuerfano){
							var columntile = ((this.huerfanos[0][1]-1)%3);
						var rowtile = getRow(this.huerfanos[0][1]);
						var columnmap = ((this.huerfanos[0][0])%8);
						var rowmap = Math.floor((this.huerfanos[0][0]/8));
						console.log("entro column: "+columntile+ " y row: "+rowtile)

						this.objetobajar = new Sprite(192+16*columnmap, 160+16*rowmap,16,16,1,this.tilesheet);
    					this.objetobajar.addAnimation();
						this.objetobajar.addKeyframe(0,[16*columntile,16*rowtile,16,16]);
						this.objetobajar.setAnimation(0);
						
						this.moverhuerfano = true;
						}
						
						this.objetobajar.draw();
		for(var huerfano=0;huerfano<this.huerfanos.length;huerfano++){
						
						var column = ((this.huerfanos[huerfano][1]-1)%3)+1;
						var row = getRow(this.huerfanos[huerfano][1]);
						console.log("entro column: "+column+ " y row: "+row)

						this.objetobajar = new Sprite(192+16*3, 160,16,16,1,this.tilesheet);
    					this.objetobajar.addAnimation();
						this.objetobajar.addKeyframe(0,[16*column,16*row,16,16]);
						this.objetobajar.setAnimation(0);
						this.objetobajar.draw();
		}*/

    }else{

    if (this.lanzarCapsula && !this.heGanado) {
        //animacion de Mario
        this.marioSprite.setAnimation(1);
        
        //Reset Capsula
        //Reset color
        this.colorIzq = this.next_colorIzq;
        this.colorDer = this.next_colorDer;
        this.next_colorIzq = getRandomInt(1,4);
        this.next_colorDer = getRandomInt(1,4);
        this.capsulalado1.setAnimation(6+this.colorIzq);
        this.capsulalado2.setAnimation(9+this.colorDer);
        this.next_capsulalado1.setAnimation(this.next_colorIzq);
        this.next_capsulalado2.setAnimation(this.next_colorDer);
       

        //Reset posicion
		this.capsulalado1.y = 160-16*2;
		this.capsulalado2.y = 160-16*2;
		this.capsulalado1.x = 192+16*3+16*4;
		this.capsulalado2.x = 192+16*3+16+16*4;
        this.animacionCapsula = true;

        this.timeInicimientoLanzamiento = this.currentTime;
        
        this.lanzarCapsula = false;
    }
    else {
       if (this.movimiento && (this.timeLanzamiento < (this.currentTime-this.timeInicimientoLanzamiento))) {
            this.marioSpriteStatic.draw();
            if (this.animacionCapsula) {
            this.capsulalado1.y = 160;
            this.capsulalado2.y = 160;
            this.capsulalado1.x = 192+16*3;
            this.capsulalado2.x = 192+16*3+16;
            }

            this.marioSprite.setAnimation(0);
            this.animacionCapsula = false;
        }
        else {
            if (this.animacionCapsula && this.movimiento) {
                context.save();
                //context.translate(64 * Math.sin((this.currentTime-this.timeInicimientoLanzamiento) / 100),64 * Math.cos((this.currentTime-this.timeInicimientoLanzamiento) / 100));
                context.translate(64 * Math.sin((this.currentTime-this.timeInicimientoLanzamiento+270) / 160),64 * Math.cos((this.currentTime-this.timeInicimientoLanzamiento+270) / 160));
                //context.translate(-radio * this.cosenoBlue,radio * this.senoBlue);
                this.capsulalado1.draw();
                this.capsulalado2.draw();
                context.restore();
            }
        }
    }
    
    }

    if (this.booleanCapsuleToBlank && this.sprite_herido!=0) {
        
        this.timeCapsuleToBlank = this.currentTime;
        this.booleanCapsuleToBlank = false;
        this.sprite_herido = 0;
        //console.log("en el if");
        //this.golpevirus.play();
    }
    else {
        if ((300-60 < (this.currentTime-this.timeCapsuleToBlank) && !(300 < (this.currentTime-this.timeCapsuleToBlank)))) {
            this.map.emptyCapsuleToBlank();
            this.booleanCapsuleToBlank = true;
            //console.log("en el else");
        }
    }

    
    //Movimiento de virus heridos
    if (this.booleanBlueHerido && this.existsBlueVirus) {
        
        this.blueBigvirusSprite.setFPS(12);
        this.blueBigvirusSprite.setAnimation(2);
        
        this.timeBlueHerido = this.currentTime;
        this.booleanBlueHerido = false;
        this.golpevirus.stop();
        this.golpevirus.play();
    }
    else {
        if (this.existsBlueVirus && (2400-60 < (this.currentTime-this.timeBlueHerido) && !(2400 < (this.currentTime-this.timeBlueHerido)))) {
            this.blueBigvirusSprite.setFPS(3);
            this.blueBigvirusSprite.setAnimation(0);
            
            this.existsBlueVirus = this.map.existsBlueVirus();

        }
    }
    if (this.booleanRedHerido && this.existsRedVirus) {
        
        this.redBigvirusSprite.setFPS(12);
        this.redBigvirusSprite.setAnimation(2);
        
        this.timeRedHerido = this.currentTime;
        this.booleanRedHerido = false;
        this.golpevirus.stop();
        this.golpevirus.play();
        
    }
    else {
        if (this.existsRedVirus && (2400-60 < (this.currentTime-this.timeRedHerido) && !(2400 < (this.currentTime-this.timeRedHerido)))) {
            this.redBigvirusSprite.setFPS(3);
            this.redBigvirusSprite.setAnimation(0);
           
            this.existsRedVirus = this.map.existsRedVirus();
        }
    }
    if (this.booleanYellowHerido && this.existsYellowVirus) {
        
        this.yellowBigvirusSprite.setFPS(12);
        this.yellowBigvirusSprite.setAnimation(2);
        
        this.timeYellowHerido = this.currentTime;
        this.booleanYellowHerido = false;
        this.golpevirus.stop();
        this.golpevirus.play();
    }
    else {
        if (this.existsYellowVirus && (2400-60 < (this.currentTime-this.timeYellowHerido) && !(2400 < (this.currentTime-this.timeYellowHerido)))) {
            this.yellowBigvirusSprite.setFPS(3);
            this.yellowBigvirusSprite.setAnimation(0);

            this.existsYellowVirus = this.map.existsYellowVirus();
        }
    }
    
    //Movimiento y desaparición de virus
    if (!this.existsBlueVirus) {
        if (!this.booleanBlueHerido) {
            this.blueBigvirusSprite.setFPS(6);
            this.blueBigvirusSprite.setAnimation(3);
            this.muertevirus.stop();
            this.muertevirus.play();
            this.timeBlueHerido = this.currentTime;
            this.booleanBlueHerido = true;
        }
        if ((500-60 < (this.currentTime-this.timeBlueHerido) && !(500 < (this.currentTime-this.timeBlueHerido)))) {
            this.blueBigvirusSprite.setFPS(1);
            this.blueBigvirusSprite.setAnimation(4);
        }
    }
    if (!this.existsRedVirus) {
        if (!this.booleanRedHerido) {
            this.redBigvirusSprite.setFPS(6);
            this.redBigvirusSprite.setAnimation(3);
            this.timeRedHerido = this.currentTime;
            this.booleanRedHerido = true;
            this.muertevirus.stop();
             this.muertevirus.play();
        }
        if ((500-60 < (this.currentTime-this.timeRedHerido) && !(500 < (this.currentTime-this.timeRedHerido)))) {
            this.redBigvirusSprite.setFPS(1);
            this.redBigvirusSprite.setAnimation(4);
        }
    }
    if (!this.existsYellowVirus) {
        if (!this.booleanYellowHerido) {
            this.yellowBigvirusSprite.setFPS(6);
            this.yellowBigvirusSprite.setAnimation(3);
            this.timeYellowHerido = this.currentTime;
            this.booleanYellowHerido = true;
            this.muertevirus.stop();
            this.muertevirus.play();
        }
        if ((500-60 < (this.currentTime-this.timeYellowHerido) && !(500 < (this.currentTime-this.timeYellowHerido)))) {
            this.yellowBigvirusSprite.setFPS(1);
            this.yellowBigvirusSprite.setAnimation(4);
        }
    }
	
	//HE GANADO? Sí, pues modificacion de fondo, paro animaciones, etc
    if (!this.heGanado && !this.map.existsBlueVirus() && !this.map.existsRedVirus() && !this.map.existsYellowVirus()) {
        
        this.lanzarCapsula = false;
        
        var fondo_game_over = new Texture("imgs/fondo_win_level.png");
        this.fondo_game_over = new Sprite(192,160,128,256,1,fondo_game_over);
        this.fondo_game_over.addAnimation();
        this.fondo_game_over.addKeyframe(VIRUS_BIG_ANIMATION, [0,0,128,256]);
        this.fondo_game_over.setAnimation(VIRUS_BIG_ANIMATION);
/*
        this.next_capsulalado1.setAnimation(0);
        this.next_capsulalado2.setAnimation(0);
*/
        this.capsulalado1.setAnimation(0);
        this.capsulalado2.setAnimation(0);

        //this.hePerdido = false;
        this.movimiento = false;
        this.opcionEnter = 1;
        
        this.heGanado = true;
        console.log("Entro aqui");
        this.ganarnivel.play();
        this.music.stop();
    }

    if (this.heGanado) this.marioSpriteStatic.draw();
    
 	if (!this.animacionCapsula) {
        this.capsulalado1.draw();
        this.capsulalado2.draw();

        this.next_capsulalado1.draw();
        this.next_capsulalado2.draw();
    }
    
    this.fondo_game_over.draw();

	context.font = "bold 16px Atari";
	context.fillStyle = "black";

	if (this.top < this.score) this.top = this.score;
    contador_top = this.top;

	//Numero TOP
    var toptexto = this.top.toString().padStart(7, '0');
	context.fillText(toptexto,33,145);

	//Numero SCORE
    var scoretexto = this.score.toString().padStart(7, '0');
	context.fillText(scoretexto,33,193);

	//Numero LEVEL
	var leveltexto = this.level.toString().padStart(2, '0');
	context.fillText(leveltexto,433,321);

	//Numero VIRUS
	var virustexto = this.virus.toString().padStart(2, '0');
	context.fillText(virustexto,433,417);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRow(number){
	if(number<=3){
		return 0;
	}else if(number<=6){
		return 1;
	}else if(number<=9){
		return 2;
	}else if(number<=12){
		return 3;
	}else if(number<=15){
		return 4;
	}else if(number<=18){
		return 5;
	}else{
		return 6;
	}
}

