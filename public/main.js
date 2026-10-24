// constants
const url = 'http://localhost:7017/number/';
const form = document.querySelector('form');
const to = document.querySelector('#to');
const display = document.querySelector('#display');

// form execution & display
form.addEventListener('submit',async e => {
    e.preventDefault();
    e.stopPropagation();

    const results = await getData(to.value);

    // display part : *****************************************

    // the table part:
    // calculating the cell width
    const lastDigit = results.list[results.list.length -1];
    const lastDigitWidth = lastDigit.toString().length + 4;

    // calculating the number of columns, rows and cells
    const numberOfCells = results.list.length;
    const windowWidth = window.innerWidth / 16;
    const numberOfColumns = Math.floor(windowWidth / (lastDigit.toString().length + 2));
    const numberOfRows = Math.ceil(numberOfCells / numberOfColumns);

    console.log(numberOfCells, windowWidth, numberOfColumns, numberOfRows);

    // creating the table
    let table = '<table>';

    let cellIndex = 0;
    for (let rows = 1 ; rows <= numberOfRows; rows++) {
        let row = '<tr>';
        for (let columns = 1 ; columns <= numberOfColumns; columns++) {
            row = row + `<td>${results.list[cellIndex] || ''}</td>`;
            cellIndex++ ;
        }
        row = row + '</tr>';
        table = table + row;
    }

    table = table + '</table';

    // the content part:
    const content = results.ok ? `
    ${results.msg} <br><br>
    <span ${results.isPrime ? '': 'style="color: red"'}>The Number: ${results.number} is${results.isPrime ? '' : ' NOT'} a prime number.</span>
    <br><br>
    The list of Prime Numbers from 2 to ${lastDigit}:
    <br>
    Total Number of items = ${numberOfCells};
    <br><br>
    ${table}
    ` : `
    ${results.msg}
    `;
    display.innerHTML = content;

    // highlighting the cell with targeted value
    const cells = document.querySelectorAll('td');
    const targetedCell = Array.from(cells).find(cell => cell.innerText.trim() === to.value);

    targetedCell.classList.add('highlight');

});

// api functions:

async function getData(number) {
    try {
        const response = await fetch(url + number, {method: 'GET'});
        console.log(url + number);

        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error.message);
    }
}


