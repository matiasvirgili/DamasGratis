/** @format */

var tableroArray = [
	[null, 1, null, 1, null, 1, null, 1],
	[1, null, 1, null, 1, null, 1, null],
	[null, 1, null, 1, null, 1, null, 1],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[2, null, 2, null, 2, null, 2, null],
	[null, 2, null, 2, null, 2, null, 2],
	[2, null, 2, null, 2, null, 2, null],
];

// TABLERO
var tablero = document.getElementById("tablero");
function crearTablero() {
	var contador = 0;

	for (let i = 0; i < tableroArray.length; i++) {
		var newDivFila = document.createElement("div");
		newDivFila.className = "fila fila-" + i;
		tablero.appendChild(newDivFila);

		contador = i % 2;

		for (let j = 0; j < tableroArray[i].length; j++) {
			var newDivCell = document.createElement("div");

			if (contador === 0) {
				newDivCell.className = "casilla clara";
				contador++;
			} else {
				newDivCell.className = "casilla oscura";
				contador--;
			}

			newDivCell.id = "fila-" + i + "-col-" + j;
			newDivFila.appendChild(newDivCell);
		}
	}
}
crearTablero();

//DAMAS
function mostrarDama() {
	for (let i = 0; i < tableroArray.length; i++) {
		for (let k = 0; k < tableroArray[i].length; k++) {
			var DivCelda = document.getElementById("fila-" + i + "-col-" + k);

			if (tableroArray[i][k] === 1) {
				var NewDama = document.createElement("div");
				NewDama.className = "roja";
				DivCelda.appendChild(NewDama);
			} else {
				if (tableroArray[i][k] === 2) {
					var NewDama = document.createElement("div");
					NewDama.className = "blanca";
					DivCelda.appendChild(NewDama);
				}
			}
		}
	}
}
mostrarDama();

// ACTUALIZAR LAS DAMAS
function ActualizarDamas() {
	var damasRojas = document.getElementsByClassName("roja");
	var damasBlancas = document.getElementsByClassName("blanca");

	for (let i = damasRojas.length - 1; i >= 0; i--) {
		damasRojas[i].remove();
	}
	for (let i = damasBlancas.length - 1; i >= 0; i--) {
		damasBlancas[i].remove();
	}
	mostrarDama();
}

// PUNTOS DE JUGADORES
var puntosJugador1 = document.getElementById("puntos-jugador1");
var puntosJugador2 = document.getElementById("puntos-jugador2");
var puntosJ1 = 12;
var puntosJ2 = 12;

function puntosJugadores() {
	tableroArray.forEach(function (fila, index) {
		fila.forEach(function (celda, index) {
			if (celda === 1) {
				puntosJ1--;
			}
			if (celda === 2) {
				puntosJ2--;
			}
		});
	});
}
puntosJugadores();

puntosJugador1.innerHTML = puntosJ2;
puntosJugador2.innerHTML = puntosJ1;

// TURNO DE JUGADORES
var turno = 1;

var jugador1 = document.getElementById("jugador1");
var jugador2 = document.getElementById("jugador2");

var damaRoja = document.getElementsByClassName("roja");

function cambiarTurno(turno) {
	if (turno === 0) {
		jugador2.style.boxShadow = "none";
		jugador1.style.boxShadow = "0 0 7px red";
		turno++;
	} else {
		jugador1.style.boxShadow = "none";
		jugador2.style.boxShadow = "0 0 7px red";
		turno--;
	}
}

// MOVIMIENTO DE LA DAMA YA CLICKEADA
function movimientoDamaRoja(posDamaFila, posDamaColumna) {
	var movimientoDamaValido =
		document.getElementsByClassName("movimiento-valido");

	for (let a = 0; a < movimientoDamaValido.length; a++) {
		movimientoDamaValido[a].addEventListener("click", function () {
			var id = movimientoDamaValido[a].getAttribute("id");

			var DamaProximaFila = id.substring(5, 6);
			var DamaProximaColumna = id.substring(11, 12);

			tableroArray[DamaProximaFila][DamaProximaColumna] = 1;
			tableroArray[posDamaFila][posDamaColumna] = null;
			quitarColorDamaRoja(posDamaFila, posDamaColumna);
			ActualizarDamas();
			puntosJugadores();
			cambiarTurno(turno);
		});
	}
}

// RECORRER EL ARREGLO PARA ENCONTRAR LA DAMA ROJA CLICKEADA
var contador = 0;
var posDamaAntiguaFila = 0;
var posDamaAntiguaCol = 0;

