let population;
let lifespan = 400;
let prev_crashed = 0;
let prev_completed = 0;
let prev_generation = 0;
let target;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // createCanvas(600, 600)
    target = createVector(random(width), random(height - 500, height));

    // Create a new population of rockets
    population = new Population(
        10,
        target,
    );
}

let is_paused = false;

function keyPressed() {
    if (key === 'p' || key === 'P') {
        is_paused = !is_paused;

        if (is_paused) {
            noLoop();
        } else {
            loop();
        }
    }

    if (key === 'r' || key === 'R') {
        target = createVector(random(width), random(height - 500, height));
        population = new Population(
            10,
            target,
        );
    }
}

function mousePressed() {
    // If paused and left mouse button is pressed
    if (is_paused && mouseButton === LEFT) {
        // Set the target to the mouse position
        target = createVector(mouseX, mouseY);
        population = new Population(
            10,
            target,
        );

        // Resume the simulation
        is_paused = false;
        loop();
    }
}


function draw() {
    // Set the background
    background(51);

    // Draw the ground
    fill(255);
    rect(width / 2, height, width, 10);

    // Draw the population
    population.run();

    // Display the current generation
    fill(255);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(
        `Generation: ${population.generation}
        Crashed: ${population.prev_crashed}
        Completed: ${population.prev_completed}
        Total: ${population.size}`,
        50,
        50
    );
}