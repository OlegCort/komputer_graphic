document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("movementCanvas");
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    canvas.width = document.getElementById("movement-container").offsetWidth;
    canvas.height = document.getElementById("movement-container").offsetHeight;
    drawAxis();

    
    document.getElementById('drawButton').addEventListener('click', function() {
        drawTriangle();
    });

   
    function drawTriangle() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxis();

        var firstVertexX = document.getElementById('firstVertexX').value;
        
        var firstVertexY = document.getElementById('firstVertexY').value;
        var secondVertexX = document.getElementById('secondVertexX').value;
        var secondVertexY = document.getElementById('secondVertexY').value;
        var heightInput = document.getElementById('trianglesHeight').value;

        console.log(firstVertexX);
        console.log(firstVertexY);
        console.log(secondVertexX);
        console.log(secondVertexY);
        console.log(heightInput);



        drawIsoscelesTriangle(firstVertexX, firstVertexY, secondVertexX, secondVertexY, heightInput*15);
    }

    function drawIsoscelesTriangle(baseApex1X, baseApex1Y, baseApex2X, baseApex2Y, height) {

        // Clear previous drawings
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the base
        ctx.beginPath();
        ctx.moveTo(baseApex1X, baseApex1Y);
        ctx.lineTo(baseApex2X, baseApex2Y);
        ctx.stroke();

        // Calculate the midpoint of the base
        var midBaseX = (baseApex1X + baseApex2X) / 2;
        var midBaseY = (baseApex1Y + baseApex2Y) / 2;

        // Calculate the direction vector of the base
        var dirX = baseApex2X - baseApex1X;
        var dirY = baseApex2Y - baseApex1Y;

        // Calculate the length of the base
        var baseLength = Math.sqrt(dirX * dirX + dirY * dirY);

        // Calculate unit vector perpendicular to the base
        var perpX = -dirY / baseLength;
        var perpY = dirX / baseLength;

        // Calculate the third apex using the height and the perpendicular direction
        var apexX = midBaseX + perpX * height;
        var apexY = midBaseY + perpY * height;

        // Draw the remaining sides
        ctx.moveTo(baseApex1X, baseApex1Y);
        ctx.lineTo(apexX, apexY);
        ctx.lineTo(baseApex2X, baseApex2Y);
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
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
        ctx.closePath();
    }
    
    
});

