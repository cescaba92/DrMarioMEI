
// Tilemap. Draws a tilemap using a texture as a tilesheet.

function Tilemap(tilesheet, tileSize, blockGrid, basePos, map, level, redvirus,yellowvirus,bluevirus,blank)
{
	this.tileSize = tileSize;
	this.basePos = basePos;
	this.blockGrid = blockGrid;
	this.map = map;
	this.redvirusSprite = redvirus;
	this.yellowvirusSprite = yellowvirus;
	this.bluevirusSprite = bluevirus;
	this.tilesheet = tilesheet;
	this.blank = blank;
    
    const posiciones = new Set();
    
    //Asignacion de posiciones de los virus segun el nivel
    for (var i=0; i<6*level; i++) {
        
        //Para tener 1/3 de virus de cara tipo
        if (i < 6*level/3) randomVirus = 19;
        else if (i < 2*6*level/3) randomVirus = 20;
        else randomVirus = 21;
        
        //Posicionamiento de los virus a partir de la 6ta fila
        var random = getRandomInt(40,127);
        
        //Se agrega el virus, pero antes se comprueba que la posicon de "var random" no está ya usada
        if (!posiciones.has(random)) {
            posiciones.add(random);
            this.map.layers[0].data[random] = randomVirus;
        }
        else --i;
    }
    //this.map.layers[0].data[127] = 21;
}

Tilemap.prototype.draw = function ()
{
	// Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;
		
	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];
	
	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);
			
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId = 0;
	context.imageSmoothingEnabled = false;

	
	var totalVirus = 0;
	for(var j=0, pos=0; j<this.map.height; j++){
		for(var i=0; i<this.map.width; i++, pos++)
		{
			tileId = this.map.layers[0].data[pos];

			//vacio
			if(tileId==0){
				this.blank.x = this.basePos[0] + this.tileSize[0] * i;
				this.blank.y = this.basePos[1] + this.tileSize[1] * j;
				this.blank.draw();
			}
			if(tileId != 0){
				context.drawImage(this.tilesheet.img, tilePositions[tileId-1][0], tilePositions[tileId-1][1], blockSize[0], blockSize[1], 
				                  this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
			}
		
			//rojo
			if(tileId==19){
				this.redvirusSprite.x = this.basePos[0] + this.tileSize[0] * i;
				this.redvirusSprite.y = this.basePos[1] + this.tileSize[1] * j;
				this.redvirusSprite.draw();
				++totalVirus;
			}
			//yellow
			if(tileId==20){
				this.yellowvirusSprite.x = this.basePos[0] + this.tileSize[0] * i;
				this.yellowvirusSprite.y = this.basePos[1] + this.tileSize[1] * j;
				this.yellowvirusSprite.draw();
				++totalVirus;
			}
			//blue
			if(tileId==21){
				this.bluevirusSprite.x = this.basePos[0] + this.tileSize[0] * i;
				this.bluevirusSprite.y = this.basePos[1] + this.tileSize[1] * j;
				this.bluevirusSprite.draw();
				++totalVirus;
			}

		}
	}
	return totalVirus;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Computes if the left part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveLeft = function(sprite)
{
	var x = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);

	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[0].data[y * this.map.width + x] != 0)
			return true;
	}

	return false;
}

// Computes if the right part of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveRight = function(sprite)
{
	var x = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((sprite.y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);

	for(var y=y0; y<=y1; y++)
	{
		if(this.map.layers[0].data[y * this.map.width + x] != 0)
			return true;
	}

	return false;
}

// Computes if the bottom of a sprite collides with the tilemap.
// Returns a boolean with the result.

Tilemap.prototype.collisionMoveDown = function(sprite)
{
	var y = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);

	if((y < 0) || (y >= this.map.height))
		return false;
	for(var x=x0; x<=x1; x++)
	{
		if((x >= 0) && (x < this.map.width))
			if(this.map.layers[0].data[y * this.map.width + x] != 0)
				return true;
	}

	return false;
}

