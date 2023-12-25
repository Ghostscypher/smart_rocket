# Smart Rocket (Implementation in P5 JS - Genetic Algorithm)

## Introduction

This is an implementation of the Smart Rocket simulation from the Nature of Code book by Daniel Shiffman. The simulation uses a genetic algorithm to train the rockets to reach a target. The rockets are trained using a population of DNA. The DNA is a sequence of vectors that are used to control the movement of the rocket. The DNA is mutated and crossed over to create a new generation of rockets. The rockets are trained over multiple generations to reach the target.

## Installation

To run the simulation, simply clone the repository and open the `index.html` file in your browser. Alternatively, you can visit the [GitHub Pages](https://ghostscypher.github.io/smart_rocket/src/index.html) for this repository.

## Explanation

The simulation consists of a population of rockets that are trained to reach a target. The rockets are controlled by a DNA sequence. The DNA sequence is a sequence of vectors that are used to control the movement of the rocket. The DNA sequence is mutated and crossed over to create a new generation of rockets. The rockets are trained over multiple generations to reach the target.

### Population

The population consists of a number of rockets. The population is initialized with a number of rockets. The population is initialized with a target. The population is initialized with a mutation rate. The population is initialized with a lifespan. The population is initialized with a count. The population is initialized with a generation.

### Rocket

The rocket consists of a position. The rocket consists of a velocity. The rocket consists of an acceleration. The rocket consists of a DNA sequence. The rocket consists of a fitness. The rocket consists of a completed flag. The rocket consists of a crashed flag.

### DNA

The DNA consists of a sequence of vectors. The DNA consists of a mutation rate.

### Important genetic algorithm functions

1. `crossover()`: This function is used to create a new DNA sequence by crossing over two DNA sequences.
2. `mutate()`: This function is used to mutate a DNA sequence.
3. `calculateFitess()`: This function is used to evaluate the fitness of a rocket.

## Using the simulation

The simulation is very simple to use. The simulation will start automatically when the webpage is loaded.

1. The simulation can be reset by pressing the `r` key.
2. The simulation can be paused by pressing the `p` key.
3. The simulation can be resumed by pressing the `p` key again.
4. If the simulation is paused you can add a target by clicking on the canvas.

## Demo

<iframe src="https://ghostscypher.github.io/smart_rocket/src/index.html" title="Smart Rockets" width="100%" height="500px"></iframe>

## References

1. [Quadtree](https://en.wikipedia.org/wiki/genetic_algorithm)
2. [P5 JS](https://p5js.org/)
3. [P5 JS Reference](https://p5js.org/reference/)
4. [P5 JS Examples](https://p5js.org/examples/)
5. [P5 JS Web Editor](https://editor.p5js.org/)
6. [Coding train - P5 JS Tutorials](https://www.youtube.com/user/shiffman/playlists?view=50&sort=dd&shelf_id=14)
7. [The Nature of Code](https://natureofcode.com/)
8. [The Nature of Code - Smart Rockets](https://natureofcode.com/book/chapter-9-the-evolution-of-code/)
9. [The Coding Train - Smart Rockets](https://www.youtube.com/watch?v=bGz7mv2vD6g&list=PLRqwX-V7Uu6YHt0dtyf4uiw8tKOxQLvlW&index=9)