document.addEventListener("DOMContentLoaded", function () {

    var moving = false;
    const canvas = document.getElementById("movementCanvas");
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    canvas.width = document.getElementById("movement-container").offsetWidth;
    canvas.height = document.getElementById("movement-container").offsetHeight;
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    ctx.translate(halfWidth, halfHeight);
    ctx.scale(1, -1);
    var intervalInPixel = 10;
    var A;
    var B;
    var C;
    var currentA;
    var currentB;
    var currentC;
    var currentBaseApex1X;
    var currentBaseApex1Y;
    var currentBaseApex2X;
    var currentBaseApex2Y;
    var currentTopApexX;
    var currentTopApexY;
    var currentHeight;
    var firstVertexX;
    var firstVertexY;
    var secondVertexX;
    var secondVertexY;
    var heightInput;
    var isDrawn = false;
    drawAxis();


//Drawing Triangle
    function drawTriangleByParameters()
    {
        ctx.clearRect(-canvas.width /2 , -canvas.height /2 , canvas.width, canvas.height);
        drawAxis();
        drawTriangle();
        drawLine();
        isDrawn = true;
    }
//Moving and reflecting the Triangle
    function reflectTriangleByParameters()
    {
        ctx.clearRect(-canvas.width /2 , -canvas.height /2 , canvas.width, canvas.height);
        drawAxis();
        drawLine();
        reflectTriangle(currentBaseApex1X, currentBaseApex1Y, currentBaseApex2X, currentBaseApex2Y, currentTopApexX, currentTopApexY, currentA, currentB, currentC);
        isDrawn = true;
    }
    

;
    document.querySelector("#intervalInPixel").addEventListener("input", (event) => {
        intervalInPixel = parseInt(event.target.value, 10);
        if(intervalInPixel < 3){
            alert("Довжина одиничного відрізка мусить бути більшою 2px")
            intervalInPixel = 3;
            event.target.value = 3;
        }
        console.log(intervalInPixel);
        if(isDrawn){
            ctx.clearRect(-canvas.width /2 , -canvas.height /2 , canvas.width, canvas.height);
            drawAxis();
            drawIsoscelesTriangle(firstVertexX * intervalInPixel, firstVertexY * intervalInPixel, secondVertexX * intervalInPixel, secondVertexY * intervalInPixel, heightInput * intervalInPixel);
            drawLinearEquation(A, B, C * intervalInPixel);
        } else{
            ctx.clearRect(-canvas.width /2 , -canvas.height /2 , canvas.width, canvas.height);
            drawAxis();
        }

    });

    document.getElementById('drawButton').addEventListener('click', function() {
        drawTriangleByParameters()
    });

    function reflectPeriodically() {
        if(moving)
            reflectTriangleByParameters();
        setTimeout(reflectPeriodically, 500);
    }
    reflectPeriodically();
    document.getElementById('moveButton').addEventListener('click', function() {
        moving = !moving;
    });

   
    function drawTriangle() {

        firstVertexX = parseFloat(document.getElementById('firstVertexX').value, 10);
        firstVertexY = parseFloat(document.getElementById('firstVertexY').value, 10);
        secondVertexX = parseFloat(document.getElementById('secondVertexX').value, 10);
        secondVertexY = parseFloat(document.getElementById('secondVertexY').value, 10);
        heightInput = parseFloat(document.getElementById('trianglesHeight').value, 10);
        drawIsoscelesTriangle(firstVertexX * intervalInPixel, firstVertexY * intervalInPixel, secondVertexX * intervalInPixel, secondVertexY * intervalInPixel, heightInput * intervalInPixel);

    }



    function drawIsoscelesTriangle(baseApex1X, baseApex1Y, baseApex2X, baseApex2Y, height) {
        if (canvas.getContext) {
            // Calculate the midpoint of the base
            var midX = (baseApex1X + baseApex2X) / 2;
            var midY = (baseApex1Y + baseApex2Y) / 2;
    
            // Calculate the top apex coordinates
            var dx = baseApex2X - baseApex1X;
            var dy = baseApex2Y - baseApex1Y;
            var angle = Math.atan2(dy, dx);
    
            var topApexX = midX - height * Math.sin(angle);
            var topApexY = midY + height * Math.cos(angle);
    
            // Draw the triangle
            ctx.beginPath();
            ctx.moveTo(baseApex1X, baseApex1Y);
            ctx.lineTo(baseApex2X, baseApex2Y);
            ctx.lineTo(topApexX, topApexY);
            ctx.closePath();
    
            // Style the triangle
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
            
            currentBaseApex1X = baseApex1X;
            currentBaseApex1Y = baseApex1Y;
            currentBaseApex2X = baseApex2X;
            currentBaseApex2Y = baseApex2Y;
            currentTopApexX = topApexX;
            currentTopApexY = topApexY;
            currentHeight = height;
        }
    }


    //Drawing XY axis
    function drawAxis() {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
    
        // Draw X-axis
        ctx.beginPath();
        ctx.moveTo(-width / 2, 0);
        ctx.lineTo(width / 2, 0);
    
        // Draw Y-axis
        ctx.moveTo(0, -height / 2);
        ctx.lineTo(0, height / 2);
    
        // Drawing marks on the axes, starting from the center
        for (let x = 0; x <= width / 2; x += intervalInPixel) {
            ctx.moveTo(x, -5);
            ctx.lineTo(x, 5);
            if (x !== 0) { // Ensure we don't draw at the center twice
                ctx.moveTo(-x, -5);
                ctx.lineTo(-x, 5);
            }
        }
    
        // Drawing marks on the Y axis, starting from the center
        for (let y = 0; y <= height / 2; y += intervalInPixel) {
            ctx.moveTo(-5, y);
            ctx.lineTo(5, y);
            if (y !== 0) { // Ensure we don't draw at the center twice
                ctx.moveTo(-5, -y);
                ctx.lineTo(5, -y);
            }
        }
    
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    
        // Drawing 'X' and 'Y' at the ends of the axes
        // Adjust positions if needed
        ctx.font = "20px Arial";
        ctx.scale(1, -1);  // Temporary flip to draw text upright
        ctx.fillText("X", width / 2 - 20, -10);
        ctx.fillText("Y", 10, -height / 2 + 20);
        ctx.scale(1, -1);  // Flip back
    }
    
//Drawing the linear equation
    function drawLine() {
        A = parseFloat(document.getElementById('lineA').value);
        B = parseFloat(document.getElementById('lineB').value);
        C = parseFloat(document.getElementById('lineC').value);
        currentA = A;
        currentB = B;
        currentC = C * intervalInPixel;
        drawLinearEquation(A, B, C * intervalInPixel);
    }

    

    function drawLinearEquation(A, B, C) {
        ctx.beginPath();

            let x1 = -halfWidth;
            let y1 = (-C - A * x1) / B;
            let x2 = halfWidth;
            let y2 = (-C - A * x2) / B;     
    
    
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function reflectTriangle(x1, y1, x2, y2, x3, y3, A, B, C) {
        // Normalize the line coefficients
        const norm = Math.sqrt(A * A + B * B);
        A /= norm;
        B /= norm;
        C /= norm;
    
        // Construct the reflection matrix
        const reflectionMatrix = [
            [1 - 2 * A * A, -2 * A * B, -2 * A * C],
            [-2 * A * B, 1 - 2 * B * B, -2 * B * C],
            [0, 0, 1]
        ];

        const moveMatrix = [
            [1, 0, A],
            [0, 1, B],
            [0, 0, 1]
        ];
    
        // Function to apply the reflection matrix to a point
        function reflectPoint(x, y) {
            const reflected = [
                moveMatrix[0][-0]*reflectionMatrix[0][0] * x + reflectionMatrix[0][1] * y + reflectionMatrix[0][2],
                reflectionMatrix[1][0] * x + reflectionMatrix[1][1] * y + reflectionMatrix[1][2],
                1
            ];
            return { x: reflected[0], y: reflected[1]};        
        }

        // Reflect each point of the triangle
        const p1 = reflectPoint(x1 - 2* A * intervalInPixel, y1);
        const p2 = reflectPoint(x2 - 2* A * intervalInPixel, y2);
        const p3 = reflectPoint(x3 - 2* A * intervalInPixel, y3);

        // Draw the triangle
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        currentBaseApex1X = p1.x;
        currentBaseApex1Y = p1.y;
        currentBaseApex2X = p2.x;
        currentBaseApex2Y = p2.y;
        currentTopApexX = p3.x;
        currentTopApexY = p3.y;

        firstVertexX = currentBaseApex1X/intervalInPixel;
        firstVertexY = currentBaseApex1Y/intervalInPixel;
        secondVertexX = currentBaseApex2X/intervalInPixel;
        secondVertexY = currentBaseApex2Y/intervalInPixel;
        heightInput = -heightInput;
        // Style the triangle
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        

    }

    
    
});

