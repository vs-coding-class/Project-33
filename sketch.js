const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var engine,world;
 
var particle;
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var ground;

var score = 0;
var count = 0;

var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

    for (var j = 50; j <=width-10; j=j+50){
      plinkos.push(new Plinko(j,375));
    } 
}
 


function draw() {
  background("black");
  Engine.update(engine);

  textSize(30);
  text("Score: "+score,50,50);

  textSize(20);
  text("500",20,550);
  text("500",100,550);
  text("500",180,550);
  text("200",260,550);
  text("200",340,550);
  text("200",420,550);
  text("200",500,550);
  text("100",580,550);
  text("100",660,550);
  text("100",740,550);

  stroke(246,180,23);
  line(0,450,800,450);
 
  ground.display();

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();  
   }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(gameState === "play"){
    if(particle != null){
      particle.display();

      if(particle.body.position.y > 750){
        if(particle.body.position.x < 240){
          score = score + 500;
          particle = null;
          if(count === 5){
            gameState = "end";
          }
        }
        else{
          if(particle.body.position.x >= 240 && particle.body.position.x <= 560){
            score = score + 200;
            particle = null;
            if(count === 5){
              gameState = "end";
            }
          }
          else{
            score = score + 100;
            particle = null;
            if(count === 5){
              gameState = "end";
            }
          }
        }
      }
    }
  }

  if(gameState === "end"){
    textSize(40);
    text("GAME OVER!",380,420);
  }
}

function mousePressed(){
  if(gameState != "end"){
    count++;
    particle = new Particle(mouseX,10,10);
  }
}