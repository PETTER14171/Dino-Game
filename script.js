const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const jumpCountSpan = document.getElementById("jumpCount");

let isGameRunning = true;
let cactusInterval;
let jumpCount = 0;
let lastCactusLeft = 800; // Inicializa en el valor inicial del cactus

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && isGameRunning) {
        jump();
    }
});

function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");

        setTimeout(function() {
            dino.classList.remove("jump");
        }, 600);
    }
}

function startGame() {
    isGameRunning = true;
    jumpCount = 0;
    lastCactusLeft = 800; // Restablece a la posición inicial del cactus
    jumpCountSpan.textContent = jumpCount;
    cactus.style.animation = 'moveCactus 2s linear infinite';
    cactusInterval = setInterval(checkCollision, 10);
}

function gameOver() {
    isGameRunning = false;
    clearInterval(cactusInterval);
    cactus.style.animation = 'none';
}

function retry() {
    location.reload(); // Refresh the page
}

function checkCollision() {
    // Get current dino Y position
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    // Get current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Detect collision
    if (cactusLeft < 50 && cactusLeft > 0 && dinoBottom < 50) {
        gameOver();
    }

    // Increment the jump count only once per cactus passed
    if (cactusLeft < 0 && lastCactusLeft >= 0) {
        jumpCount++;
        jumpCountSpan.textContent = jumpCount;
    }

    lastCactusLeft = cactusLeft;
}

// Start the game when the page loads
window.onload = function() {
    startGame();
};