for (let i = 0; i < damaRoja.length; i++) {
	damaRoja[i].addEventListener("click", function () {
		if (turno === 1) {
			var contarDama = 0;
			var posicionDamaFila = 0;
			var posicionDamaColumna = 0;

			for (let r = 0; r < tableroArray.length; r++) {
				for (let t = 0; t < tableroArray[r].length; t++) {
					if (tableroArray[r][t] === 1) {
						if (contarDama === i) {
							posicionDamaFila = r;
							posicionDamaColumna = t;

							if (contador === 0) {
								contador++;

								pintarDamaRoja(posicionDamaFila, posicionDamaColumna);

								posDamaAntiguaFila = r;
								posDamaAntiguaCol = t;
								movimientoDamaRoja(posicionDamaFila, posicionDamaColumna);

								return;
							} else {
								quitarColorDamaRoja(posDamaAntiguaFila, posDamaAntiguaCol);
								pintarDamaRoja(posicionDamaFila, posicionDamaColumna);
								posDamaAntiguaFila = r;
								posDamaAntiguaCol = t;
								movimientoDamaRoja(posicionDamaFila, posicionDamaColumna);
							}
						}

						contarDama++;
					}
				}
			}
		} else {
			console.log("no te toca genio");
		}
	});
}

// VALIDAR SI PODEMOS MOVER LA DAMA DEPENDIENDO EL LADO
function validarMovimientoDamaDerecha(posDamaFila, posDamaColumna) {
	if (tableroArray[posDamaFila][posDamaColumna] === 1) {
		return false;
	} else {
		return true;
	}
}

function validarMovimientoDamaIzquierda(posDamaFila, posDamaColumna) {
	if (tableroArray[posDamaFila][posDamaColumna] === 1) {
		return false;
	} else {
		return true;
	}
}

// MOSTRAR LOS POSIBLES MOVIMIENTOS DE LA DAMA CLICKEADA
function pintarDamaRoja(posicionDamaFila, posicionDamaColumna) {
	posicionDamaFila += 1;

	var posicionDer = 0,
		posicionIzq = 0;
	posicionIzq = posicionDamaColumna - 1;
	posicionDer = posicionDamaColumna + 1;

	var divCasillaCambiarIzq = document.getElementById(
		"fila-" + posicionDamaFila + "-col-" + posicionIzq
	);
	var divCasillaCambiarDer = document.getElementById(
		"fila-" + posicionDamaFila + "-col-" + posicionDer
	);

	if (posicionDer <= 7) {
		if (validarMovimientoDamaDerecha(posicionDamaFila, posicionDer)) {
			divCasillaCambiarDer.style.backgroundColor = "#90FFDA";
			divCasillaCambiarDer.className = "casilla movimiento-valido";
		}
	}
	if (posicionIzq >= 0) {
		if (validarMovimientoDamaIzquierda(posicionDamaFila, posicionIzq)) {
			divCasillaCambiarIzq.style.backgroundColor = "#90FFDA";
			divCasillaCambiarIzq.className = "casilla movimiento-valido";
		}
	}
}

// QUITAR EL COLOR DE LOS POSIBLES MOVIMIENTOS DE LA DAMA CLICKEADA PORQUE HIZO CLICK EN OTRA DAMA
function quitarColorDamaRoja(posDamaAntiguaFila, posDamaAntiguaCol) {
	posDamaAntiguaFila += 1;

	var posicionDer = 0,
		posicionIzq = 0;
	posicionIzq = posDamaAntiguaCol - 1;
	posicionDer = posDamaAntiguaCol + 1;

	var divCasAtiguaCambiarIzq = document.getElementById(
		"fila-" + posDamaAntiguaFila + "-col-" + posicionIzq
	);
	var divCasAntiguaCambiarDer = document.getElementById(
		"fila-" + posDamaAntiguaFila + "-col-" + posicionDer
	);

	if (posicionDer <= 7) {
		divCasAntiguaCambiarDer.style.backgroundColor = "#f27052";
		divCasAntiguaCambiarDer.className = "casilla";
	}
	if (posicionIzq >= 0) {
		divCasAtiguaCambiarIzq.style.backgroundColor = "#f27052";
		divCasAtiguaCambiarIzq.className = "casilla";
	}
}

// RECORRER EL ARREGLO PARA ENCONTRAR LA DAMA BLANCA CLICKEADA

var damaBlanca = document.getElementsByClassName("blanca");
var posDamaAntiguaFilaa = 0;
var posDamaAntiguaColl = 0;
var contadorr = 0;

