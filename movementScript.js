document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("movementCanvas");
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    canvas.width = document.getElementById("movement-container").offsetWidth;
    canvas.height = document.getElementById("movement-container").offsetHeight;
    drawAxis();
    
    document.getElementById('moveButton').addEventListener('click', function() {
        drawTriangle();
    });

   
    function drawTriangle() {
        var firstVertexX = parseInt(document.getElementById('firstVertexX').value, 10);
        var firstVertexY = parseInt(document.getElementById('firstVertexY').value, 10);
        var secondVertexX = parseInt(document.getElementById('secondVertexX').value, 10);
        var secondVertexY = parseInt(document.getElementById('secondVertexY').value, 10);
        var heightInput = parseInt(document.getElementById('trianglesHeight').value, 10);

        console.log(firstVertexX);
        console.log(firstVertexY);
        console.log(secondVertexX);
        console.log(secondVertexY);
        console.log(heightInput);



        drawIsoscelesTriangle(firstVertexX, firstVertexY, secondVertexX, secondVertexY, heightInput);
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
        const width = canvas.width;
        const height = canvas.height;
    
        // X-axis
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
    
        // Y-axis
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
    
        ctx.strokeStyle = 'black';
        ctx.stroke();
        //ctx.closePath();
    }
    
    
});

