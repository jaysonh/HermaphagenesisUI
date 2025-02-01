class OutputDisplay
{
	constructor(x,y,w,h,img){
	     this.x = x;
	     this.y = y;
	     this.w = w;
	     this.h = h;	    
	     this.angle = 0;
	     this.loadingText = loadImage("/static/images/loading_text_white.png");
	     this.blankTex =loadImage("/static/images/blank.png");  
	}

	clear(){
	    loadingGenImg = false;
	    outputImg = null;
	}

	save(){
	    if(outputImg != null){
		save(outputImg, "organism.jpg");	
	    }else{
		window.alert("no organism generated yet");
	    }
	}

	drawLoadingBar(x,y){
		tint(0);

		
		push();
		var lineWidth = width/4;
		var barWidth = 8;
		var lineHeight =60;
		translate(x+lineWidth/2,y-100);
		texture(this.loadingText);
		noStroke();
		rect(0,-50,this.loadingText.width*0.75,this.loadingText.height*0.75);
		
		texture(this.blankTex);
		strokeWeight(barWidth);
		line(barWidth/2,0,lineWidth-barWidth/2,0);
		line(barWidth/2,lineHeight,lineWidth-barWidth/2,lineHeight);
		
		line(0,barWidth/2,0,lineHeight-barWidth/2);
		line(lineWidth,barWidth/2,lineWidth,lineHeight-barWidth/2);
		
		var blockWidth = lineWidth/10;
		noStroke();
		var timer = (lineWidth-blockWidth) - (millis() / 10)% (lineWidth-blockWidth);
		for(var x = barWidth*2; x < lineWidth-blockWidth - timer; x+= blockWidth){
			rect(x,barWidth*2,blockWidth-4,lineHeight-barWidth*4);
		}
		pop()
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
       	    tint(255);
	    fill(255);
	    rect(this.x, this.y, this.w, this.h );


	    tint(100);
	   strokeWeight(4);
    	    texture(canvas_tex);
    	    rect( this.x, this.y, this.w, this.h );
	
    	    	
	    if( loadingGenImg ===true)
	    {
		this.drawLoadingBar(width/2,height/2);
		//this.drawLoadingSpinner();
	    }

	    if(outputImg != null)
	    {
		fill(255);
		tint(255);
		texture(outputImg);
		rect(this.x,this.y,this.w, this.h);
		image(outputImg,this.x, this.y, this.w, this.h );
	    }
	    //fill(0);
	    //text( "Output", this.x + 5, this.y + 15);
		

	}
}
