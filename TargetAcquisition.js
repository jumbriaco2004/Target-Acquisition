/*Basic file for basic game loop, and initialization of variables used across 
  all files. This file should be like the initializeImages and startGame()
  functions in snailBait, super concise, not too much code.
  */
var TargetAcquisition = function () //Constructor
{
   // Canvas
   this.canvas = document.getElementById('game-canvas'),
   this.context = this.canvas.getContext('2d'),

   // Images
   this.spritesheet = new Image(),
   
   this.background = new Image(), // Background image of this.canvas, not the webpage. 
   this.playerImage = new Image(),// The webpage background is done in the CSS file
   
   // Time
   this.lastAnimationFrameTime = 0,
   this.lastFpsUpdateTime = 0,
   this.fps = 60,

   this.mouseX = this.canvas.width / 2,
   this.mouseY = this.canvas.height / 2;
}

TargetAcquisition.prototype =
{
   debug: function(stringText)
   /* Updates the debug element with a value given, best for supervising quickly updated values 
      into the game, will only show the last called debug functions value */ 
   {  document.getElementById('debug').innerHTML = stringText; },

   initializeImages: function ()
   /* Sets the background and the images to certain urls in order to initialize the value of every image used
      If any images are added, they should probably be initialized here */
   {
      this.spritesheet.src = "images/SpriteSheet.png";
      this.background.src = "images/background_sprite.png";
      this.playerImage.src = "images/player_sprite.png";

      this.background.onload = function (e) 
      {  
         //targetAcquisition.debug("Background loaded");
         targetAcquisition.drawGame();
         targetAcquisition.startGame();
      };
   },

   startGame: function () 
   {  requestNextAnimationFrame(this.animate); },

   drawGame: function () 
   /* Draws the game every frame, my need updated to have a drawSprites or Draw(whatever) sub-functions later */
   {
      // Draw background
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear this.canvas
      this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

      playerData.drawPlayer(targetAcquisition.playerImage);
   },

   calculateFps: function (now) 
   {
      var fps = 1 / (now - this.lastAnimationFrameTime) * 1000;

      lastAnimationFrameTime = now;
      return fps;
   },
   
   animate: function (now) 
   {
      fps = targetAcquisition.calculateFps(now);
      targetAcquisition.drawGame(now);
      requestNextAnimationFrame(targetAcquisition.animate);
   },   
}

var targetAcquisition = new TargetAcquisition();
var playerData = new PlayerData();

targetAcquisition.initializeImages();

targetAcquisition.canvas.addEventListener('mousemove', function(event) 
{
   //console.log("Mouse Moved to: " + targetAcquisition.mouseX + ", " + targetAcquisition.mouseY); //prints mouse x and y
   rect = targetAcquisition.canvas.getBoundingClientRect(),
   targetAcquisition.mouseX = event.clientX - rect.left;
   targetAcquisition.mouseY = event.clientY - rect.top;
   targetAcquisition.drawGame(); // Redraw game each time the mouse moves 
});

