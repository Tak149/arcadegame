
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 550) {
        this.x = -100;
        if (this.speed > 450) {
            this.speed = Math.floor((Math.random() * .2 + .8) * this.speed);
        }
        else if (this.speed < 180) {
            this.speed = Math.floor((Math.random() * .2 + 1) * this.speed);
        }
        else {
            this.speed = Math.floor((Math.random() * .2 + .9) * this.speed);
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class playerChar {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.xMove = 101;
        this.yMove = 83;
        this.xStart = (this.xMove * 2);
        this.yStart = (this.yMove * 5 -32);
        this.x = this.xStart;
        this.y = this.yStart;
    };

    update() {
        for(let enemy of allEnemies) {
            if(this.x < enemy.x + 75 && enemy.x < this.x + 75 && this.y == enemy.y) {
                this.x = this.xStart;
                this.y = this.yStart;
            }
        }

        if (this.y == -32) {
            player.x = player.xStart;
            player.y = player.yStart;
            setTimeout(function(){
                alert (`Game over. You Won!`);
            }, 200);
        }
    };


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput(action) {
        if (action == 'left' && this.x > -1) {
            this.x -= this.xMove;
        }
        if (action == 'left' && this.x < -1) {
            this.x = (this.xMove * 4);
        }
        if (action == 'right' && this.x < 405) {
            this.x += this.xMove;
        }
        if (action == 'right' && this.x > 405) {
            this.x = 0;
        }
        if (action == 'up' && this.y > 0) {
            this.y -= this.yMove;
        }
        if (action == 'down' && this.y < 380) {
            this.y += this.yMove;
        }
    };
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1 = new Enemy(-100, 51, 350);
const bug2 = new Enemy(-100, 134, 275);
const bug3 = new Enemy(-100, 217, 200);
let allEnemies = [];
allEnemies.push(bug1,bug2,bug3);

const player = new playerChar();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

