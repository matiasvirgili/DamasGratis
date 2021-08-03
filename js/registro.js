
var nombre = document.getElementById('nombre')
var email = document.getElementById('correo')
var comentario = document.getElementById('comentario')
var enviarMail = document.getElementById('enviarCorreo')

enviarMail.addEventListener('click', envioDeMail)

function envioDeMail(){
    window.open('mailto:ivan.j.sanger@gmail.com?subject=Ayuda%20soporte:%20'+
    nombre.value.replace(/ /g, '%20') + '&body=' + comentario.value.replace(/ /g, '%20'))
}

