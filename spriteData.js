/*This file is meant to contain all of the data about every sprite other than the player */
SpriteData = function()
{
    this.wallThick = 15;
    this.walls_1 = //level 1's walls
    [
        {x: 0, y: 200, width: 500, height: this.wallThick}, // horizontal wall
        {x: 500, y: 200, width: this.wallThick, height: 300}, // vertical wall
        {x: 500, y: 500, width: 515, height: this.wallThick}, // horizontal wall
        {x: 1000, y: 500, width: this.wallThick, height: -400}, // vertical wall
        {x: 1000, y: 100, width: 415, height: this.wallThick}, // horizontal wall
        {x: 1400, y: 100, width: this.wallThick, height: 400}, // vertical wall
        {x: 1400, y: 500, width: 600, height: this.wallThick}, // horizontal wall
    ];
    
    this.spritesheet = new Image();
}

SpriteData.prototype =
{
    drawDebugGrid: function(color) //helps with building levels
    {
        context.fillStyle = color;
        for (var i=0; i < canvas.width; i = i + 100) 
        {
            context.fillRect(i, 0, 1, canvas.height);
            context.fillRect(0, i, canvas.width, 1);
        }
    },

    drawWalls: function()
    //Draws a wall, and defines the wall as a sprite
    {
        context.save();
        context.fillStyle = "black";
        //context.beginPath;
        for (var i=0; i < this.walls_1.length; ++i) 
        {
            context.fillRect(this.walls_1[i].x, this.walls_1[i].y, this.walls_1[i].width, this.walls_1[i].height)
        }
        this.drawDebugGrid("red");
        
        
        //context.fillRect(100,100,50,20);
        context.restore();
    },

    initializeImages: function()
    {
        //Get spritesheet
        this.spritesheet.src = "../images/SpriteSheet.png";
    }
}