
var btnNuevaPartida = document.getElementById('nueva-partida')
var cerrarPopupJugadores = document.getElementById('cerrar-popup-jugadores')
var popupJugadores = document.getElementById('popup-jugadores')
var contNombreJugadores = document.getElementById('cont-nombre-jugadores')

var btnAceptarJugadores = document.getElementById('aceptar')
var inputJugador1 = document.getElementById('jugador-N1')
var inputJugador2 = document.getElementById('jugador-N2')

var nombreJugador1 = document.getElementById('jugador-1')
var nombreJugador2 = document.getElementById('jugador-2')

btnNuevaPartida.addEventListener('click', (e)=>{
    e.preventDefault()
    contNombreJugadores.style.opacity = '1'
    contNombreJugadores.style.visibility = 'visible'
    popupJugadores.classList.toggle('cerrar-popup-jugadores')
})

cerrarPopupJugadores.addEventListener('click', (e)=>{

    popupJugadores.classList.toggle('cerrar-popup-jugadores')
    
    setTimeout(()=>{
        contNombreJugadores.style.opacity = '0'
        contNombreJugadores.style.visibility = 'hidden'
    }, 300)
})

function validarCamposJugadores(){

    if (inputJugador1.value.length >= 3 && inputJugador1.value.length <= 8) {
      nombreJugador1.textContent = inputJugador1.value
    }else{
      alert('los nombres de los jugadores deben de tener entre 3 y 8 caracteres')
      return
    }

    if (inputJugador2.value.length >= 3 && inputJugador2.value.length <= 8) {
      nombreJugador2.textContent = inputJugador2.value
    }else{
      alert('los nombres de los jugadores deben de tener entre 3 y 8 caracteres')
      return
    }

    popupJugadores.classList.toggle('cerrar-popup-jugadores')
    
    setTimeout(()=>{
        contNombreJugadores.style.opacity = '0'
        contNombreJugadores.style.visibility = 'hidden'
    }, 300)
    
}
btnAceptarJugadores.addEventListener('click',validarCamposJugadores)




















// localStorage
var btnNuevaPartidaGuardarPartida = document.getElementById('guardar')
var btnNuevaPartidaCargarPartida = document.getElementById('cargar')

btnNuevaPartidaGuardarPartida.addEventListener('click', guardarPartida)
btnNuevaPartidaCargarPartida.addEventListener('click', cargarPartida)

function guardarPartida() {
  localStorage.setItem('tablero', JSON.stringify(tableroArray))
  localStorage.setItem('turno', JSON.stringify(turno))
}

function cargarPartida() {
  tableroArray = JSON.parse(localStorage.getItem('tablero'))
  turno = JSON.parse(localStorage.getItem('turno'))
  resetearTablero()
}



