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
    return (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    );
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