for (let i = 0; i < damaBlanca.length; i++) {
	damaBlanca[i].addEventListener("click", function () {
		console.log(turno);
		if (turno == 0) {
			var contarDama = 0;
			var posicionDamaFila = 0;
			var posicionDamaColumna = 0;

			for (let r = 0; r < tableroArray.length; r++) {
				for (let t = 0; t < tableroArray[r].length; t++) {
					if (tableroArray[r][t] === 1) {
						if (contarDama === i) {
							posicionDamaFila = r;
							posicionDamaColumna = t;

							if (contadorr === 0) {
								contadorr++;

								pintarDamaBlanca(posicionDamaFila, posicionDamaColumna);

								posDamaAntiguaFilaa = r;
								posDamaAntiguaColl = t;
								movimientoDamaBlanca(posicionDamaFila, posicionDamaColumna);

								return;
							} else {
								quitarColorDamaBlanca(posDamaAntiguaFilaa, posDamaAntiguaCol);
								pintarDamaBlanca(posicionDamaFila, posicionDamaColumna);
								posDamaAntiguaFilaa = r;
								posDamaAntiguaColl = t;
								movimientoDamaBlanca(posicionDamaFila, posicionDamaColumna);
							}
						}

						contarDama++;
					}
				}
			}
		} else {
			alert("no te toca genioooo");
		}
	});
}

function pintarDamaBlanca(posicionDamaFila, posicionDamaColumna) {
	posicionDamaFila -= 1;

	var posicionDer = 0,
		posicionIzq = 0;
	posicionIzq = posicionDamaColumna - 1;
	posicionDer = posicionDamaColumna + 1;

	var divCasillaCambiarIzq = document.getElementById(
		"fila-" + posicionDamaFila + "-col-" + posicionIzq
	);
	var divCasillaCambiarDer = document.getElementById(
		"fila-" + posicionDamaFila + "-col-" + posicionDer
	);

	if (posicionDer <= 7) {
		if (validarMovimientoDamaDerecha(posicionDamaFila, posicionDer)) {
			divCasillaCambiarDer.style.backgroundColor = "#90FFDA";
			divCasillaCambiarDer.className = "casilla movimiento-valido";
		}
	}
	if (posicionIzq >= 0) {
		if (validarMovimientoDamaIzquierda(posicionDamaFila, posicionIzq)) {
			divCasillaCambiarIzq.style.backgroundColor = "#90FFDA";
			divCasillaCambiarIzq.className = "casilla movimiento-valido";
		}
	}
}

// QUITAR EL COLOR DE LOS POSIBLES MOVIMIENTOS DE LA DAMA CLICKEADA PORQUE HIZO CLICK EN OTRA DAMA
function quitarColorDamaBlanca(posDamaAntiguaFila, posDamaAntiguaCol) {
	posDamaAntiguaFila -= 1;

	var posicionDer = 0,
		posicionIzq = 0;
	posicionIzq = posDamaAntiguaCol - 1;
	posicionDer = posDamaAntiguaCol + 1;

	var divCasAtiguaCambiarIzq = document.getElementById(
		"fila-" + posDamaAntiguaFila + "-col-" + posicionIzq
	);
	var divCasAntiguaCambiarDer = document.getElementById(
		"fila-" + posDamaAntiguaFila + "-col-" + posicionDer
	);

	if (posicionDer <= 7) {
		divCasAntiguaCambiarDer.style.backgroundColor = "#f27052";
		divCasAntiguaCambiarDer.className = "casilla";
	}
	if (posicionIzq >= 0) {
		divCasAtiguaCambiarIzq.style.backgroundColor = "#f27052";
		divCasAtiguaCambiarIzq.className = "casilla";
	}
}

// MOVIMIENTO DE LA DAMA YA CLICKEADA
function movimientoDamaBlanca(posDamaFila, posDamaColumna) {
	var movimientoDamaValido =
		document.getElementsByClassName("movimiento-valido");

	for (let a = 0; a < movimientoDamaValido.length; a++) {
		movimientoDamaValido[a].addEventListener("click", function () {
			var id = movimientoDamaValido[a].getAttribute("id");

			var DamaProximaFila = id.substring(5, 6);
			var DamaProximaColumna = id.substring(11, 12);

			tableroArray[DamaProximaFila][DamaProximaColumna] = 1;
			tableroArray[posDamaFila][posDamaColumna] = null;
			quitarColorDamaBlanca(posDamaFila, posDamaColumna);
			ActualizarDamas();
			puntosJugadores();
			cambiarTurno(turno);
		});
	}
}
