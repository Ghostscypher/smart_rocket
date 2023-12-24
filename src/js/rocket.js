class Rocket {

    constructor(position, dna = null, target = null) {
        this.position = position;

        // Random velocity
        this.velocity = createVector();
        this.acceleration = createVector();

        this.dna_index = 0;
        this.fitness = 0;
        this.crashed = false;
        this.completed = false;
        this.timecrashed = 0;
        this.timecompleted = 0;
        this.target = target;

        this.path = [];

        if (dna !== null) {
            this.dna = dna;
        } else {
            this.createDNA();
        }
    }

    /********* DNA *******/
    createDNA() {
        this.dna = [];

        for (let i = 0; i < 400; i++) {
            let vector = createVector(random(-1, 1), random(-1, 1));

            // Set the vector direction to be always upwards
            // vector.y = -abs(vector.y);
            this.dna.push(vector);
        }
    }

    /********* Fitness *******/
    calculateFitness() {

        // If the rocket has reached the target, then set its fitness to 1
        if (this.completed) {
            this.fitness = 1;
            return;
        }

        // Calculate the distance between the rocket and the target
        let distance = dist(this.position.x, this.position.y, this.target.x, this.target.y);

        // If distance is negative, then set it to 0
        if (distance < 0) {
            distance = 0;
        }

        // The closer the rocket is to the target, the higher its fitness
        this.fitness = map(distance, 0, width, 0, 1);

        return this.fitness;
    }


    /********* Physics *******/
    applyForce() {
        // If the rocket has reached the target, then stop applying force
        if (this.completed) {
            return;
        }

        // If the rocket has crashed, then stop applying force
        if (this.crashed) {
            return;
        }

        // If the rocket has reached the end of the DNA, then stop applying force
        if (this.dna_index >= this.dna.length) {
            this.crashed = true;
            this.timecrashed = this.dna_index;
            return;
        }

        // Apply the force from the DNA
        this.acceleration.add(this.dna[this.dna_index]);


        // Also randomly apply a force to correct towards the target
        if (!this.completed && random(1) < 0.1) {
            let correction = p5.Vector.sub(this.target, this.position);
            correction.setMag(0.5);
            this.acceleration.add(correction);

            // Update the current DNA to equal this correction
            this.dna[this.dna_index] = correction;
        }

        // Clamp the acceleration
        this.acceleration.limit(1);
        this.acceleration.setMag(0.5);

        // Increase the DNA index
        this.dna_index++;
    }

    update() {
        // Show the path
        this.path.push(this.position.copy());

        if (this.crashed) {
            return;
        }

        // Check if this rocket has hit any of the obstacles walls
        // if yes, then set rocket as crashed
        if (this.position.x > width || this.position.x < 0) {
            this.crashed = true;
            this.timecrashed = this.dna_index;
        }

        if (this.position.y > height || this.position.y < 0) {
            this.crashed = true;
            this.timecrashed = this.dna_index;
        }

        // Check if this rocket has reached the target
        // if yes, then set rocket as completed
        let distance = dist(this.position.x, this.position.y, this.target.x, this.target.y);

        if (Math.abs(distance) < 5) {
            this.completed = true;
            this.timecompleted = this.dna_index;
        }

        // Apply the force to the rocket
        this.applyForce();

        // if completed, then stop updating the rocket
        if (this.completed) {
            return;
        }

        // Clamp the velocity
        this.velocity.limit(4);
        // Clamp velocity to a minimum of 0.5
        // this.velocity.setMag(5);

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    /********* Show *******/
    showRocketBody() {
        stroke(255);
        noFill();
        // Add a rectangle to the bottom of the rocket
        translate(this.position.x, this.position.y);

        // If velocity is not 0, rotate the rocket towards the direction of movement
        if (this.velocity.heading()) {
            rotate(this.velocity.heading() + PI / 2);
        }

        rectMode(CENTER);
        rect(0, 0, 5, 30);
    }

    showRocketFlames() {
        // Add small white circles to the bottom of the rocket
        fill(255, 150, 15);
        ellipse(0, 20, 5, 5);
        ellipse(0, 30, 3, 3);
        ellipse(0, 40, 1, 1);
    }

    showRocketWings() {
        // Add triangle wings to the rocket
        beginShape();
        noFill();

        // Left wing
        vertex(-2, 5);
        vertex(-2, 15);
        vertex(-20, 20);

        // Right wing
        vertex(2, 5);
        vertex(2, 15);
        vertex(20, 20);
        endShape(CLOSE);
    }

    showRocketTop() {
        // Add a triangle to the bottom of the rocket,
        // in relation to the rocket heading
        beginShape();
        vertex(-1, -12.5);
        vertex(1, -12.5);
        vertex(0, -25);

        // Set the color of the triangle as flame color
        fill(0, 0, 0);
        endShape(CLOSE);
    }

    showTrail() {
        // Show the rocket trail
        stroke(255, 150, 100);
        strokeWeight(1, 20);
        noFill();

        // This is a line that follows the rocket path
        let len = this.path.length > 500 ? 500 : this.path.length;
        let remaining = this.path.length - len;

        // Fade the trail for the remaining path
        stroke(255, 150, 100, 100);
        beginShape();
        for (let i = this.path.length - 1; i >= remaining; i--) {
            vertex(this.path[i].x, this.path[i].y);
        }
        endShape();

    }

    show() {
        if (this.crashed) {
            return;
        }

        push();
        this.showRocketBody();

        // Show the top of the rocket
        this.showRocketTop();

        // Show the flames
        this.showRocketFlames();

        // Show the wings
        this.showRocketWings();

        pop();

        // Show the trail
        this.showTrail();
    }

}

class Population {

    constructor(size, target = null) {
        this.rockets = [];
        this.size = size;
        this.generation = 1;
        this.completed = 0;
        this.crashed = 0;
        this.prev_completed = 0;
        this.prev_crashed = 0;

        if (target !== null) {
            this.target = target;
        } else {
            this.target = createVector(width / 2, height / 10);
        }

        for (let i = 0; i < this.size; i++) {
            this.rockets.push(
                new Rocket(createVector(width / 2, height - 20), null, this.target)
            );
        }
    }

    mutate(dna) {
        // Loop through the DNA
        for (let i = 0; i < dna.length; i++) {
            // There is a 1% chance of mutation
            if (random(1) < 0.01) {
                // Create a new random vector
                dna[i] = p5.Vector.random2D();
            }
        }

        return dna;
    }

    crossOver(parent_a, parent_b) {
        // Create a new DNA
        let new_dna = [];

        // Get a random midpoint
        let midpoint = floor(random(parent_a.length));

        // Loop through the DNA
        for (let i = 0; i < parent_a.length; i++) {
            // If i is greater than the midpoint, then add parent_a's DNA
            // else add parent_b's DNA
            if (i > midpoint) {
                new_dna.push(parent_a[i]);
            } else {
                new_dna.push(parent_b[i]);
            }
        }

        return new_dna;
    }

    createNewGeneration() {
        // Calculate the fitness of each rocket
        for (let rocket of this.rockets) {
            rocket.calculateFitness();
        }

        // Create a mating pool
        let mating_pool = [];

        // Add each rocket to the mating pool
        for (let rocket of this.rockets) {
            let n = rocket.fitness * 100;

            for (let i = 0; i < n; i++) {
                mating_pool.push(rocket);
            }
        }

        // Create a new generation
        let new_generation = [];

        // Create a new generation of rockets
        for (let i = 0; i < this.size; i++) {
            // Get a random DNA from the mating pool
            let parent_a = random(mating_pool).dna;
            let parent_b = random(mating_pool).dna;

            // Create a new DNA by crossing over the parents DNA
            let child_dna = this.crossOver(parent_a, parent_b);

            // Mutate the child DNA
            child_dna = this.mutate(child_dna);

            // Create a new rocket with the child DNA
            new_generation.push(
                new Rocket(
                    createVector(width / 2, height - 20),
                    child_dna,
                    this.target
                )
            );
        }

        // Set the new generation as the current generation
        this.rockets = new_generation;

        // Increase the generation count
        this.generation++;
        this.prev_crashed = this.crashed;
        this.prev_completed = this.completed;
        this.completed = 0;
        this.crashed = 0;
    }

    run() {
        // Draw the target
        fill(255, 0, 0);
        ellipse(this.target.x, this.target.y, 20, 20);

        this.crashed = 0;
        this.completed = 0;

        // Draw the rockets
        for (let rocket of this.rockets) {
            rocket.update();
            rocket.show();

            if (rocket.crashed) {
                this.crashed++;
            }

            if (rocket.completed) {
                this.completed++;
            }
        }

        // If all rockets have crashed, then create a new generation
        if ((this.completed + this.crashed) >= this.size) {
            this.createNewGeneration();
        }
    }
}