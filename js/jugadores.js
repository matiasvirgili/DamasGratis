
var btnNuevaPartida = document.getElementById('nueva-partida')
var cerrarPopupJugadores = document.getElementById('cerrar-popup-jugadores')
var popupJugadores = document.getElementById('popup-jugadores')
var contNombreJugadores = document.getElementById('cont-nombre-jugadores')

var btnAceptarJugadores = document.getElementById('aceptar')
var inputJugador1 = document.getElementById('jugador-N1')
var inputJugador2 = document.getElementById('jugador-N2')

var numPartidasGuardadas = 0

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

    tableroArray = [
      [null, 1, null, 1, null, 1, null, 1],
      [1, null, 1, null, 1, null, 1, null],
      [null, 1, null, 1, null, 1, null, 1],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [2, null, 2, null, 2, null, 2, null],
      [null, 2, null, 2, null, 2, null, 2],
      [2, null, 2, null, 2, null, 2, null],
    ]
    resetearTablero()

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
btnNuevaPartidaCargarPartida.addEventListener('click', mostrarPartidas)

function guardarPartida() {
  var hoy = new Date()
    
  var dia = hoy.getDate()
  var mes = (hoy.getMonth() + 1)
  if (dia.toString().length == 1) {
      dia = '0' + dia
  }
  if (mes.toString().length == 1) {
      mes = '0' + mes
  }
  var fecha = dia + '-' + mes + '-' + hoy.getFullYear()

  var hora = hoy.getHours()
  var minutos = hoy.getMinutes()
  if (hora.toString().length == 1) {
      hora = '0' + hora
  }
  if (minutos.toString().length == 1) {
      minutos = "0" + minutos
  }

  var fechaYHora = fecha + ' ' + hora + ':' + minutos + ' Hs'

  if(!(localStorage.getItem('Partida: ' + fechaYHora))) { 
    localStorage.setItem('Partida: ' + fechaYHora, JSON.stringify([tableroArray, turno, nombreJugador1.innerHTML, nombreJugador2.innerHTML])) //Se guarda si es que no existe ya una partida guardada en ese horario
    swal('¡Partida guardada!')
  }else{
    swal('¡Para volver a guardar la partida debes esperar 1 minuto!')
  }
}

function cargarPartida(partidaGuardara) { //EL PARTIDA GUARDADA ES PARA CLICKEAR ENTRE TODAS LAS PARTIDAS GANADAS Y QUE SE CARGUE EL TABLERO POR MEDIO EL CLICK EN EL INNERHTML DEL CLICKEADO
  var cargaDatosPartida = JSON.parse(localStorage.getItem(toString(partidaGuardara)))
  tableroArray = cargaDatosPartida[0]
  turno =  cargaDatosPartida[1]
  nombreJugador1.innerHTML = cargaDatosPartida[2]
  nombreJugador2.innerHTML = cargaDatosPartida[3]
  resetearTablero()
}

function mostrarPartidas(){
  var arrayPartidas = []
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).indexOf('Partida:') >= 0){
      var nombreJugadores = JSON.parse(localStorage.getItem('Partida: ' + localStorage.key(i).substring(9)))
      arrayPartidas.push([localStorage.key(i).substring(9), nombreJugadores[2] + '-' + nombreJugadores[3]])
    }
  }
  arrayPartidas.sort().reverse()

  for (let i = 0; i < arrayPartidas.length; i++) {
    //ACA CAMBIAR POR INNERHTML CON EL LOCALSTORAGE.KEY(i)
    console.log(arrayPartidas[i])
  }
}


