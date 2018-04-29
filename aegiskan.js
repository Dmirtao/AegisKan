// AegisKan, by Dmirtao (Andy Karsai), 2018
//
// General structure of AegisKan, first Stage:
// Webpage frontend, with Javascript running main logic. 
// Use frontend to make AJAX queries for SVG/XML Kanji data, and store in Javascript space.
// (An alternate future method may be loading in all of Kanji SVG data on pageload, only ~40MB )
// Once desired SVG are in Javascript, create SVG.js objects from them as a container
// Draw out the SVG.js objects to the webpage.
//
// 2nd Stage Structure:
//
//
//




$(document).ready(function() {
	
	$("button").ready(function () {
		/* body... */
		$("button").click(function () {
			/* body... */
			$("#drawBox").load("kanjivg/kanji/05e38.svg");
			//getChar("kanjivg/kanji/05e38.svg");
		});
	});




});

function unicodeToCharURL (unicodeVal) {
	// body... 
	var urlGen = "kanji/" + unicodeVal + ".svg";
	return urlGen;
}

function loadChar(unicodeVal) {
	var xhttp = new XMLHttpRequest();
	var urlToFetch = unicodeToCharURL(unicodeVal);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			parseCharXml(this);
		}
	};
	xhttp.open("GET",urlToFetch,true);
	xhttp.send();
}	

function parseCharXml (xml) {
	// Argument: Unicode value for character loading. Should have format kanjivg/kanji/#####.svg
	// https://www.w3schools.com/js/js_ajax_xmlfile.asp
	var xmlDoc = xml.responseXML;
	var gArr = xmlDoc.getElementsByTagName("g");
	var pathArr = xmlDoc.getElementsByTagName("path");
}

function makeSVGkan (svgData) {
	// Make SVG.js object from fetched svgData from getChar)_ 
}