var loadState = {
	preload: function () {
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		//game.load.spritesheet('player', 'assets/player2.png', 20, 20);

		//game.load.image('backgroundMenu', 'assets/background.png');
		game.load.image('backgroundMenu', 'assets/menubk.png');
		game.load.image('background','assets/castelo.png');
        game.load.image('arrow', 'assets/arrow.png');
        //game.load.image('arrow', 'assets/nyan_vedita.png');
        game.load.image('caixa', 'assets/block.png');
		
		game.load.image('setaCaixa', 'assets/longarrow.png');
		
		game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);

		this.load.image('tileset', 'assets/tileset.png');
		this.load.tilemap('map', 'assets/mapa1.json', null, Phaser.Tilemap.TILED_JSON);
		//this.load.tilemap('map', 'assets/mapa2.json', null, Phaser.Tilemap.TILED_JSON);
	},

	create: function() {
		game.state.start('menu');
	}
};