
var cerrarPartidas = document.getElementById('cerrar-popup-partidas')
var abrir = document.getElementById('cargar')
var popupPartidas = document.getElementById('cargar-partidas')
var contenedorPartidas = document.getElementById('cont-cargar-partidas')


abrir.addEventListener('click', (e)=>{
    e.preventDefault()
    contenedorPartidas.style.opacity = '1'
    contenedorPartidas.style.visibility = 'visible'
    popupPartidas.classList.toggle('cerrar-partidas')
})

cerrarPartidas.addEventListener('click', (e)=>{
    cerrarPoPUpPartidas()   
})

function cerrarPoPUpPartidas(){
    popupPartidas.classList.toggle('cerrar-partidas')
    
    setTimeout(()=>{
        contenedorPartidas.style.opacity = '0'
        contenedorPartidas.style.visibility = 'hidden'
    }, 300)
}

window.addEventListener('click', (e)=>{
    if (e.target === contenedorPartidas) {
        popupPartidas.classList.toggle('cerrar-partidas')
        
        setTimeout(()=>{
            contenedorPartidas.style.opacity = '0'
            contenedorPartidas.style.visibility = 'hidden'
        }, 300)
    }
})