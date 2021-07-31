// VARIABLES GLOBALES

var turno = 1
var fichasAmarillas = document.getElementsByClassName('damasAmarillas')
var fichasVerdes = document.getElementsByClassName('damasVerdes')
var jugador1 = document.getElementById('jugador1');
var jugador2 = document.getElementById('jugador2');
var primerJugador = document.getElementById('jugador-1')
var segundoJugador = document.getElementById('jugador-2')
var parrafoPuntosJugador1 = document.getElementById('puntos-jugador1')
var parrafoPuntosJugador2 = document.getElementById('puntos-jugador2')

var damaSelec = {
  idFila: null,
  idColumna: null,
  esRey: false,
  movIzq: false,
  movDer: false,
  movComerIzq: false,
  movComerDer: false,
  movPintarIzq: null,
  movPintarDer: null,
  movComerDerPintado: null,
  movComerIzqPintado: null,
  movFilaPintar: null,
  movFilaComerPintado: null,
}

var MovimientosPermitidos = {
  SeguirMovDer: true,
  SeguirMovIzq: true,
}


// TABLERO

// var tableroArray = [
//   [null, 1, null, 1, null, 1, null, 1],
//   [1, null, 1, null, 1, null, 1, null],
//   [null, 1, null, 1, null, 1, null, 1],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [2, null, 2, null, 2, null, 2, null],
//   [null, 2, null, 2, null, 2, null, 2],
//   [2, null, 2, null, 2, null, 2, null],
// ]

var tableroArray = [
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, 1, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, 1, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, 22, null, null, null],
]

function crearTablero() {
  var tablero = document.getElementById('tablero')

  var contador = 0

  for (let i = 0; i < tableroArray.length; i++) {
    var newDivFila = document.createElement('div')
    newDivFila.className = 'fila fila-' + i
    tablero.appendChild(newDivFila)

    contador = i % 2

    for (let j = 0; j < tableroArray[i].length; j++) {
      var newDivCell = document.createElement('div')

      if (contador === 0) {
        newDivCell.className = 'casillasBlancas'
        contador++
      } else {
        newDivCell.className = 'casillasNegras'
        contador--
      }

      newDivCell.id = 'fila-' + i + '-col-' + j
      newDivFila.appendChild(newDivCell)
    }
  }
  crearDamas()
}
crearTablero()

function crearDamas() {
  for (let i = 0; i < tableroArray.length; i++) {
    for (let k = 0; k < tableroArray[i].length; k++) {
      var DivCelda = document.getElementById('fila-' + i + '-col-' + k)

      if (tableroArray[i][k] === 1) {
        var NewDama = document.createElement('div')
        NewDama.className = 'damasAmarillas'
        DivCelda.appendChild(NewDama)
      }  
      if (tableroArray[i][k] === 2) {
        var NewDama = document.createElement('div')
        NewDama.className = 'damasVerdes'
        DivCelda.appendChild(NewDama)
      }
      if (tableroArray[i][k] === 11) {
        var NewDama = document.createElement('div')
        NewDama.className = 'damasAmarillas rey'
        DivCelda.appendChild(NewDama)
      }  
      if (tableroArray[i][k] === 22) {
        var NewDama = document.createElement('div')
        NewDama.className = 'damasVerdes rey'
        DivCelda.appendChild(NewDama)
      }
      
    }
  }
}

function agregarEvento() {
  if (turno === 1) {
    for (var i = 0; i < fichasAmarillas.length; i++) {
      fichasAmarillas[i].addEventListener('click', obtenerFichaSeleccionada)
    }
  } else {
    for (var i = 0; i < fichasVerdes.length; i++) {
      fichasVerdes[i].addEventListener('click', obtenerFichaSeleccionada)
    }
  }
}

