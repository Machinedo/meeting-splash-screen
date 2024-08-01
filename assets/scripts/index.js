let song;
let fft;
let particles = [];
let img;
let timerAvl = false;
/**
 * Control panel
 */
let isTextShown = true;
let isTimerShown = true;
let isLinearWave = false;
let isSplEffectsEnabled = true;
const TIME_IN_MINS = 5;
// const IMG_URL = "https://source.unsplash.com/random/3840x2160?summer,scenary&auto=format&fit=crop&w=750&q=80";
const IMG_URL = "/assets/images/background/Mountain-Summer.jpg";
const SHOW_TEXT = "We'll be starting soon!";

const headerTextEle = document.getElementById('heading-text');

const hamburgerEle = document.getElementsByClassName('hamburger')[0];
const navbarEle = document.getElementsByClassName('navbar')[0];

/**
 * Particle class
 *//**
 * Represents a particle in a simulation.
 */
class Particle {
  /**
   * Creates a new Particle object.
   */
  constructor() {
    /**
     * The position of the particle.
     * @type {p5.Vector}
     */
    this.pos = p5.Vector.random2D().mult(250);

    /**
     * The velocity of the particle.
     * @type {p5.Vector}
     */
    this.vel = createVector(0, 0);

    /**
     * The acceleration of the particle.
     * @type {p5.Vector}
     */
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    /**
     * The size of the particle.
     * @type {number}
     */
    this.w = random(3, 5);

    /**
     * The color of the particle.
     * @type {number[]}
     */
    this.color = [random(100, 255), random(200, 255), random(100, 255)];
  }

