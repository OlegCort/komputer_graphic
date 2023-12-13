document.addEventListener("DOMContentLoaded", function () {

    let selectedRegion = { x: 0, y: 0, width: 0, height: 0 };
    let isSelecting = false;
    let canvas = document.getElementById('canvasColors');

    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = "pexels-alexander-grey-1191710.jpg";

    function initRegionSelection(canvas, ctx, img) {
        //canvas.width = img.naturalWidth;
        //canvas.height = img.naturalHeight;
    
        canvas.onmousedown = function(e) {
            isSelecting = true;
            const rect = canvas.getBoundingClientRect();
            selectedRegion.x = e.clientX - rect.left;
            selectedRegion.y = e.clientY - rect.top;
            selectedRegion.width = 0;
            selectedRegion.height = 0;
            drawRegion(ctx, canvas, img);
        };
    
        canvas.onmousemove = function(e) {
            if (!isSelecting) return;
            const rect = canvas.getBoundingClientRect();
            selectedRegion.width = e.clientX - rect.left - selectedRegion.x;
            selectedRegion.height = e.clientY - rect.top - selectedRegion.y;
            drawRegion(ctx, canvas, img);
        };
    
        canvas.onmouseup = function(e) {
            isSelecting = false;
            drawRegion(ctx, canvas, img);
        };
    }

    initRegionSelection(canvas, ctx, img);

    function drawRegion(ctx, canvas, img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
        if (isSelecting) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.setLineDash([6]);
                ctx.strokeRect(
                selectedRegion.x,
                selectedRegion.y,
                selectedRegion.width,
                selectedRegion.height
            );
        }
    }
    

    document.getElementById("changeColorOnFragment").addEventListener("click", () => {
      console.log("fdsfewf");
        changeColor();
    })

    function changeColor() {
        let saturationChange = parseInt(document.getElementById('saturation').value) / 100;
        let valueChange = parseInt(document.getElementById('value').value) / 100;
        let hueChange = parseInt(document.getElementById('hue').value) / 360;
        console.log(hueChange);

        let imageData = ctx.getImageData(
            selectedRegion.x ,//* currentScaleX,
            selectedRegion.y ,//* currentScaleY,
            selectedRegion.width,// * currentScaleX,
            selectedRegion.height// * currentScaleY
        );
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            let hsv = RGBToHSV(r, g, b);
            hsv.s *= saturationChange;
            hsv.v *= valueChange;
            hsv.h += hueChange;
            

            let rgb = HSVToRGB(hsv.h, hsv.s, hsv.v);
            data[i] = rgb[0];
            data[i + 1] = rgb[1];
            data[i + 2] = rgb[2];
        }

        ctx.putImageData(imageData, selectedRegion.x , selectedRegion.y );

    }

    function RGBToHSV(r, g, b) {
        r /= 255, g /= 255, b /= 255;
    
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;
    
        var d = max - min;
        s = max == 0 ? 0 : d / max;
    
        if (max == min) {
          h = 0;
        } else {
          if (max === r) {
            h = (g - b) / d + (g < b ? 6 : 0);
          } else if (max === g) {
            h = (b - r) / d + 2;
          } else {
            h = (r - g) / d + 4;
          }
        
          h /= 6;
        }
      
        return { h, s, v };
    }
    
    function    HSVToRGB(h, s, v) {
        var r, g, b;
    
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
    
        switch (i % 6) {
         case 0: r = v, g = t, b = p; break;
         case 1: r = q, g = v, b = p; break;
         case 2: r = p, g = v, b = t; break;
         case 3: r = p, g = q, b = v; break;
         case 4: r = t, g = p, b = v; break;
         case 5: r = v, g = p, b = q; break;
        }
      
        return [ r * 255, g * 255, b * 255 ];
    }
    

    
});



