// For chrome install this extension: https://mybrowseraddon.com/access-control-allow-origin.html?v=0.1.9&type=install

let imgs = []
let prompt_txt = "";
let controlDown = false;
let bg_tex ;
function preload() {
  imgs.push( loadImage('/static/images/liver.png'));
  imgs.push( loadImage('/static/images/stomach.png'));
  imgs.push( loadImage('/static/images/intestine.png'));
  imgs.push( loadImage('/static/images/kidney.png'));


  imgs.push( loadImage('/static/images/menu_button_save.jpg'));
  imgs.push( loadImage('/static/images/menu_button_clear.jpg'));
  imgs.push( loadImage('/static/images/menu_button_help.jpg'));
  imgs.push( loadImage('/static/images/menu_button_render.jpg'));

  bg_tex = loadImage('/static/images/bg_texs/stone_tex0.jpg');
}


class OrganCanvas{
   constructor(x,y,w,h,r,g,b) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
	this.r = r;
	this.g = g;
	this.b = b;
	this.selectedOrgan = -1;
	this.organs = []
    }

    getOrgans(){
	// 1=liver 2=heart 3 =intestine 4=kidney
	return this.organs;
    }
    unselect(){
	this.selectedOrgan = -1;
    }
    draw(){
       push();
       fill(this.r,this.g,this.b);
       rect(this.x, this.y, this.w, this.h);

	translate(this.x, this.y);
       for(let i = 0; i < this.organs.length;i++)
       {
	    this.organs[i].draw();
	}

        fill(0);
        //text("Arrange Organs", 5, 15);
	pop();
    }

    unselect(){
	this.selectedOrgan =-1;
    }
    selectOrgan(posX,posY){
	 selectedSomething = false;
     	 for(let i = 0; i < this.organs.length;i++)
         {
		if(this.organs[i].select() == true)
		{
		    this.selectedOrgan = i;
		    selectedSomething = true;
		}
         }
    }
    mouseDragged(){
    }

    addOrgan(organ){
	if(this.selectedOrgan != -1){
	   // organ.setCanvasSize(this.w, this.h);
	    this.organs.push(organ);
	}
   }

   clear(){
    this.organs = []
  }

     mouseMoved(mouseX,mouseY){
	if(controlDown===true && this.selectedOrgan >= 0)
	{
		this.organs[this.selectedOrgan].mouseMoved(mouseX-this.x,mouseY-this.y);
	}
    }

    mousePressed(mX,mY){
	if(controlDown===true)
	{
		// check if we select ann exisiting organ
		for( let i = 0;i < this.organs.length;i++)
		{
			if( this.organs[i].select( mX-this.x,mY-this.y) === true )
			{
				this.selectedOrgan = i;
				//console.log("organ: " + i + " IS SELECTED!!!");
			}
			//else{
			//	console.log("organ" + i + " not selected");
			//}
	
		}	
	}else 
	{
		var organSizeX = 50;
		var organSizeY = 50;
		console.log("mousePressed: " + mX + "," + mY + " canvas pos: " + this.x + "," + this.y	+ " selected organ: " + selectedOrgan);
	       if( mX > this.x && mX < this.x  + this.w - organSizeX && this.x > 0 &&
        	   mY > this.y && mY < this.y  + this.h - organSizeY && this.y < mY && selectedOrgan != null )
       	       {
    	       		let offX = mX - this.x;
	   		let offY = mY - this.y;
	   		//console.log("adding organ at: " + offX + "," + offY);	
	   		this.organs.push( new OrganDisplay( offX, offY, organSizeX,organSizeY,selectedOrgan.r, selectedOrgan.g, selectedOrgan.b, selectedOrgan.iconIndx, selectedOrgan.name, this.w, this.h));
       		}
	}
   }
}

class OrganDisplay{

    constructor(x,y,w,h,r,g,b, iconIndx,name, canvasW, canvasH) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.g = g;
        this.b = b;
	this.name = name;
	this.selectOffX = 0;
	this.selectOffY = 0;
	this.iconIndx = iconIndx;
	this.selected = false;
        this.organs = [];
	this.canvasW = canvasW;
	this.canvasH = canvasH;

