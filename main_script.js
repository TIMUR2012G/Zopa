document.getElementById("open-log").addEventListener("click", function() {
    document.getElementById("log-menu").classList.add("open");
});

document.getElementById("close-log").addEventListener("click", function() {
    document.getElementById("log-menu").classList.remove("open");
});


document.getElementById("game-1").addEventListener("click", function() {
    document.getElementById("game-1-menu").classList.add("open");
});

document.getElementById("close-game-1").addEventListener("click", function() {
    document.getElementById("game-1-menu").classList.remove("open");
});



document.getElementById("battery").addEventListener("click", function() {
    document.getElementById("battery-menu").classList.add("open");
});

document.getElementById("close-battery").addEventListener("click", function() {
    document.getElementById("battery-menu").classList.remove("open");
});








document.getElementById("open-reg").addEventListener("click", function() {
    document.getElementById("reg-menu").classList.add("open");
});

document.getElementById("close-reg").addEventListener("click", function() {
    document.getElementById("reg-menu").classList.remove("open");
});


document.getElementById("settings").addEventListener("click", function() {
    document.getElementById("settings-menu").classList.add("open");
});

document.getElementById("close-settings").addEventListener("click", function() {
    document.getElementById("settings-menu").classList.remove("open");
});






document.getElementById("home").addEventListener("click", function() {
    document.getElementById("home-menu").classList.add("open");
});

document.getElementById("close-home").addEventListener("click", function() {
    document.getElementById("home-menu").classList.remove("open");
});










document.getElementById("dark-theme").addEventListener("click", function() {
    document.getElementById("body").classList.add("dark");
});

document.getElementById("white-theme").addEventListener("click", function() {
    document.getElementById("body").classList.remove("dark");
});

document.getElementById("stats").addEventListener("click", function() {
    document.getElementById("stats-menu").classList.add("open");
});

document.getElementById("close-stats").addEventListener("click", function() {
    document.getElementById("stats-menu").classList.remove("open");
});

// Define chart options
const chartOptions = {
    chart: {
        type: 'area',
        height: 180,
        toolbar: { show: false }, // Hide chart toolbar
        zoom: { enabled: false } // Disable chart zooming
    },
    colors: ['#3498db'], // Set chart color
    series: [{ name: 'Views', data: [0, 1, 10, 8, 2, 10] }], // Set chart data
    dataLabels: { enabled: false }, // Hide chart data labels
    stroke: { width: 3, curve: 'smooth' }, // Set chart stroke properties
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0,
            stops: [0, 90, 100] // Set chart fill gradient stops
        }
    },
    xaxis: {
        categories: ['фев', 'апр', 'июнь', 'авг', 'окт', 'дек'], // Set x-axis categories
        axisBorder: { show: false }, // Hide x-axis border
        labels: { style: { colors: '#a7a7a7', fontFamily: 'Poppins' } } // Set x-axis label properties
    },
    yaxis: { show: false }, // Hide y-axis
    grid: {
        borderColor: 'rgba(0, 0, 0, 0)', // Set grid border color
        padding: { top: -30, bottom: -8, left: 12, right: 12 } // Set grid padding
    },
    tooltip: {
        enabled: true, // Enable chart tooltip
        y: { formatter: value => `${value}K` }, // Set y-axis tooltip label formatter
        style: { fontFamily: 'Poppins' } // Set tooltip font family
    },
    markers: { show: false } // Hide chart markers
};

// Create new ApexCharts instance with chart options and render it
const chart = new ApexCharts(document.querySelector('.chart-area'), chartOptions);
chart.render();



const wheel = document.getElementById("wheel"),
    spinBtn = document.getElementById("spin-btn"),
    finalValue = document.getElementById("final-value");

// Values of min and max angle for a value

const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
];

// Size of pieces
const data = [16, 16, 16, 16, 16, 16];

//Background color of pieces

var pieColors = [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
];

