/* Processing.JS sketch */
/* @pjs preload="menuImage.jpg"; */
//current player global var
var currentPlayer;
var playerRun = 10;
var pos1 = true;
//var keyIsPressed;
//sounds
//var coinSound = new buzz.sound( "/146723__fins__coin-object", {
  //  formats: [ "ogg", "mp3", "aac" ]
//});
//stacys button vars
var programs;
var why;
//game screen switch
var menu = true;
var wheel = false;
var instructions = false;
var playGame = false;
var stats = false;
/*
//random wheel
var playedYet = false;
var wheelSpeed = 0;
var angle = 0;
frameRate(50);

translate(width/2, height/2);
var avatars = [
   1,
   2,
   3,
   4
    ///getImage("avatars/marcimus"),
    //getImage("avatars/mr-pants"),
    //getImage("avatars/mr-pink"),
    //getImage("avatars/old-spice-man"),
];
var colors = [
    color(230, 97, 188),
    color(59, 205, 185),
    color(240, 68, 34),
    color(43, 200, 0),
    color(255, 183, 0),
    color(128, 0, 255),
    color(0, 100, 255),
    color(128, 128, 128)];
var lines = true;
var sections = avatars.length;
var drawWheel = function() {
    var angleChange = 360 / sections;
    pushMatrix();
    rotate(270);
    if (avatars.length <= 0) {
        return;
    }
    imageMode(CENTER);
    var a = 0;
    pushMatrix();
    var index = -1;
    for (var i = 0; i < avatars.length; i++) {
        // draw the sector first
        a = angleChange * i;
        fill(colors[i]);
        noStroke();
        //rotate(angleChange);
        arc(0, 0, 300, 300, angleChange*i, angleChange*(i+1));
        /*stroke(0, 0, 0);
        strokeWeight(9);
        line(0, 0, 150 * cos(angleChange*i), 150 * sin(angleChange * i));
        noStroke();
        
        pushMatrix();
        rotate(angleChange * (i+0.5));
        translate(width/4, 0);
        scale(0.5, 0.5);
        rotate(90);
        image(avatars[i], 0, 0);
        popMatrix();
        if (wheelSpeed === 0 && playedYet) {
            var a = 9.5;
            var r = (-angle + a) % 360;
            if (r < 0) {
                r += 360;
            }
            if(r > angleChange*i && r<angleChange*(i+1)) {
                index = i;
            }
        }
    }
    
    for (i = 0; i < avatars.length; i++) {
        if (!lines) {
            break;
        }
        pushMatrix();
        rotate(-1);
        stroke(0, 0, 0);
        strokeWeight(3);
        line(0,0,0 + 150*cos(angleChange*i),0 + 150*sin(angleChange*i));
        noStroke();
        popMatrix();
    }
    
    popMatrix();
    popMatrix();
    fill(0, 0, 0, 200);
    ellipse(0, 0, 110, 110);
   // popMatrix();
    
    
    if (index !== -1) {
        pushMatrix();
        scale(0.4, 0.4);
        image(avatars[index % sections], 0, 0);
        popMatrix();
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        text("Result:", 0, -35);
        textAlign(LEFT, TOP);
    }
    
    stroke(0, 0, 0);
    strokeWeight(8);
    pushMatrix();
    resetMatrix();
    translate(200, 30);
    rotate(-
        (sin((angle * (360)) / angleChange) * 30 + 30)
    );
    line(0, 0, 0, 40);
    popMatrix();
    
    
    if (wheelSpeed === 0 && !playedYet) {
        fill(255, 255, 255);
        textSize(15);
        textAlign(CENTER, CENTER);
        text("Hold Space\nto set power!\nRelease to\nspin!!", 0, 0);
        textAlign(LEFT, TOP);
    }
    textAlign(LEFT, TOP);
    imageMode(CORNER);
};
var holdSpace = false;
var holdTime = 0;
*/
//background
var buildings = [];
var cloudArray = [];
var coins = [];
var spikes = [];
var score = 0;
var cloudX = 0;
var doubleCloud = -150;
var moonX = 300;
var speed = 0;
var gravity = 12;
var moving = false;
var jumping = false;
var stop = false;
//coin animation stuff
var coinSize = 89;
var coinX = 1000;
var coinY = 170;
var start = coinSize*1.09;
var progress = start;
//sound
/*
var jumpSound = new buzz.sound("arcade.mp3");
//var timeOverSound = new buzz.sound("res/sound/gameOverSound");
void play(soundToPlay) {
   soundToPlay.play();
};
*/
//bar animation
var whole = score;
var povertyLine;
var percent = 0.77;
var xPos;
var yPos;
var length;
var barCoins = [];
var finalScore = score * 0.77;
//timer
var timerColor = color(0, 255, 30);
var timerX = 890;
var timerY = 170;
var timerSize = 95;
//total coin goal
var goal = 50;
var win = false;
var grounded = true;
var CoinFall = function(coinX,coinY,coinSize,gravity,speed){
    this.coinX = coinX;
    this.coinY = coinY;
    this.coinSize = coinSize;
    this.speed = speed;
    this.gravity = gravity;
    this.draw = function() {
        fill(173, 156, 31);
        ellipse(this.coinX+this.coinSize/10,this.coinY+this.coinSize*0.06,this.coinSize,this.coinSize);
        fill(254,233,45);
        ellipse(this.coinX,this.coinY,this.coinSize,this.coinSize);
        fill(207, 184, 37);
        ellipse(this.coinX,this.coinY,this.coinSize*0.8,this.coinSize*0.8);
        fill(173, 156, 31);
        rect(this.coinX+this.coinSize*0.06,this.coinY+this.coinSize*0.32,this.coinSize*-0.2,this.coinSize*-0.6);
        fill(254,233,45);
        rect(this.coinX+this.coinSize*0.08,this.coinY+this.coinSize*0.32,this.coinSize*-0.1,this.coinSize*-0.6);
    };
    this.fall = function(){
        this.coinY += this.gravity;
        this.coinX += this.speed;
    };
};
var animate = function(){
    if(score > finalScore){
      score -= 0.25;
      barCoins.push(new CoinFall(xPos +(length*(score/whole))+random(-20,-10),yPos+25,30,random(3,4),random(-0.5,0.5)));
      barCoins.push(new CoinFall(xPos +(length*(score/whole))+random(-20,-10),yPos+25,30,random(3,4),random(-0.5,0.5)));
    }
    for(var i = 0; i < barCoins.length; i++){
            barCoins[i].draw();
            barCoins[i].fall();
    }
};
var count = 60, timer = setInterval(function() {
    $("#counter").html(count--);
    if(count == -1) clearInterval(timer);
}, 1000);

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
   // play(jumpSound);
    if (gravity < 12) {
      gravity += 0.7;
   }
   else{
      jumping = false;
   }
};
var Player = function(x,y,race){
   this.x = x;
   this.y = y;
   this.race = race;
   this.draw = function(){
      if (this.race == "A Caucasian") {
            image = new Image();
            /*
            if (playerRun%10 == 0) {
               if (pos1 == false) {
                  image.src = "gap white pos2 .png";
                  pos1 = true;
                  console.log("pos2");
               }
               else if(pos1 == true){
                  image.src = "gap white pos1.png";
                  pos1 = false;
                  console.log("pos1");
               }
            } */
            image.src = "gapwhitepos1.png";
            var ctx = document.getElementById('mycanvas').getContext('2d');
            ctx.drawImage(image,this.x-40,this.y-105);
      }
      if (this.race == "An African-American") {
            image = new Image();
            image.src = "gap black pos1.png";
            var ctx = document.getElementById('mycanvas').getContext('2d');
            ctx.drawImage(image,this.x-40,this.y-105);
      }
      if (this.race == "An Asian") {
            image = new Image();
            image.src = "gap asian pos1.png";
            var ctx = document.getElementById('mycanvas').getContext('2d');
            ctx.drawImage(image,this.x-40,this.y-105);
      }
      if (this.race == "A Hispanic/Latina") {
            image = new Image();
            image.src = "gap latina pos1.png";
            var ctx = document.getElementById('mycanvas').getContext('2d');
            ctx.drawImage(image,this.x-40,this.y-105);
      }
      //console.log(this.y);
      playerRun += 1;
   };
   this.move = function(){
      this.y += gravity;
   };
};
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
var menuScreen = function(){
  // var img = 
  background(0,0,0);
//  PImage b;

    b = loadImage("menuImage.jpg");

    image(b, 100, 0,1000,height);
    //stacys buttons
    var playBtnX = 290;
    var playBtnY = 30;
    var playBtnWidth = 150;
    var playBtnHeight = 50;
    fill(0, 0,0);
    rect(playBtnX, playBtnY, playBtnWidth, playBtnHeight,5);
    rect(playBtnX+200, playBtnY, playBtnWidth, playBtnHeight,5);
    rect(playBtnX+400, playBtnY, playBtnWidth, playBtnHeight,5);
    fill(255, 255, 255);
    text("Click to play",playBtnX+20,playBtnY+30);
    text("Programs",playBtnX+243,playBtnY+30);
    text("Why this game?",playBtnX+420,playBtnY+30);  
    mouseClicked = function() {
        if (mouseX >= playBtnX && mouseX <= (playBtnX+playBtnWidth) &&
            mouseY >= playBtnY && mouseY <= (playBtnY+playBtnHeight)) {
            instructions = true;
            menu = false;
        }
        if (mouseX >= playBtnX+200 && mouseX <= ((playBtnX+200)+playBtnWidth) &&
            mouseY >= playBtnY && mouseY <= (playBtnY+playBtnHeight)) {
            programs = true;
        }
        if (mouseX >= playBtnX+400 && mouseX <= ((playBtnX+400)+playBtnWidth) &&
            mouseY >= playBtnY && mouseY <= (playBtnY+playBtnHeight)) {
            why = true;
        }
    }

  
};
var programsScreen = function(){
    background(6,66,63);
    text("CHECK OUT THESE WOMEN EMPOWERMENT PROGRAMS", 100,100);
};

