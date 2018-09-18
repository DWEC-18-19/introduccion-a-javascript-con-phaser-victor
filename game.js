// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var lives = 10;
var powerup = false;
var winningMessage;
var peachMessage;
var won = false;
var currentScore = 90;
var winningScore = 100;
var enemy;
var enemy1;
var posiciones = [0,1,2,3,4];

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();

  createItem(530, 150, 'coin');
  createItem(250, 500, 'coin');
  createItem(400, 400, 'coin');
  createItem(580, 50, 'coin');
  createItem(380, 250, 'coin');
  createItem(180, 150, 'coin');
  createItem(680, 250, 'coin');
  createItem(280, 20, 'coin');
  createItem(600,500,'star');
  createItem(320,500,'poison');
  createItem(550,60,'poison');
  createItem(310,200,'poison');
  
  

}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(0,0,'fondo');
  platforms.create(450, 200, 'platform');
  platforms.create(170 , 550, 'platform_2');
  platforms.create(320 , 450, 'platform');
  platforms.create(500, 100, 'platform_2');
  platforms.create(300 , 300, 'platform');
  platforms.create(100 , 200, 'platform_2');
  platforms.create(600, 300, 'platform_2');
  platforms.create(200, 70, 'platform');
  


  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

function comprobarVacio(posicion){
    var vacio = false;
  if(posiciones[posicion] != 'poison'){
    vacio = true;
  }
  return vacio;

}

  

function generarNuevo(){
  
  var ran = Math.floor(Math.random()*(4));
  
  switch(ran){
    case 0: if(comprobarVacio(0)){
              createItem(580,160,'poison');
              posiciones[0] = 'poison';
            }
            break;
    case 1: if(comprobarVacio(1)){
            createItem(450,410,'poison');
            }
            break;
    case 2: if(comprobarVacio(2)){
            createItem(360,35,'poison');
            }
            break;
    case 3: if(comprobarVacio(3)){
            createItem(230,160,'poison');
            }
            break;
    case 4: if(comprobarVacio(4)){
            createItem(730,260,'poison');
            }
            break;

    
  }
}



// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  
 

  switch(item.key){
    case 'star':  powerup = true;
                  currentScore = currentScore + 20;
                  item.kill();
                
                  break;
    case 'poison':lives = lives-1;
                  
                  item.kill(); 
                  generarNuevo();
                  
                  break;

    case 'fondo': break;
    case 'peach': 
                

                break;


    default: currentScore = currentScore + 10;
    item.kill();
    
              if (currentScore === winningScore) {
                  createBadge();
                }
    }
  
}



// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

function collisionHandler(player,enemy){
  enemy.kill();
  lives = lives-1;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800 , 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform_2', 'platform_2.png');
    game.load.image('fondo','fondo.png');
    game.load.image('peach','peach.png'),

    //Load spritesheets
    game.load.spritesheet('player', 'chalkers.png', 48, 62);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('star','star.png',32,32)
    game.load.spritesheet('poison', 'poison.png', 32, 32);
    game.load.spritesheet('mikethefrog','mikethefrog.png',32,32);
    game.load.spritesheet('enemigos','enemigosxd.png',250,32);
    game.load.spritesheet('mario','mario.png',45,55);
    game.load.spritesheet('tortuga','tortuga1.png',38,58);



  }

  // initial game set up
  function create() {

    addPlatforms();
    addItems();
    

    player = game.add.sprite(50, 600, 'mario');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;

    enemy = game.add.sprite(800,600,'tortuga');
    enemy.animations.add('walk');
    enemy.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.gravity.y = 1000;
    enemy.animations.play('walk', 10, true);

    enemy1 = game.add.sprite(220,70,'tortuga');
    enemy1.animations.add('walk');
    enemy1.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(enemy1);
    enemy1.body.collideWorldBounds = true;
    
    enemy1.animations.play('walk', 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    texto = game.add.text(370, 485, "", { font: "bold 22px Arial", fill: "white" });
  }

  // while the game is running
  function update() {

    if(lives === 0){
      location.reload();
    }

    

    text.text = "SCORE: " + currentScore +"\n"+ "LIVES: " + lives;

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, enemy,collisionHandler);
    game.physics.arcade.collide(player, enemy1,collisionHandler);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;


    if(enemy.world.x <= 370){
      enemy.body.velocity.x = 100;
      enemy.scale.x = 1;

    } else if(enemy.world.x >= 770){
      enemy.body.velocity.x = -100;
      enemy.scale.x = -1;
    }

    if(enemy1.world.x <= 220){
      enemy1.body.velocity.x = 100;
      enemy1.scale.x = 1;

    } else if(enemy1.world.x >= 375){
      enemy1.body.velocity.x = -100;
      enemy1.scale.x = -1;
    }

    if(player.world.x == enemy.world.x ){
      lives = lives-1;
    }

     

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      if(powerup===true){
      player.body.velocity.y = -650;
      } else{
      player.body.velocity.y = -500;

      }
    } 
    // when the player winw the game
    if (won) {
      
      texto.text = "Gracias por rescatarme Mario!!";
      createItem(500,517,'peach');
    }
  }

  function render() {

  }

};