function obtenerFichaSeleccionada(ev) {
  resetearTablero()
  damaSelec.idFila = parseInt(ev.path[1].id.substring(5, 6))
  damaSelec.idColumna =  parseInt(ev.path[1].id.substring(11, 12))

  if (ev.target.classList.contains('rey')) {
    damaSelec.esRey = true;
  }
  else{
    damaSelec.esRey = false;
  }
  
  if (damaSelec.esRey === false) {
    resetearObjMovPermitidos() //funcion que resetea el objeto que utilizamos para saber si se puede seguir con el movimiento, o ya hay una obstruccion
    buscarEspaciosDisponibles(damaSelec.idFila, damaSelec.idColumna, 1, 1)
  }
  else{ //Si la dama seleccionada es rey
    resetearObjMovPermitidos()
    for (let a = 1; a < 8; a++) { //Utilizamos el "for" para recorrer el tablero en forma diagonal a la dama seleccionada
      buscarEspaciosDisponibles(damaSelec.idFila, damaSelec.idColumna, a, -a) //Se utiliza el "-a" para las filas inversas al sentido de las damas comunes
    }
    resetearObjMovPermitidos()
    resetearObjeto();
    for (let a = 1; a < 8; a++) {
      buscarEspaciosDisponibles(damaSelec.idFila, damaSelec.idColumna, a, a) //En este for se utiliza las a para seguir diagonalmente el sentido de las dama comun
    }
  }
  
}

function buscarEspaciosDisponibles(fila, columna, aMoverColumna, aMoverFila) {
  damaSelec.movPintarIzq = columna - aMoverColumna
  damaSelec.movPintarDer = columna + aMoverColumna

  if (turno === 1) {
    damaSelec.movFilaPintar = fila + aMoverFila
  } else {
    damaSelec.movFilaPintar = fila - aMoverFila
  }
  if (MovimientosPermitidos.SeguirMovDer === true) { //Si la dama no se encontro con ninguna obstruccion anteriormente
    if (damaSelec.movPintarDer <= 7 && damaSelec.movFilaPintar <= 7 && damaSelec.movFilaPintar >= 0) { //Validamos que los movimientos no excedan el tablero
      if (tableroArray[damaSelec.movFilaPintar][damaSelec.movPintarDer] === null) { //Verificamos que el espacio de la derecha a mover sea nulo

          damaSelec.movDer = true
      
          var divPintar = document.getElementById('fila-' +damaSelec.movFilaPintar +'-col-' +damaSelec.movPintarDer)
          divPintar.style.backgroundColor = 'red'

      }
      else{
        MovimientosPermitidos.SeguirMovDer = false //Si se encuentra con una dama, esta dejara de verificar movimientos
        damaSelec.movDer = false //Si se encuentra con una obstruccion, no se le asignara el evento a la derecha en AgregarClicksPosibles()
      }  
    } else{
      damaSelec.movDer = false //Si se excede del tablero, no se le asignara el evento a la derecha en AgregarClicksPosibles()
    }
  }
if (MovimientosPermitidos.SeguirMovIzq === true) { //Si la dama no se encontro con ninguna obstruccion anteriormente
  if (damaSelec.movPintarIzq >= 0 && damaSelec.movFilaPintar >= 0  && damaSelec.movFilaPintar <= 7) { //Validamos que los movimientos no excedan el tablero
    if (tableroArray[damaSelec.movFilaPintar][damaSelec.movPintarIzq] === null) { //Verificamos que el espacio de la derecha a mover sea nulo

        damaSelec.movIzq = true

        var divPintar = document.getElementById('fila-' + damaSelec.movFilaPintar +'-col-' + damaSelec.movPintarIzq)
        divPintar.style.backgroundColor = 'red'

    }
    else{
        MovimientosPermitidos.SeguirMovIzq = false //Si se encuentra con una dama, esta dejara 
        damaSelec.movIzq = false //Si se encuentra con una obstruccion, no se le asignara el evento a la derecha en AgregarClicksPosibles()
      }
  } else{
    damaSelec.movIzq = false //Si se excede del tablero, no se le asignara el evento a la derecha en AgregarClicksPosibles()
  }
}
  comprobarComer(aMoverFila, aMoverColumna)
}

