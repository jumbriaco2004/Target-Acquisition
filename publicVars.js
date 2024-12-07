canvas = document.getElementById('game-canvas'); // public so that everything can use these variables
context = canvas.getContext('2d');
spritesheet = new Image();
bounceA = 180 * (Math.PI/180); // bounce angle of the first bounce surface seen in level one
walls = 
    [
        [   // Level 1
            {x: 0,    y: 201},
            {x: 0,    y: 200},  {x: 502,  y: 201}, 
            {x: 500,  y: 500},  {x: 1000, y: 501}, 
            {x: 1000, y: 100},  {x: 1401, y: 99 }, 
            {x: 1400, y: 500},  {x: 1920, y: 501},
            {x: 1920, y: 800},  
            {x: 1400, y: 801, bounce: bounceA}, {x: 1350, y: 850, bounce: bounceA},   // diagonal
            {x: 1300, y: 900, bounce: bounceA}, {x: 1250, y: 950, bounce: bounceA},   // diagonal
            {x: 1200, y: 1000, bounce: bounceA}, {x: 1150, y: 1050, bounce: bounceA}, // diagonal
            {x: 1100, y: 1100},
            {x: 0,    y: 1101},
        ],
        [   // Level 2
            {x: 0,    y: 401},  {x: 500,    y: 400}, 
            {x: 500,  y: 301},  
            {x: 900,  y: 0, skip: true},                         // Skip stroke / pen up
            {x: 900,  y: 400},
            {x: 1400, y: 401}, 
            {x: 900,  y: 400, rx: 500, ry: 200, rot: 0, sA: 0,   // ellipse
                eA: -Math.PI/2, ellipse: true}, 
            {x: canvas.width, y: 601, skip: true},
            {x: 1700,    y: 600},
            {x: canvas.width, y: 801, skip: true},
            {x: 1700,    y: 800},
        ]
    ];

    function debug(stringText)
    /* Updates the debug element with a value given, best for supervising quickly updated values 
       into the game, will only show the last called debug functions value */ 
    {  document.getElementById('debug').innerHTML = stringText; }