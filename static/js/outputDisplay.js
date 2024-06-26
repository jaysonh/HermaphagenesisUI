class OutputDisplay
{
	constructor(x,y,w,h){
	     this.x = x;
	     this.y = y;
	     this.w = w;
	     this.h = h;	    
	     this.angle = 0;
	}

	clear(){
	    loadingGenImg = false;
	    outputImg = null;
	}

        drawLoadingSpinner(){
		fill(125);
		var ellipseDetail = 100;
		ellipse(this.x + this.w/2,this.y+ this.w/2, this.w/2, this.w/2, ellipseDetail);
		fill(75);
		arc( this.x  + this.w/2, this.y + this.w/2, this.w/2, this.w/2, 0, this.angle, PIE, ellipseDetail );
		this.angle += 0.1;

		if(this.angle > TWO_PI) {	
			this.angle = 0.0;
		}
	}

	draw(){

	    fill(255);
	    rect(this.x, this.y, this.w, this.h );
	
	    if( loadingGenImg ===true)
	    {
		this.drawLoadingSpinner();
	    }

	    if(outputImg != null)
		image(outputImg,this.x, this.y, this.w, this.h );

	    fill(0);
	    //text( "Output", this.x + 5, this.y + 15);
		

	}
}
