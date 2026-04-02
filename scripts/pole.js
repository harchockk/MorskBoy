// const canvas = document.getElementById("canvas");

// const ctx = canvas.getContext("2d");


// ctx.strokeStyle = "black";
// ctx.lineWidth = 3;


// // for (let i = 0; i < 10; index++) 
// // {

// //         for (let ii = 0; ii < 10; ii++) {
// //             ctx.fillRect(i*30,ii*30,30,30);
// //         }
        
// //};

// for (let i = 2; i < 12; i++) 
// {

//         for (let ii = 2; ii < 12; ii++) {
//     ctx.beginPath();
//     ctx.moveTo(ii*30, i*30);
//     ctx.lineTo((ii+1)*30 ,i*30);
//     ctx.lineTo((ii+1)*30, (i+1)*30);
//     ctx.lineTo(ii*30, (i+1)*30);
//     ctx.closePath();
//     ctx.stroke();
// }
// }


// const pole_area = document.querySelector(".pole_main");
// const pole_abc = document.querySelector(".cells_name");
// const pole_123 = document.querySelector(".cells_number");

// let alphabet = ['A','B','C','D','E','F','G','H','I','J'];
// let schet = ['0','1','2','3','4','5','6','7','8','9'];

// const pol_cords = pole_area.getBoundingClientRect();

// let x = pol_cords.left;
// let y = pol_cords.top;

// pole_abc.innerHTML = "";

// for(let i = 0;i<10;i++)
// {
//     let bykv = document.createElement("span");
//     bykv.textContent= pole_abc[i];
//     // bykv.style.position = 'absolute';
//     bykv.style.left = ${(i+1)*30}px;
//     bykv.style.top = '60px';
//     pole_abc.appendChild(bykv);
// }

// Получаем canvas и его контекст
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Размер ячейки и поля
const cellSize = 30;
const gridSize = 300 / cellSize; // 500px / 30px = 16 клеток

// Массив с буквами (для верхней части)
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// Массив с цифрами (для левой части)
const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);

// Отрисовка сетки
function drawGrid() {


    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
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
}

// Добавление букв и цифр в DOM
function addLabels() {
  const letterContainer = document.getElementById('cells_name');
  const numberContainer = document.getElementById('cells_numbers');

  // Буквы сверху
  letterContainer.innerHTML = '';
  letters.slice(0, gridSize).forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.position = 'absolute';
    span.style.left = `${(index + 1) * cellSize}px`;
    span.style.top = '0';
    letterContainer.appendChild(span);
  });

  // Цифры слева
  numberContainer.innerHTML = '';
  numbers.forEach((number, index) => {
    const span = document.createElement('span');
    span.textContent = number;
    span.style.position = 'absolute';
    span.style.left = '0';
    span.style.top =` ${(index + 1) * cellSize}px`;
    numberContainer.appendChild(span);
  });
}

// Инициализация
function init() {
  drawGrid();
  addLabels();
}

init();