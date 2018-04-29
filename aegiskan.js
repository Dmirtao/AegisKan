// Under construction

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

 /**
* Dependencies: jQuery, SVG.js, KanjiVG
 */


AegisKanView = {
	initialize:function (divName, strokeWidth, fontSize, zoomFactor, kanji) {
		/* body... */
		this.paper = new SVG(divName);
		this.strokeWidth = strokeWidth;
		this.fontSize = fontSize;
		this.zoomFactor = zoomFactor;
		this.kanji = kanji;
		this.fetchNeeded = true;
		this.setZoom(zoomFactor);
		this.refreshKanji();
	},
	setZoom:function (zoomFactor) {
		this.paper = // SVG set viewbox
	},

	setStrokeWidth:function (strokeWidth) {
		this.strokeWidth = strokeWidth;
	},

	setFontSize:function (fontSize) {
		this.fontSize = fontSize;
	},

	setKanji:function (kanji) {
		if (kanji != this.kanji && kanji != '' && kanji != undefined) {
			this.kanji = kanji;
			this.fetchNeeded = true;
		}
	},

	refreshKanji:function () {
		if (this.fetchNeeded && this.kanji != "") {
			var parent = this;
			this.paper.clear() ; Clear the SVG() object
			         //    loader.attr({
            //     'x':50,
            //     'y':50,
            //     'fill':'black',
            //     'font-size':18,
            //     'text-anchor':'start'
            // });
			var loader = 0; // this.paper.text(0,0,'Loading' + this.kanji);
			loader.attr({
				''
			});
			jQuery.ajax({
				url:'kanji/0' + this.kanji.charCodeAt(0).toString(16) + '.svg',
				dataType: 'xml',
				success:function (results) {
					parent.fetchNeeded = false;
					parent.xml = results;
					parent.drawKanji();
				},
				statusCode:{
					404:function() {
						this.paper.clear() ; Clear the SVG() object
						var error = //this.paper.text(0,0,'Loading' + this.kanji);
						                  //       var error = parent.paper.text(0, 0, parent.kanji + ' not found');
                        // error.attr({
                        //     'x':50,
                        //     'y':50,
                        //     'fill':'black',
                        //     'font-size':18,
                        //     'text-anchor':'start'
                        // });
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
		/* body... */
	},

	createHover:function(stroke) {

	},

	createHovers:function(strokes) {

	},
	drawKanji:function() {
		var parent = this;
		// this.paper.clear() ; Clear the SVG() object

		var groups = jQuery(this.xml).find('svg > g > g > g');


	}
};