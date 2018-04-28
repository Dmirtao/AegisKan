$(document).ready(function() {
	
	$("button").ready(function () {
		/* body... */
		$("button").click(function () {
			/* body... */
			$("#drawBox").load("kanjivg/kanji/05e38.svg");
		});
	});




});

function unicodeToCharURL (unicodeVal) {
	// body... 
	var urlGen = unicodeVal;
	return urlGen;
}


function getChar (url) {
	// Argument: Unicode value for character loading.
	var svgData = new new XMLHttpRequest();
	svgData.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

		}
	}
	//$("svgData").load("kanjivg/kanji/05e38.svg");
	// body... 
}


function makeSVGkan (argument) {
	// body... 
}