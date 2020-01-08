
/********* CLASSES ********/

// 2D Vector class
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
}



/********* EXECUTION *********/
let draw = SVG('drawing').size(700, 700);

let birthday = (new Date(1995, 8, 4, 0, 0, 0, 0)).getTime(); // my birthday
// let colors = ['#ccff00', '#ffd700', '#fff600'];
// let colors = ['#ffe800', '#fffd70', '#ffd700'];
// let colors = ['#FFFC3C', '#FFDC21'];
let colors = ['#FF3E79', '#FE3767'];
// let bgColors = ['#005F65', '#1E552E', '#030065', '#144AA0'];

let promise = new Promise(function(resolve, reject) {

  // generate blue noise samples and continue
  let samples = poissonDiskSampling(50, 40, 660, 660);

  draw.clear();
  // draw.rect(700, 700).fill('#D400B9');
  // draw.rect(700, 700).fill('#B300E3');
  // draw.rect(700, 700).fill('#086A00');
  // draw.rect(700, 700).fill('#FFFFF1');
  draw.rect(700, 700).fill('#ffffff');


  // console.log(samples.length + " samples generated");
  // console.log(samples);
  // samples.forEach(v => {
  //   let color = bgColors[ Math.floor( Math.random() * 4 )];
  //   draw.circle(60).attr({cx: v.x, cy: v.y}).fill(color).addClass('blur');
  // });

  resolve();

}).then(() => {

  // generate blue noise samples and continue
  let samples = poissonDiskSampling(50, 18, 660, 660);
  console.log(samples.length + " samples generated");
  console.log(samples);

  // draw a circle at each sample point
  samples.forEach(v => {
    // draw.circle(4).attr({cx: v.x, cy: v.y});
    // draw.text('+').attr({cx: v.x, cy: v.y});
    draw.plain('+').font('family', 'Akzidenz-Grotesk BQ').font('weight', '100').dx(v.x).dy(v.y);

    // var randomMoment = birthday + Math.floor((Math.random() * 86400000)); // random millisecond from my birthday
    // var timeString = pow( randomMoment.toString(), 5 ); // raise integer to the sixth power to expand data.
    // let pathString = flowerEncode(timeString);
    // let color = colors[ Math.floor(Math.random()*2) ];
    // draw.path(pathString).fill(color).center(20 + v.x, 20 + v.y).transform({scale: 0.8 });
  });

  console.log( draw.svg() );
});


console.log("Get 200 random moments");

// function update() {
//   let myDate = new Date();
//   let timeString = pow( myDate.getTime().toString(), 6 );
//   draw.clear();
//   let pathString = flowerEncode(timeString);
//   draw.path(pathString).center(250, 250).transform({ scale: 20 });
//   timeElement.innerText = printDateTime(myDate);
// }

// update();

// setInterval(() => {
//   update();
// }, 1000);

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

  let p;                               // svg path
  p = ['M', x2, 0].join(' ');          // Moveto initial point (radius, 0)
  p += ['S', x2, -y2, x, y].join(' '); // First Bezier curve

  for (let i=3; i+2<l; i+=3) {
    let theta = i/l * 2*Math.PI,
        r = parseInt( s.charAt(i) ),
        ctrl_pt_angle = (theta - Math.PI) + ( ( parseInt( s.charAt(i+1) ) / (radix-1) ) * 2 * Math.PI ),
        ctrl_pt_extend = parseInt( s.charAt(i+2) ) * ctrl_pt_multiplier,
        x  = r * Math.cos(theta),
        y  = r * Math.sin(theta),
        x2 = x + ctrl_pt_extend * Math.cos(ctrl_pt_angle),
        y2 = y + ctrl_pt_extend * Math.sin(ctrl_pt_angle);
    p += ['S', x2, y2, x, y].join(' '); // Add Bezier curve
  }

  p += ['S', x2, -y2, x, y].join(' '); // Last Bezier curve
  p += 'z'; // close path

  return p;
}

// Print Date & Time in format: "January 1, 2020. 02:00:00.000"
function printDateTime( dt ) {
  var month = months[ dt.getMonth() ];
  return month + ' ' + dt.getDate() + ', ' + dt.getFullYear() + '. ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0') + '.' + dt.getMilliseconds().toString().padStart(3, '0');
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

// Calculate the distance between two points
function distance(x1, y1, x2, y2) {
  return Math.sqrt( Math.pow(y2-y1, 2) + Math.pow(x2-x1, 2) );
}


/**
 * Generates Blue Noise points using Fast Poisson Disk Sampling by Robert Bridson
 * k = how many new samples to try before rejecting the current one (paper suggests 30)
 * r = relative distance between the points
 * w = width of the box
 * h = height of the box
 */ 
function poissonDiskSampling(k, r, w, h) {
  let samples = [];
  let active_list = [];
  active_list.push( new Vector( Math.random()*w , Math.random()*h ) );

  let len;
  while ((len = active_list.length) > 0) {
    // picks random index uniformly at random from the active list
    let index = Math.floor( Math.random() * len ); // int index = int(random(len));
    
    // swap - https://stackoverflow.com/questions/872310/javascript-swap-array-elements
    [active_list[len-1], active_list[index]] = [active_list[index], active_list[len-1]]; // Collections.swap(active_list, len-1, index);

    let sample = active_list[len-1]; // PVector sample = active_list.get(len-1);
    let found = false;
    for (let i = 0; i < k; ++i) {
      // generates a point uniformly at random in the sample's
      // disk situated at a distance from r to 2*r 
      let angle = 2 * Math.PI * Math.random();
      let radius = Math.random() * r + r;
      let dv = new Vector( radius * Math.cos(angle) , radius * Math.sin(angle) );
      let new_sample = dv.add(sample);
      let ok = true;
      for (let j = 0; j < samples.length; ++j) {
        // check if new sample is far enough from existing samples
        if (distance(new_sample.x, new_sample.y, samples[j].x, samples[j].y) <= r) {
          ok = false;
          break;
        }
      }
      if (ok) {
        // check if new sample is within bounds
        if (0 <= new_sample.x && new_sample.x < w && 0 <= new_sample.y && new_sample.y < h) {
          samples.push(new_sample);
          active_list.push(new_sample);
          len++;
          found = true;
        }
      }
    }
    if (!found) {
      active_list.splice(active_list.length - 1);
    }
  }
  return samples;
}