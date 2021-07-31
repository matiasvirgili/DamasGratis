var numeroHistorial = 0
var cerrarHistorial = document.getElementById('cerrar-popup-historial')
var abrir = document.getElementById('historial')
var popupHistorial = document.getElementById('popup-historial')
var contenedorHistorial = document.getElementById('contenedor-historial')

abrir.addEventListener('click', (e)=>{
    e.preventDefault()
    contenedorHistorial.style.opacity = '1'
    contenedorHistorial.style.visibility = 'visible'
    popupHistorial.classList.toggle('historial-cerrar')

    crearHistorial()
})

cerrarHistorial.addEventListener('click', (e)=>{
    
    popupHistorial.classList.toggle('historial-cerrar')
    
    setTimeout(()=>{
        contenedorHistorial.style.opacity = '0'
        contenedorHistorial.style.visibility = 'hidden'
    }, 300)
})

window.addEventListener('click', (e)=>{
    if (e.target === contenedorHistorial) {
        popupHistorial.classList.toggle('historial-cerrar')
        
        setTimeout(()=>{
            contenedorHistorial.style.opacity = '0'
            contenedorHistorial.style.visibility = 'hidden'
        }, 300)
    }
})


function crearHistorial(){
    var contenedorDatos = document.getElementById('datos')
    contenedorDatos.innerHTML = ''
    
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem('HistorialPartidas' + i)) {
            var dato = document.createElement('div')
            var j1 = document.createElement('h2')
            var j2 = document.createElement('h2')
            var pj1 = document.createElement('h2')
            var pj2 = document.createElement('h2')
            var fecha = document.createElement('h2')
        
            j1.id = 'j1-L' + i
            pj1.id = 'pj1-L' + i
            j2.id = 'j2-L' + i
            pj2.id = 'pj2-L' + i
            fecha.id = 'fecha-L' + i
            dato.id = 'dato-L' + i
            dato.classList = 'dato'
            
            contenedorDatos.appendChild(dato)
            dato.appendChild(j1)
            dato.appendChild(pj1)
            dato.appendChild(j2)
            dato.appendChild(pj2)
            dato.appendChild(fecha)
        
        
            var cargaDeDatos = JSON.parse(localStorage.getItem('HistorialPartidas' + i))
            
            j1.innerHTML = cargaDeDatos[0]
            pj1.innerHTML = cargaDeDatos[1]
            
            j2.innerHTML = cargaDeDatos[2]
            pj2.innerHTML = cargaDeDatos[3]
            
            fecha.innerHTML = cargaDeDatos[4]
        }
    }
}

function guardarHistorial(){
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

    while(localStorage.getItem('HistorialPartidas' + numeroHistorial)) {
        numeroHistorial++
    } 

    localStorage.setItem(('HistorialPartidas' + numeroHistorial), JSON.stringify([primerJugador.innerHTML, parrafoPuntosJugador1.innerHTML, segundoJugador.innerHTML, parrafoPuntosJugador2.innerHTML, fechaYHora]))
}
