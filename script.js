var draw = SVG('drawing').size(500, 500).link('../');
var timeElement = document.querySelector('#time');

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const t = "14191771056331861450905439953328545697861381955239891833290732477079437281"; // number obtained by taking epoch time to the 6th power


// let myDate = new Date(1995, 8, 4, 21, 33, 33, 333);
let myDate = new Date(2019, 11, 31, 11, 59, 59, 999);
// let myDate = new Date(2020, 0, 1, 0, 0, 0, 0);
let timeString = pow( myDate.getTime().toString(), 6 );
console.log(myDate.toUTCString());
console.log(timeString);
draw.clear();
let pathString = flowerEncode(timeString);
draw.path(pathString).center(250, 250).transform({ scale: 20 });

timeElement.innerText = printDateTime(myDate);

// draw.path(pathString).move(250, 250).transform({ scale: 20 });

// let t = pow( Date.now().toString(), 6 );


/**
 * Turns an input string of digits into an SVG flower path.
 * @param {String} s An input string of digits
 * @param {Number} radix The radix of each digit in the string. Default = 10
 * @return {String} An SVG path
 */
function flowerEncode(s, radix=10) {
	const l = s.length; // length of input
	if (l < 3) { return ''; }

	// magic numbers
	const ctrl_pt_multiplier = 0.3

	// starting point
	let theta = 0,
			r = parseInt( s.charAt(0) ),
			ctrl_pt_angle = (theta - Math.PI) + ( ( parseInt( s.charAt(1) ) / (radix-1) ) * 2 * Math.PI ),
			ctrl_pt_extend = parseInt( s.charAt(2) ) * ctrl_pt_multiplier,
			x  = r * Math.cos(theta),
			y  = r * Math.sin(theta),
			x2 = x + ctrl_pt_extend * Math.cos(ctrl_pt_angle),
			y2 = y + ctrl_pt_extend * Math.sin(ctrl_pt_angle);

	let p; 																// svg path
	p = ['M', x2, 0].join(' ');         	// Moveto initial point (radius, 0)
	p += ['S', x2, -y2, x, y].join(' ');	// First Bezier curve

	for (let i=3; i+2<l; i+=3) {
		let theta = i/l * 2*Math.PI,
				r = parseInt( s.charAt(i) ),
				ctrl_pt_angle = (theta - Math.PI) + ( ( parseInt( s.charAt(i+1) ) / (radix-1) ) * 2 * Math.PI ),
				ctrl_pt_extend = parseInt( s.charAt(i+2) ) * ctrl_pt_multiplier,
				x  = r * Math.cos(theta),
				y  = r * Math.sin(theta),
				x2 = x + ctrl_pt_extend * Math.cos(ctrl_pt_angle),
				y2 = y + ctrl_pt_extend * Math.sin(ctrl_pt_angle);
		p += ['S', x2, y2, x, y].join(' ');	// Add Bezier curve
	}

	p += ['S', x2, -y2, x, y].join(' ');	// Last Bezier curve
	p += 'z'; // close path

	return p;
}

// function render(input) {
// 	draw.clear();
// 	let path = flowerEncode(input);
// 	draw.path(path).move(250, 250).transform({ scale: 20 });
// }

// setInterval(() => {
// 	t = pow( Date.now().toString(), 6 );
// 	render(t);
// }, 10000);


function printDateTime( dt ) {
  console.log(months);
  var month = months[ dt.getMonth() ];
  return month + ' ' + dt.getDate() + ', ' + dt.getFullYear() + '. ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ':' + dt.getMilliseconds();
}
 





// Get character code of first character in string
function charCode( character ) {
	return character.charCodeAt(0) ;
}

// Long multiplication with string representations of integers.
// From Rosetta Code: https://rosettacode.org/wiki/Long_multiplication#JavaScript
function mult(strNum1, strNum2) {
	var a1 = strNum1.split("").reverse();
	var a2 = strNum2.toString().split("").reverse();
	var aResult = new Array;
	for ( var iterNum1 = 0; iterNum1 < a1.length; iterNum1++ ) {
		for ( var iterNum2 = 0; iterNum2 < a2.length; iterNum2++ ) {
			var idxIter = iterNum1 + iterNum2; // Get the current array position.
			aResult[idxIter] = a1[iterNum1] * a2[iterNum2] + ( idxIter >= aResult.length ? 0 : aResult[idxIter] );
			if ( aResult[idxIter] > 9 ) { // Carrying
				aResult[idxIter + 1] = Math.floor( aResult[idxIter] / 10 ) + ( idxIter + 1 >= aResult.length ? 0 : aResult[idxIter + 1] );
				aResult[idxIter] %= 10;
			}
		}
	}
	return aResult.reverse().join("");
}

// Power function with string representation of integer
function pow(strNum, power) {
	let result = strNum;
	while (--power > 0)
		result = mult(result, strNum);
	return result;
}