
const header = document.getElementById('header');
const main = document.getElementById('main');
const inputBtn = document.getElementById('inputBtn');
const loader = document.getElementById('loader');
const gridContainer = document.getElementById('gridContainer');
const fileInput = document.getElementById('fileInput');
const downloadButton = document.getElementById('downloadButton');
let maxHeight = Infinity;

document.addEventListener('DOMContentLoaded', () => {
    header.innerHTML = 'Resumen del año';

    fileInput.addEventListener('change', handleFileSelect);
    downloadButton.addEventListener('click', downloadGrid);
});

function handleFileSelect(event) {
    const files = event.target.files;

    if (files.length !== 12) {
        alert('Por favor, seleccione exactamente 12 archivos.');
        return;
    }

    gridContainer.innerHTML = '';

    main.style.visibility = "hidden";
    inputBtn.style.visibility = "hidden";
    loader.classList.remove('hidden');

    setImage(files).then(() => {
        main.style.visibility = "visible";
        inputBtn.style.visibility = "visible";
        loader.classList.add('hidden');
        main.classList.add('main-alter');
        downloadButton.style.display = 'block';
    });
}

function setImage(files) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let i = 0; i < files.length; i++) {
                const monthName = getMonthName(i + 1);

                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.innerHTML = `
                    <p class="underline">${monthName}</p>
                    <div class="imgContainer">
                        <img src="${URL.createObjectURL(files[i])}" alt="${monthName}">
                    </div>
                `;

                gridContainer.appendChild(gridItem);
            }
            resolve();
        }, 1000);
    });
}

function downloadGrid() {
    const finalCanvas = document.getElementById('finalCanvas');

    html2canvas(finalCanvas).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'recopilatorio.png';
        link.click();
    });
}

function getMonthName(month) {
    const monthNames = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];
    return monthNames[month - 1];
}