function displayExpo(e) {
	var expo = e.target.value;
	// alert("In displayExpo "+expo);
	var x = document.getElementById(e.target.value);
	// alert(x);
	switch (expo) {		
	case 'C23DIV':
		if (x.innerHTML === "") {
			x.innerHTML = "Reading snippet A lines 6 to 11 poses a question instead of supporting any assertion<br>Reading snippet B lines 19 to 21 describes  hypothetical response that does not support any claim.<br>Reading snippet C lines 28 to 29 just tells us about the setup of the experiment.<br>Reading snippet D lines 62 to 64 aupports the point of this question.";	
		} else {
			x.innerHTML = "";
		}
		break;
	case 'C78DIV':
		if (x.innerHTML === "") {
			x.innerHTML = "Answer 7 and 8 Paragraph 0 of the <b>answer!</b><br>Answer 7 and 8 Paragraph 1 of the <b>answer!</b><br>Answer 7 and 8 Paragraph 2 of the answer!<br>Answer 7 and 8 Paragraph 3 of the answer!";	
		} else {
			x.innerHTML = "";
		}
		break;				

	}	
}

		
//  These are the functions needed to make the Questions work as desired.
// POSSIBLE:  Add function to implement reading popups 
// DONE:  Implement selected Display toggling device. 
// DONE:  Bold selected text 
// TODO:  Redisplay Answers when show 
// TODO:  
		
function answerCheck(qid, response) {
	var el = document.getElementById(response);

	// alert("Right Responses = "+rightResponses.indexOf(response));         // Debug assist
	// alert(rightResponses[0]);                        // More debug assist  
	// alert(rightResponses.indexOf(response) != -1);   // Third debug line
	
	if (rightResponses.indexOf(response) != -1 ) {    // Returns negative one if response not found in rightResponses otherwise it is
		el.style.color = "#66ff33";                   // set to specific shade using color picker
		el.style.fontWeight = "bold";                 // also set to bold for a positive contrast 
		// document.getElementById(qid).focus({preventScroll:true});  // attempting to keep focus on this question
		this.focus();

		// Having set the Right Answer to bold Bright Green in the above 2 lines clear the remaining options.
		// Remove third letter of response from set of questions
		// debugging lines
		// alert(questionOptions);
		// alert(response.slice(2));

		// remove the selected answer
		removeOption(response);
		// alert("After cleaning "+questionOptions);	

		// Clear rest of answers
		clearOptions(qid, response);	

		// Reset the array of options
		questionOptions = ["A", "B", "C", "D"];  // TODO:  Generalize past 4 options
		
		// TODO: Do we need to keep a list of questions that can still be answered
	}
	else 
	{
		el.style.color = "#ffffff"; // where background would be is a var set in the right scope
		removeOption(response);	    // remove the selected answer
		document.getElementById(qid).focus({preventScroll:true});				
	}
	el.style.backgroundColor = background;  // set where it covers the reading 
	//alert(e.target.value);
	// If error count == 0
	// First Time Right++ 
	// else Right++
}

// Helper function to clear used answer options
function removeOption(response) {
	// Remove third letter of the user response from set of questions
	//alert(questionOptions);
	// alert(response.slice(response.length-1));
	switch (response.slice(response.length-1)) {
		case 'A':
		  questionOptions[0]="";   
		  break
		case 'B':
		  questionOptions[1]="";   
		  break;
		case 'C':
		  questionOptions[2]="";   
		  break;
		case 'D':
		  questionOptions[3]="";   
		  break;
		}
	}	
		
// Helper function to clear other Answer Options  
function clearOptions(qid, response) {
	// alert("Item: "+item);
	// alert("Index: "+index);
	// alert("In clearing options "+questionOptions);
	var m;
	for (m = 0; m <= 3; m++) {
		var toClear = questionOptions[m];
		//alert("to Clearing "+toClear);
		// Do not clear the empty indices
		if (toClear != "") {
			// Construct the ID of the answer option to remove
			tempResponse = response.slice(0,response.length-1)+toClear;
	
			//alert(tempResponse);
			// remove this answer option
			var tel = document.getElementById(tempResponse);
			tel.style.color = "#ffffff"; 
			this.focus({preventScroll:true});

		}
		this.focus({preventScroll:true});
	}
}
		
		// Restores the questions when called when the explanation is shown
		function resetAnswers(targeted) {

			// alert("Right Responses = "+rightResponses.indexOf(response));         // Debug assist
			// alert(rightResponses[0]);                        // More debug assist  
			// alert(rightResponses.indexOf(response) != -1);   // Third debug line
			var m;
			for (m = 0; m <= 3; m++) {
				toReset = "Q"+targeted+questionOptions[m].toString();
				alert(toReset);
				var rel = document.getElementById(toReset);				
				if (rightResponses.indexOf(toReset) != -1 ) {    // Returns negative one if response not found in rightResponses otherwise it is
					rel.style.color = "#66ff33";                   // set to specific shade using color picker
					rel.style.fontWeight = "bold";                 // also set to bold for a positive contrast 
					// document.getElementById(qid).focus({preventScroll:true});  // attempting to keep focus on this question
					this.focus();
				}
				else {
					rel.style.color = "#000000";                   // otherwise set to black
					rel.style.fontWeight = "bold";                 // also set to bold for a positive contrast 
				
					// document.getElementById(qid).focus({preventScroll:true});  // attempting to keep focus on this question
					this.focus();
				}
			}	
		}
			
