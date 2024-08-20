function animateText(showText) {
  if (!showText) return;
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
}
