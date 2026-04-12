// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// const cellSize = 30;
// const gridSize = 10;

// const letters = ['A','B','C','D','E','F','G','H','I','J'];

// const numbers = ['0','1','2','3','4','5','6','7','8','9'];

// function drawPole() {

//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 3;
//     for (let i = 2; i < 12; i++) 
//     {
//      for (let ii = 2; ii < 12; ii++) {
//         ctx.beginPath();
//         ctx.moveTo(ii*30, i*30);
//         ctx.lineTo((ii+1)*30 ,i*30);
//         ctx.lineTo((ii+1)*30, (i+1)*30);
//         ctx.lineTo(ii*30, (i+1)*30);
//         ctx.closePath();
//         ctx.stroke();
//     }
//   }

//   const letterContainer = document.getElementById('cells_name');
//   const numberContainer = document.getElementById('cells_number');

//   letterContainer.innerHTML = '';
//   letters.slice(0, gridSize).forEach((A, i) => {
//     const span = document.createElement('span');
//     span.textContent = A;
//     span.style.position = 'absolute';
//     span.style.left = `${(60+i*cellSize +10)}px`;
//     span.style.top = '30px';
//     letterContainer.appendChild(span);
//   });

//   numberContainer.innerHTML = '';
//   numbers.forEach((num, i) => {
//     const span = document.createElement('span');
//     span.textContent = num;
//     span.style.position = 'absolute';
//     span.style.left = '35px';
//     span.style.top =` ${(60+i*cellSize +5)}px`;
//     numberContainer.appendChild(span);
//   });
// }

// drawPole();


const grid = document.getElementById('pole');
const lettersContainer = document.getElementById('cells_name');
const numbersContainer = document.getElementById('cells_number');

const letters = ['A','B','C','D','E','F','G','H','I','J'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];

function createPole() {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    letters.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        lettersContainer.appendChild(span);
    });

    numbers.forEach(num => {
        const span = document.createElement('span');
        span.textContent = num;
        numbersContainer.appendChild(span);
    });
}

createPole();