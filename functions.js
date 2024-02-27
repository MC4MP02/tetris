import {BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, PIECES, board} from './consts.js'

document.addEventListener('DOMContentLoaded', function() {    
    const canvas = document.querySelector('canvas');
    const scoreDiv = document.getElementById('score');
    const ctx = canvas.getContext('2d');
    canvas.width = BLOCK_SIZE * BOARD_WIDTH;
    canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

    let score = 0

    const piece = {
        position: {x: 5, y: 5},
        shape: [
            [2, 2],
            [2, 2]
        ]
    }

    function checkCollision () {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                let posY = Math.round(y + piece.position.y);
                let posX = Math.round(x + piece.position.x);

                if (posY >= BOARD_HEIGHT || posX >= BOARD_WIDTH || posX < 0) {
                    return true;
                }
                if (piece.shape[y][x] !== 0) {
                    if (board[posY]?.[posX] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function solidifyPiece() {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    board[Math.round(piece.position.y) + y][Math.round(piece.position.x) + x] = value;
                }
            })
        })

        resetPiece()
    }

    function removeRows () {
        const rowsToRemove = []
      
        board.forEach((row, y) => {
          if (row.every(value => value !== 0)) {
            rowsToRemove.push(y)
          }
        })
      
        rowsToRemove.forEach(y => {
          board.splice(y, 1)
          const newRow = Array(BOARD_WIDTH).fill(0)
          board.unshift(newRow)
          score += 10
        })
      }

    function resetPiece () {
        // reset position
        piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2)
        piece.position.y = 0
        // get random shape
        piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
        // gameover
        if (checkCollision()) {
          window.alert('Game over!! Sorry!')
          board.forEach((row) => row.fill(0))
          score = 0
        }
      }
    
    function getColor(value) {
        switch (value) {
            case 1:
                return 'red';
            case 2:
                return 'yellow';
            case 3:
                return 'purple';
            case 4:
                return 'green';
            case 5:
                return 'blue';
            case 6:
                return 'orange';
            case 7:
                return 'cyan';
            default:
                return 'white';
        }
    }

    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        var x = Math.round(piece.position.x);
        var y = Math.round(piece.position.y);
        
        board.forEach((row,y) => {
            row.forEach((value,x) => {
                if (value !== 0) {
                    ctx.fillStyle = getColor(value);
                    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            })
        })
        
        piece.shape.forEach((row, posy) => {
            row.forEach((col, posx) => {
                if(col !== 0) {
                    ctx.fillStyle = getColor(col);
                    ctx.fillRect((x + posx) * BLOCK_SIZE, (y + posy) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)

                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 1;
                    ctx.strokeRect((x + posx) * BLOCK_SIZE, (y + posy) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            })
        })

        scoreDiv.innerHTML = score
    }

    let lastTime = 0;
    const speed = 10;

    let keyState = {
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false,
        ArrowUp: false
    };

    function handleKeyDown(event) {
        if (keyState.hasOwnProperty(event.key)) {
            keyState[event.key] = true;

            if (event.key === 'ArrowUp') {
                rotatePiece();
            }
        }
    }

    function handleKeyUp(event) {
        if (keyState.hasOwnProperty(event.key)) {
            keyState[event.key] = false;
        }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    function rotatePiece() {
        const rotated = [];
        for (let i = 0; i < piece.shape[0].length; i++) {
            const row = [];
            for (let j = piece.shape.length - 1; j >= 0; j--) {
                row.push(piece.shape[j][i]);
            }
            rotated.push(row);
        }
        const previousShape = piece.shape.slice();
        piece.shape = rotated;
        if (checkCollision()) {
            piece.shape = previousShape;
        }
    }

    let dropCounter = 0
    let lastTimeAux = 0

    function update(currentTime = 0) {
        const deltaTime = (currentTime - lastTime) / 1000.0;
        lastTime = currentTime;

        const deltaTimeAux = (currentTime - lastTimeAux)
        lastTimeAux = currentTime
        dropCounter += deltaTimeAux

        if(dropCounter > 1) {
            piece.position.y += speed * deltaTime;
            if(checkCollision()) {
                piece.position.y -= speed * deltaTime;
                solidifyPiece()
                removeRows()
            }
            dropCounter = 0
        }

        if (keyState.ArrowDown) {
            piece.position.y += speed * deltaTime;
            if(checkCollision()) {
                piece.position.y -= speed * deltaTime;
                solidifyPiece()
                removeRows()
            }
        }
        if (keyState.ArrowRight) {
            piece.position.x += speed * deltaTime;
            if(checkCollision()) {
                piece.position.x -= speed * deltaTime;
            }
        }
        if (keyState.ArrowLeft) {
            piece.position.x -= speed * deltaTime;
            if(checkCollision()) {
                piece.position.x += speed * deltaTime;
            }
        }

        draw()
        window.requestAnimationFrame(update);
    }

    update()
})