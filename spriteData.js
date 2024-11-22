/*This file is meant to contain all of the data about every sprite other than the player */
var SpriteData = function()
{
    this.wallThick = 15;
    this.walls_1 = //level 1's walls
    [
        {x: 0,    y: 200},
        {x: 500,  y: 200}, 
        {x: 500,  y: 500},
        {x: 1000, y: 500}, 
        {x: 1000, y: 100},
        {x: 1400, y: 100}, 
        {x: 1400, y: 500},
        {x: 3000, y: 500},
        {x: 3000, y: 800},
        {x: 1400, y: 800},
        {x: 1200, y: 1000},
        {x: 0,    y: 1000},
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

    drawWalls: function(levelNum) //Draws a wall, and defines the wall as a sprite
    {
        context.save();
        context.fillStyle = "black";
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = this.wallThick;
        if (levelNum === 1)
        {
            for (var i=0; i < this.walls_1.length; ++i) 
            {
                context.lineTo(this.walls_1[i].x, this.walls_1[i].y);
                context.stroke();
            }
        }
        this.drawDebugGrid("red");
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