
var cerrar = document.getElementById('cerrar')
var abrir = document.getElementById('historial')
var modal = document.getElementById('modal')
var modalContenedor = document.getElementById('contenedor-modal')



abrir.addEventListener('click', (e)=>{
    e.preventDefault()
    modalContenedor.style.opacity = '1'
    modalContenedor.style.visibility = 'visible'
    modal.classList.toggle('modal-cerrar')
})

cerrar.addEventListener('click', (e)=>{

    modal.classList.toggle('modal-cerrar')
    
    setTimeout(()=>{
        modalContenedor.style.opacity = '0'
        modalContenedor.style.visibility = 'hidden'
    }, 300)
})

window.addEventListener('click', (e)=>{
    if (e.target === modalContenedor) {
        modal.classList.toggle('modal-cerrar')

        setTimeout(()=>{
        modalContenedor.style.opacity = '0'
        modalContenedor.style.visibility = 'hidden'
        }, 300)
    }
})





