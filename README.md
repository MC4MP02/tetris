# Tetris Game

This is a simple Tetris game implemented in JavaScript. Below is a brief overview of the game mechanics and how to play.

## How to Play

- **Objective**: The goal of Tetris is to score as many points as possible by clearing horizontal lines of blocks. As lines are cleared, the game speeds up, making it more challenging.

- **Controls**:
  - Use the **Arrow keys** to move the Tetris pieces:
    - **Up Arrow**: Rotate the piece.
    - **Down Arrow**: Move the piece down.
    - **Left Arrow**: Move the piece to the left.
    - **Right Arrow**: Move the piece to the right.

## Getting Started

To play the game, follow these steps:

1. Clone or download the repository.
2. Open the `index.html` file in your web browser.
3. Use the arrow keys to control the falling Tetris pieces.
4. Try to create horizontal lines without any gaps to clear them from the board.
5. The game ends when the pieces reach the top of the board.

## Demo

![Tetris Game Demo](https://github.com/MC4MP02/tetris/assets/115901121/a2297b56-0cca-4450-aea2-7f9e98d9f240)

## Code Overview

The game is implemented using HTML canvas and JavaScript. Here's a brief overview of the main components of the code:

- **Constants**: The game constants such as block size, board width, board height, and different Tetris pieces are defined in `consts.js`.
- **Initialization**: The game initializes the canvas, sets up event listeners for key presses, and initializes the game variables.
- **Game Logic**: Functions for handling collisions, solidifying pieces, removing completed rows, and updating the game state are implemented.
- **Drawing**: The `draw()` function is responsible for rendering the game state on the canvas.
- **Update Loop**: The game loop (`update()`) handles updating the game state and rendering at each frame.

## Credits

This game is created by Marc Campo Cabrera. Feel free to modify and use it as you like!
