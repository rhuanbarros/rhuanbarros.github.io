var playState = {
	create: function() {
		this.DIMINUIR = -1; //constante para usar num if
        this.AUMENTAR = 1; //constante para usar num if

        //PLANO DE FUNDO
        game.add.tileSprite(0, 0, 1280, 720, 'background');

		this.createWorld();

        //PLAYER
        this.player = game.add.sprite(400, 300, 'arrow');
        this.player.anchor.setTo(0.5, 0.5);

		//CAIXAS
        this.caixa = game.add.sprite(140, 60, 'caixa');
        game.physics.arcade.enable(this.caixa);
        this.caixa.anchor.setTo(0.5, 0.5);

        //PONTUAÇÃO CAIXAS
        this.caixasLabel = game.add.text(330, 30, 'Caixas: 0', { font: '22px Arial', fill: '#ff0000' });
        this.caixasLabel.fixedToCamera = true;
        this.qtdCaixas = 0;

        //TIMER
        this.timerLabel = game.add.text(480, 30, 'Tempo restante: 5', { font: '22px Arial', fill: '#ff0000' });
        this.timerLabel.fixedToCamera = true;
        this.qtdTimer = 5;
        game.time.events.loop(Phaser.Timer.SECOND, this.atualizarTimer, this, this.DIMINUIR);

        //SETA Q APONTA PARA CAIXA
        this.setaCaixa = game.add.sprite(520, 30, 'setaCaixa');
        this.setaCaixa.anchor.setTo(1, 1);
        this.setaCaixa.fixedToCamera = true;

        //  Enable Arcade Physics for the sprite
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        //  Tell it we don't want physics to manage the rotation
        //this.player.body.allowRotation = false;

        //MANDA A CAMERA SEGUIR O PLAYER
        game.camera.follow(this.player);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.explosions = game.add.group();
    	this.explosions.createMultiple(30, 'kaboom');
		this.explosions.forEach(this.setupInvader, this);
        
	},

	createWorld: function() {
		this.map = game.add.tilemap('map');
		//aqui é carregado o tileset usado no mapa, nesse caso só eh usado um, mas um mapa poderia usar muitos
        this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		//aqui diz q o tileset numero 1 é colidivel
        this.map.setCollision(1);
        //isso configura uma função de callBack no caso de o tileset 1 do mapa colidir com o player
        this.map.setTileIndexCallback(1, this.playerDie, this);
	},	

    update: function() {
        //Movimento player
        //this.player.rotation = game.physics.arcade.moveToPointer(this.player, 60, game.input.activePointer, 300);
        /*if (this.cursors.up.isDown) {
            //game.physics.arcade.accelerationFromRotation(this.player.rotation, 200, this.player.body.acceleration);
            game.physics.arcade.velocityFromRotation(this.player.rotation, 200, this.player.body.velocity);
            game.physics.arcade.velocityFromAngle(this.player.angle, 200, this.player.body.velocity);
        }*/
        game.physics.arcade.velocityFromAngle(this.player.angle, 400, this.player.body.velocity);
        
        if (this.cursors.left.isDown) {
            this.player.body.angularVelocity = -500;
        } else if (this.cursors.right.isDown) {
            this.player.body.angularVelocity = 500;
        } else {
            this.player.body.angularVelocity = 0;
        }

		//game.physics.arcade.overlap(this.player, this.layer, this.playerDie, null, this);
        //acho q essa função mantem o colide ligado...
        game.physics.arcade.collide(this.player, this.layer);

        //CAIXAS
        game.physics.arcade.overlap(this.player, this.caixa, this.pegarCaixa, null, this);
        
        //faz a seta apontar para a caixa
        this.setaCaixa.rotation = game.physics.arcade.angleBetween(this.caixa, this.setaCaixa);
    },
    
    playerDie: function() {
        console.log("function playerDie foi");
        if (!this.player.alive) {
            return;
        }
        
        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(this.player.body.x, this.player.body.y);
        explosion.play('kaboom', 30, false, true);
        
        this.player.kill();
        
        game.global.score = this.qtdCaixas;
        
        game.time.events.add(1000, this.startMenu, this);
    },

    setupInvader: function(invader) {
        console.log("function setupInvader foi");
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');
    },
    
    startMenu: function() {
        game.state.start('menu');
    },
    
    atualizarTimer: function(flag) {
        if(flag === this.DIMINUIR) this.qtdTimer--;
        else this.qtdTimer +=1;
        
        if(this.qtdTimer === -1) this.playerDie();
        
        this.timerLabel.text = 'Tempo restante: ' + this.qtdTimer;
    },    

   pegarCaixa: function(player, caixa) {
        this.qtdCaixas += 1;
        this.caixasLabel.text = 'Caixas: ' + this.qtdCaixas;

        this.atualizarTimer(this.AUMENTAR);

        this.atualizarPosicaoCaixa();
        //console.log("foi");
    },

    atualizarPosicaoCaixa: function() {
        //limites 1280x720
        var posicaoCaixa = [
            {x: 140, y: 60}, {x: 1000, y: 650},
            {x: 470, y: 370}, {x: 750, y: 125},
            {x: 320, y: 300}, {x: 602, y: 550},
            {x: 800, y: 200}, {x: 502, y: 550}
        ];
        for (var i = 0; i < posicaoCaixa.length; i++) {
            if (posicaoCaixa[i].x === this.caixa.x) {
                posicaoCaixa.splice(i, 1);
            }
        }
        var novaPosicao = posicaoCaixa[game.rnd.integerInRange(0, posicaoCaixa.length-1)];
        this.caixa.reset(novaPosicao.x, novaPosicao.y);
    },

}