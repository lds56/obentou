function getTimeRemaining(endtime) {
    const total = endtime.getTime() - new Date().getTime();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    console.log(`Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
    return { total, days, hours, minutes, seconds };
  }

function initCountdown(targetDate) {
  setInterval(() => {
    console.log("set interval");
    const { days, hours, minutes, seconds } = getTimeRemaining(targetDate);
    const countdownElements = document.querySelectorAll('.countdown > span');
    countdownElements.forEach((element, index) => {
      if (element instanceof HTMLElement) {
        switch (index) {
          case 0:
            element.style.setProperty('--value', days.toString());
            break;
          case 1:
            element.style.setProperty('--value', hours.toString());
            break;
          case 2:
            element.style.setProperty('--value', minutes.toString());
            break;
          case 3:
            element.style.setProperty('--value', seconds.toString());
            break;
        }
      }
    });
  }, 1000);
}
const targetDatetime = new Date(targetDate);

initCountdown(targetDatetime);