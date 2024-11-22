/*  
    This file is meant to contain all of the data about every sprite other than the player
    The walls, projectile types, and other objects in the game should have their data here
*/
var SpriteData = function()
{
    this.debugGridOption = false;
    this.wallThick = 15; // Wall thickness

    this.walls_1 = // Level 1's walls
    [
        {x: 0,    y: 200},
        {x: 0,    y: 200},  {x: 500,  y: 200}, 
        {x: 500,  y: 500},  {x: 1000, y: 500}, 
        {x: 1000, y: 100},  {x: 1400, y: 100}, 
        {x: 1400, y: 500},  {x: 3000, y: 500},
        {x: 3000, y: 800},  {x: 1400, y: 800},
        {x: 1200, y: 1000}, {x: 0,    y: 1000},
    ];

    this.walls_2 = // Level 2's walls
    [
        {x: 0, y: 0},
    ];

    this.spritesheet = new Image();
}

SpriteData.prototype =
{
    drawDebugGrid: function(color) // Helps with building levels
    {
        context.fillStyle = color;
        for (var i=0; i < canvas.width; i = i + 100) 
        {
            context.fillRect(i, 0, 1, canvas.height);
            context.fillRect(0, i, canvas.width, 1);
        }
    },

    didCollide: function(x1, y1, x2, y2)
    {
        x1 = x1;
        y1 = y1;
        x2 = x2;
        y2 = y2;
        w1 = x2 - x1;
        h1 = y2 - y1;
        context.lineWidth = 1;
        if ((w1 !== 0 && h1 !== 0)) //different code needs written for this part
        {
            
            //context.fillStyle = "yellow"; 
            //context.fillRect(x1, y1, w1, h1);
        }
        else // This part should work though
        {

            //context.fillStyle = "yellow";
            //context.fillRect(x1, y1, w1, h1);
        } 
    },

    drawWalls: function(levelNum) //Draws a wall, and defines the wall as a sprite
    {
        context.save();
        context.beginPath();
        //context.strokeStyle = "black";
        //context.lineWidth = this.wallThick;
        if (levelNum == 1)
        {
            for (var i=1; i < this.walls_1.length; ++i) 
            {
                this.didCollide(
                    this.walls_1[(i - 1)].x, 
                    this.walls_1[(i - 1)].y, 
                    this.walls_1[i].x, 
                    this.walls_1[i].y);
                context.lineWidth = this.wallThick - 10;
                context.lineTo(this.walls_1[i].x, this.walls_1[i].y);
                context.stroke();
            }
            
        }
        else if (levelNum === 2)
        {
            for (var i=0; i < this.walls_2.length; ++i) 
                {
                    context.lineTo(this.walls_1[i].x, this.walls_1[i].y);
                    context.stroke();
                }
        }
        if (this.debugGridOption == true)
            { this.drawDebugGrid("red"); }
        
        context.restore();
    },

    initializeImages: function()
    {
        //Get spritesheet
        this.spritesheet.src = "../images/SpriteSheet.png";
    }
}

var Projectile = function() // Projectile constructor
{

}

Projectile.prototype = 
{
    
}