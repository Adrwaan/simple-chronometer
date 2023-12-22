const hours: HTMLElement = document.querySelector("#chrono-hours h1")!;
const minutes: HTMLElement = document.querySelector("#chrono-minutes h1")!;
const seconds: HTMLElement = document.querySelector("#chrono-seconds h1")!;

const runBtn: HTMLElement = document.querySelector("#chrono-start")!;
const stopBtn: HTMLElement = document.querySelector("#chrono-stop")!;
const resumeBtn: HTMLElement = document.querySelector("#chrono-resume")!;
const resetBtn: HTMLElement = document.querySelector("#chrono-reset")!;

let isPaused: boolean = true;
let isStarted: boolean = false;

const runMsg: string = '<i class="fa-solid fa-bolt"></i> Start Chronometer';
const stopMsg: string = '<i class="fa-solid fa-ban"></i> Stop Chronometer';

let nowHours: number = parseInt(hours.textContent!);
let nowMinutes: number = parseInt(minutes.textContent!);
let nowSeconds: number = parseInt(seconds.textContent!);

setInterval(() => {
  if (!isPaused) {
    if (nowSeconds === 59) {
      nowSeconds = 0;
      nowMinutes++;
    } else {
      nowSeconds++;
    }

    if (nowMinutes === 59) {
      nowMinutes = 0;
      nowHours++;
    }

    hours.textContent! = formatTime(nowHours);
    minutes.textContent! = formatTime(nowMinutes);
    seconds.textContent! = formatTime(nowSeconds);
  }
}, 1000);

function formatTime(time: number): string {
  return time < 10 ? "0" + time : time.toString();
}

runBtn.addEventListener("click", (): void => {
  if (!isStarted) {
    isStarted = true;
    isPaused = false;

    runBtn.style.display = "none";
    stopBtn.style.display = "block";
    resetBtn.style.display = "block";
  }
});

stopBtn.addEventListener("click", (): void => {
  if (!isPaused) {
    stopBtn.style.display = "none";
    resumeBtn.style.display = "block";

    isPaused = true;
  }
});

resumeBtn.addEventListener("click", (): void => {
  if (isPaused) {
    stopBtn.style.display = "block";
    resumeBtn.style.display = "none";

    isPaused = false;
  }
});

resetBtn.addEventListener("click", (): void => {
  if (isStarted) {
    isStarted = false;
    isPaused = true;

    runBtn.style.display = "block";
    stopBtn.style.display = "none";
    resetBtn.style.display = "none";
    resumeBtn.style.display = "none";

    nowHours = 0;
    nowMinutes = 0;
    nowSeconds = 0;

    hours.textContent! = formatTime(0);
    minutes.textContent! = formatTime(0);
    seconds.textContent! = formatTime(0);
  }
});
