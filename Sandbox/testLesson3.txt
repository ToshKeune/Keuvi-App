	function updateContainers (pageId){
	if(contentArray[pageId] != undefined){
		var content = contentArray[pageId];
		var controls = controlsArray[pageId];		
		document.getElementById('controlsContainer').innerHTML = controls;
		document.getElementById('contentContainer').innerHTML = content;
		//Adding the page indicator
		document.getElementById('pageIndicator').innerHTML = "You're on page "+parseInt(pageId+1)+" of "+contentArray.length;
		document.getElementById('pageId').value = pageId; 
		document.getElementById('styleId').value = 0; document.getElementById('styleDirection').value = 1; //Setting the style counter back to 0
	
		//TODO
		//Call the JS functions for interactive questions, so the spans are converted into toggleable things
		inlineAnswers();

	}// end if pageId exists
	}

	function checkAnswer(pageId,submitted){
		//alert(submitted);
		//alert(answersArray[pageId]);
		if(submitted==answersArray[pageId]){
			document.getElementById('promptContainer').innerHTML = rightArray[pageId];
			document.getElementById('promptContainer').style.visibility = "visible";

			document.getElementById('promptContainer').innerHTML += "<div class='buttonNext' style='position:absolute;bottom:0px;right:0px;' onclick='document.getElementById(\"promptContainer\").style.visibility=\"hidden\"; updateContainers(parseInt(document.getElementById(\"pageId\").value)+1);'>Next</div> " ;			
		}else{

			//!!adding logic here so that for multiple wrong answers, the correct hint is shown
			var hints = wrongArray[pageId];
			if(Array.isArray(hints)==false){ //only one hint for page
			document.getElementById('promptContainer').innerHTML = wrongArray[pageId];
			document.getElementById('promptContainer').style.visibility = "visible";
			document.getElementById('promptContainer').innerHTML += "<div class='buttonBack' style='position:absolute;bottom:0px;right:0px;;' onclick='document.getElementById(\"promptContainer\").style.visibility=\"hidden\"; updateContainers(parseInt(document.getElementById(\"pageId\").value));'>Retry</div> " ;
			}else{ // multiple hints so get the right one
			var thisHint = hints[submitted]; //!!!! Need to make sure that the answer is the # of the option selected, so the hints also pair up 
			document.getElementById('promptContainer').innerHTML = thisHint;
			document.getElementById('promptContainer').style.visibility = "visible";
			document.getElementById('promptContainer').innerHTML += "<div class='buttonBack' style='position:absolute;bottom:0px;right:0px;;' onclick='document.getElementById(\"promptContainer\").style.visibility=\"hidden\"; updateContainers(parseInt(document.getElementById(\"pageId\").value));'>Retry</div> " ;				
			}



		}
	
	}

/*  !!  Here I'm going to put all of the logic which produces interactivity on that page  !!  */
// Styling Processing

	function styleOnClick(){
		//var styleId = document.getElementById('styleId').value;
		//var styleDirection = document.getElementById('styleDirection').value;

		if(document.getElementById("f"+document.getElementById('styleId').value) != undefined){ //this one exists
			document.getElementById("f"+document.getElementById('styleId').value).classList.toggle( document.getElementById("f"+document.getElementById('styleId').value).getAttribute('addClass') );
			document.getElementById('styleId').value = parseInt(document.getElementById('styleId').value) + parseInt(document.getElementById('styleDirection').value);	
		}else{
			 document.getElementById('styleDirection').value =  document.getElementById('styleDirection').value * -1;
			 document.getElementById('styleId').value = parseInt(document.getElementById('styleId').value) + parseInt(document.getElementById('styleDirection').value);
			 
			 if(document.getElementById("f"+document.getElementById('styleId').value) != undefined){ //if it can switch directions, run that and move that new direction
			 	document.getElementById("f"+document.getElementById('styleId').value).classList.toggle( document.getElementById("f"+document.getElementById('styleId').value).getAttribute('addClass') );
				document.getElementById('styleId').value = parseInt(document.getElementById('styleId').value) + parseInt(document.getElementById('styleDirection').value);	
			 	}			
		}

	}
// Interactive Text

	function inlineAnswers(){
//want to have a span w class pFill, attribute for if correct, attribute for the mark to show
	var list = document.getElementsByTagName("span");
	for(i=0;i<list.length;i++){
		var j = list[i];
		j.innerHTML = "";
		//j.className = "pFillChecked"
		j.setAttribute("onclick","toggleAnswer(this);");
		//list[i] = j;
	}
	}

	function toggleAnswer(me){
		if(me.getAttribute("pChar") != undefined){
			me.classList.toggle("pFillChecked");
			if(me.innerHTML != me.getAttribute("pChar") ){
				me.innerHTML = me.getAttribute("pChar");
			}else{
				me.innerHTML = "";
			}
		}
	}

	function checkToggleAnswer(){
		var correct = "true";
		var list = document.getElementsByTagName("span");
		for(i=0;i<list.length;i++){
			var j = list[i];
			if(j.getAttribute("pChar") != undefined && j.getAttribute("pRight") != undefined){
				if(j.innerHTML != j.getAttribute("pRight")){
					correct = false;
				}
			}
		}
		//alert(correct);		
		checkAnswer(document.getElementById('pageId').value,correct);

	}


	function multipleChoice(){
		var choice = 0;
		var form = document.forms[0];
		for(i=0;i<form.length;i++){
			if(form[i].checked){
				choice = i;
			}
		}

		return choice;
	}