Tilemap.prototype.updateMap = function(sprite)
{
    var y = Math.floor((sprite.y + sprite.height - 1 - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((sprite.x - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((sprite.x + sprite.width - 1 - this.basePos[0]) / this.tileSize[0]);

	if((y == 0) && (x0==3 || x1==4))
		return true;
	for(var x=x0; x<=x1; x++)
	{
		if((x >= 0) && (x < this.map.width))
			this.map.layers[0].data[y * this.map.width + x] = sprite.currentAnimation;
	}

	return false;
}

Tilemap.prototype.getDownObjects = function(){


	var position = []; 
	var auxiliar =[];

	for(var j=0, pos=119; j<this.map.height; j++){
		for(var i=0; i<this.map.width; i++, pos-- ){

			if(this.map.layers[0].data[pos]>=13 && this.map.layers[0].data[pos] <= 15){
					//console.log("Posicion:"+pos+"valor"+position.includes([pos+8,this.map.layers[0].data[pos + 8]], 0));
				//if(pos<120 && (this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(this.map.layers[0].data[pos + 8], 0) || [16,17,18].includes(this.map.layers[0].data[pos+8],0) )){
				//if(pos<120 && (this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(this.map.layers[0].data[pos + 8], 0))){
				if(pos<120 && (this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(pos + 8, 0) || [16,17,18].includes(this.map.layers[0].data[pos+8],0) )){
				
					//debugger;
					position.push([pos,this.map.layers[0].data[pos]]);
					//auxiliar.push(this.map.layers[0].data[pos]);
					auxiliar.push(pos);
				}
				
			}

			if(this.map.layers[0].data[pos]>=4 && this.map.layers[0].data[pos] <= 6){

				//if(pos<120 && (this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(this.map.layers[0].data[pos + 8], 0))){
				if(pos<120 && (this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(pos + 8, 0))){
					
					position.push([pos,this.map.layers[0].data[pos]]);
					//auxiliar.push(this.map.layers[0].data[pos]);
					auxiliar.push(pos);
				}

			}

			if(this.map.layers[0].data[pos]>=7 && this.map.layers[0].data[pos] <= 12){

				var valor = this.map.layers[0].data[pos];
				var izq;
				var der;
				if(valor <=9){
					//izq = this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(this.map.layers[0].data[pos + 8], 0);
					//der = this.map.layers[0].data[pos + 1 + 8]==0 || auxiliar.includes(this.map.layers[0].data[pos + 1 + 8], 0);

					izq = this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(pos + 8, 0);
					der = this.map.layers[0].data[pos + 1 + 8]==0 || auxiliar.includes(pos + 1 + 8, 0);

				}else{
					//izq = this.map.layers[0].data[pos - 1 + 8]==0 || auxiliar.includes(this.map.layers[0].data[pos - 1 + 8], 0);
					//der = this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(this.map.layers[0].data[pos + 8], 0);

					izq = this.map.layers[0].data[pos - 1 + 8]==0 || auxiliar.includes(pos - 1 + 8, 0);
					der = this.map.layers[0].data[pos + 8]==0 || auxiliar.includes(pos + 8, 0);
				}

				if(pos<120 && izq && der){
					//debugger;
					if(valor <=9){
						if(!auxiliar.includes(this.map.layers[0].data[pos+1]) && !auxiliar.includes(this.map.layers[0].data[pos])){
						//position.push([pos,this.map.layers[0].data[pos]]);
						auxiliar.push(pos);
						}
					}else{
						if(!auxiliar.includes(this.map.layers[0].data[pos-1]) && !auxiliar.includes(this.map.layers[0].data[pos])){
						position.push([pos,this.map.layers[0].data[pos]]);
						//auxiliar.push(this.map.layers[0].data[pos]);
						auxiliar.push(pos);
						}
					}
				}

			}


		}
	}

	return position;
}

Tilemap.prototype.bajarHuerfanos = function (huerfanos) {
	var total = huerfanos.length-1;
	//console.log("Cuantos huerfanos:"+total);
	//console.log("cuales son los huerfanos: "+huerfanos);
	//debugger;
	for(var huerfano=0;huerfano<huerfanos.length;huerfano++){
		

		var tipo = getRow(huerfanos[huerfano][1]);


		switch (tipo){

			case 1:
				this.map.layers[0].data[huerfanos[huerfano][0]] = this.map.layers[0].data[huerfanos[huerfano][0]-8];	
				this.map.layers[0].data[huerfanos[huerfano][0]-8] = 0;
				this.map.layers[0].data[huerfanos[huerfano][0]+8] = huerfanos[huerfano][1];
				huerfanos[huerfano][0] = huerfanos[huerfano][0]+8;
				//console.log("Como es: "+huerfanos[huerfano][0]);
				if(huerfanos[huerfano][0]>=128 || this.map.layers[0].data[huerfanos[huerfano][0]+8]!=0){
					huerfanos.splice(huerfano,1);
					//console.log('resto');
					huerfano--;
				}	
			break;

			case 2:
				this.map.layers[0].data[huerfanos[huerfano][0]+1+8] = this.map.layers[0].data[huerfanos[huerfano][0]+1];
				this.map.layers[0].data[huerfanos[huerfano][0]+8] = huerfanos[huerfano][1];
				this.map.layers[0].data[huerfanos[huerfano][0]+1] = 0;
				this.map.layers[0].data[huerfanos[huerfano][0]] = 0;
				huerfanos[huerfano][0] = huerfanos[huerfano][0]+8;
				
				if(huerfanos[huerfano][0]>=128 || (this.map.layers[0].data[huerfanos[huerfano][0]+8]!=0 && this.map.layers[0].data[huerfanos[huerfano][0]+1+8]!=0) ){
					huerfanos.splice(huerfano,1);
					console.log('resto');
					huerfano--;
				}	

			break;

			case 3:

				this.map.layers[0].data[huerfanos[huerfano][0]-1+8] = this.map.layers[0].data[huerfanos[huerfano][0]-1];
				this.map.layers[0].data[huerfanos[huerfano][0]+8] = huerfanos[huerfano][1];
				this.map.layers[0].data[huerfanos[huerfano][0]-1] = 0;
				this.map.layers[0].data[huerfanos[huerfano][0]] = 0;
				huerfanos[huerfano][0] = huerfanos[huerfano][0]+8;

				if(huerfanos[huerfano][0]>=128 || (this.map.layers[0].data[huerfanos[huerfano][0]+8]!=0 && this.map.layers[0].data[huerfanos[huerfano][0]-1+8]!=0) ){
					huerfanos.splice(huerfano,1);
					//console.log('resto');
					huerfano--;
				}	

			break;

			case 4:
				this.map.layers[0].data[huerfanos[huerfano][0]] = 0;
				this.map.layers[0].data[huerfanos[huerfano][0]+8] = huerfanos[huerfano][1];

				huerfanos[huerfano][0] = huerfanos[huerfano][0]+8;
				//console.log("Como es: "+huerfanos[huerfano][0]);
				if(huerfanos[huerfano][0]>=128 || this.map.layers[0].data[huerfanos[huerfano][0]+8]!=0){
					huerfanos.splice(huerfano,1);
					//console.log('resto');
					huerfano--;
				}	
			break;

		}

		
	}

	return huerfanos;

}

Tilemap.prototype.searchCombinations = function()
{
    // Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;

	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];

	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);

	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId = 0;
	context.imageSmoothingEnabled = false;
	var idsinmov = [0,13,14,15,19,20,21];

	var sprite_herido = [];
	for(var j=0, pos=0; j<this.map.height; j++){
		for(var i=0; i<this.map.width; i++, pos++)
		{
			valorTileId = this.map.layers[0].data[pos]

			if(valorTileId!=0){
				var colorPosicion = ((valorTileId-1)%3)+1;
				var filacapsula = Math.floor(pos/8);
				var filaauxiliar = 0;
				var cursorFila = 0;
				var repetidos = 1;
				var colorPosicionNext = -1
				
				//Busqueda y eliminacion de combinaciones horizontales
				do {
				colorPosicionNext = ((this.map.layers[0].data[pos+repetidos]-1)%3)+1;
				filaauxiliar = Math.floor((pos+repetidos)/8);
				repetidos=repetidos+1;
				} while (colorPosicion == colorPosicionNext && filaauxiliar == filacapsula);
				//repetidos = repetidos -1;
				if(repetidos>4){
					sprite_herido.push(-1);

					for(var x=0;x<repetidos-1;x++){

					var colorRepetido = this.map.layers[0].data[pos+x]

					if((colorRepetido >= 19) && (colorRepetido <= 21)){
						sprite_herido.push(((colorRepetido-1)%3)+1);

					}

					this.map.layers[0].data[pos+x] = 15+colorPosicion;
					
					var alrededor = getTileIDAround(pos+x,this.map);

						for(var lado=0;lado<alrededor.length;lado++){
							//console.log("que valor va consultar: "+this.map.layers[0].data[alrededor[lado][0]]+" que lado es "+lado);
							if(alrededor[lado][0]!=-1 && !idsinmov.includes(alrededor[lado][1], 0)){
								//console.log("que valor esta entrando: "+this.map.layers[0].data[alrededor[lado][0]])
								var colorCapsula = (alrededor[lado][1]-1) % 3
								
								this.map.layers[0].data[alrededor[lado][0]] = 13 + colorCapsula;

							}
						}
					}

				}

				//Busqueda y eliminacion de combinaciones verticales
				repetidos = 1
				do {
				colorPosicionNext = ((this.map.layers[0].data[pos+repetidos*8]-1)%3)+1;
				repetidos=repetidos+1;
				} while (colorPosicion == colorPosicionNext && repetidos <=15);
				//repetidos = repetidos -1;

				if(repetidos>4){
					sprite_herido.push(-1);

					for(var x=0;x<repetidos-1;x++){

					var colorRepetido = this.map.layers[0].data[pos+x*8]

					if((colorRepetido >= 19) && (colorRepetido <= 21)){
						sprite_herido.push(((colorRepetido-1)%3)+1);

					}

					this.map.layers[0].data[pos+x*8] = 15+colorPosicion;

					var alrededor = getTileIDAround(pos+x*8,this.map);

						for(var lado=0;lado<alrededor.length;lado++){
							//debugger;
							if(alrededor[lado][0]!=-1 && !idsinmov.includes(alrededor[lado][1], 0)){
								//console.log("que valor esta entrando: "+this.map.layers[0].data[alrededor[lado][0]])
								var colorCapsula = (alrededor[lado][1]-1) % 3
								this.map.layers[0].data[alrededor[lado][0]] = 13 + colorCapsula;

							}
						}
					}


				}

			}

		}
	}
	return sprite_herido;
}


Tilemap.prototype.existsRedVirus = function ()
{
	// Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;
		
	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];
	
	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);
			
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId = 0;
	context.imageSmoothingEnabled = false;

	
	for(var j=0, pos=0; j<this.map.height; j++){
		for(var i=0; i<this.map.width; i++, pos++)
		{
			tileId = this.map.layers[0].data[pos];
			//rojo
			if(tileId==19) return true;
		}
	}
	return false;
}