	console.log("creating OrganDisplay at positin: " + this.x + "," + this.y + " size: " + this.w + "," + this.h + " canvas size: " + this.canvasW + "," + this.canvasH);
    }

   // setCanvasSize(w,h){
 //	this.canvasW = w;
//	this.canvasH = h;
    //}

    clear() {
	this.organs = [];
    }

    select(selX,selY)
    {
	if( selX > this.x && selX < this.x + this.w &&
            selY > this.y && selY < this.y + this.h )
       {
		this.selected = true;

		this.selectOffX = selX - this.x;
		this.selectOffY = selY - this.y;
      }else{
		this.selected = false;
		this.selectOffX = 0;
		this.selectOffY = 0;
	}
      return this.selected;
    }

    draw(){
//	fill(this.r, this.g, this.b);
//	rect(this.x, this.y, this.w, this.h);
	fill(255);
//	translate(-this.selectOffX, -this.selectOffY);
	
	this.selectOffX = 0; this.selectOffY=0;

	image( imgs[ this.iconIndx], this.x - this.selectOffX, this.y - this.selectOffY, this.w, this.h);
    	
	if(this.selected == true)
	{
	    stroke(0);
	    strokeWeight(4);
	    noFill();
	    rect( this.x - this.selectOffX, this.y - this.selectOffY, 
		  this.w, 		    this.h);
	    line( this.x - this.selectOffX, 	     this.y - this.selectOffY, 
		  this.x + this.w - this.selectOffX, this.y + this.h - this.selectOffY);
	    line( this.x - this.selectOffX + this.w, this.y - this.selectOffY, 
		  this.x - this.selectOffX, 	     this.y + this.h - this.selectOffY);
	}else {
 		noStroke();
	}

    }

    mouseMoved(moveX,moveY){
	this.x = moveX;
	this.y = moveY;
   }
}

class OrganButton{
    constructor(iconIndx, name, x, y, w, h, r, g, b ) {
        this.x = x;
        this.y = y;
	this.w = w;
	this.h = h;
	this.r=r;
	this.g=g;
	this.b=b;
	this.name = name; 
	this.multiSelect = false;
	this.iconIndx =iconIndx;
    }

    setMultiselect(val){
	this.multiSelect = val;
    }

    mouseDragged(){

	
    }

    setSelected(val) {
	this.selected = val;
    }

    draw() {
	fill(this.r, this.g, this.b);     
        if(this.mouseOver == true)
	{
		strokeWeight(4);
		stroke(0);
		rect(this.x, this.y, this.w, this.h);
	}

        noStroke();
	image(imgs[this.iconIndx],this.x, this.y, this.w, this.h);

	if(this.multiSelect == true && this.selected ==true)
	{
		stroke(0);
		noFill();
		rect(this.x, this.y, this.w, this.h);
		line(this.x,this.y, this.x + this.w, this.y + this.h);
		line(this.x + this.w, this.y, this.x, this.y+ this.h);
	}
    }

    mouseMoved(mouseX,mouseY){
        if( mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.h)
       {
	    this.mouseOver = true;
       }else{
	    this.mouseOver = false;
       }
    }

    mousePressed(mouseX,mouseY){
        if( mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.h)
       {
            this.selected = true;

	    if( this.action_function != null)
	    {
		this.action_function();
	    }
       }else{
            this.selected = false;
       }

	return this.selected;
    }
}

let organButtons = [];
let clearButton;
let renderButton;
let promptButton;
let numOrganButtons = 4;
let organCanvas;
let selectedOrgan = null;

let outputDisplay = null;

function drawOrganSelectMenu(x,y)
{
    for( let i = 0; i < organButtons.length; i++)
    {
         organButtons[i].draw();
    }

    saveButton.draw();
    clearButton.draw();
    helpButton.draw();
    renderButton.draw();
}


