const grid = document.getElementById('pole');
const lettersContainer = document.getElementById('cells_name');
const numbersContainer = document.getElementById('cells_number');

const letters = ['A','B','C','D','E','F','G','H','I','J'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];

function createPole(pole, letterss, numberss) {
    for (let i = 0; i < 10; i++) {
        for (let ii = 0; ii < 10; ii++) {

        const cell = document.createElement('div');
        cell.classList.add('cell');
        pole.appendChild(cell);
        cell.dataset.x_cords = ii;
        cell.dataset.y_cords = i;

        }
        
    }

    letters.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        letterss.appendChild(span);
    });

    numbers.forEach(num => {
        const span = document.createElement('span');
        span.textContent = num;
        numberss.appendChild(span);
    });
}

createPole(grid,lettersContainer,numbersContainer);



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

function Opredelyator(cords)
{
    let res = Math.floor(cords / 45);
    if (res < 0 || res >9 ) 
    {
        return null;
    }
    return res;
};

function getCell(x, y) 
{
    return field.find(cell => cell.x_cords === x && cell.y_cords === y);
};

function allow_pos_x(x, y, length) 
{
    for (let i = 0; i < length; i++) 
    {

        if (x+i > 9 || y > 9) {return false};

        for (let ii = -1; ii <= 1; ii++) 
        {
            for (let iii = -1; iii <= 1; iii++) 
            {
                const neighbor = getCell(x+i+ii, y + iii);
                if (neighbor && neighbor.state === "ship")
                {
                   return false; 
                } 
            }
        }
    }
    return true;
};

function allow_pos_y(x, y, length) {
    for (let i = 0; i < length; i++) 
    {

        if (x > 9 || y + i > 9) {return false};

        for (let ii = -1; ii <= 1; ii++) 
        {
            for (let iii = -1; iii <= 1; iii++) 
            {
                const neighbor = getCell(x+ii, y + i + iii);
                if (neighbor && neighbor.state === "ship")
                {
                   return false; 
                } 
            }
        }
    }
    return true;
};

function makeZanyat(x,y,length){
     for (let i = 0; i < length; i++) 
    {
        const cell = getCell(x + i, y);
        if (cell) {cell.state = "ship"};
    }
};

function makeZanyat_y(x,y,length){
     for (let i = 0; i < length; i++) 
    {
        const cell = getCell(x , y + i);
        if (cell) {cell.state = "ship"};
    }
};

function highlight(x, y, length, valid) {
    unHighlight();
    for (let i = 0; i < length; i++) 
    {
        const Cell = document.querySelector(`.cell[data-x_cords="${x + i}"][data-y_cords="${y}"]`);
        if (Cell) 
        {
            Cell.classList.add(valid ? "highlight_on" : "highlight_of");
        }
    }
};

function highlight_y(x, y, length, valid) {
    unHighlight();
    for (let i = 0; i < length; i++) 
    {
        const domCell = document.querySelector(`.cell[data-x_cords="${x}"][data-y_cords="${y + i}"]`);
        if (domCell) 
        {
            domCell.classList.add(valid ? "highlight_on" : "highlight_of");
        }
    }
};

function unHighlight() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("highlight_on", "highlight_of");
    });
};

let isVertical = false;
let gameStarted = false;

const rotateZone = document.querySelector(".rotate_zone");

const rotateBtn = document.createElement("button");
rotateBtn.classList.add("rotate_btn");
rotateBtn.textContent = "Повернуть";
rotateZone.appendChild(rotateBtn);

const rotateLabel = document.createElement("div");
rotateLabel.classList.add("rotate_label");
rotateLabel.textContent = "Горизонтально";
rotateZone.appendChild(rotateLabel);

rotateBtn.addEventListener("click", () => {
    isVertical = !isVertical;
    rotateLabel.textContent = isVertical ? "Вертикально" : "Горизонтально";
    rotateBtn.classList.toggle("rotate_btn_active", isVertical);
});

