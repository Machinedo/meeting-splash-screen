/**================================================================================================**/
/**
 * Starts a countdown clock with the specified number and format.
 * @param {number} number - The number for the countdown.
 * @param {string} format - The format of the countdown ("seconds" or "minutes").
 * @param {p5.Sound} song - The sound to play when the countdown ends.
 * @param {p5.Sound} song2 - The sound to loop when the countdown ends.
 * @param {boolean} isSongStopped - Whether the song is stopped.
 * @param {string} END_TEXT_TO_SHOW - The text to show when the countdown ends.
 */
const countDownClock = (
  number = 5,
  isTimerShown,
  song,
  song2,
  isSongStopped,
  END_TEXT_TO_SHOW
) => {
  if (!isTimerShown) {
    return;
  }
  const d = document;
  const minutesElement = d.querySelector(".minutes");
  const secondsElement = d.querySelector(".seconds");
  const headerTextEle = d.getElementById("heading-text");
  const countdownContainer = d.querySelector(".countdown-container");
  const timerEnd = d.querySelector(".timer-end");
  const timer = (minutes) => {
    const now = Date.now();
    const thenMS = now + minutes * 60 * 1000;
    // const thenMS = now + 2000;

    let countdown = setInterval(() => {
      const secondsLeft = Math.round((thenMS - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        countdownContainer.classList.add("hide");
        timerEnd.classList.remove("hide");
        headerTextEle.innerHTML = END_TEXT_TO_SHOW;
        song?.stop();
        song2?.loop();
        isSongStopped = true;
        return;
      }

      minutesElement.textContent = Math.floor(
        ((secondsLeft % 86400) % 3600) / 60
      );
      secondsElement.textContent =
        secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60;
    }, 1000);
  };

  timer(number);
};
