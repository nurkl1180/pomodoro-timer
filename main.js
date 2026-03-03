let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const notificationSound = document.getElementById('notificationSound');

function updateDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    minutesDisplay.textContent = min.toString().padStart(2, '0');
    secondsDisplay.textContent = sec.toString().padStart(2, '0');

    // Update document title to show time remaining
    document.title = `${minutesDisplay.textContent}:${secondsDisplay.textContent} - FocusFlow`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    startStopBtn.textContent = 'Pause';
    startStopBtn.style.backgroundColor = '#94a3b8'; // Muted color for pause

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            notificationSound.play().catch(e => console.log('Audio playback blocked by browser policy. Interaction required.'));
            alert('Time is up! Take a break.');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Resume';
    startStopBtn.style.backgroundColor = '#ff6b6b';
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#ff6b6b';
    document.title = 'FocusFlow | Premium Pomodoro Timer';
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

// Initial display setup
updateDisplay();
