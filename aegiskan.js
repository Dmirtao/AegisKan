// AegisKan
// By Dmirtao, 2018
// Under construction

 /**
* Dependencies: jQuery, SVG.js, KanjiVG
*/
(function() {

	var slice = Function.prototype.call.bind(Array.prototype.slice);

	SVG.extend(SVG.Path, {
		drawAnimated: function(options){
			options = options || {};
			options.duration = options.duration || '1000';
			options.easing = options.easing || '<>';
			options.delay = options.delay || 0;
			
			this.colorIn = options.colorIn || '#000000';

			var length = this.length();

			this.stroke({
				width:         2,
				dasharray:     length + ' ' + length,
				dashoffset:    length,
			});

			var fx = this.animate(options.duration, options.easing, options.delay).during(function (pos, morph, eased, situation) {
				if (pos > 0) {
					this.stroke({
						color:  this.colorIn,
					});
				}
				// ^ Fix to eliminate unintentional black spots in inconsistent browser renderings of 0 length SVG paths.
			});

			fx.stroke({
				dashoffset: 0
			});	
			return this;
		},
	});
}).call(this);





AegisKanView = {
	initialize:function (divName, frameDim, strokeWidth, fontSize, zoomFactor, kanji, color, animate, animateTime, simDraw) {
		this.canvas = new SVG(divName);
		this.viewbox = this.canvas.viewbox();
		this.frameDim = frameDim;
		this.strokeWidth = strokeWidth;
		this.fontSize = fontSize;
		this.zoomFactor = zoomFactor;
		this.kanji = kanji;
		this.fetchNeeded = true;
		this.color = color;
		this.animate = animate;
		this.animateTime = animateTime;
		this.simDraw = simDraw;
		this.setFrameDim(frameDim);
		this.setZoom(zoomFactor);
		this.refreshKanji();
	},
	setZoom:function (zoomFactor) {
		var percent = (zoomFactor/100);
		var dim = 109*(1/percent); // A single Kanji.svg has 109x109 dimension
		this.canvas = this.canvas.viewbox(0,0,dim,dim);
	},

	setFrameDim:function(frameDim) {
		this.canvas.attr('height',frameDim);
		this.canvas.attr('width',frameDim);
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

	setSimDraw: function (simDraw) {
		this.simDraw = simDraw;
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
			this.canvas.clear() ; //Clear the SVG() object. Make this work properly even when nothing is drawn
			var loader = this.canvas.text("Loading" + this.kanji);
			var fontPos = Math.round(this.frameDim/50);
			var fontSize = Math.round(this.frameDim/30);
			loader.font({
				x: 		fontPos.toString(),
				y: 		fontPos.toString(),
				fill: 	'black',
				family: 'sans-serif',
				size: 	fontSize.toString(),
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
						parent.canvas.clear(); // Make this clear() work even when nothing is drawn
						var error = parent.canvas.text(parent.kanji + ' not found.');
						error.font({
							x: 		fontPos.toString(),
							y: 		fontPos.toString(),
							fill: 	'black',
							family: 'sans-serif',
							size: 	fontSize.toString(),
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

	createStroke:function (path,color,duration,delayIn) {
		if (this.animate == 'true') {
			var stroke = this.canvas.path(jQuery(path).attr('d')).drawAnimated({duration: duration, easing: '<>', delay: delayIn, colorIn: color}); 
			// Make duration adjustable and add delay arrays
			stroke.attr({
				'stroke':'none',
				'fill':'none',
				'stroke-width': this.strokeWidth,
				'stroke-linecap':'round',
				'stroke-linejoin':'round',
			});
		} else {
			var stroke = this.canvas.path(jQuery(path).attr('d'));
			stroke.attr({
				'stroke': color,
				'fill':'none',
				'stroke-width': this.strokeWidth,
				'stroke-linecap':'round',
				'stroke-linejoin':'round',
			});
		}

		return stroke;
	},


	// Core drawing function
	drawKanji:function() {
		var parent = this;
		var animTime = parent.animateTime;
		var time = 0;
		this.canvas.clear(); //Clear the SVG() object
		var groups = jQuery(this.xml).find('svg > g > g > g');
		var strokeNum = jQuery(this.xml).find('path').length;
		jQuery(this.xml).find('path').each(function (index) { // $Each() callback function
			var color = parent.color;
			var length = this.getTotalLength();
			var dur = animTime;
			var delay = dur*index;
			if (parent.simDraw == 'true') {
				var stroke = parent.createStroke(this,color,dur,0)
			} else {
				var stroke = parent.createStroke(this,color,dur,delay);
				time = time + dur;
			}
		});
	},
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