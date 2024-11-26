/*  
    This file is meant to contain all of the data about every sprite other than the player
    The walls, projectile types, and other objects in the game should have their data here
*/
var SpriteData = function()
{
    this.debugGridOption = true;
    this.wallThick = 15; // Wall thickness

    this.walls = 
    [
        [   // Level 1
            {x: 0,    y: 200},
            {x: 0,    y: 200},  {x: 500,  y: 200}, 
            {x: 500,  y: 500},  {x: 1000, y: 500}, 
            {x: 1000, y: 100},  {x: 1400, y: 100}, 
            {x: 1400, y: 500},  {x: 3000, y: 500},
            {x: 3000, y: 800},  {x: 1400, y: 800},
            {x: 1200, y: 1000}, {x: 0,    y: 1000},
        ],
        [   // Level 2
            {x: 0,    y: 400},  {x: 500,    y: 400}, 
            {x: 500,    y: 300}, {x: 500, y: 300},
        ]
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

    canCollide: function(mouseX, mouseY, levelNum)
    {
        //console.log(mouseY);
        for (var i=1; i < this.walls.length; ++i) 
            {
                
        if ((this.walls[levelNum][i].x - mouseX < 100) && (this.walls[levelNum][i].y - mouseY < 100))
            {
                //console.log(this.walls[i].x - mouseX);
                return true;
            }
        else { return false; }
        }
    },

    didCollide: function(shotPrevX, shotPrevY, shotX, shotY, wallPrevX, wallPrevY, wallX, wallY)
    {
        let intersectPt = {x: 0, y: 0};
        //w1 = wallX - shotX;
        //h1 = wallY - shotY;

        shotSlope = this.findSlope(shotPrevX, shotPrevY, shotX, shotY);
        wallSlope = this.findSlope(wallPrevX, wallPrevY, wallX, wallY);

        shotYInt = this.findYInt(shotX, shotY, shotSlope);
        wallYInt = this.findYInt(wallX, wallY, wallSlope);

        intersectPt.x = (wallYInt - shotYInt) / (shotSlope - wallSlope);
        intersectPt.y = (shotSlope * intersectPt.x) + shotYInt;
        return this.intersectPt.x > wallPrevX &&
               this.intersectPt.x < wallX;
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

    drawWalls: function(levelNum) //Draws a wall, and defines the wall as a sprite
    {
        context.save();
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = this.wallThick;
        console.log(this.walls[levelNum].length);
        for (var i=0; i < this.walls[levelNum].length; ++i) // for each coordinate set
        {
            context.lineTo(this.walls[levelNum][i].x, this.walls[levelNum][i].y);
            console.log(this.walls[levelNum][i].x)
            context.stroke();
            /*if (this.canCollide(this.walls[levelNum][i][j], this.walls[levelNum][i][j], levelNum))
            {
                this.didCollide(
                    previous x of shot,
                    previous y of shot,
                    shot x,
                    shot y,
                    this.walls[i - 1].x,
                    this.walls[i - 1].y,
                    this.walls[i].x, 
                    this.walls[i].y);
                
            }   */
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

