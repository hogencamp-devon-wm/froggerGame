var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 1313;
    canvas.height = 707;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 100.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    }

    function init() {

        reset();
        lastTime = Date.now();
        main();
    }

    //Check if player and enemies have collided
    function checkCollisions(){
        var playerX = this.x;
        var playerY = this.y;

        //If the player has the same Y value and is within 50px of the Enemy's x-coordinate, reset the game
        allEnemies.forEach(function(enemy){
            var enemyX = enemy.x;
            var enemyY = enemy.y;
            if(playerY >= enemyY - 20 && playerY <= enemyY + 20){
                if(playerX >= enemyX - 20 && playerX <= enemyX + 20){
                    this.reset();
                }
            }
        });
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        allRocks.forEach(function (rock) {
            rock.update();
        });
        player.update();
        gem.update();
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 7,
            numCols = 13,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        allRocks.forEach(function (rock) {
            rock.render();
        });
        player.render();
        gem.render();

    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/gemBlue.png',
        'images/Rock.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
