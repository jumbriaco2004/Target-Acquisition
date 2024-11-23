/*
    3 minute count down timer.
    Once timer hits 0, game over alert is sent and game reloads after the alert is closed.
*/

function startTimer(duration, display)
{
    var timer = duration, minutes, seconds;
    setInterval(function ()
    {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + seconds;

        if (--timer <= 0)
        {
            timer = duration;
            alert("GAME OVER!");
            window.location.reload();
        }
    }, 1000);
}

window.onload = function()
{
    var threeMins = 60 * 3,
        display = document.querySelector('#time');
    startTimer(threeMins, display);
};