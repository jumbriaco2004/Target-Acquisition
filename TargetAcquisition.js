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
   
   this.background = new Image(), //background image of this.canvas, not the webpage. 
   this.playerImage = new Image(),//  The webpage background is done in the CSS file
   

   // Player Properties
   this.playerImageScale = 0.2, // Scales player image down. || Changed the value a bit since I lowered the size of the playerimage itself -GC
   this.playerWidth = 3508 * this.playerImageScale,   // Size hard coded since it can't figure out the size until the image is loaded first, 
   this.playerHeight = 2480 * this.playerImageScale,  // which doesn't really work with the format of the code -GC
   this.mouseX = this.canvas.width / 2,
   this.mouseY = this.canvas.height / 2,
   this.playerX = 0,     // Position player in the bottom-left corner
   this.playerY = this.canvas.height - this.playerHeight;
}

TargetAcquisition.prototype =
{
   debug: function(stringText)
   /* Updates the debug element with a value given, best for supervising quickly updated values 
      into the game, will only show the last called debug functions value */ 
   { document.getElementById('debug').innerHTML = stringText; },

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
      };
   },
   
   calculateAngleToMouse: function (playerX, playerY) //Function to calculate angle between player and mouse
   {
      return Math.atan2(this.mouseY - playerY, this.mouseX - playerX) - Math.PI / 2; // Adjust for top-facing image
   },

   drawGame: function () 
   /* Draws the game every frame, my need updated to have a drawSprites or Draw(whatever) sub-functions later */
   {
      // Draw background
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear this.canvas
      this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
   
      // Calculate rotation angle
      const angle = this.calculateAngleToMouse(this.playerX + this.playerWidth / 2, this.playerY + this.playerHeight / 2);
   
      // Rotate and draw player image
      this.context.save();
      this.context.translate(this.playerX + this.playerWidth / 2, this.playerY + this.playerHeight / 2)
      this.context.rotate(angle);
      this.context.drawImage(this.playerImage, -this.playerWidth / 2, -this.playerHeight / 2, this.playerWidth, this.playerHeight); 
      this.context.restore();
   },
}

var targetAcquisition = new TargetAcquisition();

targetAcquisition.initializeImages();

targetAcquisition.canvas.addEventListener('mousemove', function(event) 
/* Track mouse position || All of the aiming should probably be moved to AimShoot.js at some point, 
   with the eventlistener being the only thing left for aiming and shooting in this file -GC */
{
   console.log("Mouse Moved to: " + targetAcquisition.mouseX + ", " + targetAcquisition.mouseY); //prints mouse x and y
   rect = targetAcquisition.canvas.getBoundingClientRect(),
   targetAcquisition.mouseX = event.clientX - rect.left;
   targetAcquisition.mouseY = event.clientY - rect.top;
   targetAcquisition.drawGame(); // Redraw game each time the mouse moves 
                                 // (^^^Should probably change this sometime down the line for performance -GC)
});
