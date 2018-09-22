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
	contentArray.push("<h2>Apostrophes</h2> We use apostrophes for two reasons: to make contractions and to show possession.<br><br><h2>Contractions</h2><br><br><u> Original     Contraction</u><br> do not  =>   don't<br>can not  => can't<br>has not => hssnt't<br>I will =>  I'll <br>we are => we're<br>Nick is =>  Nick's<br><br>")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '> Next Page </div>");

	contentArray.push("That was obviously not an exhaustive list of every possible contraction, but, hopefully, it shows you the pattern.<br><br>Common verbs can be combined and contracted with <span id="bAqua"> not</span>. For example, <span id="bAqua">do not</span> becomes <span id="bAqua">don’t</span>. We push the two words together, then replace the <span id="bAqua">o</span> in <span id="bAqua">not</span> with an apostrophe.<br><br>Pronouns and names can also combine with common verbs and be contracted. Hence, <span id="bAqua">she is</span> becomes <span id="bAqua">she's</span>.<br><br>Sometimes students avoid contractions on the test because they think that they aren't allowed in formal writing. Contractions get a bad rap from grammatical atrocities like <span id="bAqua">ain't</span>, but they're generally fine on the test (and in your own writing).<br><br>")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;'  onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("also use apostrophes to indicate possession. <br><br><underline\i>  Original        Becomes   </underline\><br.<br>the bike belonging to Kelly  =>  Kelly's Bike<br>the passing of time => time's passing<br>the students assigned to 20 teachers => the teachers' students<br>the basketball team composed of women => the women's team<br>
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next Page</div> <div class='buttonBack' onclick='  (   (   .}(\"pageId\").value)-1) '>Back 1/div>");

	contentArray.push("<h2 span class='bAqua'>Kelly's Bike</span><br>For many nouns, we denote possession by sticking an apostrophe at the end of the word and gluing on an <span id="bAqua">s</span>.<br><br>time's passing</span><br>We can also do this for an abstract concept like time, even though time doesn't physically possess like a person does.<br><br><span id="bAqua"> the 20 teachers’ students</span><br><br>For common nouns that already end in an s, however, we don't need to glue another s on after the apostrophe. Before we started assigning possession, teachers already ended with an s. Hence, we’ll just attach the apostrophe after the original s.")
	con	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").trolsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("<span class='bAqua'>women's basketball team</span><br><br>It's a common misconception that we put the apostrophe after the s for all plural nouns. Indeed, this is often the case, as most nouns take on an <span class='bAqua'>s</span> when they become plural.<br><br>However, there are some nouns where we do something else to another part of the word to make it plural. Here, woman becomes women. Even though women is plural, it doesn't have an s. That means it works like <span class='bAqua'>Kelly's</span> or <span class='bAqua'>time's</span>: we need to glue the <span class='bAqua'>s</span> on after the apostrophe.<br><br>There are three similar words that also show up on the test: men, children, and people.<br><br><span class='bAqua'>men's restroom</span><span class='bAqua'>children's hospital</span><span class='bAqua'>people's republic</span>")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("<span class='bpurple'>Just so you know…</span><br><br>With names that end in an s, we have two perfectly acceptable options:. <br><br><span class='bAqua'>Dr. Seuss's rhymes</span> or <span class='bAqua'>Dr. Seuss’ rhymes</span><br><br><span class='bAqua'>Louis's homework</span> or <span class='bAqua'>Louis’ homework</span><br><br><span class='bAqua'>Cyrus's car</span> or <span class='bAqua'>Cyrus’ car</span><br><br>Since this is really dealer’s choice, it doesn’t show up on the test. When it comes up in your own writing, you can choose to add the apostrophe or not. Either way, just be consistent. Add the apostrophe every time or ignore it every time.")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("<span class='bpurple'>How would we use apostrophes to simplify the following phrases?</span><br><br>he does not want to<br><br> the ball belonging to Alex<br><br> toys belonging to the three dogs <br><br>the playground for children <br><br>")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");

	contentArray.push("<span class='bpurple'>Review</span><br><br>We can use apostrophes to combine and contract verbs and not: <span class='bAqua'>has not</span> becomes <span class='bAqua'>hasn’t</span>.<br><br>We can also combine and contract pronouns or names with verbs: he is</span> becomes he’s</span>.<br><br>We use apostrophes to show possession. For words that don’t normally end in <span class='bAqua'>s</span>, we add an apostrophe and an <span class='bAqua'>s: <span class='bAqua'>April’s showers</span><br><br>For words that do end in s</span>, we usually place the apostrophe at the end without adding another s: <span class='bAqua'>the two classes’ assignments</span>.")
	controlsArray.push("<div class='buttonNext' style='float:right;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)+1) '>Next</div><div class='buttonBack' style='float:left;' onclick='updateContainers(parseInt(document.getElementById(\"pageId\").value)-1) '>Prior</div>");
//Exam  -  End of New Material

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