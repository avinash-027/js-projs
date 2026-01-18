var char = document.getElementById("character");
var block = document.getElementById("block");
const restart = document.querySelector(".restart");

let isGameOver = false; // Variable to track if the game is over

function jump() {
  if (isGameOver) return; // Block jump if the game is over

  if (!char.classList.contains("animate")) {
    char.classList.add("animate");
    setTimeout(function () {
      char.classList.remove("animate");
    }, 500); // After 500ms, remove the jump animation
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === " " || event.key === "ArrowUp") {
    jump();
  }
});

// setInterval(checkDead, 10); // Check for collision every 10 milliseconds -  can be a bit of an overkill and might cause performance issues, especially if the game scales up.
function gameLoop() {
  if (isGameOver) return; // stop the game loop if the game is over

  checkDead();
  requestAnimationFrame(gameLoop); // Recurse the loop, telling the browser to call it again before the next frame
}

gameLoop();

const gameOver = document.querySelector(".gameOver");

function checkDead() {
  var characterTop = parseInt(
    window.getComputedStyle(char).getPropertyValue("top")
  );
  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );

  // Check if the block is within the range and the character is on the ground or jumping
  if (blockLeft > 0 && blockLeft < 50 && characterTop >= 140) {
    block.style.animation = "none"; // Stop the block animation
    block.style.left = "50px";

    gameOver.style.visibility = "visible";
    restart.style.visibility = "visible";

    isGameOver = true;
  }
}

function restartGame() {
  gameOver.style.visibility = "hidden";

  isGameOver = false; // Reset game state

  char.style.top = "150px";

  block.style.animation = "blockAnimation 1s infinite linear";
  block.style.left = "580px";

  restart.style.visibility = "hidden";

  // Restart the game loop after a small delay to ensure reset
  setTimeout(gameLoop, 100);
}
