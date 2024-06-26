
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

	prompt += ". Set this organism in a dense forest and subterranean burrow environment, featuring an elongated, segmented body, webbed limbs for efficient movement, and keen sensory organs. Highlight the vibrant forest flora and detailed burrow system, emphasizing realistic textures and dynamic lighting. High detail, lifelike depiction, intricate anatomical features, immersive natural habitat ";

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
	outputImg = loadImage(url);
	return promptWithNL;
}
