var TargetAcquisition = function () 
{
    //HTML Elements
    this.canvas = document.getElementById('game-canvas'),
    this.context = this.canvas.getContext('2d'),
    this.fpsElement = document.getElementById('fps'),
    this.toastElement = document.getElementById('toast');

    this.aimShoot = new AimShoot();
}
//mouseMoved = new MouseEvent("click"); //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent
TargetAcquisition.prototype = 
{
    animate: function (now) { 
        // Replace the time passed to this method by the browser
        // with the time from Snail Bait's time system
  
        now = targetAcquisition.timeSystem.calculateGameTime(); 
        //Need to move all the called functions here into this project -GC
  
        if (targetAcquisition.paused) {
           setTimeout( function () 
           {
              requestNextAnimationFrame(targetAcquisition.animate);
           }, targetAcquisition.PAUSED_CHECK_INTERVAL);
        }
        else {
           targetAcquisition.fps = targetAcquisition.calculateFps(now); 
           targetAcquisition.draw(now);
           targetAcquisition.lastAnimationFrameTime = now;
           requestNextAnimationFrame(targetAcquisition.animate);
        }
     },
    startGame: function () {
  
        //this.timeSystem.start();
        //this.setTimeRate(0.25);
  
        //this.gameStarted = true;
  
        requestNextAnimationFrame(this.animate);
     }
     
    
}


// Launch game.........................................................
var targetAcquisition = new TargetAcquisition();