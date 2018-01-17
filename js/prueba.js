window.onload=function(){
    cuerpo=document.body;
    //ponemos imagen de fondo
    imagen = document.createElement("img");
    imagen.style.width=window.innerWidth+"px";
    imagen.style.height=window.innerHeight+"px";
    imagen.style.position = "absolute";
    imagen.setAttribute("src", "https://media.giphy.com/media/UYBDCJjwOd9Re/giphy-downsized.gif");
    imagen.setAttribute("alt", "fondo");
    cuerpo.appendChild(imagen);
    cuerpo.style.backgroundImage=imagen;
    cuerpo.style.backgroundRepeat = "no-repeat";
    //menu
    empezar=document.createElement("div");
    empezar.innerHTML+="Empezar partida";
    empezar.style.color="yellow";
    empezar.style.position="absolute";
    empezar.style.top=(window.innerHeight/2)+"px";
    empezar.style.left=(window.innerWidth/2)+"px";
    empezar.style.fontSize="20px";

    cuerpo.appendChild(empezar);
    puntuacion=document.createElement("div");
    puntuacion.innerHTML+="Puntuaciones";
    puntuacion.style.color="white";
    puntuacion.style.position="absolute";
    puntuacion.style.top=(window.innerHeight/2)+"px";
    puntuacion.style.left=(window.innerWidth/2)+"px";
    puntuacion.style.marginTop="50px";
    puntuacion.style.fontSize="20px";
    cuerpo.appendChild(puntuacion);
    
    document.onkeydown=function(elEvento){
        var evento = window.event||elEvento;
       /* if(evento.keyCode==38||evento.keyCode==40){
        
        }*/
        /*if(evento.keyCode=13){
            window.location = ("arkanoid.html"); 
        }*/
    }

}

   
  
