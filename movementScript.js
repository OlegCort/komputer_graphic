document.addEventListener("DOMContentLoaded", function () {

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
    drawAxis();
    var currentA;
    var currentB;
    var currentC;
    var currentBaseApex1X;
    var currentBaseApex1Y;
    var currentBaseApex2X;
    var currentBaseApex2Y;
    var currentTopApexX;
    var currentTopApexY;


    
    document.getElementById('drawButton').addEventListener('click', function() {
        ctx.clearRect(-canvas.width /2 , -canvas.height /2 , canvas.width, canvas.height);
        drawAxis();
        drawTriangle();
        drawLine();
    });

    document.getElementById('moveButton').addEventListener('click', function() {
        ctx.clearRect(-canvas.width /2 , -canvas.height /2 , canvas.width, canvas.height);
        drawAxis();
        drawLine();
        reflectTriangle(currentBaseApex1X, currentBaseApex1Y, currentBaseApex2X, currentBaseApex2Y, currentTopApexX, currentTopApexY, currentA, currentB, currentC);
    });
   
    function drawTriangle() {

        var firstVertexX = parseInt(document.getElementById('firstVertexX').value, 10);
        var firstVertexY = parseInt(document.getElementById('firstVertexY').value, 10);
        var secondVertexX = parseInt(document.getElementById('secondVertexX').value, 10);
        var secondVertexY = parseInt(document.getElementById('secondVertexY').value, 10);
        var heightInput = parseInt(document.getElementById('trianglesHeight').value, 10);
        drawIsoscelesTriangle(firstVertexX * 15, firstVertexY * 15, secondVertexX * 15, secondVertexY * 15, heightInput * 15);

    }


    function drawIsoscelesTriangle(baseApex1X, baseApex1Y, baseApex2X, baseApex2Y, height) {
        const canvas = document.getElementById("movementCanvas");
        const ctx = canvas.getContext('2d');
        if (canvas.getContext) {
            // Calculate the midpoint of the base
            var midX = (baseApex1X + baseApex2X) / 2;
            var midY = (baseApex1Y + baseApex2Y) / 2;
    
            // Calculate the top apex coordinates
            var dx = baseApex2X - baseApex1X;
            var dy = baseApex2Y - baseApex1Y;
            var distBase = Math.sqrt(dx * dx + dy * dy);
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
            currentTopApexY = topApexY
        }
    }

    function drawAxis() {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
    
        // Ensure the transformations are applied only within this function
        ctx.save();
    
        // Clear any existing transformations by resetting to the default state
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    
        // Draw X-axis
        ctx.beginPath();
        ctx.moveTo(0, halfHeight);
        ctx.lineTo(width, halfHeight);
    
        // Draw Y-axis
        ctx.moveTo(halfWidth, 0);
        ctx.lineTo(halfWidth, height);
    
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    
        // Restore the transformations that were saved
        ctx.restore();
    }
    

    function drawLine() {
        var A = parseFloat(document.getElementById('lineA').value);
        var B = parseFloat(document.getElementById('lineB').value);
        var C = parseFloat(document.getElementById('lineC').value) * 10;
        currentA = A;
        currentB = B;
        currentC = C;
        drawLinearEquation(A, B, C);
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
    
        // Function to apply the reflection matrix to a point
        function reflectPoint(x, y) {
            const reflected = [
                reflectionMatrix[0][0] * x + reflectionMatrix[0][1] * y + reflectionMatrix[0][2],
                reflectionMatrix[1][0] * x + reflectionMatrix[1][1] * y + reflectionMatrix[1][2],
                1
            ];
            return { x: reflected[0], y: reflected[1] };
        }
    
        // Reflect each point of the triangle
        const p1 = reflectPoint(x1, y1);
        const p2 = reflectPoint(x2, y2);
        const p3 = reflectPoint(x3, y3);

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
        // Style the triangle
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        

    }
    
});

