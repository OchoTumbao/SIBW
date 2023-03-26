// Identificación de los elementos necesarios
var commentButton=document.getElementById("comment_button");
var comments_hidden = true;
var modal = document.getElementById("ModalComentarios");
var span = document.getElementsByClassName("close")[0];


// Muestra y oculta el panel de comentarios
commentButton.onclick=function(event){
    if(comments_hidden){
    document.getElementById("comentarios").style.display="flex";
    comments_hidden=false;
    } else{
        document.getElementById("comentarios").style.display="none";
        comments_hidden=true;
    }
}



var submit_commentButton=document.getElementById("submit_button");
submit_commentButton.onclick=function(event){
    // Identifica los elementos necesarios para construir el comentario
    var Email=document.getElementById("emailform").value;
    var Autor=document.getElementById("nombreform").value;
    var comentario=document.getElementById("comment").value;
    // Expresion regular para validar un email
    var reEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reEmail.test(Email)==true && Email!="" && Autor!="" && comentario!=""){
        // Crea el comentarioa partir de un elemento plantilla en el html
        const date=new Date()
        var comentarioplantilla=document.getElementById("PlantillaComment");
        var newcomment=comentarioplantilla.cloneNode(true);
        newcomment.removeAttribute('id');
        newcomment.childNodes.forEach(son => {console.log(son.className);});
        var AutorYFecha= newcomment.childNodes[1]
        var campos= AutorYFecha.childNodes
        var texto= newcomment.childNodes[3]
        var parrafo=texto.childNodes[1]
        document.getElementById("ListaComentarios").appendChild(newcomment);
        campos.forEach(son => {console.log(son.className);})
        campos[1].innerHTML=Autor
        campos[3].innerHTML=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        if(date.getMinutes()<10){
            campos[5].innerHTML=`${date.getHours()}:0${date.getMinutes()}`;
        } else{
        campos[5].innerHTML=`${date.getHours()}:${date.getMinutes()}`;
        }
        parrafo.innerHTML=comentario;

    } else{
        // Si no es posible crear el comentario muestra el modal
        modal.style.display="block";
    }

}

// Censura de palabras prohibidas. Cuando se libera una tecla se observa si el texto contiene palabras prohibidas y si lo hace se cambian por la censura
var palabras_prohibidas=["mierda","puta","gilipollas","desgraciado","imbecil","ambrosio", "banano","lerdo"]
var texto=document.getElementById("comment");
var censor="*";
texto.onkeyup=function(event){
    var string=texto.value.toLowerCase();
    console.log(string);
    palabras_prohibidas.forEach(word => {
        if(string.includes(word)){
        console.log("Voy a reemplazar")
            texto.value=string.replace(word,`${censor.repeat(word.length)}`);}
    });
    console.log(string);

}



// cerrar el modal al hacer click en la x o fuera del modal
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}