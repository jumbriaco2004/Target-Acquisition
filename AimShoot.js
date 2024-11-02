/* 
   File for aiming and shooting with the player 
   I'll probably switch to mouse aiming instead since it will likely be easier -GC
*/
console.log("AimShoot.js called");
var AimShoot = function ()  
{
   
};
 
 AimShoot.prototype = 
 {
    trackMouse: function (event) 
    {
      console.log("trackMouse called");
        mouseX = event.ClientX();
        mouseY = event.ClientY();
        console.log(mouseX + " " + mouseY);
    }
 }