  /**
   * Updates the particle's velocity and position.
   * @param {boolean} cond - A condition to determine if additional position updates should be applied.
   */
  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }

  /**
   * Checks if the particle is outside the boundaries of the canvas.
   * @returns {boolean} - True if the particle is outside the boundaries, false otherwise.
   */
  edges() {
    if (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Displays the particle on the canvas.
   */
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}

/**
 * Preloads assets and performs initialization before the sketch starts.
 */
function preload() {

  const inputSelect = createSelect();
  inputSelect.option('cinematic-chillhop', './assets/music/cinematic-chillhop.mp3');
  inputSelect.option('forest-lullaby', './assets/music/forest-lullaby.mp3');
  inputSelect.option('in-the-forest-ambience', './assets/music/in-the-forest-ambience.mp3');
  inputSelect.option('just-relax', './assets/music/just-relax.mp3');
  inputSelect.option('lofi-chill', './assets/music/lofi-chill.mp3');
  inputSelect.option('onceagain', './assets/music/onceagain.mp3');
  inputSelect.option('rainbow-after-rain', './assets/music/rainbow-after-rain.mp3');
  
  // song = loadSound(inputSelect.value());
  // song.setPath('./assets/music/onceagain.mp3', ()=>{console.log('set path onchange');});
  
  inputSelect.changed(() => {
    const selectedValue = inputSelect.value();
    if (!song) {
      song = loadSound(selectedValue);
    } else {
      song.setPath(selectedValue);
    }
  }); 
  inputSelect.id("music-select");
  inputSelect.parent('music-select-hldr');
  /**
   * Creates a file input element and loads the selected sound file.
   * @param {File} file - The selected file.
   */

  // const inputbtn = createFileInput((file) => {
  //   song = loadSound(file);
  // });

  /**
   * Retrieves the first input element and adds a label for accessibility.
   */
  var inputELE = document.getElementsByTagName("input")[0];
  // const label = document.createElement("label");
  // label.setAttribute("for", "audioInput");
  // label.textContent = "Choose a file";
  // label.classList.add("a11yHide");
  // inputELE.parentNode.insertBefore(label, inputELE.nextSibling);


  /**
   * Loads an image from the specified URL.
   * @type {p5.Image}
   */
  img = loadImage(IMG_URL);

  // song = loadSound("/assets/Veens - Girl.mp3")
  // img = loadImage("https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=747")
  // img = loadImage("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")
  // img = loadImage("https://source.unsplash.com/random/3840x2160?nature,fall&auto=format&fit=crop&w=750&q=80")
  // img = loadImage("https://source.unsplash.com/random/3840x2160?nature,spring&auto=format&fit=crop&w=750&q=80")
  // img = loadImage("https://source.unsplash.com/random/3840x2160?nature,summer&auto=format&fit=crop&w=750&q=80")
}

/**
 * Sets up the initial configuration of the sketch.
 */
function setup() {
  /**
   * Creates a canvas with the dimensions of the window.
   * @param {number} windowWidth - The width of the window.
   * @param {number} windowHeight - The height of the window.
   */
  createCanvas(windowWidth, windowHeight);

  /**
   * Sets the angle mode to degrees.
   */
  angleMode(DEGREES);

  /**
   * Sets the image mode to center.
   */
  imageMode(CENTER);

  /**
   * Sets the rectangle mode to center.
   */
  rectMode(CENTER);

  /**
   * Creates a Fast Fourier Transform (FFT) object with the specified smoothing and bin count.
   * @param {number} smoothing - The amount of smoothing to apply to the FFT analysis (0.0 to 1.0).
   * @param {number} bins - The number of frequency bins to divide the audio spectrum into.
   */
  fft = new p5.FFT(0.8, 512);

  /**
   * Applies a blur filter to the image.
   * @param {number} filterType - The type of blur filter to apply.
   * @param {number} filterParam - The parameter value for the blur filter.
   */
  img.filter(BLUR, 1);

  /**
   * Stops the draw loop from continuously executing.
   */
  noLoop();
}

/**
 * Draws the visual elements and updates the animation frame.
 */
function draw() {
  /**
   * Sets the background color to black.
   */
  background(0);

  /**
   * Translates the origin of the coordinate system to the center of the canvas.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   */
  translate(width / 2, height / 2);

  /**
   * Analyzes the audio using Fast Fourier Transform (FFT).
   */
  fft.analyze();

  /**
   * Retrieves the energy level of a specific frequency range.
   * @param {number} lowFreq - The lower frequency bound.
   * @param {number} highFreq - The higher frequency bound.
   * @returns {number} The energy level of the specified frequency range.
   */
  amp = fft.getEnergy(20, 200);

  /**
   * Saves the current transformation matrix.
   */
  push();

  /**
   * Displays an image at the center of the canvas with an increased size.
   * @param {p5.Image} img - The image to be displayed.
   * @param {number} x - The x-coordinate of the image's center.
   * @param {number} y - The y-coordinate of the image's center.
   * @param {number} w - The width of the image.
   * @param {number} h - The height of the image.
   */
  image(img, 0, 0, width + 100, height + 100);

  /**
   * Restores the transformation matrix to its previously saved state.
   */
  pop();

  /**
   * Maps the amplitude value to an alpha value for the fill color.
   * @param {number} value - The value to be mapped.
   * @param {number} start1 - The lower bound of the input range.
   * @param {number} stop1 - The upper bound of the input range.
   * @param {number} start2 - The lower bound of the output range.
   * @param {number} stop2 - The upper bound of the output range.
   * @returns {number} The mapped value.
   */
  var alpha = map(amp, 0, 255, 100, 150);

  /**
   * Sets the fill color with a low alpha value.
   * @param {number} gray - The grayscale value of the fill color.
   * @param {number} alpha - The alpha value of the fill color.
   */
  fill(20, alpha);

  /**
   * Disables stroke for the following shapes.
   */
  noStroke();

  /**
   * Draws a rectangle at the center of the canvas with the same dimensions as the canvas.
   * @param {number} x - The x-coordinate of the rectangle's center.
   * @param {number} y - The y-coordinate of the rectangle's center.
   * @param {number} w - The width of the rectangle.
   * @param {number} h - The height of the rectangle.
   */
  rect(0, 0, width, height);

  /**
   * Sets the stroke color for the ring.
   */
  stroke(255);

  /**
   * Sets the weight of the stroke for the ring.
   */
  strokeWeight(3);

  /**
   * Disables fill for the following shapes.
   */
  noFill();

  /**
   * Retrieves the waveform data from the FFT analysis.
   * @returns {number[]} An array of waveform values.
   */
  var wave = fft.waveform();
  if(isLinearWave){
    for (var i = 0; i < width; i++) {
      let index = floor(map(i,0,width,0,wave.length));
      let x = i - 1720;
      let y = wave[index] * 300 + height/8 - 170;
      point(x,y);
    }
  } else {
    /**
     * Draws two sets of shapes to create a ring effect.
     */
    for (var t = -1; t <= 1; t += 2) {
      /**
       * Begins a new shape for the ring.
       */
      beginShape();

      /**
       * Draws a series of vertices to form the ring shape.
       */
      for (var i = 0; i <= 180; i += 0.5) {
        /**
         * Maps the index value to the range of the waveform array.
         * @param {number} value - The value to be mapped.
         * @param {number} start1 - The lower bound of the input range.
         * @param {number} stop1 - The upper bound of the input range.
         * @param {number} start2 - The lower bound of the output range.
         * @param {number} stop2 - The upper bound of the output range.
         * @returns {number} The mapped value.
         */
        var index = floor(map(i, 0, 180, 0, wave.length - 1));

        /**
         * Maps the waveform value to a radius value for the ring.
         * @param {number} value - The value to be mapped.
         * @param {number} start1 - The lower bound of the input range.
         * @param {number} stop1 - The upper bound of the input range.
         * @param {number} start2 - The lower bound of the output range.
         * @param {number} stop2 - The upper bound of the output range.
         * @returns {number} The mapped value.
         */
        var r = map(wave[index], -1, 1, 150, 350);

        /**
         * Calculates the x-coordinate of a point on the ring.
         * @param {number} angle - The angle in degrees.
         * @returns {number} The x-coordinate.
         */
        var x = r * sin(i) * t;

        /**
         * Calculates the y-coordinate of a point on the ring.
         * @param {number} angle - The angle in degrees.
         * @returns {number} The y-coordinate.
         */
        var y = r * cos(i);

        /**
         * Adds a vertex to the shape.
         * @param {number} x - The x-coordinate of the vertex.
         * @param {number} y - The y-coordinate of the vertex.
         */
        vertex(x, y);
      }

      /**
       * Ends the shape for the ring.
       */
      endShape();
    }
  }
  if (isSplEffectsEnabled && !isLinearWave){
    /**
     * Creates a new particle object.
     * @constructor
     */
    var p = new Particle();

    /**
     * Adds the particle to the array of particles.
     */
    particles.push(p);

    /**
     * Updates and displays each particle in the array.
     */
    for (var i = particles.length - 1; i >= 0; i--) {
      /**
       * Checks if the particle is within the canvas boundaries.
       * @returns {boolean} True if the particle is within the boundaries, false otherwise.
       */
      if (!particles[i].edges()) {
        /**
         * Updates the particle's position and behavior based on the amplitude value.
         * @param {boolean} condition - The condition to determine the particle's behavior.
         */
        particles[i].update(amp > 230);

        /**
         * Displays the particle on the canvas.
         */
        particles[i].show();
      } else {
        /**
         * Removes the particle from the array if it is outside the canvas boundaries.
         */
        particles.splice(i, 1);
      }
    }
  }
}

/**
 * Handles the mouse click event.
 */
function mouseClicked(evt) {
  /**
   * Checks if the song is available.
   * @returns {void} Returns early if the song is not available.
   */
  if (!song || evt.target === hamburgerEle || evt.target === navbarEle) {
    return;
  }

  /**
   * Checks if the song is currently playing.
   */
  if (song.isPlaying()) {
    /**
     * Pauses the song.
     */
    song.pause();

    /**
     * Stops the draw loop.
     */
    noLoop();
  } else {
    /**
     * Plays the song.
     */
    song.play();

    /**
     * Restarts the draw loop.
     */
    loop();

    /**
     * Hides the audio input element.
     */
    // document.querySelector(".audioInput").classList.add("hide");

    /**
     * Checks if the timer is available.
     */
    if (!timerAvl && isTimerShown) {
      /**
       * Starts the countdown clock.
       * @param {number} time - The time in minutes for the countdown.
       * @param {string} unit - The unit of time for the countdown.
       */
      countDownClock(TIME_IN_MINS, isTimerShown);

      /**
       * Shows the countdown container.
       */
      document.querySelector(".countdown-container").classList.remove("hide");

      /**
       * Sets the timer availability to true.
       */
      timerAvl = true;
    }
  }
}
/**================================================================================================**/
/**
 * Starts a countdown clock with the specified number and format.
 * @param {number} number - The number for the countdown.
 * @param {string} format - The format of the countdown ("seconds" or "minutes").
 */
const countDownClock = (number = 5, isTimerShown) => {
  if(!isTimerShown){
    return;
  }
  const d = document;
  const minutesElement = d.querySelector(".minutes");
  const secondsElement = d.querySelector(".seconds");
  const timer = (minutes) => {
    const now = Date.now();
    const thenMS = now + (minutes * 60 * 1000);

    let countdown = setInterval(() => {
      const secondsLeft = Math.round((thenMS - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        d.querySelector(".countdown-container").classList.add("hide");
        return;
      }

      minutesElement.textContent = Math.floor(((secondsLeft % 86400) % 3600) / 60);
      secondsElement.textContent =
      secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60;
    }, 1000);
  };

  timer(number);
};

/**================================================================================================**/
/**
 * Animates the text in the specified element.
 */
headerTextEle.innerHTML = SHOW_TEXT;
function animateText(showText) {
  if(!showText) return; 
  /**
   * The element containing the text to be animated.
   * @type {HTMLElement}
   */
  var textWrapper = document.querySelector(".ml12");

  /**
   * Replaces each character in the text content with a span element.
   * @param {RegExp} regex - The regular expression to match each character.
   * @param {string} replacement - The replacement string for each character.
   */
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  /**
   * Creates an animation timeline using the anime.js library.
   * @type {anime.timeline}
   */
  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml12 .letter",
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i,
    })
    .add({
      targets: ".ml12 .letter",
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el, i) => 100 + 30 * i,
    });
};

