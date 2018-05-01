// AegisKan
// By Dmirtao, 2018
// Under construction

 /**
* Dependencies: jQuery, SVG.js, KanjiVG
 */


AegisKanView = {
	initialize:function (divName, strokeWidth, fontSize, zoomFactor, kanji, color, animate, animateTime) {
		this.paper = new SVG(divName);
		this.strokeWidth = strokeWidth;
		this.fontSize = fontSize;
		this.zoomFactor = zoomFactor;
		this.kanji = kanji;
		this.fetchNeeded = true;
		this.color = color;
		this.animate = animate;
		this.animateTime = animateTime;
		this.setZoom(zoomFactor);
		this.refreshKanji();
	},
	setZoom:function (zoomFactor) {
		var dim = 109 * zoomFactor; // Fix this oddity
		this.paper = this.paper.viewbox(0,0,dim,dim);
	},

	setStrokeWidth:function (strokeWidth) {
		this.strokeWidth = strokeWidth;
	},

	setFontSize:function (fontSize) {
		this.fontSize = fontSize;
	},

	setAnimate: function(animate) {
		this.animate = animate;
	},

	setAnimateTime: function (animateTime) {
		this.animateTime = animateTime;
	},

	setKanji:function (kanji) {
		if (kanji != this.kanji && kanji != '' && kanji != undefined) {
			this.kanji = kanji;
			this.fetchNeeded = true;
		}
	},



	// Core querying code
	refreshKanji:function () {
		if (this.fetchNeeded && this.kanji != "") { 
			var parent = this;
			this.paper.clear() ; //Clear the SVG() object. Make this work properly even when nothing is drawn
			var loader = this.paper.text("Loading" + this.kanji);
			loader.font({
				x: 		'50',
				y: 		'50',
				fill: 	'black',
				family: 'sans-serif',
				size: 	'18',
				anchor: 'start'
			});
			jQuery.ajax({
				url:'kanji/0' + this.kanji.charCodeAt(0).toString(16) + '.svg', // Fetch char code of first element and convert to hexadecimal string
				dataType: 'xml',
				success:function (results) {
					parent.fetchNeeded = false;
					parent.xml = results;
					parent.drawKanji();
				},
				statusCode:{
					404:function() {
						// this.paper.clear(); // Make this clear() work even when nothing is drawn
						var error = parent.paper.text(parent.kanji + ' not found.');
						error.font({
							x: 		'50',
							y: 		'50',
							fill: 	'black',
							family: 'sans-serif',
							size: 	'18',
							anchor: 'start'
						})
					}
				}
			})
		}
		else {
			this.drawKanji();
		}
		/* body... */
	},

	createStroke:function (path,color) {
		var dur = this.animateTime;
		if (this.animate == 'true') {
			var stroke = this.paper.path(jQuery(path).attr('d')).drawAnimated({duration: dur, easing: '<>'}); // Make duration adjustable and add delay arrays
		} else {
			var stroke = this.paper.path(jQuery(path).attr('d'));
		}
		stroke['initColor'] = color;
		stroke.attr({
			'stroke':color,
			'fill':'none',
			'stroke-width':this.strokeWidth,
			'stroke-linecap':'round',
			'stroke-linejoin':'round'
		});
		return stroke;
	},


	// Core drawing function
	drawKanji:function() {
		var parent = this;
		this.paper.clear(); //Clear the SVG() object
		var groups = jQuery(this.xml).find('svg > g > g > g');
		jQuery(this.xml).find('path').each(function () { // $Each() callback function
			var color = parent.color;
			var stroke = parent.createStroke(this,color)
		});
	}
};


// Credit to:
/**
 * Copyright (C) 2012 Axel Bodart.
 *
 * This work is distributed under the conditions of the Creative Commons
 * Attribution-Share Alike 3.0 Licence. This means you are free:
 * to Share - to copy, distribute and transmit the work
 * to Remix - to adapt the work

 * Under the following conditions:
 * * Attribution. You must attribute the work by stating your use of KanjiVG in
 *    your own copyright header and linking to KanjiVG's website
 *    (http://kanjivg.tagaini.net)
 * * Share Alike. If you alter, transform, or build upon this work, you may
 *    distribute the resulting work only under the same or similar license to this
 *    one.
 *
 * See http://creativecommons.org/licenses/by-sa/3.0/ for more details.
 */