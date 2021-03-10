// https://www.gameart2d.com/the-zombies-free-sprites.html
// https://www.gameart2d.com/free-graveyard-platformer-tileset.html
class SceneA extends Phaser.Scene {
  map;
  player;
  playerStartPoint;
  cursors;
  hearts;
  introScreen;
  score = 0;
  scoreText;

  constructor(config) {
    super(config);
  }
  preload() {
    //images
    this.load.image('static', 'assets/static.jpg');
    this.load.image('tiles', 'assets/graveyard-tiles.png');
    this.load.image('heart', 'assets/heart-small.png');
    this.load.tilemapTiledJSON('platformer-tilemap', 'assets/2D-TutorialMap.json');
    //player, loaded from the sprite sheet
    this.load.spritesheet('player', 'assets/zombie-girl.png', {
      frameWidth: 130,
      frameHeight: 144
    });
  }
  create() {
    this.add.image(448, 448, 'static').setScrollFactor(0, 0); 
    this.map = this.make.tilemap({ key: 'platformer-tilemap' });
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    let tiles = this.map.addTilesetImage('graveyard-tiles', 'tiles');
    this.map.createStaticLayer('midgroundLayer', [tiles], 0, 0).setScrollFactor(0.5, 0);
    let collisionLayer = this.map.createStaticLayer('collisionLayer', [tiles], 0, 0);
    collisionLayer.setCollisionBetween(1, 1000);
    this.map.createStaticLayer('decorationLayer', [tiles], 0, 0);
    //player 
    this.playerStartPoint = SceneA.FindPoint(this.map, 'objectLayer', 'player', 'playerSpawn');
    this.player = this.physics.add.sprite(this.playerStartPoint.x, this.playerStartPoint.y, 'player');
    this.player.jumpCount = 0;
    this.player.body.setSize(80, 120, true);
    this.player.body.setOffset(30, 20);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, collisionLayer);
    //animations
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', {
        start: 1,
        end: 10
      }),
      frameRate: 12,
      repeat: -1

    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 0
      }),
    });
    //camera
    let camera = this.cameras.getCamera("");
    camera.startFollow(this.player); // can add params if needed 
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    //hearts
    
  }

  update() {
    console.log("updating");
  }
  
  
  static FindPoint(map, layer, type, name) {
    var loc = map.findObject(layer, function (object) {
      if (object.type === type && object.name === name) {
        return object;
      }
    });
    return loc
  }
  static FindPoints(map, layer, type) {
    var locs = map.filterObjects(layer, function (object) {
      if (object.type === type) {
        return object
      }
    });
    return locs
  }
}
