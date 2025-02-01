/// For chrome install this extension: https://mybrowseraddon.com/access-control-allow-origin.html?v=0.1.9&type=install
let iconSize = 50;
let imgs = []
let helpMenuImg=null;
let prompt_txt = "";
let shiftDown = false;
let bg_tex ;
let canvas_tex;
let blankImg;
let sizeDragging = false;

function preload() {
  helpMenuImg = loadImage('/static/images/herma_help_menu.jpg');
  imgs.push( loadImage('/static/images/liver.png'));
  imgs.push( loadImage('/static/images/stomach.png'));
  imgs.push( loadImage('/static/images/intestine.png'));
  imgs.push( loadImage('/static/images/kidney.png'));


  imgs.push( loadImage('/static/images/menu_button_save.jpg'));
  imgs.push( loadImage('/static/images/menu_button_clear.jpg'));
  imgs.push( loadImage('/static/images/menu_button_help.jpg'));
  imgs.push( loadImage('/static/images/menu_button_render.jpg'));

  bg_tex     = loadImage('/static/images/bg_texs/stone_tex1.jpg');
  canvas_tex = loadImage('/static/images/bg_texs/stone_tex2.jpg');
  blank_img  = loadImage('/static/images/blank.png');
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
    
    deselect(){
	 for( let i = 0;i < this.organs.length;i++){
                this.organs[i].deselect();
	}
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
       tint(255);
       fill(this.r,this.g,this.b);
       rect(this.x, this.y, this.w, this.h);
    
    tint(100);
    texture(canvas_tex);
    strokeWeight(4);
    rect(this.x, this.y, this.w, this.h );


	translate(this.x, this.y);
       for(let i = 0; i < this.organs.length;i++)
       {
	    this.organs[i].draw();
	}

        fill(0);
        //text("Arrange Organs", 5, 15);
	pop();
    }
    
   mouseDragged(){
    }

    addOrgan(mX,mY, iconIndx){
	iconSize = 150;
	if( mX > this.x+iconSize/2 && mX < this.x + this.w-iconSize/2 &&
	    mY > this.y+iconSize/2  && mY < this.y + this.h-iconSize/2 &&
	    iconIndx > -1 )
	{
	    this.organs.push( new OrganDisplay(mX- this.x, mY- this.y, iconSize, iconSize, 255,255,255, iconIndx, "kidney", this.w, this.h ) );
   	}else
	{
		console.log("cannot add organ out of bounds");
	}
   }

    clear(){
    this.organs = []
  }

     mouseMoved(mouseX,mouseY){
	if(shiftDown===true && this.selectedOrgan >= 0)
	{
		this.organs[this.selectedOrgan].mouseMoved(mouseX-this.x,mouseY-this.y);
	}

	//if(shiftDown===true && this.selec
    }

    selectOrgan(mX,mY){
	
	var result = -1;
	mX = mX - this.x;
	mY = mY - this.y;
	 for( let i = 0;i < this.organs.length;i++)
         {
	 	if( this.organs[i].select( mX,mY) === true ){
		     result = i;
		}
	 }
	 return result;
    }

    moveOrgan(mX,mY,pX,pY, organIndx){
	mX = mX - this.x;
        mY = mY - this.y;
	pX = pX - this.x;
        pY = pY - this.y;

	if(mX < 0) { mX = 0; }
	if(mY < 0) { mY = 0; }
	if(mX > this.w - this.organs[organIndx].getWidth())  { mX = this.w - this.organs[organIndx].getWidth(); }
        if(mY > this.h - this.organs[organIndx].getHeight()) { mY = this.h - this.organs[organIndx].getHeight(); }
	if(organIndx > -1 ){
		this.organs[organIndx].moveTo(mX,mY);
   	} 
    }

    mousePressed(mX,mY){
	if(shiftDown===true)
	{
		// check if we select ann exisiting organ
		for( let i = 0;i < this.organs.length;i++)
		{
			if( this.organs[i].select( mX-this.x,mY-this.y) === true )
			{
				this.selectedOrgan = i;
			}
	
		}	
	}else if(shiftDown === true){

	}else{
	       var organSizeX = 150;
	       var organSizeY = 150;
	       if( mX > this.x && mX < this.x  + this.w - organSizeX && this.x > 0 &&
        	   mY > this.y && mY < this.y  + this.h - organSizeY && this.y < mY && selectedOrgan != null )
       	       {
    	       		let offX = mX - this.x;
	   		let offY = mY - this.y;
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
	this.minHeight = 10;
	this.minWidth  = 10;

    }
    deselect(){
	this.selected = false;
    }
    getWidth() { return this.w; }
    getHeight() { return this.h; }

    moveTo(newX, newY){
	this.x = newX;
	this.y = newY;
    }

    adjustOrganSize(diff){
   	var aspectRatio = this.w / this.h;

	var xAdd = aspectRatio * diff;
	var yAdd = 1.0 * diff;

	var newWidth = this.w + xAdd;
	var newHeight = this.h + yAdd;
	var minWidth = 10;
	var minHeight = 10;

	if( newWidth > minWidth && newHeight > minHeight)
	{
		this.w = newWidth;
		this.h = newHeight;
	}
    }
    clear() {
	this.organs = [];
    }


    select(selX,selY)
    {
	if( selX > this.x - this.w/2 && selX < this.x + this.w/2 &&
            selY > this.y - this.h/2 && selY < this.y + this.h/2 )
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
	fill(255);
	
	this.selectOffX = 0; this.selectOffY=0;
    	
	if(this.selected == true)
	{
		tint(0,255,0,127);
	}else {
		tint(255,255,255,255);
	}
	imageMode(CENTER);
        image( imgs[ this.iconIndx], this.x - this.selectOffX, this.y - this.selectOffY, this.w, this.h);
    	imageMode(CORNER);
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
	this.mouseOver = false;
	this.selected=false;
	this.highlightCol = color(0,255,255);
	this.name = name; 
	this.multiSelect = false;
	this.iconIndx =iconIndx;
	this.highlight = false;    
    }

    setMultiselect(val){
	this.multiSelect = val;
    }

    getHighlight() { 
	return this.highlight;	
    }
    mouseDragged(){

	
    }

    setSelected(val) {
	this.selected = val;
    }

    draw() {
	fill(255);
        if(this.mouseOver == true)
	{
		tint(127);
	}else{
		tint(255);
	}
	fill(155);
	rect(this.x,this.y,this.w,this.h);
        image(imgs[this.iconIndx],this.x, this.y, this.w, this.h);
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

    isSelected(){
	return this.selected;
    }
    setHighlight(value){
	this.highlight = value;
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
let displayHelpMenu  = false;
let outputDisplay = null;

function drawOrganSelectMenu(x,y,w,h)
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

  outputDisplay = new OutputDisplay(516, 70, 500,500,blankImg);
  buttonSize = 50;
  buttonOffset = 5;

  saveButton  = new OrganButton( imgs.length-4, "menu_button_save.jpg", buttonOffset* 1 + buttonSize * 0, buttonOffset, buttonSize, buttonSize, 70,70,70);
  saveButton.action_function = function() {outputDisplay.save(); savePrompt("prompt.txt"); }

  clearButton  = new OrganButton( imgs.length-3, "menu_button_clear.jpg", buttonOffset*2 + buttonSize * 1, buttonOffset, buttonSize, buttonSize,70,70,70);
  clearButton.action_function = function() {organCanvas.clear(); outputDisplay.clear() }

  helpButton  = new OrganButton( imgs.length-2, "menu_button_help.jpg", buttonOffset*3 + buttonSize * 2, buttonOffset, buttonSize, buttonSize,70,70,70);
  helpButton.action_function = function() { displayHelpMenu = true; }

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
    tint(255);    
    fill(200);
    texture(bg_tex);
    rect(0,0,width,height);

    drawOrganSelectMenu(0,0,width,height);
    organCanvas.draw();
    drawPromptBox(5,600, prompt_txt);   
    outputDisplay.draw();

    if( displayHelpMenu === true )
    {
	fill(0,127);
	rect(0,0,width,height);

	 fill(255);
         texture(helpMenuImg);
	 var xOff = (width - helpMenuImg.width)/2;
 	 var yOff = (height - helpMenuImg.height)/2;
         rect(xOff,yOff,helpMenuImg.width, helpMenuImg.height );


    }
}

var selOrgan = -1;

function mousePressed()
{
	if( displayHelpMenu === true ){
		displayHelpMenu = false;
	}else{
	 	var selButton = false;

		// check if pressed organ button
		if(shiftDown === false)
		{
			var selIndx = -1;
			for( let i = 0; i < organButtons.length; i++)
	 		{
				var isSelected = organButtons[i].mousePressed(mouseX,mouseY);
        			selButton = isSelected || selButton;
    				if(isSelected === true){
			    		selIndx = i;
					selOrgan = i;
				}
			}

			if(selIndx != -1 )
			{
				for( var i = 0; i < organButtons.length;i++)
				{
					if( i == selIndx ){
						organButtons[i].setHighlight(true);
					}else{
						organButtons[i].setHighlight(false);
					}
				}
			}

    			selButton = selButton || saveButton.mousePressed(mouseX,mouseY);
    			selButton = selButton || clearButton.mousePressed(mouseX,mouseY);
    			selButton = selButton || helpButton.mousePressed(mouseX,mouseY);
			selButton = selButton || renderButton.mousePressed(mouseX,mouseY);
		}

		if( shiftDown === false && selButton === false )
		{
			organCanvas.addOrgan(mouseX, mouseY, selOrgan);
		}

		if( shiftDown === true){
			selOrgan = organCanvas.selectOrgan(mouseX,mouseY);
		}
	}
}

function mouseReleasaed(){
	sizeDragging = false;
}

function mouseDragged()
{
	if(shiftDown === true){
	        organCanvas.moveOrgan(mouseX,mouseY,pmouseX,pmouseY, selOrgan);
        }

}

function keyPressed() {
        if(keyCode == SHIFT ){
	    shiftDown = true;
	}
}

function keyReleased() {
     if(keyCode == SHIFT ){
	shiftDown = false;
       }
     else if(keyCode == ESCAPE){

	organCanvas.deselect();
	}
}

function mouseMoved(){
	for( var i = 0; i < organButtons.length;i++)
        {
               organButtons[i].mouseMoved(mouseX, mouseY);
        }
    saveButton.mouseMoved(mouseX,mouseY);
    clearButton.mouseMoved(mouseX,mouseY);
    helpButton.mouseMoved(mouseX,mouseY);
    renderButton.mouseMoved(mouseX,mouseY);	
}

