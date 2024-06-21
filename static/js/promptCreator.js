
function createPrompt(organList){

	var prompt = "";

	for(var i = 0;i < organList.length;i++)
	{
		prompt += organList[i].name + " ";
	}
	return prompt;
}
