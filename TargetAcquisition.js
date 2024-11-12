/*basic file for basic game loop, and initialization of variables used across 
all files. This file should be like the initializeImages and startGame()
functions in snailBait, super concise, not too much code.
*/
var TargetAcquisition = function () //Constructor
{
   this.canvas = document.getElementById('game-canvas'),
   this.context = this.canvas.getContext('2d'),

   this.spritesheet = new Image(),
   this.background = new Image(), /*background image of this.canvas, not the webpage. 
                                    The webpage background is done in the CSS file*/
   this.playerImage = new Image();
   


   //Player Properties
   this.playerImageScale = 0.8, // Scales player image down. || Changed the value a bit since I lowered the size of the playerimage itself -GC
   this.playerWidth = this.playerImage.width * this.playerImageScale,
   this.playerHeight = this.playerImage.height * this.playerImageScale,
   this.mouseX = this.canvas.width / 2,
   this.mouseY = this.canvas.height / 2;
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
   {
      this.spritesheet.src = "images/SpriteSheet.png";
      this.background.src = "images/background_sprite.png";
      this.playerImage.src = "images/player_sprite.png";

      this.background.onload = function (e) 
      {  
         targetAcquisition.debug("Background loaded");
         targetAcquisition.drawGame();
      };
   },
   
   calculateAngleToMouse: function (playerX, playerY) //Function to calculate angle between player and mouse
   {
      return Math.atan2(this.mouseY - playerY, this.mouseX - playerX) - Math.PI / 2; // Adjust for top-facing image
   },

   drawGame: function () 
   {
      //Track mouse position
      targetAcquisition.canvas.addEventListener('mousemove', function(event) 
      {
         rect = targetAcquisition.canvas.getBoundingClientRect(),
         targetAcquisition.mouseX = event.clientX - rect.left;
         targetAcquisition.mouseY = event.clientY - rect.top;
         targetAcquisition.drawGame(); // Redraw game each time the mouse moves 
                                       // (^^^should probably change this sometime down the line for performance -GC)
      });
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