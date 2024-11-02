var TargetAcquisition = function () 
{
    this.aimShoot = new AimShoot();

}
mouseMoved = new MouseEvent("click"); //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent
window.mouseMoved()
{
    document.getElementById("button").addEventListener("click", simulateClick);
    aimShoot.trackMouse();
}