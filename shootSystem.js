var ShootSystem = function () // Constructor
{
    this.bombX = 0;             //x coordinate of the bomb
    this.bombY = 0;             //y coordinate of the bombgi
    this.bombImage = null;      //Image for the bomb
    this.bombIsActive = false;  //is the bomb active

    this.shotTimer = new Stopwatch();  
    this.walls = [];
};

ShootSystem.prototype = 
{
    spawnBomb: function (playerX, playerY, playerWidth, playerHeight, rotationAngle, bombImage) {
        // Player center position
        const centerX = playerX + playerWidth / 2;
        const centerY = playerY + playerHeight / 2;
    
        // Local offset of the player sprite
        const offsetX = 0;
        const offsetY = -playerHeight / 2;
    
        // Adjust rotation angle
        const adjustedAngle = rotationAngle - Math.PI / 2 - (35 * Math.PI / 180);
    
        // Apply rotation to the local offset
        const rotatedOffsetX = offsetX * Math.cos(adjustedAngle) - offsetY * Math.sin(adjustedAngle);
        const rotatedOffsetY = offsetX * Math.sin(adjustedAngle) + offsetY * Math.cos(adjustedAngle);
    
        // Bomb position based on rotation
        const rotatedX = centerX + rotatedOffsetX;
        const rotatedY = centerY + rotatedOffsetY;
    
        // Set bomb properties
        this.bombX = rotatedX;
        this.bombY = rotatedY;
        this.bombImage = bombImage;
        this.bombIsActive = true;

        this.shotTimer.start();

        // Debug logs
        //console.log(`Player center: (${centerX}, ${centerY})`);
        //console.log(`Offset Before Rotation: (${offsetX}, ${offsetY})`);
        //console.log(`Adjusted Angle: ${adjustedAngle}`);
        //console.log(`Rotated Offset: (${rotatedOffsetX}, ${rotatedOffsetY})`);
        //console.log(`Bomb Pos After Rotation: (${this.bombX}, ${this.bombY})`);
    },

    drawBomb: function (now) {
        if (this.bombIsActive && this.bombImage) {
            const bombWidth = this.bombImage.width * 0.1;
            const bombHeight = this.bombImage.height * 0.1;

            context.drawImage(this.bombImage, this.bombX - bombWidth / 2, this.bombY - bombHeight / 2, bombWidth, bombHeight);
        }
    },

    moveBomb: function (now)
    {
        if (this.bombIsActive && this.bombImage) 
        {
            //this.shotTimer.stop(now);
        
            //console.log(this.bombX);
            if (this.bombX < canvas.width && this.bombY < canvas.height) // Until collides with border
            {
                t = targetAcquisition.shootSystem.shotTimer.getElapsedTime(); // time
                //console.log(t);
                playerAngle = ((7 * Math.PI) / 4) - targetAcquisition.aimSystem.getRotationAngle(); // angle
                //console.log("Angle: " + playerAngle);

                
                this.bombX += Math.sin(playerAngle) * (t/60);
                this.bombY += Math.cos(playerAngle) * (t/60);
                //console.log("x: " + this.bombX);
                //console.log("y: " + this.bombY);

                context.save();
                context.beginPath();
                context.strokeStyle = "yellow";
                context.moveTo(this.bombX, this.bombY);
                context.lineTo(Math.sin(playerAngle) * (t*500), Math.cos(playerAngle) * (t*500)); //casts ray
                context.stroke();
                context.restore();
            }

            else
            {
                targetAcquisition.shootSystem.shotTimer.stop();
            }
        }
    },

    canCollide: function(levelNum)
    {
        this.walls = spriteData.getWalls();
        for (var i=0; i < this.walls.length; ++i) 
        {
            if ((this.walls[levelNum][i].x - this.bombX < 100) && (this.walls[levelNum][i].y - this.bombY < 100))
            {
                console.log(this.walls[i].x - this.bombX);
                return true;
            }
        else { return false; }
        }
    }
}