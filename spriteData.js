/*This file is meant to contain all of the data about every sprite other than the player */
SpriteData = function()
{
    this.wallThick = 15;
    this.walls_1 = //level 1's walls
    [
        {x: 400, y: 200, width: 100, height: this.wallThick}, // horizontal wall
        {x: 400, y: 200, width: 100, height: this.wallThick}, // horizontal wall

        {x: 500, y: 400, width: this.wallThick, height: -200}, // vertical wall
        {x: 500, y: 400, width: this.wallThick, height: -200}, // vertical wall
    ];
    
}

SpriteData.prototype =
{
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
        //context.fillRect(100,100,50,20);
        context.restore();
    }
}