/*
	!!
	Here we are manually creating the array for the content and controls. Ideally this would be pulled from a URI, local or otherwise
	!!
*/

	var contentArray = [];
	var controlsArray = [];	
	var answersArray = [];
	var wrongArray = [];
	var rightArray = [];

//Lesson
	contentArray.push("This is where the basic text goes in a query - <bold>it looks like this </bold> can contain whatever HTML can be put here.<br><br>The two BR tags what added a two lines to give the space seen on the screen <br><br>This is the <large><bold>third line</bold></large> on the screen.<br><br>Laying this out to see is we can cleanly get details built up on-screen <tiny><i>debug token</i></tiny> people performing the verb. <br>")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '> Go to Next</div>");

	contentArray.push("This is where the basic text goes in a query - <bold>it looks like this </bold> can contain whatever HTML can be put here without error but it isn't being displayed properly.<br><br>The two BR tags what added a two lines to give the space seen on the screen <br><br>This is the <large><bold>third line</bold></large> on the screen.<br><br>Laying this out to see is we can cleanly get details built up on-screen people performing the verb. <br><br>Need to construct HTML to include 2 columns.<br><br>Since who serves the same purpose as the other subject pronouns, you can often test whether or not who works in a sentence by replacing it with, say, she.<br><br>Who is coming over to study for the test?<br><br>She is coming over .to study for the test.<br><br>Who wants to skip the study group and cover the teacher's car in Post-It notes instead?<br><br>She wants to skip the study group and cover the teacher's car in Post-It notes instead.<br><br>If you can replace \"who\" with \"she\" and the sentence still makes sense, then you know that \"who\" is the correct pronoun.")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;'  onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("This is where the basic text goes in a query - <bold>it looks like this </bold> can contain whatever HTML can be put here without error but it isn't being displayed properly.<br><br>This is where the basic text goes in a query - <bold>it looks like this </bold> can contain whatever HTML can be put here without ERROR but it isn't being displayed properly.<br>This is where the basic text goes in a query - <bold>it looks like this </bold> can contain whatever HTML can be put here without error but it isn't being displayed properly.<br><br>The two BR tags what added a two lines to give the space seen on the screen <br><br>This is the <large><bold>third line</bold></large> on the screen.<br><br>Laying this out to see is we can cleanly get details built up on-screen people performing the verb. <br><br>Need to construct HTML to include 2 columns.<br><br>Since who serves the same purpose as the other subject pronouns, you can often test whether or not who works in a sentence by replacing it with, say, she.<br><br>Who is coming over to study for the test?<br><br>She is coming over .to study for the test.<br><br>Who wants to skip the study group and cover the teacher's car in Post-It notes instead?<br><br>She wants to skip the study group and cover the teacher's car in Post-It notes instead.<br><br>If you can replace \"who\" with \"she\" and the sentence still makes sense, then you know that \"who\" is the correct pronoun.<br>Whom is an object pronoun. It serves the same purpose as me, her, him, us, and them.<br><br>Whom is used for the person or people on the receiving end of the verb. Think of the places you've heard or seen \"whom\" used before: <br><br>To whom it may concern:<br><br>Do not ask for whom the bell tolls.")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("Some examples:<br><br>Whom did you invite to help us cover the teacher’s car in Post-Its?<br><br>Rob gave the Post-It notes to whom?<br><br>I feel bad for the student whom the teacher accuses of covering her car in Post-It notes.")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("\"Whom\" is associated with the other object pronouns, so you should be able to reply to \"whom\" sentences with an object pronoun.<br><br>Whom did you invite to help us cover the teacher’s car in Post-Its?<br><br>I invited him.<br><br>Rob gave the Post-Its to whom?<br><br>Rob gave the Post-Its to her.<br><br>I feel bad for the student whom the teacher accused of covering her car in Post-It notes.<br><br>I feel bad for them. The teacher accused them of covering her car in Post-It notes, even though all of us were involved.")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("HINT: If there's a directional phrase (to, for, at, near, about, around, etc.) in front of a who/whom, then you know that the pronoun has to be \"whom.\" <br><br>Rob gave the post-its to whom?<br><br>NOTE: Not all whoms are immediately preceded by a directional term (Whom did you invite to help us cover the teacher’s car in post-its?). However, every time you do see a to or a for, you know for certain that the pronoun has to be whom. <br><br>You'd never say Rob gave the post-its to I, so you'd also never say Rob gave the post-its to who? It's Rob gave the post-its to me or Rob gave the post-its to whom?")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");
