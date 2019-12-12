window.onload = function () {

    var totHeight = 600;
    var totWidth = 800;

    var game = new Phaser.Game(totWidth, totHeight, Phaser.AUTO, 'phaser-example', {
        preload: preload,
        create: create
    });


    var diamond;
    var startCoordinates = {x: 300, y: 200};
    var text;
    var endPoint;
    var middlePoint;

    var diamonMove;
    var diamonScale;
    var diamonMiddle;
    var diamonEnd;


    function preload() {
        game.load.spritesheet('start', 'img/bri_big_anim_start.png', 392, 372, 4);
        game.load.spritesheet('finish', 'img/bri_big_anim_finish.png', 326, 337, 4);
        game.load.spritesheet('middle', 'img/bri_big_anim_middle.png', 449, 432, 4);
    }

    function create() {
        game.renderer.renderSession.roundPixels = true;
        endPoint = new Phaser.Point( 600, 500 );

        middlePoint = new Phaser.Point( game.stage.width/2, game.stage.height/2);


        text = game.add.text(680, 16, "Click to Start", { font: "16px Arial", fill: "#ffffff" });

        diamond = game.add.sprite(startCoordinates.x, startCoordinates.y, 'start');

        diamond.scale.setTo(0.5, 0.5);
        diamond.anchor.setTo(0.5, 0.5);

        diamond.animations.add('walk');

        diamond.animations.play('walk', 5, true);

        diamond.inputEnabled = true;

        diamond.events.onInputDown.add(start, this);

    }

    function start() {

        diamonMove = game.add.tween(diamond).to(
            middlePoint,
            800,
            Phaser.Easing.Linear.None,
            true,
        );
        diamonScale = game.add.tween(diamond.scale).to(
            {x:1, y:1},
            800,
            Phaser.Easing.Linear.None,
            true,
        );

        diamonScale.onComplete.add(middle, this);
        diamonMove.start();
        diamonScale.start();
        text.visible = false;

    }
    function middle() {
        diamond.loadTexture('middle');
        diamond.animations.play('walk', 5, true);

        diamonMiddle = game.add.tween(diamond.scale).to(
            {x:1.1, y: 1.1},
            200,
            Phaser.Easing.Linear.None,
            true, 500
        );
        diamonMiddle.onComplete.add(theEnd, this);
        diamonMiddle.start();
    }

    function theEnd() {
        diamond.loadTexture('finish');
        diamond.animations.play('walk', 5, true);

        diamonMove = game.add.tween(diamond).to(
            endPoint,
            1000,
            Phaser.Easing.Linear.None,
            true);
        diamonScale = game.add.tween(diamond.scale).to(
            {x:0.1,y:0.1},
            1000,
            Phaser.Easing.Linear.None,
            true);
        diamonMove.start();
        diamonScale.start();
        diamonScale.onComplete.addOnce(staticDiamond, this)
    }
    function staticDiamond() {
        diamond.loadTexture('middle');
    }
};
