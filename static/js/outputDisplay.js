
class OutputDisplay
{
	constructor(x,y,w,h){
	     this.x = x;
	     this.y = y;
	     this.w = w;
	     this.h = h;	    
	}

	draw(){

	    fill(255);
	    rect(this.x, this.y, this.w, this.h );

	    fill(0);
	    text( "Output", this.x + 5, this.y + 15);

	}
}
