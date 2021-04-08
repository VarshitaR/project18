var  sword, swordImage;

var PLAY = 1;
var END = 0;
var gameState = 1;

var score;

var fruit1, fruit2, fruit3, fruit4, fruitGroup;

var monsterImage, enemyGroup;

var gameOverImage;

var knifeSwooshSound, gameOverSound;

function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage = loadImage("alien1.png");
  
  gameOverImage = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
  gameOverSound = loadSound("gameover.mp3")
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
    
}

function draw(){
  
  background("lightblue");
  
   text("Score: "+ score, windowWidth-80,25);
  
  if(gameState === PLAY){
   
    fruits();
    enemies();
    
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score+2;
    }
    
    if(enemyGroup.isTouching(sword)){
      gameState = END;
      gameOverSound.play();
    }
  
  }
  
  if(gameState === END){
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
    sword.addImage(gameOverImage);
    sword.x=windowWidth/2;
    sword.y=windowHeight/2;
    sword.scale=2;
    
  }
      
  drawSprites();
  
}

function fruits(){
  if(World.frameCount % 80 === 0){
    fruit = createSprite(windowWidth ,200,20,20);
    fruit.scale=0.2;
    
    r = Math.round(random(1,4));
      if (r===1){
        fruit.addImage(fruit1);
      }
      else if (r===2){
        fruit.addImage(fruit2);
      }
      else if (r===3){
        fruit.addImage(fruit3);
      }
      else {
        fruit.addImage(fruit4);
      }
    
    fruit.y=Math.round(random(windowWidth-700,windowWidth-60));
    
    position=Math.round(random(1,2));
   if(position === 1){
    fruit.x=0;
     fruit.velocityX=(7+(score/4));
   }
    if(position === 2){
      fruit.x=windowWidth;
      fruit.velocityX=-(7+(score/4));
    }
    
    fruitGroup.add(fruit);
    
    }
  }

 function enemies(){
   if (World.frameCount % 200 === 0){
     monster = createSprite(windowWidth,200,20,20);
     monster.addAnimation("moving", monsterImage);
     monster.y=Math.round(random(windowWidth-700,windowWidth-60));
     
     position=Math.round(random(1,2));
   if(position === 1){
    monster.x=0;
     monster.velocityX=(8+(score/4));
   }
    if(position === 2){
      monster.x=windowWidth;
      monster.velocityX=-(8+(score/4));
    }
    
    fruitGroup.add(fruit);
         
     enemyGroup.add(monster);
     
   }
 }
