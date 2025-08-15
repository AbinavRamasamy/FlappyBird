let bird, pipeUpMain, pipeDownMain, pipeUpBody1, pipeDownBody1, pipeUpBody2, pipeDownBody2;
let birdImg, pipeUpImg, pipeDownImg, pipeUpBodyImg, pipeDownBodyImg;
let timesPassed = 0, diff = 2, init = false, isGameOver = false, dist = 190;

//preloading the images
function preload() {
    console.log("Preload started");


    birdImg = loadImage("images/flappybird_Bird.png");

    pipeUpImg = loadImage("images/flappybird_PipeUp.png");
    pipeDownImg = loadImage("images/flappybird_PipeDown.png");

    pipeUpBodyImg = loadImage("images/flappybird_PipeUp_body.png");
    pipeDownBodyImg = loadImage("images/flappybird_PipeDown_body.png");


    console.log("Preload complete");
}

//linking the images to sprites
function setup() {
    console.log("Setup started");
    createCanvas(750, 750);

    bird = new Sprite(birdImg, 100, 250, 300, 750);
    bird.scale = 1/6;
    bird.collider = "dynamic";

    pipeUpMain = new Sprite(pipeUpImg, 700, random(-75,400), 369, 684);
    pipeUpMain.scale = 1/4;
    pipeUpMain.collider = "kinematic";
    pipeDownMain = new Sprite(pipeDownImg, pipeUpMain.x + 1, pipeUpMain.y + pipeUpMain.height + dist, 369, 684);
    pipeDownMain.scale = 1/4;
    pipeDownMain.collider = "kinematic";

    pipeUpBody1 = new Sprite(pipeUpBodyImg, pipeUpMain.x, pipeUpMain.y - pipeUpMain.height - 46, 369, 684);
    pipeUpBody1.scale = 1/4;
    pipeUpBody1.collider = "kinematic";
    pipeDownBody1 = new Sprite(pipeDownBodyImg, pipeDownMain.x, pipeDownMain.y + pipeDownMain.height + 46, 369, 684);
    pipeDownBody1.scale = 1/4;
    pipeDownBody1.collider = "kinematic";

    pipeUpBody2 = new Sprite(pipeUpBodyImg, pipeUpBody1.x, pipeUpBody1.y - pipeUpBody1.height - 46, 369, 684);
    pipeUpBody2.scale = 1/4;
    pipeUpBody2.collider = "kinematic";
    pipeDownBody2 = new Sprite(pipeDownBodyImg, pipeDownBody1.x, pipeDownBody1.y + pipeDownBody1.height + 46, 369, 684);
    pipeDownBody2.scale = 1/4;
    pipeDownBody2.collider = "kinematic";


    console.log("Setup complete");
}

function draw() {
    background("skyblue");

    //based on pressing up arrow
    if (kb.presses("ArrowUp")) {
        init = true;
        bird.vel.y = 0;
        bird.vel.y -= 6;
        pipeUpMain.vel.x = -diff;
        pipeDownMain.vel.x = -diff;

        pipeUpBody1.vel.x = -diff;
        pipeDownBody1.vel.x = -diff;
        pipeUpBody2.vel.x = -diff;
        pipeDownBody2.vel.x = -diff;
    }

    //After first press
    if (init)
        bird.vel.y += 2/5;

    //increase difficulty
    if (timesPassed % 2 == 1) {
        diff += 1;
        timesPassed += 1;
    }

    // Reset pipes and update score
    if (pipeDownMain.x < -50) {
        timesPassed += 1;
        dist = random(180, 200);

        pipeUpMain.x = 800;
        pipeDownMain.x = pipeUpMain.x + 1;

        pipeUpBody1.x = pipeUpMain.x;
        pipeDownBody1.x = pipeDownMain.x;
        pipeUpBody2.x = pipeUpMain.x;
        pipeDownBody2.x = pipeDownMain.x;

        pipeUpMain.y = random(-75,400);
        pipeDownMain.y = pipeUpMain.y + pipeUpMain.height + dist;
        
        pipeUpBody1.y = pipeUpMain.y - pipeUpMain.height - 46;
        pipeDownBody1.y = pipeDownMain.y + pipeDownMain.height + 46;
        pipeUpBody2.y = pipeUpBody1.y - pipeUpBody1.height - 46;
        pipeDownBody2.y = pipeDownBody1.y + pipeDownBody1.height + 46;
    }

    // Collision detection and game over, else display score in corner
    if ((bird.collides(pipeUpMain) || bird.collides(pipeDownMain)) || 
        (bird.collides(pipeUpBody1) || bird.collides(pipeDownBody1)) || 
        (bird.collides(pipeUpBody2) || bird.collides(pipeDownBody2)) || 
        (bird.y > 725)) {
        //Game Over
        noLoop();
        textSize(64);
        fill("red");
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2);
        textSize(32);
        fill("black");
        text("Score: " + timesPassed / 2, width / 2, height / 2 + 50);
    } else {
        // Score Display while game is not over
        fill(0);
        textSize(32);
        text("Score: " + timesPassed / 2, 20, 40);
    }
}
