var menuState = {
    create: function() {
        // Add a background image
        game.add.image(0, 0, 'backgroundMenu');
        // Display the name of the game
        //var nameLabel = game.add.text(game.world.centerX, -50, 'Super Box Porsuit ', { font: '50px Arial', fill: '#ffffff' });
        var nameLabel = game.add.text(500, 100, 'Super Box Porsuit ', { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        // Show the score at the center of the screen
        //var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, 'Maior pontuação: ' + game.global.score, { font: '25px Arial', fill: '#ffffff' });
        var scoreLabel = game.add.text(500, game.world.centerY, 'Maior pontuação: ' + game.global.score, { font: '25px Arial', fill: '#ffffff' });
        scoreLabel.anchor.setTo(0.5, 0.5);
        // Explain how to start the game
        //var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'Pressione para cima para começar', { font: '25px Arial', fill: '#ffffff' });
        var startLabel = game.add.text(500, 500, 'Pressione para cima para começar', { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);

        /*game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 500).loop().start();*/
    },

    start: function() {
        // Start the actual game
        game.state.start('play');
    },
};
