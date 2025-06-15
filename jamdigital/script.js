       // Fungsi greeting baru
function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = "";
    let emoji = "";
    
    if (hours >= 5 && hours < 11) {
        greeting = "Selamat Pagi";
        emoji = "";
    } else if (hours >= 11 && hours < 15) {
        greeting = "Selamat Siang";
        emoji = "";
    } else if (hours >= 15 && hours < 19) {
        greeting = "Selamat Sore";
        emoji = "";
    } else {
        greeting = "Selamat Malam";
        emoji = "";
    }
    
    document.getElementById('greeting').textContent = `${greeting} ${emoji}`;
}

// Panggil di init dan setiap jam berubah
updateGreeting();
setInterval(updateGreeting, 3600000); // Update setiap jam
        // DOM Elements
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const menuBtn = document.getElementById('menu-btn');
        const menuPanel = document.getElementById('menu-panel');
        const audioElement = document.getElementById('bg-audio');
        const audioControl = document.getElementById('audio-control');
        const stopwatchDisplay = document.getElementById('stopwatch-display');
        const startStopwatchBtn = document.getElementById('start-stopwatch');
        const lapStopwatchBtn = document.getElementById('lap-stopwatch');
        const resetStopwatchBtn = document.getElementById('reset-stopwatch');
        const stopwatchHistory = document.getElementById('stopwatch-history');
        const weatherContainer = document.getElementById('weather-container');
        const weatherIcon = document.getElementById('weather-icon');
        const weatherTemp = document.getElementById('weather-temp');
        const weatherDesc = document.getElementById('weather-desc');

        // Clock Function
        function updateTime() {
            const now = new Date();
            
            // Format tanggal: Hari, Bulan Tanggal Tahun
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = now.toLocaleDateString('id-ID', optionsDate);
            dateElement.textContent = dateString;
            
            // Format waktu: HH:MM:SS (24 jam)
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            // Menambahkan animasi titik dua yang berkedip
            const timeString = `${hours}<span class="colon">:</span>${minutes}<span class="colon">:</span>${seconds}`;
            timeElement.innerHTML = timeString;
        }

        // Fullscreen Function
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        // Audio Control
function toggleAudio() {
    const musicStatus = document.getElementById('music-status');
    if (audioElement.paused) {
        audioElement.play();
        musicStatus.style.display = 'block';
        // Kode audio control icon yang sudah ada...
    } else {
        audioElement.pause();
        musicStatus.style.display = 'none';
        // Kode audio control icon yang sudah ada...
    }
}
        // Stopwatch Function
        let stopwatchInterval;
        let stopwatchTime = 0;
        let isStopwatchRunning = false;

// Ganti fungsi ini
function formatStopwatchTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

        function updateStopwatchDisplay() {
            stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
        }

window.addEventListener('load', function() {
    setTimeout(function() {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.classList.add('fade-out');
        

        splashScreen.addEventListener('transitionend', () => {
            splashScreen.remove();
        });
    }, 1000); 
});
function startStopwatch() {
    if (!isStopwatchRunning) {
        const startTime = Date.now() - stopwatchTime;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);
        isStopwatchRunning = true;
        startStopwatchBtn.textContent = 'Pause';
        
        // Tampilkan notifikasi
        const notification = document.getElementById('stopwatch-notification');
        notification.textContent = 'Stopwatch ON';
        notification.classList.add('active');
    } else {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        startStopwatchBtn.textContent = 'Start';
        
        // Sembunyikan notifikasi
        document.getElementById('stopwatch-notification').classList.remove('active');
    }
}

function lapStopwatch() {
    if (isStopwatchRunning) {
        const currentTime = formatStopwatchTime(stopwatchTime);
        lapHistory.unshift(currentTime); // Tambahkan ke awal array
        
        // Update tampilan history
        updateLapHistory();
        
        // Notifikasi lap baru
        const notification = document.getElementById('stopwatch-notification');
        notification.textContent = `Lap ${lapHistory.length} saved`;
        notification.classList.add('active');
        
        // Reset notifikasi setelah 1.5 detik
        setTimeout(() => {
            notification.textContent = 'Stopwatch ON';
        }, 1500);
    }
}
function updateLapHistory() {
    const historyContainer = document.getElementById('stopwatch-history');
    historyContainer.innerHTML = '';
    
    lapHistory.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.innerHTML = `
            <span style="opacity:0.7">Lap ${lapHistory.length - index}:</span>
            <span style="margin-left:10px">${lap}</span>
        `;
        historyContainer.appendChild(lapElement);
    });
}

        function resetStopwatch() {
            clearInterval(stopwatchInterval);
            stopwatchTime = 0;
            isStopwatchRunning = false;
            updateStopwatchDisplay();
            startStopwatchBtn.textContent = 'Start';
            stopwatchHistory.innerHTML = '';
                lapHistory = [];
    document.getElementById('stopwatch-history').innerHTML = '';
    document.getElementById('stopwatch-notification').classList.remove('active')
        }

        // Weather Function
        async function fetchWeather() {
            const apiKey = 'YOUR_API_KEY'; // Ganti dengan API key Anda
            const city = 'Salatiga';
            const country = 'ID';
            
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`);
                const data = await response.json();
                
                if (data.cod === 200) {
                    weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
                    weatherDesc.textContent = data.weather[0].description;
                    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    weatherContainer.style.display = 'flex';
                } else {
                    console.error('Weather data error:', data.message);
                    weatherContainer.style.display = 'none';
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
                weatherContainer.style.display = 'none';
            }
        }

        // Event Listeners
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        menuBtn.addEventListener('click', () => menuPanel.classList.toggle('active'));
        audioControl.addEventListener('click', toggleAudio);
        startStopwatchBtn.addEventListener('click', startStopwatch);
        lapStopwatchBtn.addEventListener('click', lapStopwatch);
        resetStopwatchBtn.addEventListener('click', resetStopwatch);

        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                fullscreenBtn.style.display = 'block';
            }
        });

        // Initialize
        updateTime();
        setInterval(updateTime, 1000);
        
        // Auto play audio (with user interaction requirement)
        document.addEventListener('click', () => {
            audioElement.play().catch(e => console.log('Audio play failed:', e));
        }, { once: true });
        // Preload image for smoother transition
window.addEventListener('load', () => {
    const bgImg = new Image();
    bgImg.src = 'background.jpg';
    bgImg.onload = () => {
        document.getElementById('bg-image').src = bgImg.src;
    };
});

        // Fetch weather (comment out if no API key)
        // fetchWeather();

        // How to get API key instruction
