// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;
var jamesBond;
var pipes;
var pipe_interval = 1.75;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

    game.load.image("playerImg", "assets/jamesBond.gif");
    game.load.image("superman", "assets/flappy_superman.png");
    game.load.audio("jump", "assets/point.ogg");
    game.load.image("pipe", "assets/pipe.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    //player = game.add.sprite(100,200, "playerImg");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor("#FF1345");


    jamesBond = game.add.sprite(10, 10, "playerImg");
    game.physics.arcade.enable(jamesBond);
    //jamesBond.body.velocity.x = 100;
    jamesBond.body.velocity.y = 50;
    jamesBond.body.gravity.y = 100;

    //this is for mouse
    game.input.onDown.add(clickhandler);
    //this is for keyboard
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);

    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input
        .keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input
        .keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);

    pipes = game.add.group();
    label_score = game.add.text(100, 100, "0");

    game.add.text(260, 20, "HELLO, PLAYER", {

        font: "30px Arial",

        fill: "#CCCCCC"

    });

    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generatePipe);




}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(jamesBond, pipes, game_over);

}
function add_Pipe_Block(x, y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}


//this function does co-ordinates
function clickhandler(event) {
    game.add.sprite(event.x, event.y, "superman");
}
//this fuction does text when space bar pressed
function spaceHandler() {
    //game.add.text(45,45, "i love flappy birds");
    changescore();
}
//this function makes the sound
function playSound() {
    game.sound.play("jump");
}
//this fuction adds to the score
function changescore() {
    score = score + 1;
    label_score.setText(score.toString());
    game.sound.play("jump");
}


function moveLeft() {

    //  player.x = player.x - 10;
    jamesBond.x = jamesBond.x - 10;


}
function moveRight() {//player.x = player.x +10;
    jamesBond.x = jamesBond.x + 10;
}
function moveUp() {
    jamesBond.body.velocity.y = -100;
}

function generatePipe() {
    var gapStart = game.rnd.integerInRange(1, 2);
    var gapEnd = game.rnd.integerInRange(4, 7);

    for (var count = 0; count <= 7; count++) {

        if (count <= gapStart || count >= gapEnd) {
            add_Pipe_Block(700, count * 50);
        }

    }

    changescore();
}


function moveDown() {

    jamesBond.y = jamesBond.y + 10;



}
function game_over() {

    game.add.text(200, 200, "Game Over");

    jamesBond.destroy();

    game.time.events.add(Phaser.Timer.SECOND, resetGame);




}


function resetGame()
{

    location.reload();

}







