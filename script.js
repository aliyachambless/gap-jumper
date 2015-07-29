/* Processing.JS sketch */
var buildings = [];
var cloudArray = [];
var coins = [];
var spikes = [];
var score = 0;
var cloudX = 0;
var doubleCloud = -150;
var moonX = 300;
var speed = 0;
var gravity = 6;
var moving = false;
var jumping = false;
var stop = false;
//coin animation stuff
var coinSize = 89;
var coinX = 1000;
var coinY = 170;
var start = coinSize*1.09;
var progress = start;
//total coin goal
var goal = 50;
var win = false;
var Spikes = function(triangleYThree, triangleMove){
    this.triangleYThree = triangleYThree;
    this.triangleMove = triangleMove;
    
    this.draw = function() {
        noStroke();
        fill(150, 150, 150);
        triangle(this.triangleMove, this.triangleYThree, this.triangleMove+4, this.triangleYThree - 44, this.triangleMove+8, this.triangleYThree);
        triangle(this.triangleMove+8, this.triangleYThree, this.triangleMove+8+4, this.triangleYThree - 44, this.triangleMove+8+8, this.triangleYThree);
        triangle(this.triangleMove+8+8, this.triangleYThree, this.triangleMove+8+8+4, this.triangleYThree - 44, this.triangleMove+8+8+8, this.triangleYThree);
        triangle(this.triangleMove+8+8+8, this.triangleYThree, this.triangleMove+8+8+8+4, this.triangleYThree - 44, this.triangleMove+8+8+8+8, this.triangleYThree);
        triangle(this.triangleMove+8+8+8+8, this.triangleYThree, this.triangleMove+8+8+8+8+4, this.triangleYThree - 44, this.triangleMove+8+8+8+8+8, this.triangleYThree);
        triangle(this.triangleMove+8+8+8+8+8, this.triangleYThree, this.triangleMove+8+8+8+8+8+4, this.triangleYThree - 44, this.triangleMove+8+8+8+8+8+8, this.triangleYThree);
    };
    this.move = function(){
      this.triangleMove -= speed;
    };
};
var shadow = function(){
    fill(254,233,45,80);
    ellipse(coinX,coinY,coinSize,coinSize);
    fill(207, 184, 37,80);
    ellipse(coinX,coinY,coinSize*0.8,coinSize*0.8);
};
var coinFill = function(){
    fill(173, 156, 31);
    ellipse(coinX+coinSize/10,coinY+coinSize*0.06,coinSize,coinSize);
    fill(254,233,45);
    ellipse(coinX,coinY,coinSize,coinSize);
    fill(207, 184, 37);
    ellipse(coinX,coinY,coinSize*0.8,coinSize*0.8);
    fill(173, 156, 31);
    rect(coinX+coinSize*0.06,coinY+coinSize*0.32,coinSize*-0.2,coinSize*-0.6);
    fill(254,233,45);
    rect(coinX+coinSize*0.08,coinY+coinSize*0.32,coinSize*-0.1,coinSize*-0.6);
};
//end coin animation stuff
var jump = function(){
    if (gravity < 12) {
      gravity += 0.7;
   }
   else{
      jumping = false;
   }
};
var Player = function(x,y){
   this.x = x;
   this.y = y;
   this.draw = function(){
      fill(255,2,0);
      ellipse(this.x,this.y,50,100);
   };
   this.move = function(){
      this.y += gravity;
   };
};
var currentPlayer = new Player(110,100);
var Coin = function(coinX,coinY,coinSize) {
   this.coinX = coinX;
   this.coinY = coinY;
   this.coinSize = coinSize;
   this.draw = function() {
      noStroke();
      fill(173, 156, 31);
      ellipse(this.coinX,this.coinY,sin(frameCount * 3) * this.coinSize*1.2,this.coinSize*1.2);
      fill(254,233,45);
      ellipse(this.coinX,this.coinY,sin(frameCount * 3) * this.coinSize,this.coinSize);
      fill(207, 184, 37);
      ellipse(this.coinX,this.coinY,sin(frameCount * 3) * this.coinSize*0.8,this.coinSize*0.8);
      fill(173, 156, 31);
      rect(this.coinX+this.coinSize*0.06,this.coinY+this.coinSize*0.32,sin(frameCount * 3) * this.coinSize*-0.2,this.coinSize*-0.6);
      fill(254,233,45);
      rect(this.coinX+this.coinSize*0.04,this.coinY+this.coinSize*0.32,sin(frameCount * 3) * this.coinSize*-0.1,this.coinSize*-0.6);
   this.move = function(){
      this.coinX -= speed;
   }
   };
};
var Cloud = function(xPos,speed){
   this.xPos = xPos;
   this.speed = speed;
   this.draw = function(){
      fill(255, 255, 255,99);
      ellipse(this.xPos +93,50,50,50);
      ellipse(this.xPos +259,84,50,50);
      ellipse(this.xPos +231,88,40,40);
      ellipse(this.xPos +211,93,29,29);
      ellipse(this.xPos +286,89,40,40);
      ellipse(this.xPos +307,93,29,29);
      ellipse(this.xPos +69,55,40,40);
      ellipse(this.xPos +119,55,40,40);
      ellipse(this.xPos +46,59,29,29);
      ellipse(this.xPos +143,59,29,29);
   };
   this.move = function(){
      this.xPos += this.speed;
    
      if (this.xPos > width+50) {
        this.xPos = -190;
      }
   };
};
var Building = function(tall,xPos){
    this.tall = tall;
    this.xPos = xPos;
    this.drawBuild = function() {
        fill(0, 0, 0);
        rect(this.xPos,this.tall,100,height-this.tall);
        for(var i = 0; i < 32; i++){
            for(var j = 0; j < 4; j++){
                fill(143, 141, 120);
                rect(this.xPos +7+ (j*25),this.tall+10+(i*24), 8,13);
            }
        }
    };
    this.move = function() {
      this.xPos -= speed;
    };
};
var buildings = [];
void setup()
{
   size(1200,700);
   textFont(loadFont("courier"), 14);
   for(var i = 0; i < 13; i++){
            buildings.push(new Building(random(350,500),i*100));
            coins.push(new Coin(buildings[i].xPos+50,buildings[i].tall-30,30))
   }
   for(var j = 0; j<5; j++){
      cloudArray.push(new Cloud(random(-100,width),random(0.1,1)));
   }
};
void draw()
{
   background(6, 66, 63);
   //score animation stuff
   progress = start*((goal-score)/goal);
    fill(255, 255, 255);
    noStroke();
    if(win === true){
        strokeWeight(3);
        for(var i = 0; i < 360; i+=0.5){
            var noiseShine = noise(i*0.05);
            stroke(255,255,255,noiseShine*35-15);
            line(coinX,coinY,cos(i)*600,sin(i)*600);
        }
    }
    coinFill();
    fill(6, 66, 63);
    rect(coinX-coinSize,coinY-coinSize/1.9,coinSize*2,progress);
    shadow();
    if(win === false){
        fill(0,0,0);
        textSize(coinSize/2.8);
        text(round((score/goal)*100) + "%",coinX-coinSize/3.7,coinY+coinSize/7.7);
    }  
    fill(210, 217, 0);
    text(score + " coins!",coinX-70,244);
   
    noStroke();
        //moon
    fill(255, 250, 148);
    ellipse(moonX,100,75,75);
    fill(6, 66, 63);
    ellipse(moonX + 20,100,75,75);
   if (jumping == true) {
      jump();
   }
    for(var i = 0; i < buildings.length; i++){
        if(buildings[i].xPos < -96 && moving == true){
            buildings.push(new Building(random(350,500),width));
            buildings.splice(i,1);
            var newCoin = round(random(0,2));
            if (newCoin == 1) {
               coins.push(new Coin(width+50,buildings[buildings.length-1].tall-30,30));
            }
            if (newCoin == 2) {
               spikes.push(new Spikes(buildings[buildings.length-1].tall,width+50));
            }
        }
        buildings[i].drawBuild();
        buildings[i].move();
    }
    for(var k = 0; k < cloudArray.length; k++){
      cloudArray[k].draw();
      cloudArray[k].move();
    }
    
    for(var y = 0; y < coins.length; y++){
      coins[y].draw();
      coins[y].move();
      if (currentPlayer.x < coins[y].coinX + 25 && currentPlayer.x > coins[y].coinX - 25 && currentPlayer.y > coins[y].coinY -50){
         coins.splice(y,1);
         score += 1;
         $("#score").html("score: "+ score);
      }
    }
    for(var y = 0; y < spikes.length; y++) {
      spikes[y].draw();
      spikes[y].move();
    }
    currentPlayer.draw();
    currentPlayer.move();
    
    for (var t = 0; t < buildings.length; t++) {
      if (currentPlayer.x > buildings[t].xPos && currentPlayer.x < buildings[t].xPos + 100) {
         console.log("player x: " + currentPlayer.x + "build x: " + buildings[t+1].xPos);
         if (currentPlayer.y > buildings[t+1].tall-40 && currentPlayer.x > buildings[t+1].xPos - 25) {
            stop = true;
            speed = 0;
         }
         if (currentPlayer.y < buildings[t+1].tall-30 && currentPlayer.x > buildings[t+1].xPos - 25) {
            stop = false;
         }
         if (currentPlayer.y > buildings[t].tall - 55) {
            currentPlayer.y = buildings[t].tall - 56;  
         }
      }
    }
    if (moving == true && stop == false) {
      speed = 11;
    }
};
$("body").keydown(function(c){
   c.preventDefault();
   if (c.keyCode == 39) {
      moving = true;
   }
   if (c.keyCode == 32) {
      if (jumping == false) {
         jumping = true;
         gravity = -14;
      }
   }
   if (c.keyCode == 40) {
      gravity = 12;
   }
});
$("body").keyup(function(c){
   if (c.keyCode == 39) {
      moving = false;
      speed = 0;
   }
});