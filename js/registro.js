
var nombre = document.getElementById('nombre')
var email = document.getElementById('correo')
var comentario = document.getElementById('comentario')
var enviarMail = document.getElementById('enviarCorreo')

enviarMail.addEventListener('click', validaciones)

function validaciones(){
        
    if (nombre.value.length >= 3 && nombre.value.length <= 25) {
        if(email.value.includes('@')){
            if(comentario.value.length >= 3 && comentario.value.length <= 200){
                envioDeMail()
            }else{
                alert('El nombre debe contener entre 3 y 25 caracteres.')
                return
            }
        }else{
            alert('El mensaje debe contener entre 3 y 200 caracteres.')
            return
        }
    }else{
        alert('Mail inexistente')
        return
    }

}

function envioDeMail(){
    window.open(`mailto:ivan.j.sanger@gmail.com;matiasvirgili@gmail.com?subject=Ayuda%20soporte:%20
    ${nombre.value.replace(/ /g, '%20')}&body=${comentario.value.replace(/ /g, '%20')}.%20Enviado%20por:%20${email.value}`)
}