//  The code for handling the math is sketched out below.
function showMath(id, nextStep, Steps) {
	// Set up a list of steps (may come from outside)
	// Set up the root name
	var nel = document.getElementById(id);
	var nextLefttRoot = "Left_lsn_idx_"
	var nextRightRoot = "Right_lsn_idx_"

	for (x in nextStep, nextStep + Steps) 
	{
		nextLeft = nextLefttRoot + x.toString();
		nextRight = nextRightRoot + x.toString();
		// Set explanation text to corresponding text variable set in secondary JavaScript file.  Example shown
		// var nextLeftText = "Some specified text";
		//  Set the left HTML 
		document.getElementById(nextLeft).innerText = nextLeftText;

		// Set the math image source 
		document.getElementById(nextRight). innerHTML = "document.image.src = 'toString(nextRight)'";
	}
}	
		
		
		
function explaind(q){
	// In the cases below we can put most HTML tags so we could probably popup an image to explain a question
	// Use an accordion, modal box or toggling class to display/diaappear this content. 
	
	// Setup variables - this combination supports up to 10 paragraph but it requires empty paragraphs
	// Using an array of paragraphs (with the ly set up an array of indexs and use them
	//alert("In explaind");
	var explained = [];
	var targeted = q.target.value;
	var targetResult = "Q" + targeted.toString() + "DIV";	
	//alert("TargetResult "+targetResult);
	var i = startPara[targeted];
	//alert("Initial i="+i);
	//alert(written[targeted]);
	
	if (written[targeted]==false) {
		// Run through the for loop to set up explanation
		//alert("building expanation");		
		for (i = startPara[targeted]; i <= lastPara[targeted]; i++) {
			//alert("Index= "+i);
			explained += paragraphs[i] + "<br>";
			//alert("Output = "+explained);
		}
		written[targeted]=true;
		// restore the Answers
		alert (targeted);  
		resetAnswers(targeted);
	}	
	else if (written[targeted]==true) {
		// Blank out the explanation
		//alert("clearing explanation");
		explained = [];
		written[targeted]=false;
	}
	else  {
		alert("Impossible Logic");
	}
	
	// Write the built explanation to the right HTML element 
	document.getElementById(targetResult).innerHTML = explained;    
}
		  
function textExpo(e) {
	// alert("In textExpo");
	var expo = e.target.value;
	// alert(expo);
	var x = document.getElementById(e.target.value);
	// alert(x);
	switch (expo) {		
	case 'T1Expo':
		x.innerHTML = "Dubitable means uncertain, yielding to doubt.";	
		break;
		
	case 'T2Expo':
		x.innerHTML = "<b>Text 2 Popup</b>";	
		break;
		
	case 'T3Expo':
		x.innerHTML = "<b>Text 3 Pop-up</b>";	
		break;

	}	
}
		
				
function combined(e, firstQ, secondQ) {
	// This function handles situations where two questions have to be answered together. 
	// It is set up to accept two values then process the combined result of both.
	// In this use of this function the questions are #2 and #3
		
	// alert("In Combined");
	// alert(e.target.value);
	// Process each of the inputs
	
	// Copy the event text to a string
	var eventText = e.target.value;
	var outTarget = "C"+firstQ.toString()+secondQ.toString()+"Explained";	
	
	if ( eventText.slice(1,2) = firstQ ) 
	{
		firstAnswer= eventText.slice(eventText.length-1).toUpperCase();
	}
	else if ( eventText.slice(1,eventText.length-1) = secondQ ) 
	{
		secondAnswer= eventText.slice(eventText.length-1);
	}
	else
	{
	// Raise Error
	}
		
	// Now with both answers generate the response
	if (firstAnswer != null && secondAnswer != null)
	{
		// Set up the new combined response token
		combo = firstAnswer + secondAnswer;
		
		// alert (combo);
		answerCheck("Q"+firstQ+secondQ, "Q"+firstQ+secondQ+combo);
		
	}
	
	if (firstAnswer == null && secondAnswer != null)
	{
		document.getElementById(outTarget).value = "Please select an answer to question "+firstQ.toString();
		// error counter-increment
	}	
	
	if (firstAnswer != null && secondAnswer == null)
	{
		document.getElementById(outTarget).value = "Please select an answer to question "+secondQ.toString();
		// error counter-increment
	}
}
			
			
function showResp(e) {
	//alert("Getting There");
	//alert(e.target.id);
	// alert(e.target);
	// alert(value);
	// Convert e to qid and response
	eventText = e.target.id;
	//alert(eventText);
	var eventTarget = eventText.slice(0,2)+"DIV"
	answerCheck(eventText.slice(0,2)+"DIV", eventText);	
	document.getElementById(eventText).focus({preventScroll:true});
	return false;
}