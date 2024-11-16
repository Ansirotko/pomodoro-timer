let totalSeconds = 1500;
let isPomodoro = true;
const timerElement = document.querySelector('#pomodoro-time');
let timer;

function timeFormat(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    timerElement.textContent = `${minutes <10 ? '0' + minutes:minutes}:${seconds <10 ? '0' + seconds:seconds}`;

};

function startTimer() {
    timer = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timer);
            timerElement.textContent = '00:00';
            totalSeconds = isPomodoro ? 1500 : 300;
            startButton.textContent = 'start';
        } else {
            totalSeconds--;
            timeFormat(totalSeconds);
        }
    }, 1000)
}

function changeMode() {
    clearInterval(timer);
    isPomodoro = !isPomodoro;
    totalSeconds = isPomodoro ? 1500 : 300;
    timeFormat(totalSeconds);
    startButton.textContent = 'start';
}

const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const modeButton = document.querySelector('#break');

startButton.addEventListener('click', function() {
    if (startButton.textContent === 'start') {
        startButton.textContent = 'stop';
        startTimer()
    } else {
        clearInterval(timer);
        startButton.textContent = 'start';
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(timer);
    totalSeconds = isPomodoro ? 1500 : 300;
    startButton.textContent = 'start';
    timeFormat(totalSeconds);
})
modeButton.addEventListener('click', changeMode);
timeFormat(totalSeconds);