var sword, swordImage;
var monster,monsterImage, fruit, f1I,f2I,f3I,f4I, fG,eG,swooshSound;
var gameOverImage,gameOver,gameOverSound;
var gameState=1;
var score=0;
var f1G, f2G,f3G,f4G,a1G,a2G;


function preload()
{
  
  f1I=loadImage("fruit1.png")
  f2I=loadImage("fruit2.png")
  f3I=loadImage("fruit3.png")
  f4I=loadImage("fruit4.png")
  swordImage=loadImage("sword.png")
  monsterImage=loadAnimation("alien1.png","alien2.png")
  swooshSound=loadSound("knifeSwooshSound.mp3")
  gameOverSound=loadSound("gameover.mp3")
  gameOverImage=loadImage("gameover.png")
  
}

function setup()
{
  createCanvas(500,450)
  sword=createSprite(100,250,10,10);
  sword.addImage(swordImage)
  //sword.debug=true;
  sword.setCollider("circle",40,-40,10)
  eG=createGroup();
  fG=createGroup();
  gameOver=createSprite(200,150,20,20)
  gameOver.scale=1.5;
  gameOver.visible=false;
  
}

function draw()
{
  background(255,130,150);
  drawSprites();
  stroke("blue")
  fill("black")
  text("Your Score :  " + score, 380,50)
   
  if(gameState===1)
  {    
    sword.x=mouseX;
    sword.y=mouseY;
     spwanFruit();
      enemy();
      
    
        if(fG.isTouching(sword))
          {
           swooshSound.play();
            fG.destroyEach();
            score=score+10;
          }
        if(eG.isTouching(sword))
          {
            gameState=0;
             gameOverSound.play();
             eG.destroyEach();
          }
  }
  
    if(gameState===0)
      {
        fG.setLifetimeEach(-1);
       eG.setLifetimeEach(-1);
     
     fG.setVelocityXEach(0);
     eG.setVelocityXEach(0);
       gameOver.addImage(gameOverImage)
        gameOver.visible=true;
       
      
       text("Press Enter to restart",200,350)
        
    } 
    
    if(keyDown("Enter"))
      {
        gameState=1;
         gameOver.visible=false;
        score=0;
      }
  
}

function spwanFruit()
{
    if(frameCount% 30 ===0)
      {
        fruit=createSprite(380,200,20,20)
        fruit.scale=0.35;
        fruit.velocityX=-12;
       
         rand=Math.round(random(1,4)); 
         if (rand===1)  
         {
           fruit.addImage(f1I)
         }
         else if (rand===2)  
         {       
           fruit.addImage(f2I)
         } 
         else if (rand===3)  
        {       
        fruit.addImage(f3I)
        } 
        else if (rand===4)  
       {       
        fruit.addImage(f4I)
       } 
        fruit.y=Math.round(random(70,440))
         fruit.lifetime = 60;
        
         fG.add(fruit);
        fG.scale=0.6;
        
      }
       
}


function enemy()
{
    if(frameCount% 200 ===0)
      {
        monster=createSprite(455,200,10,10) 
        
        monster.scale=1.5;
        monster.velocityX=-13;
        monster.addAnimation("mons",monsterImage)
        monster.y=Math.round(random(40,410))
        monster.lifetime=50;
        eG.add(monster);
            
     }
}

