/*This file is meant to hold all of the metadata for all of the sprites in the game
  This includes the location of each sprite and the properties of each sprite,
  along with any other data that is useful to each sprite 
*/
PlayerData = function()
{
  this.context = targetAcquisition.context,
  this.playerImageScale = 0.2, // Scales player image down.
  
  this.playerWidth = 3508 * this.playerImageScale,   // Size hard coded since it can't figure out the size until the image is loaded first, 
  this.playerHeight = 2480 * this.playerImageScale,  // which doesn't really work with the new format of the code -GC

  this.PLAYER_CELL_WIDTH = 697,  //  <-]
  this.PLAYER_CELL_HEIGHT = 684, //    ]--For the spritesheet later on
  this.PLAYER_CELL_X = 84,       //    ]
  this.PLAYER_CELL_Y = 741,      //  <-]

  this.playerX = 0,
  this.playerY = targetAcquisition.canvas.height - this.playerHeight;
};

PlayerData.prototype =
{
  calculateAngleToMouse: function (playerX, playerY) //Function to calculate angle between player and mouse
  {
    return Math.atan2(targetAcquisition.mouseY - playerY, targetAcquisition.mouseX - playerX) - Math.PI / 2; // Adjust for top-facing image
  },

  drawPlayer: function()
  {
    //console.log("drawing player at: " + this.playerX + ", " + this.playerY);
    
    // Calculate rotation angle
    const angle = this.calculateAngleToMouse(this.playerX + this.playerWidth / 2, this.playerY + this.playerHeight / 2);
   
    // Rotate and draw player image
    this.context.save();
    this.context.translate(this.playerX + this.playerWidth / 2, this.playerY + this.playerHeight / 2)
    this.context.rotate(angle);
    this.context.drawImage(targetAcquisition.playerImage, -this.playerWidth / 2, -this.playerHeight / 2, this.playerWidth, this.playerHeight); 
    /*this.context.drawImage(targetAcquisition.spritesheet, this.PLAYER_CELL_X, this.PLAYER_CELL_Y,
      this.PLAYER_CELL_WIDTH, this.PLAYER_CELL_HEIGHT = 684,
      this.playerX, this.playerY); */
    this.context.restore();
  },
}