const ship_grid = document.querySelector(".menu_board");
ships.forEach((korabl, i) => {
    const shipBox = document.createElement("div");
    shipBox.classList.add("ship-box")

    const img = document.createElement("img");
    img.src = korabl.image;
    img.classList.add("sheep");
    img.draggable = true;
    img.style.width = (45 * korabl.length) + "px";
    img.style.height = 45 + "px";
    img.dataset.Index = i;

    const countBox = document.createElement("div");
    countBox.textContent = korabl.count;
    countBox.style.color = "white";
    countBox.style.textAlign = "center";
    countBox.style.fontSize = "14px";
    countBox.dataset.index = i;

    shipBox.appendChild(img);
    shipBox.appendChild(countBox);

    ship_grid.appendChild(shipBox);

    img.addEventListener("dragstart", e=> {
        if(korabl.count ===0) 
        {
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
    if (t !== undefined) 
    {
        sessionStorage.setItem("dragIndex", t)
    };
});

document.addEventListener("dragend", ()=> {
    sessionStorage.removeItem("dragIndex");
    unHighlight();
});

pole.addEventListener("dragover",e => {
    e.preventDefault();
    if (gameStarted){return};
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

    if (isVertical) 
    {
        highlight_y(x, y, korabl.length, allow_pos_y(x, y, korabl.length));
    } else 
    {
        highlight(x, y, korabl.length, allow_pos_x(x, y, korabl.length));
    }
});

pole.addEventListener("dragleave", () => unHighlight());

pole.addEventListener("drop",e =>{
    e.preventDefault();
    unHighlight();
    if (gameStarted){return};

    const index = parseInt(e.dataTransfer.getData("Index"), 10);
    if(isNaN(index)) {return};

    const korabl = ships[index];
    if(korabl.count <= 0){return};

    const rect = pole.getBoundingClientRect();
    const x = Opredelyator(e.clientX - rect.left);
    const y = Opredelyator(e.clientY - rect.top);

    if(x === null || y === null){return};



     if (isVertical) 
     {
        if(y + korabl.length > 10){return};
        if(!allow_pos_y(x, y, korabl.length)){return};

        korabl.count--;
        const count = document.querySelector(`[data-index="${index}"]`);
        if (count) {count.textContent = korabl.count};

        makeZanyat_y(x, y, korabl.length);

        const img = document.createElement("img");
        img.src = korabl.image;
        img.classList.add("on_field");

        img.style.left = (x * 45) + "px";
        img.style.top = (y * 45) + "px";
        img.style.width = (45 * korabl.length) + "px";
        img.style.height = 45 + "px";
        img.style.transformOrigin = "top left";
        img.style.transform = `rotate(90deg) translateY(-45px)`;
        img.dataset.x_cords = x;
        img.dataset.y_cords = y;
        img.dataset.length = korabl.length;
        img.dataset.Index = index;
        img.dataset.vertikal = "true";

        pole.appendChild(img);

        img.addEventListener("click", () => {
            for (let i = 0; i < korabl.length; i++) 
            {
                const cell = getCell(x, y + i);
                if (cell) {cell.state = "pusto"};
            }
            korabl.count++;
            const count = document.querySelector(`[data-index="${index}"]`);
            if (count) 
            {
                count.textContent = korabl.count;
            }
            img.remove();
        });

    } else 
    {
        if(x + korabl.length > 10) {return};
        if(!allow_pos_x(x, y, korabl.length)) {return};

        korabl.count--;
        const count = document.querySelector(`[data-index="${index}"]`);
        if (count) {count.textContent = korabl.count};

        makeZanyat(x, y, korabl.length);

        const img = document.createElement("img");
        img.src = korabl.image;
        img.classList.add("on_field");

        img.style.left = (x * 45) + "px";
        img.style.top  = (y * 45) + "px";
        img.style.width = (45 * korabl.length) + "px";
        img.style.height = 45 + "px";
        img.dataset.x_cords = x;
        img.dataset.y_cords = y;
        img.dataset.length = korabl.length;
        img.dataset.Index = index;

        pole.appendChild(img);

        img.addEventListener("click", () => {
            for (let i = 0; i < korabl.length; i++) 
            {
                const cell = getCell(x + i, y);
                if (cell) {cell.state = "pusto"};
            }
            korabl.count++;
            const count = document.querySelector(`[data-index="${index}"]`);
            if (count) 
            { 
                count.textContent = korabl.count; 
            }
            img.remove();
        });
    }
});

let difficulty = 1;

document.querySelectorAll(".d_check").forEach(radio => {
    radio.addEventListener("change", () => {
        difficulty = parseInt(radio.value);
    });
});


const shipsCount = [3, 2, 1, 1];



function clearPole() {
    document.querySelectorAll(".on_field").forEach(img => img.remove());
    field.forEach(cell => cell.state = "pusto");

    ships.forEach((korabl, i) => {
        korabl.count = shipsCount[i];
        const count = document.querySelector(`[data-index="${i}"]`);
        if (count) 
        {
            count.textContent = korabl.count
        };
    });
}

document.getElementById("clear").addEventListener("click", () => clearPole());


function randomPlace() {
    clearPole();

    ships.forEach((korabl, i) => {
        let placed = 0;


        while (placed < shipsCount[i]) 
        {
            const vertical = Math.random() < 0.5;

            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);

            if (vertical) 
            {
                if (y + korabl.length > 10) {continue};
                if (!allow_pos_y(x, y, korabl.length)) {continue};

                makeZanyat_y(x, y, korabl.length);

                const img = document.createElement("img");
                img.src = korabl.image;
                img.classList.add("on_field");

                img.style.left = (x * 45) + "px";
                img.style.top = (y * 45) + "px";
                img.style.width = (45 * korabl.length) + "px";
                img.style.height = 45 + "px";
                img.style.transformOrigin = "top left";
                img.style.transform = `rotate(90deg) translateY(-45px)`;
                img.dataset.x_cords = x;
                img.dataset.y_cords = y;
                img.dataset.length = korabl.length;
                img.dataset.Index = i;
                img.dataset.vertikal = "true";

                pole.appendChild(img);

                img.addEventListener("click", () => {
                    for (let i = 0; i < korabl.length; i++) 
                    {
                        const cell = getCell(x, y + i);
                        if (cell) {cell.state = "pusto"};
                    }
                    korabl.count++;
                    const count = document.querySelector(`[data-index="${i}"]`);
                    if (count) 
                    {
                        count.textContent = korabl.count;
                    }
                    img.remove();
                });

            } else 
            {
                if (x + korabl.length > 10) {continue};
                if (!allow_pos_x(x, y, korabl.length)) {continue};

                makeZanyat(x, y, korabl.length);

                const img = document.createElement("img");
                img.src = korabl.image;
                img.classList.add("on_field");
                img.style.left   = (x * 45) + "px";
                img.style.top    = (y * 45) + "px";
                img.style.width  = (45 * korabl.length) + "px";
                img.style.height = 45 + "px";
                img.dataset.x_cords = x;
                img.dataset.y_cords = y;
                img.dataset.length  = korabl.length;
                img.dataset.Index   = i;
                pole.appendChild(img);

                img.addEventListener("click", () => {
                    for (let i = 0; i < korabl.length; i++) 
                    {
                        const cell = getCell(x + i, y);
                        if (cell) {cell.state = "pusto"};
                    }
                    korabl.count++;
                    const count = document.querySelector(`[data-index="${i}"]`);
                    if (count) 
                    {
                        count.textContent = korabl.count;
                    }
                        img.remove();
                });
            }

            placed++;
            korabl.count--;
            const count = document.querySelector(`[data-index="${i}"]`);
            if (count) 
            {
                count.textContent = korabl.count
            };
        }
    });
}

document.getElementById("random").addEventListener("click", () => randomPlace());


document.getElementById("start").addEventListener("click", () => {
    if(difficulty ===0)
    {
        alert("Выберите сложность")
        return;
    }

    const placedCounter = ships.every((korabl, i) => korabl.count === 0);
    if (!placedCounter) 
    {
        alert("Расставьте все корабли");
        return;
    }

    const player_field = field.map(cell =>({
        x_cords:cell.x_cords,
        y_cords:cell.y_cords,
        state:cell.state
    }));

    gameStarted = true;
    document.getElementById("pole").classList.add("game_active");

    let wincount_player = 21;
    let wincount_bot = 21;

    let moves = 0;
    const start = Date.now();

    document.querySelectorAll(".on_field").forEach(img => {
        img.draggable = false;
        const copy = img.cloneNode(true);
        img.replaceWith(copy);
    });

    document.querySelector(".menu_board").style.display = "none";
    document.querySelector(".menu_btn").style.display = "none";
    document.querySelector(".rotate_zone").style.display = "none";


    const whole_part = document.querySelector(".whole_game_part");
    whole_part.style.justifyContent = "center";
    whole_part.style.alignItems = "center";
    whole_part.style.gap = "60px";
    whole_part.style.flexDirection = "column";


    const turn_label = document.createElement("div");
    turn_label.classList.add("turn_label");
    turn_label.textContent = "Ваш ход";
    whole_part.appendChild(turn_label);

    const fields_row = document.createElement("div");
    fields_row.classList.add("fields_row");
    whole_part.appendChild(fields_row);

    const pole_main = document.querySelector(".pole_main");
    const pole_box = document.querySelector(".pole_box");
    pole_main.remove();
    

    const player_side = document.createElement("div");
    player_side.classList.add("game_side");

    const player_title = document.createElement("div");
    player_title.classList.add("game_title");
    player_title.textContent = "Ваше поле";

    player_side.appendChild(player_title);
    player_side.appendChild(pole_box);



    const enemy_side = document.createElement("div");
    enemy_side.classList.add("game_side");

    const enemy_title = document.createElement("div");
    enemy_title.classList.add("game_title");
    enemy_title.textContent = "Поле противника";

    const enemy_field = document.createElement("div");
    enemy_field.classList.add("field");

    const enemy_letters = document.createElement("div");
    enemy_letters.classList.add("cells_name");

    const enemy_numbers = document.createElement("div");
    enemy_numbers.classList.add("cells_number");

    const enemy_pole = document.createElement("div");
    enemy_pole.classList.add("pole");
    enemy_pole.id = "pole_enemy";

    enemy_field.appendChild(enemy_letters);
    enemy_field.appendChild(enemy_numbers);
    enemy_field.appendChild(enemy_pole);


    createPole(enemy_pole, enemy_letters, enemy_numbers);

    enemy_side.appendChild(enemy_title);
    enemy_side.appendChild(enemy_field);

    fields_row.appendChild(player_side);
    fields_row.appendChild(enemy_side);


    let bot_field = [];
    for (let i = 0; i < 10; i++) 
    {
        for (let ii = 0; ii < 10; ii++) 
        {
            bot_field.push(new Cell(ii, i));
        }
    }

    function getBot_cell(x, y) 
    {
        return bot_field.find(c => c.x_cords === x && c.y_cords === y);
    }

     function allow_bot_x(x, y, length) 
     {
        for (let i = 0; i < length; i++) 
        {
            if (x + i > 9 || y > 9) {return false};
            for (let ii = -1; ii <= 1; ii++) 
            {
                for (let iii = -1; iii <= 1; iii++) 
                {
                    const n = getBot_cell(x + i + ii, y + iii);
                    if (n && n.state === "ship") {return false};
                }
            }
        }
        return true;
    }

    function allow_bot_y(x, y, length) {
        for (let i = 0; i < length; i++) 
        {
            if (x > 9 || y + i > 9) {return false};
            for (let ii = -1; ii <= 1; ii++) 
            {
                for (let iii = -1; iii <= 1; iii++) 
                {
                    const n = getBot_cell(x + ii, y + i + iii);
                    if (n && n.state === "ship") {return false};
                }
            }
        }
        return true;
    }


     ships.forEach((korabl, i) => {
        let placed = 0;
        let bad_tries = 0;
        while (placed < shipsCount[i] && bad_tries<100) 
        {
            bad_tries++;
            const vertical = Math.random() < 0.5;

            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);

            if (vertical) 
            {
                if (y + korabl.length > 10) {continue};
                if (!allow_bot_y(x, y, korabl.length)) {continue};
                for (let i = 0; i < korabl.length; i++) 
                {
                    const cell = getBot_cell(x, y + i);
                    if (cell) {cell.state = "ship"};
                }
            } else 
            {
                if (x + korabl.length > 10) {continue};
                if (!allow_bot_x(x, y, korabl.length)) {continue};
                for (let i = 0; i < korabl.length; i++) 
                {
                    const cell = getBot_cell(x + i, y);
                    if (cell) {cell.state = "ship"};
                }
            }
            placed++;
        }
    });

    let p_shots = [];
    let b_shots = [];

    function alreadyShot(shots_arr, x, y)
    {
        return shots_arr.some(i => i.x === x && i.y === y);
    };

    let p_hod = true;

    const directions = 
        [
            {
                hor:1,
                vert:0,
            },
            {
                hor:-1,
                vert:0,
            },
            {
                hor:0,
                vert:1,
            },
            {
                hor:0,
                vert:-1,
            }

        ];

    function checker(target,x,y)
    {
        let ship_cells = [{x,y}];

        for (let i of directions) 
        {
            let xx = x + i.hor;
            let yy = y + i.vert;
            while (xx >= 0 && xx <= 9 && yy >= 0 && yy <= 9) 
            {
                const c = target.find(cell => cell.x_cords === xx && cell.y_cords === yy);
                if (c && (c.state === "hit" || c.state === "ship")) 
                {
                    ship_cells.push({x: xx, y: yy});
                    xx += i.hor;
                    yy += i.vert;
                } else 
                    {
                    break;
                }
            }
        }
        const all_hit = ship_cells.every(i=> {
            const c = target.find(cell=> cell.x_cords === i.x && cell.y_cords === i.y);
            return (c && c.state === "hit");

        });

        if(all_hit)
        {
            return ship_cells
        } else
        {
            return null;
        }
    };

    function otcryvashka(target,utoplennyky, shots)
    {
        utoplennyky.forEach(i=>{
            for(let xx=-1;xx<=1;xx++) 
            {
                for(let yy=-1;yy<=1;yy++) 
            {
                const x_x = i.x +xx;
                const y_y = i.y +yy;
                if(x_x <0 || x_x>9 || y_y <0 || y_y>9) {continue};
                if(alreadyShot(shots,x_x,y_y)) {continue};

                shots.push({x: x_x, y: y_y});
                const cell = target.querySelector(`.cell[data-x_cords="${x_x}"][data-y_cords="${y_y}"]`);
                if (cell && !cell.classList.contains("cell_hit")) 
                {
                    cell.classList.add("cell_miss");
                }
            }
            }
        });
    };


    function Game_end(a) 
    {
        p_hod = false;
       
        const all_seconds = Math.floor((Date.now() - start)/1000);
        const minutes = Math.floor(all_seconds / 60);
        const seconds = all_seconds % 60;
        const final_time = minutes>0 ? `${minutes} минyт ${seconds} секунд` : `${seconds} секунд`;


        bot_field.forEach(c => {
            if (c.state === "ship") 
            {
                const cell = enemy_pole.querySelector(`.cell[data-x_cords="${c.x_cords}"][data-y_cords="${c.y_cords}"]`);
                if (cell) 
                {
                    cell.classList.add("cell_open");
                }
            }
        });


        const overlay = document.createElement("div");
        overlay.classList.add("modal_overlay");

        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modal_title = document.createElement("div");
        modal_title.classList.add("modal_title");
        modal_title.textContent = a;

        const modal_info = document.createElement("div");
        modal_info.classList.add("modal_info");
        modal_info.textContent = `Ходов: ${moves}      Время: ${final_time}`;

        const modal_btns = document.createElement("div");
        modal_btns.classList.add("modal_btns");

        const btn_menu = document.createElement("button");
        btn_menu.classList.add("modal_btn", "modal_btn_menu");
        btn_menu.textContent = "В меню";
        btn_menu.addEventListener("click", () => {
            window.location.href = "pole.html";
        });

        const btn_again = document.createElement("button");
        btn_again.classList.add("modal_btn", "modal_btn_again");
        btn_again.textContent = "Играть снова";
        btn_again.addEventListener("click", () => {
        window.location.href = "pole.html";
        });

        modal_btns.appendChild(btn_menu);
        modal_btns.appendChild(btn_again);

        modal.appendChild(modal_title);
        modal.appendChild(modal_info);
        modal.appendChild(modal_btns);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

    }


     enemy_pole.addEventListener("click", e => {
        if (!p_hod) {return};

        const cell = e.target.closest(".cell");
        if (!cell) {return};

        const x = parseInt(cell.dataset.x_cords);
        const y = parseInt(cell.dataset.y_cords);

        if (alreadyShot(p_shots, x, y)) {return};

        p_shots.push({x,y});

        moves++;

        const b_cell = getBot_cell(x, y);

        if (b_cell.state === "ship") 
        {
            b_cell.state = "hit";
            cell.classList.add("cell_hit");
            wincount_bot--;

            if (wincount_bot <= 0) 
            {
                Game_end("Вы победили");
                return;
            }

            const utop = checker(bot_field, x, y);
            if (utop) 
            {
                otcryvashka(enemy_pole, utop, p_shots);
            }

        } else 
        {
            b_cell.state = "miss";
            cell.classList.add("cell_miss");
            p_hod = false;
            turn_label.textContent = "Ход противника";
            setTimeout(b_Shoot, 1000);
        }
    });



    let lasthit    = null;
    let around_t   = [];   
    let direction_t    = null;
    let first_hit  = null;
    let going_back  = false;
    let hit_cells  = [];

    let hard_shot = 0;

    function addtargets(xx, yy) 
    {

        const neighbors = [
            {x: xx+1, y: yy},
            {x: xx-1, y: yy},
            {x: xx,   y: yy+1},
            {x: xx,   y: yy-1}
        ];

        for (let i = neighbors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
        };

        neighbors.forEach(i => {
            if (i.x < 0 || i.x > 9 || i.y < 0 || i.y > 9) {return};
            if (alreadyShot(b_shots, i.x, i.y)) {return};
            if (around_t.some(ii => ii.x === i.x && ii.y === i.y)) {return};
            around_t.push(i);
        });
    }

     function recalcTargets()
    {
        around_t = [];

        if (hit_cells.length === 0) {return};

        if (!direction_t)
        {
            addtargets(hit_cells[0].x, hit_cells[0].y);
            return;
        }

        const sorted = hit_cells.slice().sort((a, b) =>
            (a.x * direction_t.xx + a.y * direction_t.yy) -  (b.x * direction_t.xx + b.y * direction_t.yy)
        );

        const tail = sorted[0];             
        const head = sorted[sorted.length-1]; 

        const fwd = {x: head.x + direction_t.xx, y: head.y + direction_t.yy};
        if (fwd.x >= 0 && fwd.x <= 9 && fwd.y >= 0 && fwd.y <= 9 && !alreadyShot(b_shots, fwd.x, fwd.y))
        {
            around_t.push(fwd);
        }

        const bck = {x: tail.x - direction_t.xx, y: tail.y - direction_t.yy};
        if (bck.x >= 0 && bck.x <= 9 && bck.y >= 0 && bck.y <= 9 && !alreadyShot(b_shots, bck.x, bck.y))
        {
            around_t.push(bck);
        }
    }

    function resetHunt()
    {
        lasthit     = null;
        first_hit   = null;
        around_t    = [];
        direction_t = null;
        going_back  = false;
        hit_cells   = [];
    }

    function theory_Shot()
    {
        
        const check_size = [5, 4, 3, 2];

        let virt_pole = [];
        for (let i = 0; i < 10; i++) 
        {
            virt_pole.push([]);
            for (let ii = 0; ii < 10; ii++) 
            {
                virt_pole[i].push(0);
            }
        }

        check_size.forEach(size => {
            for (let row = 0; row < 10; row++) 
            {
                for (let col = 0; col <= 10 - size; col++) 
                {
                    let ok = true;
                    for (let i = 0; i < size; i++) 
                    {
                        const c = field.find(cell => cell.x_cords === col+i && cell.y_cords === row);

                        if (!c || c.state === "miss" || c.state === "hit") 
                        {
                            ok = false;
                            break;
                        }
                        if (alreadyShot(b_shots, col+i, row)) 
                        {
                            ok = false;
                            break;
                        }
                    }
                        if (ok) 
                        {
                            for (let i = 0; i < size; i++) 
                            {
                                virt_pole[row][col+i]++;
                            }
                        }
                    }
            }
            for (let col = 0; col < 10; col++) 
            {
                for (let row = 0; row <= 10 - size; row++) 
                {
                    let ok = true;
                    for (let i = 0; i < size; i++) 
                    {
                        const c = field.find(cell => cell.x_cords === col && cell.y_cords === row+i);
                        if (!c || c.state === "miss" || c.state === "hit") 
                        {
                            ok = false;
                            break;
                        }
                        if (alreadyShot(b_shots, col, row+i)) 
                        {
                            ok = false;
                            break;
                        }
                    }
                    if (ok) 
                    {
                        for (let i = 0; i < size; i++) 
                        {
                            virt_pole[row+i][col]++;
                        }
                    }
                }
            }
        });

        let max_theo = 0;
        for (let row = 0; row < 10; row++) 
        {
            for (let col = 0; col < 10; col++) 
            {
                if (virt_pole[row][col] > max_theo) 
                {
                    max_theo = virt_pole[row][col];
                }
            }
        };

        let best = [];
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) 
            {
                if (virt_pole[row][col] === max_theo && !alreadyShot(b_shots, col, row)) 
                {
                    best.push({x: col, y: row});
                }
            }
        };

        if (best.length === 0) 
        {
            let x
            let y;
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (alreadyShot(b_shots, x, y));
            return {x, y};
        }

        return best[Math.floor(Math.random() * best.length)];
    }

    function doShot(x, y) {
        b_shots.push({x, y});

        const p_cell = getCell(x, y);
        const cell = document.querySelector(`#pole .cell[data-x_cords="${x}"][data-y_cords="${y}"]`);

        
        if (p_cell.state === "ship")
        {
            p_cell.state = "hit";
            if (cell) 
            {
                cell.classList.add("cell_hit");
            }

            wincount_player--;

            if (wincount_player <= 0)
            {
                Game_end("Вы проиграли");
                return;
            }

            const utop = checker(field, x, y);

            if (utop)
            {
                otcryvashka(document.getElementById("pole"), utop, b_shots);
                resetHunt();
                setTimeout(b_Shoot, 1000);
                return;
            }

            if (difficulty === 1)
            {
                setTimeout(b_Shoot, 1000);
                return;
            }

            if (difficulty === 2 || difficulty === 3)
            {
                hit_cells.push({x, y});

                if (hit_cells.length === 2)
                {
                    direction_t = {
                        xx: hit_cells[1].x - hit_cells[0].x,
                        yy: hit_cells[1].y - hit_cells[0].y
                    };
                }

                recalcTargets();

                setTimeout(b_Shoot, 1000);
                return;
            }

        } else
        {
            p_cell.state = "miss";
            if (cell) 
            {
                cell.classList.add("cell_miss");
            }

            if ((difficulty === 2 || difficulty === 3) && hit_cells.length > 0)
            {
                recalcTargets();
            }
        }

        p_hod = true;
        turn_label.textContent = "Ваш ход";
    }



 function b_Shoot()
    {
        let x;
        let y;

        if ((difficulty === 2 || difficulty === 3) && around_t.length > 0)
        {
            while (around_t.length > 0 && alreadyShot(b_shots, around_t[0].x, around_t[0].y))
            {
                around_t.shift();
            }
            if (around_t.length > 0)
            {
                const target = around_t.shift();
                x = target.x;
                y = target.y;
                doShot(x, y);
                return;
            }
        }
       
        if (difficulty === 3 && b_shots.length >= 20)
        {
            const best = theory_Shot();
            x = best.x;
            y = best.y;
        }
        else
        {
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } 
            while (alreadyShot(b_shots, x, y));
        }

        doShot(x, y);
    }

});


    





