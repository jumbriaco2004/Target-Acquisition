/*basic file for basic game loop, and initialization of variables used across 
all files. This file should be like the initializeImages and startGame()
functions in snailBait, super concise, not too much code.
*/
var TargetAcquisition = function() //Constructor
{
   this.canvas = document.getElementById('game-canvas'),
   this.context = this.canvas.getContext('2d'),

   this.spritesheet = new Image(),
   this.background = new Image(), //background image of the canvas, not the webpage. The webpage background is done in the CSS file
   this.playerImage = new Image();
}



TargetAcquisition.prototype =
{
   debug: function(stringText) 
   /* Updates the debug element with a value given, best for supervising quickly updated values into the game 
      will only show the last called debug functions value */
   { document.getElementById('debug').innerHTML = stringText; },
   
   

   initializeImages: function ()
   /* Sets the background and the images to certain urls in order to initialize the value of every image used
      If any images are added, they should probably be initialized here */
   {
      this.spritesheet.src = "images/SpriteSheet.png";
      this.background.src = "images/background_sprite.png";
      this.playerImage.src = "images/player_sprite.png";

      this.background.onload = function (e) //after everything is defined
      {
         targetAcquisition.debug("Background loaded");
         targetAcquisition.drawGame();
      }
   },

   drawGame: function ()
   /* Draws the game every frame, my need updated to have a drawSprites or Draw(whatever) sub-functions later */
   {
      this.debug("drawGame Called");
      this.context.drawImage(this.background, 0, 0); //background drawn
      //draw level here
      this.context.drawImage(this.playerImage, 20, 520);
      //draw other stuff here
   },
}  

var targetAcquisition = new TargetAcquisition();

targetAcquisition.initializeImages();