var whyScreen = function(){
    background(6,66,63);
    text("WHY", 100,100);
    text("The reason why we did this is because.....",100,200);
    text("MEET THE CREATORS",100,300);
    text("Stacy",100,350);
    text("Aliya", 100, 380);
    text("Amanda",100,410);
};

var randomWheel = function(){
   background(255,100,230);
   text("Random wheel!",100,100);
   /*
   pushMatrix();
    rotate(angle);
    drawWheel();
    popMatrix();
    
    angle += wheelSpeed;
    
    var friction = 0;
    if (abs(wheelSpeed) > 20) {
        friction = 0.2;
    }
    else if (abs(wheelSpeed) > 12.5) {
        friction = 0.15;
    }
    else if (abs(wheelSpeed) > 6) {
        friction = 0.1;
    }
    else {
        friction = 0.05;
    }
    if (wheelSpeed > 0.2) {
        wheelSpeed -= friction;
    }
    else if (wheelSpeed < -0.2) {
        wheelSpeed += friction;
    }
    else {
        wheelSpeed = 0;
    }
    
    
    
    // draw power
    if ((keyIsPressed && holdSpace) && wheelSpeed === 0) {
        holdTime += 3;
        if (holdTime > 255) {
            holdTime = 255;
        }
    }
    fill(holdTime, 255 - holdTime, 0);
    pushMatrix();
    resetMatrix();
    noStroke();
    rect(100, 350, holdTime / 255 * 200, 30);
    
    popMatrix();
    // for testing
    var test = 0;
    if (test === 1) {
        angle += 0.2;
        fill(0, 0, 0);
        pushMatrix();
        resetMatrix();
        text(angle, 10, 30);
        
        popMatrix();
    }
};
   */
   //choose character
   var characterChoose = floor(random(0,4));
   if (characterChoose == 0) {
      currentPlayer = new Player(110,100,"A Caucasian");
      percent = 0.78;
      console.log("white");
   }
   if (characterChoose == 1) {
      currentPlayer = new Player(110,100,"An African-American");
      percent = 0.64;
      console.log("black");
   }
   if (characterChoose == 2) {
      currentPlayer = new Player(110,100,"An Asian");
      percent = 0.90;
      console.log("asian");
   }
   if (characterChoose == 3) {
      currentPlayer = new Player(110,100,"A Hispanic/Latina");
      percent = 0.54;
      console.log("latina");
   }
};