//Exam

//Testing for Gramour Toggling
/*
	contentArray.push("We got<span class='pFill' pChar=';' pRight=''></span>detention for<span class='pFill' pChar=';' pRight=';'></span>the Post-It note prank?");
	controlsArray.push("<div class='buttonAnswer' id='submitAnswer' style='float:right;' onclick='checkToggleAnswer();'>Am I right?</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");	 
	answersArray[6] = "true" //!!! For gramor toggling choices, the answer array value is true
	wrongArray[6] = "HINT: If we were answering this question, would we use <i>she</i>  or <i>her</i>?<br><br> <i>She</i> got detention or <i>Her</i> got detention?";
	rightArray[6] = "Correct!<br><br>The person or people in the blank are the one(s) getting detention.<br><br>You would say \"She got detention.\"<br><br>That means the complete sentence should read <i>Who got detention for the post-it prank?</i>";
/*
*/
/**/
	
	contentArray.push("<select id='0' class='contentContainer'><option value='Who'>Who</option><option value='Whom'>Whom</option></select> got detention for the Post-It note prank?");
	controlsArray.push("<div class='buttonAnswer' id='submitAnswer' style='float:right;' onclick='checkAnswer(parseInt(document.getElementById(\"pageId\").value), document.getElementById(\"0\").value) '>Am I right?</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");	 //doing the logic to get all the answers in this specific control object, could be passing to the function I guess for it to find. However, if different tag types... then a problem! Not here, but elsewhere
	answersArray[6] = "Who"
	wrongArray[6] = "HINT: If we were answering this question, would we use <i>she</i>  or <i>her</i>?<br><br> <i>She</i> got detention or <i>Her</i> got detention?";
	rightArray[6] = "Correct!<br><br>The person or people in the blank are the one(s) getting detention.<br><br>You would say \"She got detention.\"<br><br>That means the complete sentence should read <i>Who got detention for the post-it prank?</i>";
/**/


	contentArray.push("<select id='1' class='contentContainer'><option value='Who'>Who</option><option value='Whom'>Whom</option></select> did the principal call into her office for questioning?");
	controlsArray.push("<div class='buttonAnswer' id='submitAnswer' style='float:right;' onclick='checkAnswer(parseInt(document.getElementById(\"pageId\").value), document.getElementById(\"1\").value) '>Am I right?</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");	 //doing the logic to get all the answers in this specific control object, could be passing to the function I guess for it to find. However, if different tag types... then a problem! Not here, but elsewhere
	answersArray[7] = "Whom"
	wrongArray[7] = "HINT: If we were answering this question, would we use <i>she</i>  or <i>her</i>?<br><br> <i>She</i> got detention or <i>Her</i> got detention?";
	rightArray[7] = "Correct!<br><br>The person or people in the blank are the one(s) getting detention.<br><br>You would say \"She got detention.\"<br><br>That means the complete sentence should read <i>Who got detention for the post-it prank?</i>";	







//Test for multiple choice

	contentArray.push("There are now a bunch of options to choose?! Fun!<br><br> <form><input type='radio' id='0' name='mc'><label for='0'>First Choice/* Text for 1st choice */</label><br><input type='radio' id='1' name='mc'><label for='1'>Not 1st Choice /* Text for choice 2 */</label><br><input type='radio' id='2' name='mc'><label for='2'>Worst Choice</label> </form> ");
	controlsArray.push("<div class='buttonAnswer' id='submitAnswer' style='float:right;' onclick='checkAnswer(parseInt(document.getElementById(\"pageId\").value), multipleChoice()) '>Am I right?</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");	 
	answersArray[8] = "2"
	wrongArray[8] = ['Not extremely hot, but w/e','this is kinda annoying ain\'t it','this one is right']; //!!!! MC are given an array, not a string!!!!
	rightArray[8] = "Correct!the 3rd option is id #2";



//Recap
	contentArray.push("<i>Who</i> is the <span id=\"f0\" addClass=\"underline\"> subject pronoun</span>. It acts like I, she, he, we, and they. <i>Who</i> performs the verb.<br><br><i>Who</i> let the dogs out?<br><br><i>Whom</i> is the <span id=\"f1\" addClass=\"underline\"> object pronoun </span>. It acts like me, her, him, us, and them. <i>Whom</i> isn't the one(s) performing the verb; <i>whom</i> is the one(s) having the verb done to them.<br><br><i>Whom did you tell about me letting the dogs out?</i><br><br>");
	controlsArray.push("<div class='buttonAnswer' style='float:right;'' onclick='listLessons()'>Return to Other Lessons</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");


//LOAD FIRST
	updateContainers(0);