//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  mAnimation=loadAnimation("monkey0.png","monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png","monkey6.png","monkey7.png","monkey8.png");
  mDead=loadAnimation("monkey8.png");
  groundI=loadImage("background0.png");
  bananaI=loadImage("banana0.png");
  stoneI=loadImage("stone0.png");
}
function setup(){
  createCanvas(400,400);
//create a ground sprite
 ground = createSprite(200,400,400,5);
ground.addImage("ground_stone_1",groundI);
ground.scale=2.2;
ground.x = ground.width/2;
 monkey = createSprite(200,200,20,50);
monkey.addAnimation("monkey",mAnimation);
monkey.addAnimation("monkeyD",mDead);

  monkey.debug = true;


monkey.scale = 0.2;
monkey.x = 50;



//invisible Ground to support Trex
 invisibleGround = createSprite(200,380,400,20);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
 ObstacleGroup = new Group();
 bananaGroup = new Group();

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
 count = 0;
}

function draw() {
  //set background to white
  background("white");
  //display score
 
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 );
       if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //scoring
  //  count = Math.round(World.frameRate/18)+ count ;
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 290){
      monkey.velocityY = -12 ;
    }
    
  if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     count = count + 1 ;
    
  }
    
  console.log(monkey.y);
  
    //add gravity
   monkey.velocityY = monkey.velocityY + 0.8;
    //spawn obstacles
   spawnObstacles();
    spawnBanana();
 
    if(ObstacleGroup.isTouching(monkey)){
      gameState = END;
      monkey.changeAnimation("monkeyD",mDead)
    }
     
  }
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    ObstacleGroup.setVelocityXEach(0);
  
    
    //change the trex animation
    //set lifetime of the game objects so that they are never destroyed
    ObstacleGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
  }
  
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  drawSprites();
  text("Score: "+ count, 250, 100);
}


function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(400,320,10,40);
    obstacle.velocityX = -2
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
   // obstacle.lifetime = 70;
    obstacle.addImage("Stone",stoneI);
    //add each obstacle to the group
    ObstacleGroup.add(obstacle);
  }
}
function spawnBanana(){
  if(frameCount%200==0){
    var banana = createSprite(400,220,10,40);
    banana.velocityX = -2;
    banana.addImage("Banana",bananaI);
    banana.scale = 0.1;
    bananaGroup.add(banana);
    banana.lifetime = 200 ;
  }
}

  




  