function comprobarComer(aMoverFila, aMoverColumna) {
  var damaEnemiga = 0
  var damaEnemigaRey = 0

  damaSelec.movComerDerPintado = damaSelec.idColumna + aMoverColumna +  1
  damaSelec.movComerIzqPintado = damaSelec.idColumna - aMoverColumna -  1

  if (damaSelec.movFilaPintar >= 0 && damaSelec.movFilaPintar <= 7) { //Validamos que el posible movimiento no se exceda del tablero
    
    if (turno === 1) { 
      if (aMoverFila > 0 || damaSelec.esRey === false) { //Si el movimiento de fila sigue el sentido de la dama comun o no es rey
        damaSelec.movFilaComerPintado = damaSelec.idFila + aMoverFila + 1
      }
      else{                                             //Si el movimiento de fila sigue el sentido inverso de la dama comun y es rey
        damaSelec.movFilaComerPintado = damaSelec.idFila + aMoverFila - 1
      }
      damaEnemiga = 2
      damaEnemigaRey = 22
    }else {
        if (aMoverFila > 0 || damaSelec.esRey === false) {
          damaSelec.movFilaComerPintado = damaSelec.idFila - aMoverFila - 1 //Si el movimiento de fila sigue el sentido de la dama comun o no es rey
        }
        else{
          damaSelec.movFilaComerPintado = damaSelec.idFila + (-(aMoverFila)) + 1 //Si el movimiento de fila sigue el sentido inverso de la dama comun y es rey
        }
        damaEnemiga = 1
        damaEnemigaRey = 11
    }

      if (damaSelec.movComerDerPintado <= 7 && damaSelec.movFilaComerPintado <= 7 && damaSelec.movFilaComerPintado >= 0) {   //Validamos que el posible movimiento no se exceda del tablero
  
        if ((tableroArray[damaSelec.movFilaPintar][damaSelec.movPintarDer] === damaEnemiga || tableroArray[damaSelec.movFilaPintar][damaSelec.movPintarDer] === damaEnemigaRey) && tableroArray[damaSelec.movFilaComerPintado][damaSelec.movComerDerPintado] === null) {
          //Verificamos que la dama a la derecha tenga una dama enemiga (comun o rey) y el espacio siguiente sea nulo
          
          damaSelec.movComerDer = true 
          MovimientosPermitidos.SeguirMovDer = false //Si esta permitido comer, ya no se seguira movimiento a la derecha
          
          var divPintar = document.getElementById('fila-' + damaSelec.movFilaComerPintado +'-col-' +damaSelec.movComerDerPintado)
          divPintar.style.backgroundColor = 'red'
          
        }
      } else{
          damaSelec.movComerDer = false //Si no se encuentra dama enemiga en el espacio a la derecha o se encuentra pero el proximo no es nulo, no se permitira comer
      }
  
      if (damaSelec.movComerIzqPintado >= 0 && damaSelec.movFilaComerPintado <= 7 && damaSelec.movFilaComerPintado >= 0) { //Validamos que el posible movimiento no se exceda del tablero
        if ((tableroArray[damaSelec.movFilaPintar][damaSelec.movPintarIzq] === damaEnemiga || tableroArray[damaSelec.movFilaPintar][damaSelec.movPintarIzq] === damaEnemigaRey) && tableroArray[damaSelec.movFilaComerPintado][damaSelec.movComerIzqPintado] === null) {
          //Verificamos que la dama a la derecha tenga una dama enemiga (comun o rey) y el espacio siguiente sea nulo
          damaSelec.movComerIzq = true
          MovimientosPermitidos.SeguirMovIzq = false //Si esta permitido comer, ya no se seguira movimiento a la izquierda
  
          
          var divPintar = document.getElementById('fila-' +  damaSelec.movFilaComerPintado +'-col-' +damaSelec.movComerIzqPintado)
          divPintar.style.backgroundColor = 'red'
        }
      }
      else{
        damaSelec.movComerIzq = false //Si no se encuentra dama enemiga en el espacio a la izquierda o se encuentra pero el proximo no es nulo, no se permitira comer
      }
    } 
  agregarClickPosiblesMov(aMoverFila, aMoverColumna);
}

  function agregarClickPosiblesMov(aMoverFila, aMoverColumna) { 
    //Utilizamos esta funcion para asignarle eventos a los posibles movimientos corroborados en las funciones anteriores
    
    if (damaSelec.movIzq) {
      var divMover = document.getElementById('fila-' +damaSelec.movFilaPintar +'-col-' + damaSelec.movPintarIzq)
      divMover.setAttribute('onClick', 'moverFicha(' + damaSelec.movFilaPintar + ',' + damaSelec.movPintarIzq +', "",' + aMoverFila + ',' + aMoverColumna + ')')
    }
    if (damaSelec.movDer) {
      var divMover = document.getElementById('fila-' + damaSelec.movFilaPintar +'-col-' + damaSelec.movPintarDer)
      divMover.setAttribute('onClick', 'moverFicha(' + damaSelec.movFilaPintar + ',' + damaSelec.movPintarDer + ', "",' + aMoverFila + ',' + aMoverColumna +')')
    }
    if (damaSelec.movComerDer) {
      var divMover = document.getElementById('fila-' + damaSelec.movFilaComerPintado +'-col-' + damaSelec.movComerDerPintado)
      divMover.setAttribute('onClick', 'moverFicha(' + damaSelec.movFilaComerPintado + ',' + damaSelec.movComerDerPintado + ', "derecha",' + aMoverFila + ',' + aMoverColumna +')')
    }
    if (damaSelec.movComerIzq) {
      var divMover = document.getElementById('fila-' + damaSelec.movFilaComerPintado +'-col-' + damaSelec.movComerIzqPintado)
      divMover.setAttribute('onClick', 'moverFicha(' + damaSelec.movFilaComerPintado + ',' + damaSelec.movComerIzqPintado +', "izquierda",' + aMoverFila + ',' + aMoverColumna +')')
    }
  } 
  
