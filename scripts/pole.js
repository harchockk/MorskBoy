const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


ctx.strokeStyle = "black";
ctx.lineWidth = 5;


// for (let i = 0; i < 10; index++) 
// {

//         for (let ii = 0; ii < 10; ii++) {
//             ctx.fillRect(i*30,ii*30,30,30);
//         }
        
//};

for (let i = 0; i < 10; i++) 
{

        for (let ii = 0; ii < 10; ii++) {
    ctx.beginPath();
    ctx.moveTo(ii*30, i*30);
    ctx.lineTo((ii+1)*30 ,i*30);
    ctx.lineTo((ii+1)*30, (i+1)*30);
    ctx.lineTo(ii*30, (i+1)*30);
    ctx.closePath();
    ctx.stroke();
}


