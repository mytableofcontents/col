/************************************************************************************
 Show lesson information and image at top of page
 ************************************************************************************/
var htitle = document.querySelector("head title").innerHTML;  // e.g. Lesson 1: Like Unto Seeds
var lesson = htitle.split(":")[0].split(" ")[1]; // 1
var title = htitle.split(":")[1]; // Like Unto Seeds

document.querySelector("#lesson").innerHTML = "Lesson " + lesson;
document.querySelector("#title").innerHTML = title;
document.querySelector("head title").innerHTML = "Seeds of Wisdom – Lesson " + lesson;

var img = document.querySelector("#bookcover img");
img.src = "../images/" + lesson + ".jpg"
img.title = title;


/************************************************************************************
 For the Introductory page (Lesson 0), use the word "Introduction" in the title.
 ************************************************************************************/
if (lesson == 0) {
	document.querySelector("#lesson").innerHTML = "Introduction";
	document.querySelector("#title").innerHTML = title;
	document.querySelector("head title").innerHTML = "Seeds of Wisdom – Introduction";
}


/************************************************************************************
 Set up Table of Contents with lesson numbers and respective number of questions
 ************************************************************************************/
q = 0;
toc = "";
var questionsDone = 8;
var lessonQuestions = ["Intro", 20, 15, 13, 16, 12, 10, 8, 20, 16, 27, 14, 6, 23, 34, 38];
lessonQuestions.forEach(qtn => {
	completed = (q <= questionsDone) ? "completed " : "";
	current = (q == lesson) ? "current" : "";
	toc += '<div class="' + completed + current + '"><a href="Lesson' + ('0' + q).substr(-2) + '.html">' + ('0' + q).substr(-2) + '</a><span>' + qtn + '</span></div>';
	q++;
});
document.querySelector("#toc").innerHTML = toc;


/************************************************************************************
    Format COMMENTARY sections
 1. Create paragraphs for the "web" format and remove unncessary hyphens
 2. Use a button to toogle between web and book formats.
 ************************************************************************************/
document.querySelectorAll(".commentary p").forEach(cmt => {
	txt = cmt.innerHTML;
	d = txt.length / 500;
	t = txt.substr(0, 500);
	if (d > 1) {
		for (n = 500; n < txt.length; n = n + 500) {
			// Divide the paragraph by next sentence leaving no orphans
			otext = txt.substr(n, 500);
			ntext = otext.replace(/([\.\?]\”{0,1})\s([A-Z])/, "$1<pm></pm> $2");
			qtext = ntext.split("<pm></pm>");
			qt = qtext.length > 1;
			q = qt ? (qtext[1].replace(/<[\w\/]*?>/g, "").length <= 105 ? otext : ntext) : otext;
			t += q
		}
	}
	cmt.innerHTML = t.replace(/([\-\–]\s+)(<line>[a-z])/g, "<bf>$1</bf>$2");
	
});

document.querySelector("#changeformat span").addEventListener("click", e => {
	e.target.innerHTML = e.target.innerHTML == "OFF" ? "ON" : "OFF";
	e.target.style.color = e.target.innerHTML == "OFF" ? "gray" : "green";

	document.querySelectorAll(".commentary").forEach(cmt => {
		cmt.classList.toggle("bookformat");
	});
});


/************************************************************************************
 On each ANSWER click, "Answer" changes color and toggles the display of the answer
 ************************************************************************************/
var ansb = document.querySelectorAll(".answer span:first-child");
ansb.forEach((btn) => {
	btn.addEventListener("click", e => { 
		btn.style.color = (btn.style.color == "") ? "brown" : (  (btn.style.color == "brown") ? "white" : "brown" );
		btn.nextElementSibling.style.display = ((btn.style.color == "brown")) ? "block" : "none";
	});
});


/************************************************************************************
 Populate the page with the answers
 ************************************************************************************/
var answers = document.querySelectorAll(".answer span:last-child");
A = 0;
fetch("Answers.json").then(response => {
	return response.json();
}).then(data => {
	ans = data["Lesson " + lesson];
	answers.forEach( (answer) => {
		answer.innerHTML = ans[++A - 1]
	});
}).catch(err => {
	console.log("Unable to fetch answers for this lesson: " + err);
});


/************************************************************************************
 Populate the page with scripture texts and respective links
 ************************************************************************************/
var verses = document.querySelectorAll(".scripture");
B = 0;
fetch("References.json").then(response => {
	return response.json();
}).then(data => {
	ref = data["Lesson" + ('0' + lesson).substr(-2)];
	verses.forEach((verse) => {
		++B;
		verse.querySelector(".reference span a:first-child").setAttribute("href", ref.contexts[B - 1]);
		verse.querySelector(".reference span a:last-child").setAttribute("href", ref.versions[B - 1]);
		verse.querySelector(".text").innerHTML = ref.scriptures[B - 1];
	});
}).catch(err => {
	console.log("Unable to fetch scriptures and links for this lesson: " + err);
});


/************************************************************************************
 On each SEND click, "Thank you" goes forward-backward through an array of colors 
 ************************************************************************************/
var sendb = document.querySelector(".send button");
var resp = sendb.nextElementSibling;
colors = ["#000000", "#333333", "#666666", "#999999", "#cccccc", "#ffffff"];
n = colors.length;
c = 0;
click = 0;

sendb.addEventListener("click", e => {
	if (c == 0) { resp.innerHTML = "Thank you."; }
	resp.style.color = colors[c];
	c = c + Math.sin(((Math.trunc(click++ / (n - 1))) * Math.PI) + (Math.PI / 2) );
});


/*
var headerposition = document.querySelector(".header").getBoundingClientRect().left / 16;
document.querySelector("#bookcover").style.left = (headerposition - 12.5) + "em";
*/
