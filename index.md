<html>
<head>
<style>
body {font-family:Arial; font-size:11pt; line-height:1.25;}
#btn, #txt {margin-top:15px; margin-right:7px;}
#btn {padding:10px; background-color:gray; color:white; cursor:pointer; cursor:hand; border-radius:5px;  user-select:none; }
#txt {display:none;}
</style>
</head>
<body>
<div id="btn">Answer</div>
<div id="txt">The kingdom of heaven.</div>
</body>
<script>
// This needs to be dynamically determined from the page number itself.
question = 1;

answers = ["A whole multitude.","Leaven was compared to the kingdom of heaven.","He is drawing everyone to Him.","The Spirit of God.","In the heart.","Our love for Christ.","To be born again by the Spirit of God.","Incorruptible beauty of a quiet spirit.","Conversion.","We are made holy (sanctified) by the Word of God.","We gain through God’s Word the power of salvation and the ability to live by faith.","Love, joy, peace, long-suffering, gentleness, goodness, faith, meekness, and temperance.","Seek first the kingdom of heaven.","Our desire will be to seek the good of others and not self.","Our conduct will become holy.","There is joy in heaven."]

let btn = document.querySelector("#btn");
btn.style.backgroundImage = "linear-gradient(to right, #1155cc, " + ((question % 2) == 1 ? "white" : "#f2f2f2" ) + ")";

let txt = document.querySelector("#txt");
txt.innerHTML = answers[question-1]

turn = -1;
btn.addEventListener("click", e => {
turn *= -1;
e.target.style.color = (turn == 1) ? "black" : "white";
txt.style.display = (turn == 1) ? "block" : "none";
});

</script>
</html>
