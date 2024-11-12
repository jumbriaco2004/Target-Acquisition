/*basic file for basic game loop, and initialization of variables used across 
all files. This file should be like the initializeImages and startGame()
functions in snailBait, super concise, not too much code.
*/

var canvas = document.getElementById('game-canvas'),
context = canvas.getContext('2d'),

background = new Image(), //background image of canvas, not the webpage. The webpage background is done in the CSS file
playerImage = new Image();

mouseX = canvas.width / 2,
mouseY = canvas.height / 2;

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

   //Track mouse position
   canvas.addEventListener('mousemove', function(event) {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      drawGame(); // Redraw game each time the mouse moves
   });

   function drawGame() {
      // Draw background
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
   
      // Scale player image down
      const playerImageScale = 0.2;
      const playerWidth = playerImage.width * playerImageScale;
      const playerHeight = playerImage.height * playerImageScale;
   
      // Position player in the bottom-left corner
      const playerX = 0;
      const playerY = canvas.height - playerHeight;
   
      // Calculate rotation angle
      const angle = calculateAngleToMouse(playerX + playerWidth / 2, playerY + playerHeight / 2);
   
      // Rotate and draw player image
      context.save();
      context.translate(playerX + playerWidth / 2, playerY + playerHeight / 2)
      context.rotate(angle);
      context.drawImage(playerImage, -playerWidth / 2, -playerHeight / 2, playerWidth, playerHeight);
      context.restore();
   }

   //Function to calculate angle between player and mouse
   function calculateAngleToMouse(playerX, playerY) {
      return Math.atan2(mouseY - playerY, mouseX - playerX) - Math.PI / 2; // Adjust for top-facing image
   }
}