animateText(isTextShown);

/**
 * Hamburger open and close
 */

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.navbar');
let bod = document.querySelector('.container');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('isactive');
  menu.classList.toggle('active');

});

/**
 * 
 */
const textInpEle = document.getElementById('text-input');
const timerInpEle = document.getElementById('timer-input');
const timerInpHldrEle = document.getElementById('timer-input-hldr');
const textContentEle = document.getElementById('text-content');
const textContentHldrEle = document.getElementById('text-content-hldr');
const textShownEle = document.getElementById('heading-text');
const timerShownEle = document.getElementsByClassName('countdown-container')[0];
textInpEle.onchange = () => {
  isTextShown = textInpEle.checked;
  if(textInpEle.checked) {
    textShownEle.classList.remove('hide');
    textContentHldrEle.classList.remove('hide');
  } else {
    textShownEle.classList.add('hide');
    textContentHldrEle.classList.add('hide');
  }
};
timerInpEle.onchange = () => {
  // isTimerShown = timerInpEle.checked;
  if(timerInpEle.checked) {
    timerShownEle.classList.remove('hide');
    timerInpHldrEle.classList.remove('hide');
  } else {
    timerShownEle.classList.add('hide');
    timerInpHldrEle.classList.add('hide');
  }
};
textContentEle.onchange = () => {
  headerTextEle. innerHTML = textContentEle.value;
  animateText(isTextShown)
};