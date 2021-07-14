/*
var bodyposition = document.querySelector("body").getBoundingClientRect().left / 16;
document.querySelector("#bookcover").style.left = (bodyposition - 12.5) + "em";
*/

/************************************************************************************
 Show lesson information and image at top of page
 ************************************************************************************/

var htitle = document.querySelector("head title").innerHTML;
var lesson = htitle.split(":")[0].split(" ")[1];
var title = htitle.split(":")[1];

document.querySelector("#lesson").innerHTML = "Lesson " + lesson;
document.querySelector("#title").innerHTML = title;

var img = document.querySelector("#bookcover img");
img.src = "../images/" + lesson + ".jpg"
img.title = title;
img.addEventListener("click", m => {
	location.href = "../index.html";
});

/************************************************************************************
 Set up Table of Contents with lesson numbers and respective number of questions
 ************************************************************************************/

q = 1;
toc = "";
var questionsDone = 7;
var lessonQuestions = [20, 15, 13, 16, 12, 10, 8, 20, 16, 27, 14, 6, 23, 34, 38];
lessonQuestions.forEach(qtn => {
	completed = (q <= questionsDone) ? "completed" : "";
	toc += '<div><a ' + completed + ' href="Lesson' + ('0' + q).substr(-2) + '.html">' + ('0' + q).substr(-2) + '</a><sup ' + completed + '>' + qtn + '</sup></div>';
	q++;
});
document.querySelector("#toc").innerHTML = toc;
current = document.querySelector("#toc div:nth-child(" + lesson + ") a");
current.classList.add("current");
current.setAttribute("href", "");


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
			q = txt.substr(n, 500).replace(/\.\s([A-Z])/, ".<pm></pm> $1");
			t += q
		}
	}
	cmt.innerHTML = t.replace(/[\-\–]\s+(<line>[a-z])/, "$1")

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
		verse.querySelector(".text").innerHTML = ref.scriptures[B - 1].split("*")[0];
	});
}).catch(err => {
	console.log("Unable to fetch answers for this lesson: " + err);
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

