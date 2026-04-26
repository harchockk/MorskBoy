const grid = document.getElementById('pole');
const lettersContainer = document.getElementById('cells_name');
const numbersContainer = document.getElementById('cells_number');

const letters = ['A','B','C','D','E','F','G','H','I','J'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];

function createPole() {
    for (let i = 0; i < 10; i++) {
        for (let ii = 0; ii < 10; ii++) {

        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        cell.dataset.x_cords = ii;
        cell.dataset.y_cords = i;

        }
        
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



let ships = 
[
    {
        name:"dvu_palubnik",
        length:2,
        image:"./images/Dvup.png",
        count: 3

    },
    {
        name:"tro_palubnik",
        length:3,
        image:"./images/Tryp.png",
        count: 2
    },
    {
        name:"four_palubnik",
        length:4,
        image:"./images/Chetyry.png",
        count: 1
    },
    {
        name:"pyaty_palubnik",
        length:5,
        image:"./images/Pyat.png",
        count: 1
    }

];


class Cell  {

    constructor(x,y) {
        this.x_cords = x;
        this.y_cords = y;
        this.state = "pusto";
    }

};



let field =[];

for(let i = 0;i<10;i++)
{
    for(let ii = 0;ii<10;ii++)
    {
        let a = new Cell(ii,i);
        field.push(a);
    }
};


for(let i = 0;i<100;i++)
{
    console.log(field[i]);
};


function Opredelyator(a)
{
    let res = Math.floor(a / 60);
    if (res < 0 || res >9 ) {
        return null;
    }
    return res;
};


function getCell(x, y) {
    return field.find(cell => cell.x === x && cell.y === y);
};


function allow_pos_x(x, y, length) {
    for (let i = 0; i < length; i++) {

        if (x+i > 9 || y > 9) return false;

        for (let ii = -1; ii <= 1; ii++) {
            for (let iii = -1; iii <= 1; iii++) {
                const neighbor = getCell(x+i+ii, y + iii);
                if (neighbor && neighbor.state === "ship"){
                   return false; 
                } 
            }
        }
    }
    return true;
};


function makezanyat(x,y,length){
     for (let i = 0; i < length; i++) {
        const cell = getCell(x + i, y);
        if (cell) cell.state = "ship";
    }
};



function highlight(x, y, length, valid) {
    unHighlight();
    for (let i = 0; i < length; i++) {
        const Cell = document.querySelector(`.cell[x_cords="${x + i}"][y_cords="${y}"]`);
        if (Cell) {
            Cell.classList.add(valid ? "highlight_on" : "highlight_of");
        }
    }
};

function unHighlight() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("highlight_on", "highlight_of");
    });
};





const ship_grid = document.querySelector(".menu_board");
ships.forEach((korabl, i) => {
    const shipBox = document.createElement("div");
    shipBox.classList.add("ship-box")

    const img = document.createElement("img");
    img.src = korabl.image;
    img.classList.add("sheep");
    img.draggable = true;
    img.style.width = (60 * korabl.length) + "px";
    img.style.height = 60 + "px";
    img.dataset.Index = i;

    const countBox = document.createElement("div");
    countBox.textContent = korabl.count;
    countBox.style.color = "white";
    countBox.style.textAlign = "center";
    countBox.style.fontSize = "14px";
    countBox.dataset.Index = i;

    shipBox.appendChild(img);
    shipBox.appendChild(countBox);

    ship_grid.appendChild(shipBox);

    img.addEventListener("dragstart", e=> {
        if(korabl.count ===0) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData("Index", i);

        const rect = img.getBoundingClientRect();
        e.dataTransfer.setData("smeshenye_x", e.clientX - rect.left);
        e.dataTransfer.setData("smeshenye_y", e.clientY - rect.top);

    });
});


const pole = document.getElementById("pole");


document.addEventListener("dragstart", e => {
    const t = e.target.dataset.Index;
    if (t !== undefined) sessionStorage.setItem("dragIndex", t);
});

document.addEventListener("dragend", ()=> {
    sessionStorage.removeItem("dragIndex");
    unHighlight();
});


pole.addEventListener("dragover",e => {
    e.preventDefault();

    const index = parseInt(sessionStorage.getItem("dragIndex") ?? -1,10);
    if(index < 0 ){return};

    const korabl = ships[index];
    const rect = pole.getBoundingClientRect();
    const x = Opredelyator(e.clientX - rect.left);
    const y = Opredelyator(e.clientY - rect.top);

    if (x === null || y === null )
    {
        unHighlight();
        return;
    }

    highlight(x,y,korabl.length, allow_pos_x(x,y,korabl.length));
});

pole.addEventListener("dragleave", () => unHighlight());


pole.addEventListener("drop",e =>{
    e.preventDefault();
    unHighlight();

    const index = parseInt(e.dataTransfer.getData("Index"), 10);
    if(isNaN(index)) {return};

    const korabl = ships[index];
    if(korabl.count <= 0){return};

    const rect = pole.getBoundingClientRect();
    const x = Opredelyator(e.clientX - rect.left);
    const y = Opredelyator(e.clientY - rect.top);

    if(x === null || y === null){return};

    if(x + korabl.length >9) {return};
    
    if(allow_pos_x(x,y,korabl.length) === false){return};

    korabl.count--;
    const count = document.querySelector(`.ship-count[data-ship-index="$index}"]`);
    if (count) {
        count.textContent = "×" + korabl.count;
    }

    makezanyat(x,y,korabl.length);

    const img = document.createElement("img");
    img.src = korabl.image;
    img.classList.add("on_field");

    img.style.left   = (x * 60) + "px";
    img.style.top    = (y * 60) + "px";
    img.style.width  = (60 * korabl.length) + "px";
    img.style.height = 60 + "px";
    img.dataset.x_cords  = x  ;
    img.dataset.y_cords  = y;
    img.dataset.length = korabl.length;
    img.dataset.Index =index;


    pole.appendChild(img);

    img.addEventListener("click", () =>{
        for (let i = 0; i < korabl.length; i++) {
            const cell = getCell(x + i, y);
            if (cell) {cell.state = "empty";}
        }
        korabl.count++;
        const count = document.querySelector(`.ship-count[data-ship-index="${index}"]`)
        if (count) {count.textContent = "×" + korabl.count;}
        img.remove();
    });
});
