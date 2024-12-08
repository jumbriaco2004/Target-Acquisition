/*Basic file for basic game loop, and initialization of variables used across 
  all files. This file should be like the initializeImages and startGame()
  functions in snailBait, super concise, not too much code.
  */


var TargetAcquisition = function () //Constructor
{
   // Images
   
   
   this.background = new Image(), // Background image of canvas, not the webpage. 
   this.playerImage = new Image(),// The webpage background is done in the CSS file
   this.bombImage = new Image(), // Image of bomb spawned by the player
   
   // Time
   this.lastAnimationFrameTime = 0,
   this.lastFpsUpdateTime = 0,
   this.fps = 60,

   this.aimSystem = new AimSystem();
   this.shootSystem = new ShootSystem();

   this.levelNum = 0;
}

TargetAcquisition.prototype =
{
  

   initializeImages: function ()
   /* Sets the background and the images to certain urls in order to initialize the value of every image used
      If any images are added, they should probably be initialized here */
   {
      spritesheet.src = "images/SpriteSheet.png";
      this.background.src = "images/background_sprite.png";
      this.playerImage.src = "images/player_sprite.png";
      this.bombImage.src = "images/bomb_sprite.png";

      this.background.onload = function (e) 
      {  
         targetAcquisition.drawGame();
         targetAcquisition.startGame();
      };
   },

   startGame: function ()
   {  
      requestNextAnimationFrame(this.animate.bind(this)); 
   },

   drawGame: function (now) 
   /* Draws the game every frame, my need updated to have a drawSprites or Draw(whatever) sub-functions later */
   {
      // Draw background
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  
      const playerX = playerData.playerX;
      const playerY = playerData.playerY;

      const rotationAngle = this.aimSystem.getRotationAngle();
      this.drawRotatedPlayer(playerX, playerY, rotationAngle);

      spriteData.drawWalls(this.levelNum); //number references which level to draw

      if (this.levelNum === 0) {
         spriteData.drawButton();
         spriteData.drawDoor();
      } else if (this.levelNum === 1) {
         spriteData.deleteDoor();
         spriteData.drawButton2();
         spriteData.drawDoor2();
      }
      this.shootSystem.drawBomb(now);
      this.shootSystem.moveBomb(now);
      
   },

   drawRotatedPlayer: function (x, y, angle) {
      const playerWidth = this.playerImage.width * 0.2;
      const playerHeight = this.playerImage.height * 0.2;
     
      context.save();
      context.translate(x + playerWidth / 2, y + playerHeight / 2);
      context.rotate(angle);
      context.drawImage(this.playerImage, -playerWidth / 2, -playerHeight / 2, playerWidth, playerHeight);
      context.restore();
      
      //console.log('Rotation angle: ', angle);
   },

   calculateFps: function (now) 
   {
      var fps = 1 / (now - this.lastAnimationFrameTime) * 1000;
      lastAnimationFrameTime = now;
      return fps;
   },
   
   animate: function (now) 
   {
      fps = targetAcquisition.calculateFps(now); // Calculate FPS
      targetAcquisition.drawGame(now);           // Redraw the game

      this.aimSystem.updateRotation();           //Update Rotation System

      // Reference playerX and playerY from playerData
      const playerX = playerData.playerX;
      const playerY = playerData.playerY;
      const rotationAngle = this.aimSystem.getRotationAngle(); 
      this.drawRotatedPlayer(playerX, playerY, rotationAngle);

      requestNextAnimationFrame(this.animate.bind(this));
   },   

   getLevelNumber: function()
   {
      return this.levelNum;
   },

   setLevelNumber: function(newNum)
   {
      this.levelNum = newNum;
   },
   
}

var targetAcquisition = new TargetAcquisition();
var spriteData = new SpriteData();
var playerData = new PlayerData();

targetAcquisition.initializeImages();

document.addEventListener('keydown', function (event) {
   if (event.key === 'q') {
       //console.log('Q pressed');
       targetAcquisition.aimSystem.startRotation('counterclockwise');
   }
   if (event.key === 'e') {
       //console.log('E pressed');
       targetAcquisition.aimSystem.startRotation('clockwise');
   }
   if (event.key === '1') //changes levels for debugging, REMOVE LATER
   {
      console.log('1 pressed');
      targetAcquisition.setLevelNumber(0);
   }
  if (event.key === '2') 
   {
      console.log('2 pressed');
      targetAcquisition.setLevelNumber(1);
   }
});

document.addEventListener('keyup', function (event) {
   if (event.key === 'q' || event.key === 'e') {
       targetAcquisition.aimSystem.stopRotation();
   }
});

//Press spacebar to spawn a bomb
document.addEventListener('keydown', function (event) {
   if (event.key === ' ' && !targetAcquisition.shootSystem.getBombIsActive()) {
       const playerX = playerData.playerX;
       const playerY = playerData.playerY;
       const playerWidth = targetAcquisition.playerImage.width * 0.2;
       const playerHeight = targetAcquisition.playerImage.height * 0.2;
       const rotationAngle = targetAcquisition.aimSystem.getRotationAngle();

       targetAcquisition.shootSystem.spawnBomb(playerX, playerY, playerWidth, playerHeight, rotationAngle, targetAcquisition.bombImage);
   }
});