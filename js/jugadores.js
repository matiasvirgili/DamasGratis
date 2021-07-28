
var boton = document.getElementById('nueva-partida')
var nombreJugador1 = document.getElementById('jugador-1')
var nombreJugador2 = document.getElementById('jugador-2')

boton.addEventListener('click', agregarNombreJugador)

async function agregarNombreJugador() {

     await swal("Ingrese el nombre del jugador N°1:", {
        title: "Jugador 1",
        content: "input",
        buttons: true,
    })
    .then((value) => {
        
        swal(`Nombre del jugador N°1: ${value}`)
        nombreJugador1.innerHTML = value
       
    })

    setTimeout(function(){
     swal("Ingrese el nombre del jugador N°2:", {
           title: "Jugador 2",
           content: "input",
           buttons: true,
       })
       .then((value) => {
    
            swal(`Nombre del jugador N°2: ${value}`)
            nombreJugador2.innerHTML = value
        })
    }, 2400)
}

// localStorage
var botonGuardarPartida = document.getElementById('guardar')
var botonCargarPartida = document.getElementById('cargar')

botonGuardarPartida.addEventListener('click', guardarPartida)
botonCargarPartida.addEventListener('click', cargarPartida)

function guardarPartida() {
  localStorage.setItem('tablero', JSON.stringify(tableroArray))
  localStorage.setItem('turno', JSON.stringify(turno))
}

function cargarPartida() {
  tableroArray = JSON.parse(localStorage.getItem('tablero'))
  turno = JSON.parse(localStorage.getItem('turno'))
  resetearTablero()
}
