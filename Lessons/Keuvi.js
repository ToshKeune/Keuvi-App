//  These are the functions needed to make the Questions work as desired.
// TODO:  Add function to implement reading popups 
// TODO:  Implement selected Display toggling device. 

function answerCheck(qid, response) {
	var el = document.getElementById(qid);

	if (response in rightResponses) {
		el.style.color = "green"; // set to specific shade using color picker
	}
	else 
	{
		el.style.color = background; // where background is a var set in the right scope
	}
	el.style.fontSize = "15px";      // the standard text size
    el.style.backgroundColor = background;  // set where it covers the reading 
	
	//alert(e.target.value);
	// If error count == 0
	// First Time Right++ 
	// else Right++
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
 	
	var explained = [];
	
	var targetResult = q.toString() + "Explained";	
	
	var i
	for (i = Start[q]; i <= Last[q]; i++) {
		explained += paragraphs[i] + "<br>";
	}
	
	// Write the built explanation to the right HTML element 
	document.getElementById(targetResult).innerHTML = explained;    
}
  
		
function combined(e, firstQ, secondQ) {
	// This function handles situations where two questions have to be answered together. 
	// It is set up to accept two values then process the combined result of both.
	// In this use of this function the questions are #2 and #3
		
	// alert("In Combined");
	// alert(e.target.value);
	// Process each of the inputs
	
	// This may be unnecessary but lets start by copying the event text to a string
	// At the least it will make the code easier to read and more clear for the compiler
	var eventText = e.target.value;
    var outTarget = "C"+firstQ.toString()+secondQ.toString()+"Explained";	
	
	if ( eventText.slice(1,2) = firstQ ) 
	{
		firstAnswer= eventText.slice(2).toUpperCase();
    }
	else if ( eventText.slice(1,2) = secondQ ) 
	{
		secondAnswer= eventText.slice(2);
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
	//		document.getElementById("Q4MyExpo").value = e.target.value;
	// 		document.getElementById("myExpo").value = "Getting There";

	// Convert e to qid and response
	eventText = e.target.value;
	
    answerCheck(eventText.slice(0,2)+"Expo", eventText);	
}
