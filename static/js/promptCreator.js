var promptWithNL = "";

function createPrompt(organList){

	if( organList.length <= 0)
	{
  		window.alert('Cannot generate organism, no organs added to canvas')
		return "";
	}else
	{
		var prompt = "a unique amphibious creature with ";

		for(var i = 0;i < organList.length;i++)
		{
		console.log(i + ": " + organList[i].x + "," + organList[i].canvasW + "   " + organList[i].y +"," + organList[i].canvasH);
		var normX = organList[i].x / organList[i].canvasW;
		var normY = organList[i].y / organList[i].canvasH;
		var posTxt = createOrganPosition(organList[i].name,1,normX, normY);

		prompt += posTxt;
//		prompt += organList[i].name;
//
//		if( i==organList.length-2 )
//		    prompt += " and ";
//		else  if(i < organList.length-2)
//		    prompt += ", a ";
		}

		prompt += creatureLocation() + " featuring an elongated, segmented body, webbed limbs for efficient movement, and keen sensory organs. Highlight the vibrant forest flora and detailed burrow system, emphasizing realistic textures and dynamic lighting. High detail, lifelike depiction, intricate anatomical features, immersive natural habitat ";

		var paragraphWidth = 70;

		const myArray = prompt.split(" ");
		var indx = 0; 
		var totalLength = 0;

		while(indx < myArray.length )
		{
		
			promptWithNL += myArray[indx] + " ";
			totalLength += myArray[indx].length;
			if(totalLength > paragraphWidth)
			{
				totalLength = 0;
				promptWithNL += "\n";
			}
			indx++;
		}	


       		url = "http://18.189.184.178/?prompt=\"" + promptWithNL + "\"";
		loadingGenImg = true;
		console.log("opening url: " + url);
		outputImg = loadImage(url);
		return promptWithNL;
	}
}
function savePrompt(filename){
                var strArr =[];
                strArr.push( promptWithNL);
                saveStrings(strArr, filename);
        }
// organName - string 
// numOrgans - number of organs
// posX - 0.0 - 1.0 normalised
// posY - 0.0 - 1.0 oormalised
// position is split into 9 squares: 
// topLeft, top, topRight
// left, middle, right
// botLeft, bot, botRight

function createOrganPosition(organName, numOrgans, posX, posY){
	var txt = "";

	console.log("checking " + organName + " " + posX + "," + posY);
	if(numOrgans > 1 ){
		txt += numOrgans + " "+ organName + " at the ";
	}else{
		txt += organName + " at the ";
	}

        // Top
        if( posX < 0.3333){
		txt += " top ";
        }
        // Centre
        else if(posY < 0.6666){
		txt += " middle ";
        }
        // Bottom
        else{
		txt += " bottom ";
        }

	// Left
	if( posX < 0.3333){
		txt += " left, ";
	}
	// Centre
	else if(posX < 0.6666){
		txt += " centre, ";
	}
	// Right
	else{
		txt += " right, ";
	}


	return txt;
}

// get a random number (inclusive of min and max)
function getRandomInt(min, max) {
    min = Math.ceil(min); // Ensure min is an integer
    max = Math.floor(max); // Ensure max is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function creatureLocation(){

	var description = "Visusalise this organism in ";

	var creatureLocation = [];
	creatureLocation.push(" in a dense forest with underground burrows,"     );
	creatureLocation.push(" in a dense forest and mountainous region");
	creatureLocation.push(" a vibrant forest flora and rugged mountain terrain");

	var randLocation = getRandomInt(0,2);

	description += creatureLocation[ randLocation ];
	return description;
}

