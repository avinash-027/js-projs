const game = document.getElementById("game");
const ground = document.getElementById("ground");
const block = document.getElementById("block");
const HighScoreDisplay = document.getElementById("highScoreNum");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

let isJumping = false;
let isGameOver = false;

HighScoreDisplay.textContent = highScore;

document.addEventListener("keydown", function (event) {
  if (isGameOver) return;

  if ((event.key === " " || event.key == "ArrowUp") && !isJumping) {
    if (!game.classList.contains("jump")) {
      game.classList.add("jump");
      isJumping = true;

      setTimeout(() => {
        game.classList.remove("jump");
        isJumping = false;
      }, 1000);
    }
  }
});

function detectCollision() {
  // let gamebottom = parseInt(window.getComputedStyle(game).getPropertyValue("bottom"));
  // let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  // if(gamebottom < 40 && blockLeft > 50 && blockLeft < 80){}
  let gameRect = game.getBoundingClientRect();
  let blockRect = block.getBoundingClientRect();

  if (
    gameRect.top < blockRect.bottom &&
    gameRect.left < blockRect.right &&
    gameRect.right > blockRect.left &&
    gameRect.bottom > blockRect.top
  ) {
    isGameOver = true;
    gameOverScreen.style.display = "block";
    saveHighScore();

    block.style.animation = "none";
    block.style.left = "100px";
  }
}

function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    HighScoreDisplay.textContent = highScore;
  }
}

function adjustBlockSpeed() {
  let newSpeed = 2;
  if (score >= 500) {
    newSpeed = 1.4;
    console.log(`Block speed set to: ${newSpeed}s (Score: ${score})`);
  } else if (score >= 1000) {
    newSpeed = 0.8;
    console.log(`Block speed set to: ${newSpeed}s (Score: ${score})`);
  }

  block.style.animationDuration = `${newSpeed}s`;
}

let scoreUpdated = false;

function moveBlock() {
  if (!isGameOver) {
    // Get the current block position and check if it has crossed a threshold
    let blockPosition = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );

    if (blockPosition <= 49 && blockPosition > 44 && !scoreUpdated) {
      // Adjusted threshold for scoring
      score += 27; // Increment score
      scoreUpdated = true;

      console.log("Score:", score); // Debugging log

      scoreDisplay.textContent = score; // Update score display
      adjustBlockSpeed(); // Adjust block speed
    }

    // Reset the scoreUpdated flag once the block leaves the threshold
    if (blockPosition <= 44 && scoreUpdated) {
      scoreUpdated = false;
    }
  }
}

function restartGame() {
  score = 0;
  isGameOver = false;
  scoreUpdated = false;
  gameOverScreen.style.display = "none";
  scoreDisplay.textContent = score;

  document.querySelector(".restart").innerHTML = "Resart";
  block.style.animation = "moveBlock linear infinite";
  block.style.right = "0";
  block.style.left = "auto";

  adjustBlockSpeed();
  gameLoop();
}

function gameLoop() {
  if (!isGameOver) {
    moveBlock();
    detectCollision();
    requestAnimationFrame(gameLoop);
  }
}

gameLoop(); // Start the game loop

// let scoreUpdated = false; // Flag to track if the score has been updated
// function moveBlock() {
//   if (!isGameOver) {
//     adjustBlockSpeed();

//     // Get the block's current position
//     let blockPosition = parseInt(
//       window.getComputedStyle(block).getPropertyValue("left")
//     );

//     // Increment score only once when the block crosses the threshold
//     if (blockPosition <= 80 && blockPosition > 60 && !scoreUpdated) {
//       score++;
//       scoreUpdated = true; // Set the flag to prevent further score increments in this frame

//       console.log("Block Position:", blockPosition);
//       console.log("Score: ", score); // Debugging log

//       scoreDisplay.textContent = score;
//     }

//     // Reset scoreUpdated flag once the block leaves the threshold range
//     if (blockPosition <= 60 && scoreUpdated) {
//       scoreUpdated = false; // Allow the score to be incremented again next time the block crosses the threshold
//     }
//   }
// }

// function moveBlock() {
//   if (!isGameOver) {
//     let blockPosition = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

//     // Move the block to the left
//     block.style.left = blockPosition - 5 + "px"; // Adjust speed here

//     // Check for scoring
//     if (blockPosition <= 100 && blockPosition > 80) {
//       score += 10;
//       scoreDisplay.textContent = score;
//     }

//     // Reset position if it goes off screen
//     if (blockPosition < -20) {
//       block.style.left = "100%"; // Reset to the right side
//     }
//   }
// }
