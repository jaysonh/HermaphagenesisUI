let imgs = []
function preload() {
  imgs.push( loadImage('/static/images/liver.png'));
  imgs.push( loadImage('/static/images/heart.png'));
  imgs.push( loadImage('/static/images/intestine.png'));
  imgs.push( loadImage('/static/images/kidney.png'));
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
	this.organs = []
    }

    draw(){
       push();
//	rectMode(CENTER);
       fill(this.r,this.g,this.b);
       rect(this.x, this.y, this.w, this.h);

	translate(this.x, this.y);
       for(let i = 0; i < this.organs.length;i++)
       {
	    this.organs[i].draw();
	}
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
        for(let i = 0; i < this.organs.length;i++)
       {
            this.organs[i].mouseDragged();
        }
    }

    addOrgan(organ){
	if(this.selectedOrgan != -1){
	    this.organs.push(organ);
	}
   }

   clear(){
    this.organs = []
  }

   mousePressed(mouseX,mouseY){

	console.log("TOTAL NUMBER OF ORGANS: "  + this.organs.length);
	console.log("current selected organ: " + selectedOrgan + " position: " + this.x + "," + this.y + " mouse: " + mouseX + "," + mouseY) ;

	// check if we select ann exisiting organ
	for( let i = 0;i < this.organs.length;i++)
	{
		if( this.organs[i].select(mouseX,mouseY) === true )
		{
			console.log("organ: " + i + " IS SELECTED!!!");
		}else{
			console.log("organ" + i + " not selected");
		}
	
	}

       if( mouseX > this.x && mouseX < this.x  + this.w && this.x > 0 &&
           mouseX > this.y && mouseY < this.y  + this.h && this.y < mouseY && 	selectedOrgan != null )
       {
    	   let offX = mouseX - this.x;
	   let offY = mouseY - this.y;
	   console.log("adding organ at: " + offX + "," + offY);
	   this.organs.push( new OrganDisplay( offX, offY, 50,50,selectedOrgan.r, selectedOrgan.g, selectedOrgan.b, selectedOrgan.iconIndx));
       }
   }
}

class OrganDisplay{

    constructor(x,y,w,h,r,g,b, iconIndx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.g = g;
        this.b = b;
	this.iconIndx = iconIndx;
	this.selected = false;
        this.organs = [];
    }

    select(selX, selY)
    {
	if( selX > this.x && selX < this.x + this.w &&
            selY > this.y && selY < this.y + this.h )
       {
		this.selected = true;

      }else{
		this.selected = false;
	}
      return this.selected;
    }

    draw(){
//	fill(this.r, this.g, this.b);
//	rect(this.x, this.y, this.w, this.h);
	fill(255);
	image( imgs[ this.iconIndx], this.x, this.y, this.w, this.h);
    	
	if(this.selected == true)
	{
	    stroke(0);
	    strokeWeight(4);
	    noFill();
	    rect(this.x,this.y, this.w, this.h);
	    line(this.x, this.y, this.x + this.w, this.y + this.h);
	    line(this.x+this.w, this.y, this.x, this.y+this.h);
	}else {
 		noStroke();
	}
    }
}

class OrganButton{
    constructor(iconIndx, name, x,y,w,h,r,g,b) {
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
	   console.log("Mouspressed " + mouseX + "," + mouseY);

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
let numOrganButtons = 4;
let organCanvas;
let selectedOrgan = null;

function drawOrganSelectMenu(x,y)
{
    for( let i = 0; i < organButtons.length; i++)
    {
         organButtons[i].draw();
    }

    clearButton.draw();
    renderButton.draw();

}


function setup() {
  createCanvas(1024, 768);

  buttonSize = 50;
  buttonOffset = 5;

  clearButton = new OrganButton(0, "clear", 5, buttonOffset, buttonSize, buttonSize, 70,70,70);
  clearButton.action_function = function() { organCanvas.clear()  }

  renderButton = new OrganButton(0, "render", 5 + buttonSize + 5, buttonOffset, buttonSize,buttonSize, 70,70,70);
  organButtons.push( new OrganButton( 0, "liver", 	 200+ 1 * buttonOffset,buttonOffset,buttonSize, buttonSize, 200,0, 125) );
  organButtons.push( new OrganButton( 1, "intestine", 200+2 * buttonOffset + 1 * buttonSize,buttonOffset,buttonSize, buttonSize,125,125,50) );
  organButtons.push( new OrganButton( 2, "kidney",	 200+3 * buttonOffset + 2 * buttonSize,buttonOffset,buttonSize, buttonSize,125,0,215) );
  organButtons.push( new OrganButton( 3, "heart", 	 200+4 * buttonOffset + 3 * buttonSize,buttonOffset,buttonSize, buttonSize,0,125,50) );

  for(var i = 0;i < organButtons.length;i++)
  {
	organButtons[i].setMultiselect(true);
  }
  organCanvas = new OrganCanvas(5, 70, 500, 500, 200,200,200);
}

function draw() {
   background(255);
   drawOrganSelectMenu(0,0);
   organCanvas.draw();
//   drawOrganSelectMenuExternal(0,0);
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
		console.log("resetting to selected: " + selected);
		organButtons[selected].setSelected(true);
	}
	clearButton.mousePressed(mouseX,mouseY);
}

function mouseDragged()
{

//	console.log("mouse: " + mouseX + "," + mouseY + " pmouse: " + pmouseX + "," + pmouseY);
//	organCanvas.mouseDragged();
}