function setup() {
  createCanvas(1024, 768, WEBGL);

  outputDisplay = new OutputDisplay(516, 70, 500,500);
  buttonSize = 50;
  buttonOffset = 5;


  saveButton  = new OrganButton( imgs.length-4, "menu_button_save.jpg", buttonOffset* 1 + buttonSize * 0, buttonOffset, buttonSize, buttonSize, 70,70,70);
  saveButton.action_function = function() {}

  clearButton  = new OrganButton( imgs.length-3, "menu_button_clear.jpg", buttonOffset*2 + buttonSize * 1, buttonOffset, buttonSize, buttonSize,70,70,70);
  clearButton.action_function = function() {organCanvas.clear(); outputDisplay.clear() }

  helpButton  = new OrganButton( imgs.length-2, "menu_button_help.jpg", buttonOffset*3 + buttonSize * 2, buttonOffset, buttonSize, buttonSize,70,70,70);
  helpButton.action_function = function() {}

  renderButton  = new OrganButton( imgs.length-1, "menu_button_render.jpg",  buttonOffset*4 + buttonSize * 3, buttonOffset, buttonSize, buttonSize, 70,70,70);
  renderButton.action_function = function() {   prompt_txt = createPrompt( organCanvas.organs );}

  organButtons.push( new OrganButton( 0, "liver", 	 400 + 1 * buttonOffset + 0 * buttonSize, buttonOffset,buttonSize, buttonSize, 200,0, 125) );
  organButtons.push( new OrganButton( 1, "intestine",    400 + 2 * buttonOffset + 1 * buttonSize, buttonOffset,buttonSize, buttonSize,125,125,50) );
  organButtons.push( new OrganButton( 2, "kidney",	 400 + 3 * buttonOffset + 2 * buttonSize, buttonOffset,buttonSize, buttonSize,125,0,215) );
  organButtons.push( new OrganButton( 3, "heart", 	 400 + 4 * buttonOffset + 3 * buttonSize, buttonOffset,buttonSize, buttonSize,0,125,50) );

  for(var i = 0;i < organButtons.length;i++)
  {
	organButtons[i].setMultiselect(true);
  }
  organCanvas = new OrganCanvas(8, 70, 500, 500, 255,255,255);
}

function draw() {
    background(200);
    translate(-width/2,-height/2);
    
    fill(200);
    texture(bg_tex);
    rect(0,0,width,height);
    drawOrganSelectMenu(0,0);
    organCanvas.draw();
    drawPromptBox(5,600, prompt_txt);   
    outputDisplay.draw();
}

function mouseMoved()
{

	for( let i = 0;i < organButtons.length;i++)
	{
	    organButtons[i].mouseMoved(mouseX,mouseY);
	}
}


function mousePressed()
{
	organCanvas.mousePressed(mouseX,mouseY);

	if(controlDown === false)
	{
		var selected = -1;

		for(let i =0;i < organButtons.length;i++)
		{
			if(organButtons[i].selected ===true){
		    	selected =i;
			}
		}
        	var organSelected = false;
        	for( let i = 0;i < organButtons.length;i++)
        	{
            		if( organButtons[i].mousePressed(mouseX,mouseY))
	    		{
				organSelected = true;
				selectedOrgan = organButtons[i];
	    		}
        	}
		if(organSelected == false)
		{
			organButtons[selected].setSelected(true);
		}
		clearButton.mousePressed(mouseX,mouseY);
		renderButton.mousePressed(mouseX,mouseY);
	}
}

function mouseDragged()
{
	organCanvas.mouseMoved(mouseX,mouseY);
//	console.log("mouse: " + mouseX + "," + mouseY + " pmouse: " + pmouseX + "," + pmouseY);
//	organCanvas.mouseDragged();
}

function keyPressed() {
	if (keyCode === CONTROL) {
	controlDown = true;
     }
}


function keyReleased() {
        if (keyCode === CONTROL) {
	controlDown = false;
	organCanvas.unselect();
     }
}