var instructionScreen = function(){
   background(6, 66, 63);
   //var characterChoose = floor(random(0,4));
   var characterChoose = 0;
   if (characterChoose == 0) {
      currentPlayer = new Player(110,100,"A Caucasian");
      percent = 0.78;
      console.log("white");
   }
   if (characterChoose == 1) {
      currentPlayer = new Player(110,100,"An African-American");
      percent = 0.64;
      console.log("black");
   }
   if (characterChoose == 2) {
      currentPlayer = new Player(110,100,"An Asian");
      percent = 0.90;
      console.log("asian");
   }
   if (characterChoose == 3) {
      currentPlayer = new Player(110,100,"A Hispanic/Latina");
      percent = 0.54;
      console.log("latina");
   }
   for(var i = 0; i < buildings.length; i++){
        if(buildings[i].xPos < -99 && moving == true){
            buildings.push(new Building(random(350,500),width));
            buildings.splice(i,1);
        }
        buildings[i].drawBuild();
    }
    for(var k = 0; k < cloudArray.length; k++){
      cloudArray[k].draw();
      cloudArray[k].move();
    }
    noStroke();
   // console.log("hihi");
    fill(255, 250, 148);
    textFont("helvetica",100);
    text("HOW TO PLAY",280,125);

    
       if (count <60) {
        fill(255, 250, 148);
        textFont("courier", 30);
        text("GOAL: ", 160,165);
        fill(255,255,255);
        text("In 60 seconds, collect as many coins as you can to go beyond ",255,165);
        text("             the poverty line ($10,000). Each coin is worth $200!",155,190);
    }
    if (count <59) {
        textFont("courier", 30);
        fill(255, 250, 148);
        text("HOW: ",190,230);
        fill(255,255,255);
        text(" Press the space to jump and the right arrow key to run.", 270,230);
    }
    if (count<58) {
        fill(255, 250, 148);
        textFont("courier", 30);
        text("CAUTION:",130,270);
        fill(255,255,255);
        text(" Everyone experiences obstacles in life, and yours are spikes!",270,270);
        text("                   Do NOT step on the spikes or you will lose coins!",120,300);
    }
    if (count<57) {
        fill(255, 250, 148);
        textFont("helvetica",30);
        text("Press space to play!", 480,350);
    }
};

