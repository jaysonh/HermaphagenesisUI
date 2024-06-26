
function createPrompt(organList){

	var prompt = "a unique amphibious creature with ";

	for(var i = 0;i < organList.length;i++)
	{
		prompt += organList[i].name;

		if( i==organList.length-2 )
		    prompt += " and ";
		else  if(i < organList.length-2)
		    prompt += ", a ";
	}

	prompt += creatureLocation() + " featuring an elongated, segmented body, webbed limbs for efficient movement, and keen sensory organs. Highlight the vibrant forest flora and detailed burrow system, emphasizing realistic textures and dynamic lighting. High detail, lifelike depiction, intricate anatomical features, immersive natural habitat ";

	var paragraphWidth = 70;

	const myArray = prompt.split(" ");
	var indx = 0; 
	var totalLength = 0;

	var promptWithNL = "";

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
	//outputImg = loadImage(url);
	return promptWithNL;
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