function resetearTablero() {
 
  var tablero = document.getElementById('tablero')

  tablero.innerHTML = ''
  quitarEvento = true

  crearTablero() //Creacion de tablero
  resetearObjeto() //Reseteo del objeto que comprende todos los movimientos de la dama seleccionada
}

function moverFicha(filaMover, columnaMover, tipoComer, aMoverFila, aMoverColumna) {

  //Guardo la casilla donde iria la dama despues de comer
  var divPadre = document.getElementById('fila-' + filaMover +'-col-' + columnaMover)
  //creo la dama nueva 
  var newDama = document.createElement('div')
  
  if (turno === 1) {
    newDama.className = 'damasAmarillas'
    if (tableroArray[damaSelec.idFila][damaSelec.idColumna] === 11) { //Si la dama es rey, va a tener 11 el tablero
      tableroArray[filaMover][columnaMover] = 11; 
    }else{
      tableroArray[filaMover][columnaMover] = 1; //Si la dama es comun tiene un 1
    }
  } else {
    newDama.className = 'damasVerdes'
     if (tableroArray[damaSelec.idFila][damaSelec.idColumna] === 22) { //Si la dama es rey, va a tener 22 en el tablero
      tableroArray[filaMover][columnaMover] = 22;
    }else{
      tableroArray[filaMover][columnaMover] = 2; //Si la dama es comun tiene un 1
    }
  }

  if (filaMover === 0 || filaMover === 7) { //Si la dama llega al final del tablero se tiene que convertir en rey
    if (damaSelec.esRey === false) {
      newDama.classList.add('rey') //Una vez que llego a cualquiera de las dos filas (0 o 7) se le asigna la clase rey
      if (turno === 1) {
        tableroArray[filaMover][columnaMover] = 11; //Una vez que se convierte en rey deja de tener 1 y pasa a tener 11
      }
      else{
      tableroArray[filaMover][columnaMover] = 22; //Una vez que se convierte en rey deja de tener 2 y pasa a tener 22
      }
    }
  }
  divPadre.appendChild(newDama) //Asigno la dama a la casilla correspondiente
  
  
  var divViejo = document.getElementById('fila-' + damaSelec.idFila +'-col-' +  damaSelec.idColumna) //Obtengo la casilla de la dama seleccionada antes del movimiento
  divViejo.innerHTML = '' //Elimino la dama de la casilla antigua
  tableroArray[damaSelec.idFila][damaSelec.idColumna] = null;  //Elimino la dama antigua del tablero
  
  //ELIMINACION DE LA FICHA DEL USUARIO CONTRARIO SI LO COME
  var fila = 0 

  if (turno === 1) {
    fila = damaSelec.idFila + aMoverFila //Guardo la fila del enemigo
  }
  else{
    fila = damaSelec.idFila - aMoverFila //Guardo la fila del enemigo en el turno 2
  }

  if (tipoComer == 'izquierda') { //Verifico si el movimiento a comer es hacia la izquierda
    var divEnemigo = document.getElementById('fila-' + (fila)  +'-col-' +  (damaSelec.idColumna - aMoverColumna)) //obtengo el div de la casilla en la cual esta la dama enemiga
    divEnemigo.innerHTML = '' //Elimino la dama enemiga
    tableroArray[fila][damaSelec.idColumna - aMoverColumna] = null //Eliminacion logica de la dama enemiga
  }
  if (tipoComer == 'derecha') { //Verifico si el movimiento a comer es hacia la derecha
    var divEnemigo = document.getElementById('fila-' + (fila)  +'-col-' +  (damaSelec.idColumna + aMoverColumna)) //obtengo el div de la casilla en la cual esta la dama enemiga
    divEnemigo.innerHTML = '' //Elimino la dama enemiga
    tableroArray[fila][damaSelec.idColumna + aMoverColumna] = null //Eliminacion logica de la dama enemiga
  }
  
  actualizarPuntos()
  cambiarTurno()
  resetearTablero()
}