var statScreen = function(){
   povertyLine = 300;
   xPos = 60;
   yPos = 100;
   length = 250;
   coins = [];
   
    background(123, 224, 163);
    noStroke();
    if (count < 57) {
      //avatar
      fill(77, 77, 77,90);
      rect(5,yPos+3,45,45,11);
      fill(64, 64, 64);
      ellipse(27,yPos+20,20,27);
      arc(27,yPos+47,35,28,180,360);
      
      fill(128, 122, 0,80);
      rect(xPos,yPos,250,50,16);
      if(stats){
          animate();
      }
      fill(255, 234, 0);
      rect(xPos,yPos,length*(score/whole),50,16);
      fill(255, 255, 255,140);
      rect(xPos+5,yPos+5,length*(score/whole)-10,13,16);
      fill(115, 75, 0);
      textSize(20);
      text(score *200 + " dollars",xPos+25,yPos+35);
      text(round((score/whole)*100) + " %",xPos + 273, yPos+30);
    }
    if (count < 59) {
      textSize(16);
      text("Because your character is "+currentPlayer.race+" woman, you earn " + round((1 - percent)*100) + " percent less money even when you play the same game.",4,80);
    }
    if (count < 55) {
      text("Here is the averages of other ethnicities compared to a Caucasian man:",4,200);
      //white guy
      fill(128, 122, 0,80);
      rect(xPos,yPos+110,250,50,16);
      fill(255, 234, 0);
      rect(xPos,yPos+110,length,50,16);
      fill(115, 75, 0)
      text("Caucasian Man",xPos+25,yPos+145);
      text("100%",xPos + 273, yPos+140);
      
      //asian girl
      fill(128, 122, 0,80);
      rect(xPos,yPos+180,250,50,16);
      fill(255, 234, 0);
      rect(xPos,yPos+180,length*0.9,50,16);
      fill(115, 75, 0)
      text("Asian Woman",xPos+25,yPos+215);
      text("90%",xPos + 273, yPos+210);
      
      //white girl
      fill(128, 122, 0,80);
      rect(xPos,yPos+250,250,50,16);
      fill(255, 234, 0);
      rect(xPos,yPos+250,length*0.78,50,16);
      fill(115, 75, 0)
      text("Caucasian Woman",xPos+25,yPos+285);
      text("78%",xPos + 273, yPos+280);
      
      //black girl
      fill(128, 122, 0,80);
      rect(xPos,yPos+320,250,50,16);
      fill(255, 234, 0);
      rect(xPos,yPos+320,length*0.64,50,16);
      fill(115, 75, 0)
      text("African-American Woman",xPos+25,yPos+355);
      text("64%",xPos + 273, yPos+350);
      
      //latina girll
      fill(128, 122, 0,80);
      rect(xPos,yPos+390,250,50,16);
      fill(255, 234, 0);
      rect(xPos,yPos+390,length*0.54,50,16);
      fill(115, 75, 0)
      text("Hispanic/Latina Woman",xPos+25,yPos+425);
      text("54%",xPos + 273, yPos+420);
      
    }
    fill(115, 75, 0);
    textSize(20);
    text(currentPlayer.race+" women earns an average of " +percent*100+  " percent of what an average Caucasian man earns.",4,30);
    console.log(count);
};

