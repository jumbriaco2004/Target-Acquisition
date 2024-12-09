var ShootSystem = function () // Constructor
{
    this.bombX = 0;             //x coordinate of the bomb
    this.bombY = 0;             //y coordinate of the bombgi
    this.bombImage = null;      //Image for the bomb
    this.bombIsActive = false;  //is the bomb active

    this.shotTimer = new Stopwatch();  
    this.bounceCooldown = new Stopwatch();
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
            if (this.bombX < canvas.width && this.bombY < canvas.height 
                && this.bombX > 0 && this.bombY > 0) // Until collides with border
            {
                t = targetAcquisition.shootSystem.shotTimer.getElapsedTime(); // time
                //console.log(t);
            
                console.log("Angle: " + playerAngle * (180/Math.PI));
                shotPrevX = this.bombX;
                shotPrevY = this.bombY;
                
                this.bombX += Math.sin(playerAngle) * (t/60);
                this.bombY += Math.cos(playerAngle) * (t/60);

                nextX = this.bombX + Math.sin(playerAngle) * (t*500);
                nextY = this.bombY + Math.cos(playerAngle) * (t*500);
                levelNum = targetAcquisition.getLevelNumber();

                //console.log("x: " + this.bombX);
                //console.log("y: " + this.bombY);
                //this.drawRay(this.bombX, this.bombY, nextX, nextY, 5, "yellow");

                for (i=1; i < walls[levelNum].length; ++i)
                {
                    if (this.bounceCooldown.getElapsedTime() > 250)
                    {
                        this.bounceCooldown.stop();
                        this.bounceCooldown.reset();
                    }

                    if (this.didCollide
                    (
                        shotPrevX, shotPrevY, this.bombX, this.bombY,
                        walls[levelNum][i - 1].x, walls[levelNum][i - 1].y,
                        walls[levelNum][i].x, walls[levelNum][i].y
                    ) == true)
                    {
                        if (walls[levelNum][i].end === true) //check if level changing wall was hit
                        {
                            this.bombIsActive = false;
                            levelNum++;
                            targetAcquisition.setLevelNumber(levelNum);
                            console.log("level switch hit " + levelNum);
                        }
                        else if ((walls[levelNum][i].bounce) && (this.bounceCooldown.getElapsedTime() > 60
                            || this.bounceCooldown.getElapsedTime() == 0 
                            || this.bounceCooldown.getElapsedTime() === undefined)) // Hit pink surface
                        {
                            //console.log(this.bounceCooldown.getElapsedTime());
                            console.log("hit bouncy/pink wall");
                            this.bounceCooldown.start();
                            playerAngle = (walls[levelNum][i].bounce * (Math.PI/180)) - (playerAngle / 6.5); //angle bounce fine tuning
                        }
                        else if ((walls[levelNum][i].bounce) && (this.bounceCooldown.getElapsedTime() < 60))
                        {
                            console.log("bounce on cooldown: " + this.bounceCooldown.getElapsedTime())
                        }
                        else
                        {
                            //console.log(this.bounceCooldown.getElapsedTime());
                            console.log("hit wall");
                            this.bombIsActive = false;
                            targetAcquisition.shootSystem.shotTimer.stop();
                            targetAcquisition.shootSystem.shotTimer.reset();
                        }
                    }
                }
                targetAcquisition.shootSystem.checkButtonCollision(this.bombX, this.bombY, targetAcquisition.getLevelNumber());
            }

            else
            {
                this.bombIsActive = false;
                console.log("hit border");
                targetAcquisition.shootSystem.shotTimer.stop();
                targetAcquisition.shootSystem.shotTimer.reset();
            }
        }
        if (this.bombIsActive == false)
        {
             playerAngle = ((7 * Math.PI) / 4) - targetAcquisition.aimSystem.getRotationAngle(); // angle
            //this.bombIsActive = true;
        };
    },

    drawRay: function(x1, y1, x2, y2, rayWidth, rayColor)
    {
        context.save();
        context.beginPath();
        context.lineWidth = rayWidth;
        context.strokeStyle = rayColor;
        
        context.moveTo(x1, y1);
        context.lineTo(x2, y2); // Draws ray
        context.stroke();
        context.restore();
    },

    didCollide: function(shotPrevX, shotPrevY, shotX, shotY, 
                         wallPrevX, wallPrevY, wallX, wallY)
    {
        finVal = 35; // finess value, helps with detection
        if
        (
            ((wallPrevX - finVal <= shotX && shotX <= wallX + finVal) 
            ||
            (wallX - finVal <= shotX && shotX <= wallPrevX + finVal))
            &&
            (( wallPrevY - finVal <= shotY && shotY <= wallY + finVal) 
            ||
            (wallY - finVal <= shotY && shotY <= wallPrevY + finVal))
        )
        {
        //console.log("hit possible");

        let intersectPt = [0, 0];
        //console.log(shotPrevX + ", " + shotX);
        if (shotPrevX == shotX || shotPrevY == shotY)  
            { return; }

        shotSlope = this.findSlope(shotPrevX, shotPrevY, shotX, shotY);
        wallSlope = this.findSlope(wallPrevX, wallPrevY, wallX, wallY);
        //console.log(shotSlope * (180/Math.PI));

        shotYInt = this.findYInt(shotX, shotY, shotSlope);
        wallYInt = this.findYInt(wallX, wallY, wallSlope);

        intersectPt[0] = (wallYInt - shotYInt) / (shotSlope - wallSlope);
        intersectPt[1] = (shotSlope * intersectPt[0]) + shotYInt;

        //console.log(shotX + ", " + shotY + ", " + shotSlope + ", " + shotYInt + ", " + intersectPt[0] + ", " + intersectPt[1]);
        //console.log(intersectPt[0] + ", " + intersectPt[1]);

        //this.drawRay(shotPrevX, shotPrevY, intersectPt[0], intersectPt[1], 5, "red"); // Bomb laser
        //this.drawRay(wallPrevX, wallPrevY, wallX, wallY, 10, "green");                  // Wall lines

        //console.log(intersectPt[0] > wallPrevX && intersectPt[0] < wallX);
        return (((intersectPt[0] >= wallPrevX - finVal && intersectPt[0] <= wallX + finVal) 
                ||
                (intersectPt[0] <= wallPrevX + finVal && intersectPt[0] >= wallX - finVal))
                &&
                ((intersectPt[1] >= wallPrevY - finVal && intersectPt[1] <= wallY + finVal) 
                ||
                (intersectPt[1] <= wallPrevY + finVal && intersectPt[1] >= wallY - finVal))
            );
        }

        else {return;}
    },

    getBombIsActive: function()
    {
        return this.bombIsActive;
    },

    checkButtonCollision: function (projectileX, projectileY, levelNum) {
        const button = spriteData.button;
        
        // Check if the bomb hits button1
        if (
            (projectileX >= button.x &&
            projectileX <= button.x + button.width &&
            projectileY >= button.y &&
            projectileY <= button.y + button.height) 
            && (levelNum === 0)
        ) {
            console.log("Button1 Hit");
            this.bombIsActive = false;
    
            if (spriteData.door) {
                console.log("Door Removed");
                spriteData.deleteDoor();
            }
        }
    
        // Check if the bomb hits the door (door1)
        const door = spriteData.door;
        if (door && 
            projectileX >= door.x &&
            projectileX <= door.x + door.width &&
            projectileY >= door.y &&
            projectileY <= door.y + door.height
        ) {
            console.log("Hit door");
            this.bombIsActive = false;
            this.bombX = 100;
            this.bombY = 900;
            this.shotTimer.stop(); // Stop the timer
            this.shotTimer.reset(); // Reset the timer
        }

        
    
        // Check if the bomb hits button2
    const button2 = spriteData.button2;
    if (button2) {
        
        if (
            (projectileX >= button2.x &&
            projectileX <= button2.x + button2.width &&
            projectileY >= button2.y &&
            projectileY <= button2.y + button2.height)
            && (levelNum === 1)
        ) {
            console.log("Button2 Hit");
            this.bombIsActive = false;

            // Check if door2 exists and remove it
            const door2 = spriteData.door2;
            if (door2) {
                console.log("Door2 Removed");
                spriteData.deleteDoor2();
            }
        }
    }
    
        // Check if the bomb hits the door (door2)
        const door2 = spriteData.door2;
        if (door2 && 
            projectileX >= door2.x &&
            projectileX <= door2.x + door2.width &&
            projectileY >= door2.y &&
            projectileY <= door2.y + door2.height
        ) {
            console.log("Hit door2");
            this.bombIsActive = false;
            this.bombX = 100;
            this.bombY = 900;
            this.shotTimer.stop(); // Stop the timer
            this.shotTimer.reset(); // Reset the timer
        }
    },
    
    findSlope: function(x1, y1, x2, y2)
    {
        let slope = (y2 - y1) / (x2 - x1);
        return slope;
    },

    findYInt: function(x, y, m)
    {
        let b = y - (m*x);
        return b;
    },
}