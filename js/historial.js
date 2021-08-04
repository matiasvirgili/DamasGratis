var numeroHistorial = 0
var cerrarHistorial = document.getElementById('cerrar-popup-historial')
var abrir = document.getElementById('historial')
var popupHistorial = document.getElementById('popup-historial')
var contenedorHistorial = document.getElementById('contenedor-historial')
var arrayHistorial = []
var ordenarFecha = document.getElementById('ordenar-fecha')
var ordenarPuntosJ1 = document.getElementById('ordenar-puntos-j1')
var ordenarPuntosJ2 = document.getElementById('ordenar-puntos-j2')
var contadorFecha = 0
var contadorPuntaje1 = 0
var contadorPuntaje2 = 0
var btnBorrarHistorial = document.getElementById('borrar-historial')



abrir.addEventListener('click', (e)=>{
    e.preventDefault()
    contenedorHistorial.style.opacity = '1'
    contenedorHistorial.style.visibility = 'visible'
    popupHistorial.classList.toggle('historial-cerrar')
    
    recorrerHistorialParaArray()
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

    if(arrayHistorial.length != 0)
    for (let i = 0; i < arrayHistorial.length; i++) {
        var dato = document.createElement('div')
        var j1 = document.createElement('h2')
        var puntos = document.createElement('h2')
        var j2 = document.createElement('h2')
        var puntos = document.createElement('h2')
        var fecha = document.createElement('h2')
    
        j1.id = 'j1-L' + i
        puntos.id = 'puntos-L' + i
        j2.id = 'j2-L' + i
        fecha.id = 'fecha-L' + i
        dato.id = 'dato-L' + i
        dato.classList = 'dato'
        
        contenedorDatos.appendChild(dato)
        dato.appendChild(j1)
        dato.appendChild(puntos)
        dato.appendChild(j2)
        dato.appendChild(fecha)
    
        var cargaDeDatos = []
        cargaDeDatos = arrayHistorial[i]
        
        j1.innerHTML = cargaDeDatos[0]
        puntos.innerHTML = cargaDeDatos[1]   
        j2.innerHTML = cargaDeDatos[2]
        fecha.innerHTML = cargaDeDatos[3]
    } else{
        var dato = document.createElement('div')
        contenedorDatos.appendChild(dato)
        var partidasInexistentes = document.createElement('h2')
        partidasInexistentes.id = 'partidasInexistentes'
        partidasInexistentes.innerHTML = "No se han encontrado partidas"
        dato.appendChild(partidasInexistentes)
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

    localStorage.setItem(('HistorialPartidas' + numeroHistorial), JSON.stringify([nombreJugador1.innerHTML, parrafoPuntosJugador1.innerHTML + '-' +  parrafoPuntosJugador2.innerHTML, nombreJugador2.innerHTML, fechaYHora]))
    var btnGuardarPartida = document.getElementById('guardar')
}

function ordenarPorFecha(){
    if (contadorFecha === 0) { //Se utiliza el contador para poner la fecha mas alta arriba o abajo
        arrayHistorial.sort(function(a, b){
            if(a[3] < b[3])return -1;
            if(a[3] > b[3])return 1;
            return 0;
        }).reverse()
        contadorFecha++
    }else{
        arrayHistorial.sort(function(a, b){
            if(a[3] < b[3])return -1;
            if(a[3] > b[3])return 1;
            return 0;
        })
        contadorFecha--
    }
    crearHistorial()
}

function ordenarPorPuntajeJugador1(){
    if (contadorPuntaje1 === 0) { //Se utiliza el contador para poner el puntaje mas alto arriba o abajo
            arrayHistorial.sort(function(a, b){
            var primer = a[1].split('-') //obtengo el puntaje del jugador 1 en un historial
            var segundo = b[1].split('-') //obtengo el puntaje del jugador 1 en otro historial
            var pun1 = primer[0]
            var pun2 = segundo[0]
            
            if(pun1 > pun2) return 1
            if(pun1 < pun2) return -1
            return 0
        })
        contadorPuntaje1++
    }else{     
        arrayHistorial.sort(function(a, b){ //Se utiliza el contador para poner el puntaje mas alto arriba o abajo
            var primer = a[1].split('-')
            var segundo = b[1].split('-')
            var pun1 = primer[0]
            var pun2 = segundo[0]
            
            if(pun1 > pun2) return 1
            if(pun1 < pun2) return -1
            return 0
        }).reverse()
        contadorPuntaje1--
    }
    crearHistorial()
}

function ordenarPorPuntajeJugador2(){
    if (contadorPuntaje2 === 0) { //Se utiliza el contador para poner el puntaje mas alto arriba o abajo
        
        arrayHistorial.sort(function(a, b){
            var primer = a[1].split('-') //obtengo el puntaje del jugador 2 en un historial
            var segundo = b[1].split('-') //obtengo el puntaje del jugador 2 en otro historial
            var pun1 = primer[1]
            var pun2 = segundo[1]
            
            if(pun1 > pun2) return 1
            if(pun1 < pun2) return -1
            return 0
        })
        contadorPuntaje2++
    }else{     
        arrayHistorial.sort(function(a, b){ //Se utiliza el contador para poner el puntaje mas alto arriba o abajo
            var primer = a[1].split('-')
            var segundo = b[1].split('-')
            var pun1 = primer[1]
            var pun2 = segundo[1]
            
            if(pun1 > pun2) return 1
            if(pun1 < pun2) return -1
            return 0
        }).reverse()
        contadorPuntaje2--
    }
    crearHistorial()
}

ordenarFecha.addEventListener('click', ordenarPorFecha)
ordenarPuntosJ1.addEventListener('click', ordenarPorPuntajeJugador1)
ordenarPuntosJ2.addEventListener('click', ordenarPorPuntajeJugador2)

function recorrerHistorialParaArray(){
    arrayHistorial = []
    for (let i = localStorage.length; i >= 0; i--) {
        if (localStorage.getItem('HistorialPartidas' + i)){
            arrayHistorial.push(JSON.parse(localStorage.getItem('HistorialPartidas' + i)))
        }
    }
}

function limpiarHistorial(){
    recorrerHistorialParaArray()
    var lengthLocalStorage =  localStorage.length
    for (let i = lengthLocalStorage; i >= 0; i--) {
        if (localStorage.getItem('HistorialPartidas' + i)){
        localStorage.removeItem('HistorialPartidas' + i)
        }
    }
    crearHistorial()
}

btnBorrarHistorial.addEventListener('click',limpiarHistorial)