
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

