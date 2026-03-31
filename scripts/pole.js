const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


ctx.strokeStyle = "black";
ctx.lineWidth = 3;


// for (let i = 0; i < 10; index++) 
// {

//         for (let ii = 0; ii < 10; ii++) {
//             ctx.fillRect(i*30,ii*30,30,30);
//         }
        
//};

for (let i = 2; i < 12; i++) 
{

        for (let ii = 2; ii < 12; ii++) {
    ctx.beginPath();
    ctx.moveTo(ii*30, i*30);
    ctx.lineTo((ii+1)*30 ,i*30);
    ctx.lineTo((ii+1)*30, (i+1)*30);
    ctx.lineTo(ii*30, (i+1)*30);
    ctx.closePath();
    ctx.stroke();
}
}


const pole_area = document.querySelector(".pole_main");
const pole_abc = document.querySelector(".cells_name");
const pole_123 = document.querySelector(".cells_number");

let alphabet = ['A','B','C','D','E','F','G','H','I','J'];
let schet = ['0','1','2','3','4','5','6','7','8','9'];

const pol_cords = pole_area.getBoundingClientRect();

let x = pol_cords.left;
let y = pol_cords.top;

pole_abc.innerHTML = "";

const bykv = document.createElement("span");
bykv.textContent= "A";
bykv.style.left = 75+ "px";
bykv.style.top = 60 + "px";
pole_abc.appendChild(bykv);
