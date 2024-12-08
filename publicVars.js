canvas = document.getElementById('game-canvas'); // public so that everything can use these variables
context = canvas.getContext('2d');
spritesheet = new Image();

walls = 
    [
        [   // Level 1
            {x: 0,    y: 201},
            {x: 0,    y: 200},  {x: 502,  y: 201}, 
            {x: 500,  y: 500},  {x: 1000, y: 501}, 
            {x: 1000, y: 100},  {x: 1401, y: 99 }, 
            {x: 1400, y: 500},  {x: canvas.width - 49, y: 501},
            {x: canvas.width - 50, y: 800, end: true},  
            {x: 1400, y: 801, bounce: 180}, {x: 1350, y: 850, bounce: 180},   // diagonal
            {x: 1300, y: 900, bounce: 180}, {x: 1250, y: 950, bounce: 180},   // diagonal
            {x: 1200, y: 1000, bounce: 180}, {x: 1150, y: 1050, bounce: 180}, // diagonal
            {x: 1100, y: 1100},
            {x: 0,    y: 1101},
        ],
        [   // Level 2 - redone
            {x: 0, y: 415},  {x: 500, y: 416},
            {x: 501, y: 385},  {x: 0, y: 386},
            {x: 0, y: 15}, 
            {x: 885, y: 15, bounce: 335},
            {x: 884, y: 200, bounce: 235},
            {x: 885, y: 400, bounce: 235},
            {x: 1200, y: 402},
            {x: 1201, y: 200}, {x: 915, y: 202}, 
            {x: 915, y: 0, bounce: 325}, {x: canvas.width, y: 1},
            {x: canvas.width, y: 601},
            {x: 1700, y: 600},
            {x: canvas.width - 15, y: 601},
            {x: canvas.width - 16, y: 901, end: true},
            {x: 1700, y: 900},
        ],
        [
            {x: 20, y: 20, bounce: 1},
            {x: 20, y: 20, bounce: 1},
            {x: canvas.width - 20, y: 19, bounce: 1},
            {x: canvas.width - 19, y: canvas.height - 20, bounce: 270},
            {x: 19, y: canvas.height - 19, bounce: 180},
            {x: 20, y: 20, bounce: 90},
        ] //end screen
    ];

    function debug(stringText)
    /* Updates the debug element with a value given, best for supervising quickly updated values 
       into the game, will only show the last called debug functions value */ 
    {  document.getElementById('debug').innerHTML = stringText; }