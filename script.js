let totalSeconds = 1500;
let isPomodoro = true;
const timerElement = document.querySelector('#pomodoro-time');
var timer;

function timeFormat(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingseconds = seconds % 60;
    timerElement.textContent = `${minutes <10 ? '0' + minutes:minutes}:${remainingseconds <10 ? '0' + remainingseconds:remainingseconds}`;

};

function startTimer() {
    timer = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timer);
            timerElement.textContent = '00:00';
            totalSeconds = isPomodoro ? 300 : 1500;
            isPomodoro = !isPomodoro
            timeFormat(totalSeconds);
            updateButtonStates();
            startButton.textContent = 'start';
        } else {
            totalSeconds--;
            timeFormat(totalSeconds);
        }
    }, 10)
}

function changeMode() {
    clearInterval(timer);
    isPomodoro = !isPomodoro;
    totalSeconds = isPomodoro ? 1500 : 300;
    timeFormat(totalSeconds);
    startButton.textContent = 'start';
    updateButtonStates();
}
const pomodoroButton = document.querySelector('#pomodoro');
const modeButton = document.querySelector('#break');

function updateButtonStates() {
    if (isPomodoro) {
        pomodoroButton.classList.add('active');
        modeButton.classList.remove('active');
    } else {
        modeButton.classList.add('active');
        pomodoroButton.classList.remove('active');
    }
}


const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');


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
pomodoroButton.addEventListener('click', changeMode);

updateButtonStates();
timeFormat(totalSeconds);