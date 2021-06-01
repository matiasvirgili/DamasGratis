
var tableroArray = [
    [null,1,null,1,null,null,null,null],
    [null,null,null,null,1,null,1,null],
    [null,2,null,null,,null,null,null],
    [null,null,2,null,1,null,2,null],
    [null,null,null,null,null,null,null,2],
    [null,null,null,null,null,2,null,null],
    [null,null,null,2,null,null,null,null],
    [2,null,2,null,null,null,null,null]
];

// TABLERO

var tablero = document.getElementById('tablero');

var contador = 0;

for (let i = 0; i < tableroArray.length; i++) {
    
        var newDivFila = document.createElement('div');
        newDivFila.className = 'fila fila-' + i;
        tablero.appendChild(newDivFila);

        contador = i % 2;

        for (let j = 0; j < tableroArray[i].length; j++) {

            var newDivCell = document.createElement('div');

            if (contador === 0) {
                newDivCell.className = 'casilla clara';
                contador++;
            }else{
                newDivCell.className = 'casilla oscura';
                contador--;
            }

            newDivCell.id = 'fila-' + i +'-col-' + j;
            newDivFila.appendChild(newDivCell);
        }
}

// DAMAS   


for (let i = 0; i < tableroArray.length; i++) {
    
    for (let k = 0; k < tableroArray[i].length; k++) {
        
        var DivCelda = document.getElementById('fila-' + i +'-col-' + k);

        if (tableroArray[i][k] === 1) {
            
            var NewDama = document.createElement('div');
            NewDama.className = 'roja';
            DivCelda.appendChild(NewDama);

        }else{

            if (tableroArray[i][k] === 2) {

                var NewDama = document.createElement('div');
                NewDama.className = 'blanca';
                DivCelda.appendChild(NewDama);
            }
        }

    }
}


// PUNTOS DE JUGADORES

var puntosJugador1 = document.getElementById('puntos-jugador1');
var puntosJugador2 = document.getElementById('puntos-jugador2');
var puntosJ1 = 12;
var puntosJ2 = 12;
tableroArray.forEach(function(fila, index){

    fila.forEach(function(celda, index){

        if (celda === 1) {
            puntosJ1--;
        }
        if (celda === 2) {
            puntosJ2--;
        }
    })
})

puntosJugador1.innerHTML = puntosJ2;
puntosJugador2.innerHTML= puntosJ1;

// TURNO DE JUGADORES

var contador = 0;
var jugador1 = document.getElementById('jugador1');
var jugador2 = document.getElementById('jugador2');

var damaBlanca = document.getElementsByClassName('blanca');

var damaRoja = document.getElementsByClassName('roja');
    
    for (var i=0; i< damaRoja.length; i++) {

        damaRoja[i].addEventListener("click",function() {

            if (contador === 0) {
            
                jugador2.style.boxShadow = 'none';
                jugador1.style.boxShadow = '0 0 5px red'
                contador++;
            }
            
        });
    }

    for (var i=0; i< damaBlanca.length; i++) {

        damaBlanca[i].addEventListener("click",function() {

            if (contador === 1) {
            
                jugador1.style.boxShadow = 'none';
                jugador2.style.boxShadow = '0 0 5px red'
                contador--;
            }
            
        });
    }














     



