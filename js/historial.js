
var cerrarHistorial = document.getElementById('cerrar-popup-historial')
var abrir = document.getElementById('historial')
var popupHistorial = document.getElementById('popup-historial')
var contenedorHistorial = document.getElementById('contenedor-historial')



abrir.addEventListener('click', (e)=>{
    e.preventDefault()
    contenedorHistorial.style.opacity = '1'
    contenedorHistorial.style.visibility = 'visible'
    popupHistorial.classList.toggle('historial-cerrar')
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


//localStorage

var pj1 = document.getElementById('pj1')
var pj2 = document.getElementById('pj2')
var j1 = document.getElementById('j1')
var j2 = document.getElementById('j2')
var fecha = document.getElementById('fecha')


localStorage.setItem('j1', JSON.stringify(nombreJugador1))
    localStorage.setItem('pj1',JSON.stringify(fichasAmarillas.length))

    j1.innerText = JSON.parse(localStorage.getItem('j1'))
    pj1.innerText = JSON.parse(localStorage.getItem('pj1'))

    fechaGuardar = new Date()

    localStorage.setItem('fecha',JSON.stringify(fechaGuardar))
    fecha.textContent = JSON.parse(localStorage.getItem('fecha'))



     localStorage.setItem('j2', JSON.stringify(nombreJugador2))
    localStorage.setItem('pj2',JSON.stringify(fichasVerdes.length))

    j2.innerText = JSON.parse(localStorage.getItem('j1'))
    pj2.innerText = JSON.parse(localStorage.getItem('pj2'))