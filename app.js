
var tableroArray = [
    [null,1,null,1,null,null,null,null],
    [null,null,null,null,1,null,1,null],
    [null,2,null,null,,null,null,null],
    [null,null,1,null,1,null,null,null],
    [null,null,null,null,null,null,null,2],
    [null,null,null,null,null,2,null,null],
    [null,null,null,2,null,null,null,null],
    [2,null,2,null,null,null,null,null]
];


var tablero = document.getElementById('tablero');

for (let i = 0; i < tableroArray.length; i++) {
    
        var newDivFila = document.createElement('div');
        newDivFila.className = 'fila-' + i;
        tablero.appendChild(newDivFila);

        for (let j = 0; j < tableroArray[i].length; j++) {
       
            var newDivCell = document.createElement('div');
            newDivCell.className = 'casilla'
            newDivCell.id = 'fila-' + i +'-col-' + j;
            newDivFila.appendChild(newDivCell);

        }
}

console.log(tablero);
    










     



