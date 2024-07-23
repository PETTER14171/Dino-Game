const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

let isGameRunning = true;
let cactusInterval;

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
}

// Start the game when the page loads
window.onload = function() {
    startGame();
};