var play = function(){
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
    text("$" +score * 200,coinX-40,244);
   
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
        if(buildings[i].xPos < -99 && moving == true){
            var lastBuilding = buildings[buildings.length-1];
            buildings.push(new Building(random(350,500),lastBuilding.xPos+100));
            buildings.splice(i,1);
            var newCoin = round(random(0,10));
            if (newCoin == 2 || newCoin == 4 || newCoin == 6 || newCoin == 8 || newCoin == 10) {
               coins.push(new Coin(width+50,buildings[buildings.length-1].tall-30,30));
            }
            if (newCoin == 9) {
               spikes.push(new Spikes(buildings[buildings.length-1].tall,width+25));
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
      if (currentPlayer.x > spikes[y].triangleMove && currentPlayer.x < spikes[y].triangleMove + 70 && currentPlayer.y > spikes[y].triangleYThree -70) {
         if (score > 0) {
               score -= 1;
         }
      barCoins.push(new CoinFall(currentPlayer.x,currentPlayer.y,25,5,-2));
      spikes.splice(y,1);
      }
    }
    for (var i = 0; i < barCoins.length; i++) {
      barCoins[i].draw();
      barCoins[i].fall();
      console.log(barCoins[i]);
      if (barCoins[i].coinY > 1000) {
         barCoins.splice(i,1);
      }
    }
    currentPlayer.draw();
    currentPlayer.move();
    
    for (var t = 0; t < buildings.length; t++) {
      if (currentPlayer.x > buildings[t].xPos && currentPlayer.x < buildings[t].xPos + 100) {
         if (currentPlayer.y > buildings[t+1].tall-42 && currentPlayer.x > buildings[t+1].xPos - 25) {
            stop = true;
            speed = 0;
         }
         if (currentPlayer.y < buildings[t+1].tall-30 && currentPlayer.x > buildings[t+1].xPos - 25) {
            stop = false;
         }
         if (currentPlayer.y > buildings[t].tall - 55) {
            currentPlayer.y = buildings[t].tall - 56;
            grounded = true;
         }
      }
    }
    if (moving == true && stop == false) {
      speed = 11;
    }
    //timer
    fill(0, 0, 0);
    ellipse(timerX,timerY,timerSize,timerSize);
    noStroke();
    fill(timerColor);
    arc(timerX,timerY,timerSize,timerSize,-0.5*PI + ((60 - count)/60)*2*PI,1.5*PI);
    fill(255, 255, 255);
    textSize(35);
    text(count,timerX-20,timerY+10);
    if(count > 30){
        timerColor = color(0, 255, 0);
    }
    else if(count > 15){
        timerColor = color(255, 221, 0);
    }
    else {
        timerColor = color(255, 0, 0);
    }
    if (count == 0) {
      playGame = false;
      finalScore = score * percent;
      whole = score;
      count = 60;
      stats = true;
    }
    if (currentPlayer.y > 458) {
            gravity = 0;
         }
};
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
   if (menu == true) {
      menuScreen();
   }
   if (wheel == true) {
      console.log("RandomWheelfunction");
      randomWheel();
   }
   if (instructions == true) {
      instructionScreen();
   }
   if (playGame == true) {
      play();
   }
   if (stats == true) {
      statScreen();
   }
   if (programs == true) {
    programsScreen();
   }
   if (why == true) {
    whyScreen();
   }
};
$("body").keydown(function(c){
   c.preventDefault();
   //keyIsPressed = true;
   if (c.keyCode == 39) {
      moving = true;
   }
   if (c.keyCode == 32) {
      /*
      if (wheel == true) {
         wheel = false;
         count = 60;
         instructions = true;
      }
      */
      if (instructions == true) {
         instructions = false;
         playGame = true;
         gravity = 12;
         count = 60;
      }
      if (menu == true) {
         menu = false;
         instructions = true;
         console.log("spacebar clicked");
      }
      if (playGame == true) {
         if (jumping == false) {
            jumping = true;
            if (grounded == true) {
               gravity = -14;
            }
            grounded = false;
         }
      }
   }
   if (c.keyCode == 40) {
      gravity = 12;
   }
   /*
   if (keyCode === 83) {
        holdSpace = true;
    }
    */
});
$("body").keyup(function(c){
   if (c.keyCode == 39) {
      moving = false;
      speed = 0;
   }
   /*
   if (keyCode === 83) {
        holdSpace = false;
    }
    if (keyCode === 83 && wheelSpeed === 0) {
        wheelSpeed = 6 + (holdTime / 255) * 60 + random(-3, 5);
        holdTime = 0;
        playedYet = true;
    }
    */
});