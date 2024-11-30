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
            {x: 0,    y: 200},  {x: 500,  y: 200}, 
            {x: 500,  y: 500},  {x: 1000, y: 500}, 
            {x: 1000, y: 100},  {x: 1400, y: 100}, 
            {x: 1400, y: 500},  {x: 3000, y: 500},
            {x: 3000, y: 800},  {x: 1400, y: 800},
            {x: 1200, y: 1000}, {x: 0,    y: 1000},
        ],
        [   // Level 2
            {x: 0,    y: 400},  {x: 500,    y: 400}, 
            {x: 500,  y: 300},  
            {x: 900,  y: 0, skip: true},                         // Skip stroke / pen up
            {x: 900,  y: 400},
            {x: 1400, y: 400}, 
            {x: 900,  y: 400, rx: 500, ry: 200, rot: 0, sA: 0,   // ellipse
                eA: -Math.PI/2, ellipse: true}, 
            {x: canvas.width, y: 600, skip: true},
            {x: 1700,    y: 600},
            {x: canvas.width, y: 800, skip: true},
            {x: 1700,    y: 800},
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

    drawWalls: function(levelNum) //Draws a wall, and defines the wall as a sprite
    {
        context.save();
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = this.wallThick;
        for (var i=0; i < this.walls[levelNum].length; ++i) // for each coordinate set
        {
            if (this.walls[levelNum][i].skip == true)
            {
                context.moveTo(this.walls[levelNum][i].x, this.walls[levelNum][i].y);
            }

            if (this.walls[levelNum][i].ellipse) //if the wall coords have a ellipse in it
            {
                context.ellipse(
                    this.walls[levelNum][i].x,  this.walls[levelNum][i].y,
                    this.walls[levelNum][i].rx, this.walls[levelNum][i].ry, this.walls[levelNum][i].rot, 
                    this.walls[levelNum][i].sA, this.walls[levelNum][i].eA, true // <-- clockwise bool
                )
                context.stroke();
            }
            else
            {
                context.lineTo(this.walls[levelNum][i].x, this.walls[levelNum][i].y);
                context.stroke();
            }
            
            if (collideSystem.canCollide(this.walls[levelNum][i].x, this.walls[levelNum][i].y, levelNum))
            {/*
                this.didCollide(
                    previous x of shot,
                    previous y of shot,
                    shot x,
                    shot y,
                    this.walls[i - 1].x,
                    this.walls[i - 1].y,
                    this.walls[i].x, 
                    this.walls[i].y);
                */
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
    },

    getWalls: function()
    {
        return this.walls;
    }
}

var Projectile = function() // Projectile constructor
{

}

Projectile.prototype = 
{
    
}

