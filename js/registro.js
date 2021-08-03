
var nombre = document.getElementById('nombre')
var email = document.getElementById('correo')
var comentario = document.getElementById('comentario')
var enviarMail = document.getElementById('enviarCorreo')

enviarMail.addEventListener('click', validaciones)

function validaciones(){

    if(email.value.includes('@')){
        
        if (nombre.value.length >= 3 && nombre.value.length <= 10 && comentario.value.length >= 3 && comentario.value.length <= 100) {
            envioDeMail()
        }else{
            alert('el nombre debe contener entre 3 y 10 caracteres y el mensaje debe contener entre 3 y 100 caracteres')
            return
        }
    }else{
        alert('no existe ese email')
        return
    }
    
}

function envioDeMail(){
    window.open('mailto:ivan.j.sanger@gmail.com;matiasvirgili@gmail.com?subject=Ayuda%20soporte:%20'+
    nombre.value.replace(/ /g, '%20') + '&body=' + comentario.value.replace(/ /g, '%20') + '%20enviado%20por:%20' + email.value)
}

