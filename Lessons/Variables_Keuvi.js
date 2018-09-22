<!-- Basic Script Variable --> 
// define variables to deal with linked questions
var firstAnswer=null;
var secondAnswer=null;

var background = "#ffffff";  // Sets the background to white

// define variables to control the display of explanations
//                0  1   2   3   4   5   6   7   8   9  10  11
var startPara = [ 0, 0,  9, 14, 22, 25, 29, 32, 36, 44, 48, 53];
var lastPara =  [ 0, 8, 13, 17, 24, 28, 31, 35, 39, 47, 52, 56];
// Remember these indices are Zero based so to have written[11] need 12 entries
var written = [ false, false, false, false, false, false, false, false, false, false, false, false];
var mixed = ["Q23", "Q78"];	

// Index for removing the unselected wrong answers
var questionOptions = ["A", "B", "C", "D"];	

// Explanation Text elements to display
var paragraphs = new Array(	  
	/* 0 */  "In the first paragraph, the author writes, 'humans,it turns out, don’t know very much with absolute, undeniable objectivity.",   /* 0 */
	/* 1 */	 "In other words, human knowledge is fallible (that is, liable to fail).",  /* 1 */
	/* 2 */	 "Later, the author writes, 'First-person introspection, the act of a person scanning his or her own brain to see what going on in there, might not be as unquestionable as once thought.",  /* 2 */
	/* 3 */	 "This indicates that our uncertainty ought to cover fields which we recently were quite certain of.",           /* 3 */
	/* 4 */	 "<b>Answer A is a tad extreme.</b>",  /* 4 */
	/* 5 */	 "Answer C is partially correct: the passage argues that our second order thinking is imperfect.",  
	/* 6 */	 "However, the second part isn't supported in the passage. The author writes, 'No one can really say whether or not their first order thinking.",
	/* 7 */	 "<b>This is not a resounding testimony in favor of first order thinking.</b>",
	/* 8 */	 "<i>Answer D takes things a bit too far. Epistemology isn't itself a threat to the storehouse of human knowledge, like a fire engulfing a library; epistemology is, rather, an examination of whether or not that storehouse exists in the first place.</i>",	
	/* Question 2 */
	/* 9 */  "Well, let's look at question 3.",
	/* 10 */ "The best support for Answer D is found in A) Lines 6-11: <q>Things in the natural world are inevitably filtered through our (limited) senses. We have mountains of evidence that the brain is not a neutral observer of the world around it; perception is not some transparent glass through which we see, hear, taste, touch, and smell things as they really are.</q>",
	/* 11 */ "Answer A directly contradicts the passage.",				
	/* 12 */ "Answer B is a bit much-- it reads a intentional mischievousness into the brain's functioning that does not appear anywhere in the passage. Remember, whatever you've been taught, beleive, or see as common truth this question relates to what is in the reading.",
	/* 13 */ "Answer C is extreme. Just because the brain is <q><b>not neutral</b>,</q> that doesn't mean it's essentially useless.",
	/* Question 3 */ 
	/* 14 */ "Reading snippet A lines 6 to 11 poses a question instead of supporting any assertion",
	/* 15 */ "Reading snippet B lines 19 to 21 describes  hypothetical response that does not support any claim.", 
	/* 16 */ "Reading snippet C lines 28 to 29 just tells us about the setup of the experiment.",				
	/* 17 */ "Reading snippet D lines 62 to 64 aupports the point of this question.",				
	/* Question 2 & 3 */
	/* 18 */ "A is the answer that goes along with Answer D in question 2. These lines state the author's general opinion on the workings of the brain.",
	/* 19 */ "Answer B is not the writer&#8217s own thinking. It is a hypothetical response to the first paragraph.", 			
	/* 20 */ "Answer C just tells us about the setup of the experiment; it doesn&#8217t really give us any idea of what the experiment indicated.", 	
	/* 21 */ "Answer D is unrelated to question 2. It does touch on something the author does positively attribute to the brain, but that's not the primary focus or main thrust of the passage's discussion of the brain.",
	/* Question 4 */	
	/* 22 */ 	"Paragraph 1 of the <b>answer!</b>",
	/* 23 */	"<i>We perceive the present in a biased way, and our memories of the past get blurred even more.</i>",
	/* 24 */	"This sentence preserves the meaning of the original sentence, that our <b>memories get less and less exact over time.</b>",
	/* Question 5 */ 
	/* 25 */	"Paragraph 1 of the <b>answer!</b>",
	/* 26 */	"Answer 5 Paragraph 2 of the <b>answer!</b>",
	/* 27 */	"Answer B doesn't really have any basis in the passage. The new paragraph doesn't go on to prove the accuracy of the claims in the first one. In fact, the second paragraph seems to be a kind of resigned reaction to the first.",
	/* 28 */	"Answer D is contradictory: we transition to a field of knowledge that we shouldn't actually have complete faith in.",
	/* Question 6 */  
	/* 29 */	"Paragraph 1 of <b>answer to question 6!</b>",
	/* 30 */	"Answer 6 Paragraph 2 of the <b>answer!</b>",	
	/* 31 */	"This new sentence preserves the original sentence&#8217s sense that a considerable majority of participants picked the glove on the far right.",
	/* Question 7 */  
	/* 32 */	"Answer 7 Paragraph 1 of the <b>answer!</b>",
	/* 33 */	"Answer 7 Paragraph 2 of the <b>answer!</b>", 
	/* 34 */	"Answer 7 Paragraph 2 of the <b>answer!</b>",
	/* 35 */	"Answer 7 Paragraph 3 of the answer!",
	/* Question 8 */  
	/* 36 */	"Answer 8 Paragraph 0 of the <b>answer!</b>",
	/* 37 */	"Answer 8 Paragraph 1 of the <b>answer!</b>",
	/* 38 */	"Answer 8 Paragraph 2 of the answer!",			
	/* 39 */	"Answer 8 Paragraph 3 of the answer!",				
	/* Question 7 & 8 */  
	/* 40 */	"Answer 7 and 8 Paragraph 0 of the <b>answer!</b>",
	/* 41 */	"Answer 7 and 8 Paragraph 1 of the <b>answer!</b>",
	/* 42 */	"Answer 7 and 8 Paragraph 2 of the answer!",				
	/* 43 */	"Answer 7 and 8 Paragraph 3 of the answer!",				
	/* Question 9 */  
	/* 44 */	"Paragraph 1 of the <b>answer!</b>",	
	/* 45 */	"Answer 9 Paragraph 2 of the <b>answer!</b>",
	/* 46 */	"Answer 9 Paragraph 3 of the answer!",
	/* 47 */	"Answers B and C are first order thoughts.",					
	/* Question 10 */  
	/* 48 */	"Answer 10 Paragraph 1 of the <b>answer!</b>",
	/* 49 */	"Answer 10 Paragraph 1 of the <b>answer!</b>",
	/* 50 */	"Answer 10 Paragraph 3 of the answer!",
	/* 51 */	"Answer C is partially there&#58 the author is certainly enthusiasm. However&#44 skepticism would be a contradictory reaction in this case.",
	/* 52 */	"Answer D is also partially right. The author is keenly interested. However&#44 we never get any sense of anger.",
	/* Question 11*/  
	/* 53 */	"Answer 11 Paragraph 1 of the <q><b>answer!</b></q>",
	/* 54 */	"Answer 11 Paragraph 2 of the <b>answer!</b>",
	/* 55 */	"Answer 11 Paragraph 3 of the answer!",
	/* 56 */	"Answer D is a tad extreme. The author never calls these researchers cowards. The author merely states that there are followups ripe for completion." 
	);

var rightResponses = ["Q1A", "Q2B", "Q3C", "Q4D", "Q5A", "Q6B", "Q7C", "Q8D", "Q9A", "Q10B", "Q11C"]; 
