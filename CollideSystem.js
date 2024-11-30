var CollideSystem = function()
{
    this.walls = [];
}

CollideSystem.prototype = 
{
    canCollide: function(bombX, bombY, levelNum)
    {
        this.walls = spriteData.getWalls();
        for (var i=0; i < this.walls.length; ++i) 
        {
            if ((this.walls[levelNum][i].x - bombX < 100) && (this.walls[levelNum][i].y - bombY < 100))
                {
                    //console.log(this.walls[i].x - bombX);
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

}