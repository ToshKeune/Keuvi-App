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


/*
	!!
	Here I'm going to put all of the logic which produces interactivity on that page
	!!
*/
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