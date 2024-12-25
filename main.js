// Declare variables for the ball, paddles, and scores
let ball;
let paddle1Y = 0;
let ballTouchPaddleSound, missedSound;
let pcscore = 0;
let playerscore = 0;
let restartButton;

function preload() {
    // Load sound files
    ballTouchPaddleSound = loadSound('ball_touch_paddel.wav');
    missedSound = loadSound('missed.wav');
}

function setup() {
    // Create the canvas and setup initial game elements
    createCanvas(600, 400);

    // Create a ball object
    ball = new Ball();

    // Setup the restart button
    restartButton = select('#restartButton');
    restartButton.mousePressed(restart);
    restartButton.hide(); // Hide restart button initially
}

function draw() {
    background(0);

    // Update and display ball
    ball.move();
    ball.display();

    // Display scores
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Player: ${playerscore} | PC: ${pcscore}`, width / 2, 30);

    // Display paddle (using the right wrist Y position)
    paddle1Y = rightWristY; // Assume rightWristY is available (from external tracking library)

    // If the ball touches or misses the paddle, play sounds
    if (ballTouchesPaddle()) {
        ballTouchPaddleSound.play();
    } else {
        missedSound.play();
    }

    // Show Restart text after the game is over
    if (gameOver()) {
        textSize(32);
        fill(255);
        text("Game Over! Click Restart to Play Again", width / 2, height / 2);

        restartButton.show(); // Show restart button
    }
}

function gameOver() {
    // Check if the game is over (for example, if someone wins a point)
    return false; // Example placeholder, you'll need to define game-over condition
}

// Ball object for handling ball movement
class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.radius = 10;
        this.xSpeed = 5;
        this.ySpeed = 5;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Check for wall collisions
        if (this.y < 0 || this.y > height) {
            this.ySpeed *= -1;
        }

        // Check for paddle collisions
        if (this.x - this.radius < 0) {
            // Missed ball
            playerscore++;
            this.reset();
        }

        if (this.x + this.radius > width) {
            // Ball hit right side (computer's side)
            pcscore++;
            this.reset();
        }
    }

    display() {
        fill(255);
        ellipse(this.x, this.y, this.radius * 2);
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = random(5, 8) * (random() > 0.5 ? 1 : -1);
        this.ySpeed = random(5, 8) * (random() > 0.5 ? 1 : -1);
    }
}

// Check if the ball touches the paddle
function ballTouchesPaddle() {
    if (ball.x - ball.radius < 20 && ball.y > paddle1Y && ball.y < paddle1Y + 100) {
        return true;
    }
    return false;
}

// Restart the game
function restart() {
    pcscore = 0;
    playerscore = 0;
    ball.reset();
    restartButton.hide();
    loop(); // Continue the game
}
