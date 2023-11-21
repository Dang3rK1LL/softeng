function createDivs(count) {
    const divs = [];
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        divs.push(div);
    }
    return divs;
}

function fillPascalsTriangle(divs) {
    const rows = divs.length;
    for (let row = 0; row < rows; row++) {
        let number = 1;
        for (let col = 0; col <= row; col++) {
            divs[row].textContent += number + ' ';
            number = number * (row - col) / (col + 1);
        }
    }
}

function displayDivs(containerId, divs) {
    const container = document.getElementById(containerId);
    divs.forEach(div => container.appendChild(div));
}

const divs = createDivs(10);
fillPascalsTriangle(divs);
displayDivs('pascal-triangle', divs);