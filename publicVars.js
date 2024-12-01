canvas = document.getElementById('game-canvas'); // public so that everything can use these variables
context = canvas.getContext('2d');
spritesheet = new Image();

walls = 
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