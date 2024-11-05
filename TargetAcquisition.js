/*basic file for basic game loop, and initialization of variables used across 
all files. This file should be like the initializeImages and startGame()
functions in snailBait, super concise, not too much code.
*/

var canvas = document.getElementById('game-canvas'),
context = canvas.getContext('2d'),

background = new Image(), //background image of canvas, not the webpage. The webpage background is done in the CSS file
playerImage = new Image();

initializeImages();

function debug(stringText) //updates the debug element with a value given
{
   document.getElementById('debug').innerHTML = stringText;
}

function initializeImages() //pretty much ripped from snailbait
{
   background.src = "images/background_sprite.png";
   playerImage.src = "images/player_sprite.png";

   background.onload = function (e) 
   { 
      drawGame();
      //debug("yes");
   };

   function drawGame()
   {
      context.drawImage(background, 0, 0); //background drawn
      //draw level here
      context.drawImage(playerImage, 20, 520);
      //draw other stuff here
   }
}

