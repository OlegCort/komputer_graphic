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

    
    document.getElementById('drawButton').addEventListener('click', function() {
        drawTriangle();
        drawLine();
    });

   
    function drawTriangle() {

        var firstVertexX = parseInt(document.getElementById('firstVertexX').value, 10);
        var firstVertexY = parseInt(document.getElementById('firstVertexY').value, 10);
        var secondVertexX = parseInt(document.getElementById('secondVertexX').value, 10);
        var secondVertexY = parseInt(document.getElementById('secondVertexY').value, 10);
        var heightInput = parseInt(document.getElementById('trianglesHeight').value, 10);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxis();



        console.log(firstVertexX);
        console.log(firstVertexY);
        console.log(secondVertexX);
        console.log(secondVertexY);
        console.log(heightInput);



        drawIsoscelesTriangle(firstVertexX * 10, firstVertexY * 10, secondVertexX * 10, secondVertexY * 10, heightInput * 10);

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
        var C = parseFloat(document.getElementById('lineC').value);
        console.log(A);
        console.log(B);
        console.log(C);


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
    
});

