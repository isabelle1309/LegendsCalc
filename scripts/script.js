function query(sel) {
    return document.querySelector(sel);
}

query("#title").addEventListener("click", () => {
    calculate(true);
    calculate(false);
})

const plus = document.createElement("p");
plus.id = 'plusid';
plus.style.position = 'fixed';
plus.style.border = '1px solid transparent';
plus.style.top = '20.5vh';
plus.style.left = '40.4vw';
plus.style.textAlign = 'right';
plus.style.fontSize = '166%';
plus.style.width = '4vw';
plus.textContent = '0';
const minus = document.createElement("p");
minus.id = 'minusid';
minus.style.position = 'fixed';
minus.style.border = '1px solid transparent';
minus.style.top = '20.5vh';
minus.style.left = '89.4vw';
minus.style.textAlign = 'right';
minus.style.fontSize = '166%';
minus.style.width = '4vw';
minus.textContent = '0';
const calc = document.createElement("p");
calc.id = 'calcid';
calc.style.position = 'fixed';
calc.style.border = '1px solid transparent';
calc.style.top = '12.3vh';
calc.style.left = '89.7vw';
calc.style.textAlign = 'right';
calc.style.fontSize = '228%';
calc.style.width = '4vw';
calc.textContent = `0`;

document.body.appendChild(plus);
document.body.appendChild(minus);
document.body.appendChild(calc);

const form = query("#scoreform");
form.style.marginTop = '17.1vh';

var calcint = 0;
var plusint = 0;
var minusint = 0;

for (let index = 1; index <= 16; index++) {

    const container = document.createElement("div");
    const prefix = document.createElement("span");
    const input = document.createElement("input");

    prefix.textContent = "+";
    prefix.style.fontSize = "166%";
    prefix.style.position = 'relative'
    prefix.style.left = '41vw'

    input.type = "text";
    input.id = `score${index}`;
    input.style.backgroundColor = "transparent";
    input.style.border = "1px solid transparent";
    input.style.textAlign = "right";
    input.style.fontSize = "166%";
    input.style.width = "2.2vw";
    input.style.marginTop = "0.87vw";
    input.style.padding = "0.78vw 0.2vw";
    input.style.marginLeft = "41.5vw";

    if (index % 2 == 0) {
        input.style.marginLeft = "39.5vw";
        prefix.style.left = '39vw'
        prefix.textContent = "-";
    }

    input.addEventListener("input", () => {
        calculate(false);
    });

    container.appendChild(prefix);
    container.appendChild(input);

    form.appendChild(container);

    input.tabIndex = index % 2 === 1 ? (index + 1) / 2 : 8 + index / 2;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculate(option) {
    calcint = 0;
    plusint = 0;
    minusint = 0;
    var emptycount = 0;

    for (let index = 1; index <= 16; index++) {
        const inputEl = query(`#score${index}`);
        const value = parseInt(inputEl.value) || 0;

        inputEl.style.color = 'white';

        if (value < 0 || value > 40) {
            alert("A score is less than 0 or more than 40.")
            inputEl.style.color = 'red';
        }

        if (index % 2 == 0) {
            calcint -= value;
            minusint += value;
            if (value === 0) {
                emptycount++;
            }
        } else {
            calcint += value;
            plusint += value;
        }
    }

    if (option) {
        const divisor = 8 - emptycount;
        const averageMinus = divisor > 0 ? Math.floor(minusint / divisor) : 0;

        for (let index = 2; index <= 16; index += 2) {
            const inputEl = query(`#score${index}`);
            if (!inputEl.value || parseInt(inputEl.value) === 0) {
                let randnum = getRandomInt(-7, 7) + averageMinus;
                if (randnum > 40) randnum = 40;
                if (randnum < 0) randnum = 0;

                inputEl.value = randnum;
                console.log(randnum);
            }
        }
    }

    query("#calcid").textContent = calcint;
    query("#plusid").textContent = plusint;
    query("#minusid").textContent = minusint;
}