Tilemap.prototype.existsYellowVirus = function ()
{
	// Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;
		
	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];
	
	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);
			
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId = 0;
	context.imageSmoothingEnabled = false;

	
	for(var j=0, pos=0; j<this.map.height; j++){
		for(var i=0; i<this.map.width; i++, pos++)
		{
			tileId = this.map.layers[0].data[pos];
			//yellow
			if(tileId==20) return true;
		}
	}
	return false;
}


Tilemap.prototype.existsBlueVirus = function ()
{
	// Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;
		
	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];
	
	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);
			
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId = 0;
	context.imageSmoothingEnabled = false;

	
	for(var j=0, pos=0; j<this.map.height; j++){
		for(var i=0; i<this.map.width; i++, pos++)
		{
			tileId = this.map.layers[0].data[pos];
			//azul
			if(tileId==21) return true;
		}
	}
	return false;
}

function getTileIDAround(pos,mapa){
//devolvera un array con el TileId y otro con el numero de posicion en el siguiente orden arriba, derecha,abajo e izquierda
	var tileIdcod = [];

	//Validar Arriba
	if(pos < 8 || mapa.layers[0].data[pos-8] >3){
		tileIdcod.push([-1,-1]);
	}else{
		tileIdcod.push([pos-8,mapa.layers[0].data[pos-8]]);
	}

	//Validar Derecha
	if(pos % 8 == 7 || (mapa.layers[0].data[pos+1]>12 || mapa.layers[0].data[pos+1]< 10) ){
		tileIdcod.push([-1,-1]);
	}else{
		tileIdcod.push([pos+1,mapa.layers[0].data[pos+1]]); //10,11,12
	}

	//Validar Abajo
	if(pos>119 || (mapa.layers[0].data[pos+8]>6 || mapa.layers[0].data[pos+8]< 4) ){
		tileIdcod.push([-1,-1]);
	}else{
		tileIdcod.push([pos+8,mapa.layers[0].data[pos+8]]); 
	}
	
	//Validar Izquierda
	if(pos % 8 == 0 || (mapa.layers[0].data[pos-1]>9 || mapa.layers[0].data[pos-1]< 7)){
		tileIdcod.push([-1,-1]);
	}else{
		tileIdcod.push([pos-1,mapa.layers[0].data[pos-1]]);
	}


	return tileIdcod;

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


Tilemap.prototype.emptyCapsuleToBlank = function ()
{
	// Only draw if tilesheet texture already loaded
	if(!this.tilesheet.isLoaded())
		return;
		
	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];
	
	// Compute block positions in tilesheet
	var tilePositions = [];
	for(var y=0, tileId=0; y<this.blockGrid[1]; y++)
		for(var x=0; x<this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);
			
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId = 0;
	context.imageSmoothingEnabled = false;

	for(var j=0, pos=0; j<this.map.height; j++){
		for(var i=0; i<this.map.width; i++, pos++)
		{
			tileId = this.map.layers[0].data[pos];
			//capsula hueca
			if(tileId==16 || tileId==17 || tileId==18) this.map.layers[0].data[pos]=0;
		}
	}
	//return false;
}