function actualizarPuntos() {
  var parrafoPuntosJugador1 = null
  var parrafoPuntosJugador2 = null
  
  parrafoPuntosJugador1 = document.getElementById('puntos-jugador1')
  parrafoPuntosJugador1.innerHTML = 13 - fichasVerdes.length

  parrafoPuntosJugador2 = document.getElementById('puntos-jugador2')
  parrafoPuntosJugador2.innerHTML = 13 - fichasAmarillas.length
  
  if (fichasAmarillas.length === 1) {
    setTimeout(()=>{
      swal('¡Felicitaciones ' + nombreJugador1.innerHTML + ' ganaste la partida!')
    },300)
    guardarHistorial()
  }
  if (fichasVerdes.length === 1) {
   setTimeout(()=>{
      swal('¡Felicitaciones ' + nombreJugador2.innerHTML + ' ganaste la partida!')
    },300)
    guardarHistorial()
  }	
}

function cambiarTurno(){
  if (turno === 1) {
    turno++
    jugador1.style.boxShadow = 'none'
    jugador2.style.boxShadow = '0 0 80px #558564'
    resetearObjeto()
  } else{
    turno--
    jugador1.style.boxShadow = '0 0 80px #B2945B'
    jugador2.style.boxShadow = 'none'
    resetearObjeto()
  }
}

function resetearObjeto() {
  damaSelec.esRey = false
  damaSelec.movComerIzq = false
  damaSelec.movComerDer = false
  damaSelec.movIzq = false
  damaSelec.movDer = false
  damaSelec.movPintarIzq = null
  damaSelec.movPintarDer = null
  damaSelec.movComerDerPintado = null
  damaSelec.movComerIzqPintado = null
  damaSelec.movFilaPintar = null
  damaSelec.movFilaComerPintado = null

  agregarEvento()
}
 
function resetearObjMovPermitidos(){
MovimientosPermitidos.SeguirMovDer = true
MovimientosPermitidos.SeguirMovIzq = true
}

agregarEvento()