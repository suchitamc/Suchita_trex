var PLAY =1;
var END = 0;
var gameState = PLAY;
var trex ,trex_running,trex_collided, edges, ground1,ground2, cloud,cloud1,cloudsGroup,score;
var obstacle, obstacle1, obstacle2 ,obstacle3,obstacle4,obstaclesGroup;
var restart,gameover, restart1,gameover1,gameoverm;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  ground2 = loadImage("ground.PNG");
  cloud1 = loadImage("cloud3.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obs2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  restart1 = loadImage("restart.png");
  gameover1 = loadImage("game_over.png");
  restart1 = loadImage("restart.png");
  gameoverm = loadSound("gameover.wav");
}

function setup(){
  createCanvas(600,200);
  
  
  ground1 = createSprite(300,190,800,20);
  ground1.addImage(ground2);
  ground1.x = ground1.width/2;
  ground2 = createSprite(300,190,600,20);
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided);
  trex.scale=0.5;
  score = 0;
  obstaclesGroup = new Group();
  cloudsGroup = createGroup();
  gameover = createSprite(300,70,50,50);
  gameover.addImage(gameover1);
  gameover.scale = 0.1;
  restart = createSprite(300,130,50,50);
  restart.addImage(restart1);
  restart.scale = 0.04;
}

function draw(){
  background("white");
  text("Score:"+score,500,15);
  
  
  if(gameState === PLAY){
    gameover.visible = false;
    restart.visible = false;
    ground1.velocityX = -3; 
    if(ground1.x<0){
      ground1.x=ground1.width/2;
    }
    score = score + Math.round(getFrameRate()/60);
    spawncloud();
    spawnobstracle();
    if(keyDown("space") && trex.y>150){
      trex.velocityY = -14; 
    }
    //adding gravity
    trex.velocityY = trex.velocityY + 0.7;
    
    trex.setCollider("circle",0,0,40);
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      gameoverm.play();
    }
    
  }else if(gameState === END){
    gameover.visible = true;
    restart.visible = true;
    gameover.depth = 80;
    ground1.velocityX = 0;
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  //console.log(trex.y);
  
  
  ground2.visible = false;
  
  trex.collide(ground2);
  
  
  drawSprites();

}

 function spawncloud(){
   if(frameCount%80 === 0){
    cloud = createSprite(600,40,40,20);
    cloud.addAnimation("cloud1",cloud1);
    cloud.y = Math.round(random(25,60));
    cloud.scale = 0.09;
    cloud.velocityX =-3;
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloud.lifetime = 200;
     cloudsGroup.add(cloud);
 }
   
 }
function spawnobstracle(){
  
  if(frameCount%100 === 0){
    obstacle = createSprite(600,160,40,20);
    
    var n = Math.round(random(1,4));
    switch (n){
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        
    }
    
    obstacle.scale = 0.06;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    //obstracle.depth = 0.5;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  trex.changeAnimation("running", trex_running);

}