// We use pie chart for wheel, so let's create it
let myChart = new Chart(wheel, {
    // Display text on pie chart
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        // Values on chart
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        // Responsive chart design
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            // Show labels inside of pie chart
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

// Display value based on randomAngle

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p>число: ${i.value}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

//Spinner Count

let count = 0;
// 100 rotation for animation and last rotation for result
let resultValue = 101;
// Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>удачи!</p>`;
    // Generate random degree to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    // Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        // if rotation > 360 reset it back to 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});




initBattery();

function initBattery() {
    const batteryLiquid = document.querySelector(".Bliquid");
    const batteryStatus = document.querySelector(".Bstatus");
    const Bpercentage = document.querySelector(".Bpercentage");
    navigator.getBattery().then((batt) => {
        updateBattery = () => {
            let level = Math.floor(batt.level * 100);
            Bpercentage.innerHTML = level + "%";
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;
            if (level == 100) {
                batteryStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`;
                batteryLiquid.style.height = "103%";
            } else if (level <= 20 & !batt.charging) {
                batteryStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red animated-red"></i>`;
            } else if (batt.charging) {
                batteryStatus.innerHTML = `Charging ... <i class="ri-flashlight-line animated-green"></i>`;
            } else {
                batteryStatus.innerHTML = "";
            }

            if (level <= 20) {
                batteryLiquid.classList.add("gradient-color-red");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            } else if (level <= 48) {
                batteryLiquid.classList.add("gradient-color-orange");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-yellow");
            } else if (level <= 80) {
                batteryLiquid.classList.add("gradient-color-yellow");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-red");
            } else {
                batteryLiquid.classList.add("gradient-color-green");
                batteryLiquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow");
            }
        }
        updateBattery();
        batt.addEventListener("chargingchange", () => { updateBattery() });
        batt.addEventListener("levelchange", () => { updateBattery });
    })
}

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

const GRID_SIZE = 20;
const SNAKE_SIZE = GRID_SIZE;
const FOOD_SIZE = GRID_SIZE;

let snake, food, dx, dy, blinkCounter;
let gamePaused = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

let currentScoreElem = document.getElementById('current-score');
let highScoreElem = document.getElementById('high-score');

// Initialize game state
function initializeGame() {
    // Set initial snake segments
    snake = [
        { x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE, y: Math.floor(canvas.height / 2 / GRID_SIZE) * GRID_SIZE },
        { x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE, y: (Math.floor(canvas.height / 2 / GRID_SIZE) + 1) * GRID_SIZE },
    ];
    // Set the initial food position and direction
    food = {
        ...generateFoodPosition(),
        dx: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
        dy: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE
    };
    // Set initial snake direction
    dx = 0;
    dy = -GRID_SIZE;
    blinkCounter = 0;
    score = 0;
    currentScoreElem.textContent = score;
    highScoreElem.textContent = highScore;
}

initializeGame();

// Handle keyboard inputs for snake movement
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -GRID_SIZE;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = GRID_SIZE;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -GRID_SIZE;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = GRID_SIZE;
                dy = 0;
            }
            break;
    }
});

// Generate a food position that doesn't collide with the snake
function generateFoodPosition() {
    while (true) {
        let newFoodPosition = {
            x: Math.floor(Math.random() * canvas.width / GRID_SIZE) * GRID_SIZE,
            y: Math.floor(Math.random() * canvas.height / GRID_SIZE) * GRID_SIZE
        };

        let collisionWithSnake = false;
        for (let segment of snake) {
            if (segment.x === newFoodPosition.x && segment.y === newFoodPosition.y) {
                collisionWithSnake = true;
                break;
            }
        }

        // Return the position if there is no collision
        if (!collisionWithSnake) {
            return newFoodPosition;
        }
    }
}

// Check for collisions with wall or self
function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Main game update function
function update() {
    if (gamePaused) return;

    // Calculate new snake head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collisions
    if (checkCollision()) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreElem.textContent = highScore;
        }
        gameOver();
        return;
    }

    // Check for snake eating food
    if (head.x === food.x && head.y === food.y) {
        score++;
        currentScoreElem.textContent = score;
        food = {
            ...generateFoodPosition(),
            dx: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
            dy: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE
        };

        // Check for win condition (snake fills entire screen)
        if (snake.length === (canvas.width / GRID_SIZE) * (canvas.height / GRID_SIZE)) {
            gameWin();
            return;
        }
    } else {
        snake.pop(); // Remove tail segment
    }

    // Update food position
    if (blinkCounter % 4 === 0) {
        food.x += food.dx;
        food.y += food.dy;

        // Handle food collisions with wall
        if (food.x < 0) {
            food.dx = -food.dx;
            food.x = 0;
        }
        if (food.x >= canvas.width) {
            food.dx = -food.dx;
            food.x = canvas.width - GRID_SIZE;
        }
        if (food.y < 0) {
            food.dy = -food.dy;
            food.y = 0;
        }
        if (food.y >= canvas.height) {
            food.dy = -food.dy;
            food.y = canvas.height - GRID_SIZE;
        }
    }

    blinkCounter++;
    draw(); // Draw the game objects
}

// Draw the background grid
function drawGrid() {
    context.strokeStyle = "#AAA";
    for (let i = 0; i < canvas.width; i += GRID_SIZE) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
    }
    for (let j = 0; j < canvas.height; j += GRID_SIZE) {
        context.beginPath();
        context.moveTo(0, j);
        context.lineTo(canvas.width, j);
        context.stroke();
    }
}

// Draw game objects (snake and food)
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    for (const segment of snake) {
        context.fillStyle = 'green';
        context.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
    }
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
}

// Handle game over state
function gameOver() {
    gamePaused = true;
    gameOverScreen.style.display = 'flex';
}

// Handle game win state
function gameWin() {
    gamePaused = true;
    alert("Congratulations! You won!");
    initializeGame();
}

// Restart game when restart button clicked
restartBtn.addEventListener('click', function () {
    gameOverScreen.style.display = 'none';
    gamePaused = false;
    initializeGame();
    update();
});

// Call update function every 100ms
setInterval(update, 100);

// Pause the game when window loses focus
window.addEventListener('blur', function () {
    gamePaused = true;
});

// Resume the game when window gains focus
window.addEventListener('focus', function () {
    gamePaused = false;
    update();
});