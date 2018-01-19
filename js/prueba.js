window.onload=function(){
    cuerpo=document.body;
    //ponemos imagen de fondo
 
    cuerpo.style.backgroundImage = "url('https://media.giphy.com/media/UYBDCJjwOd9Re/giphy-downsized.gif')";
   
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
    
    comenzar =true;
    empezar.onclick=function(elEvento){
            window.location = ("arkanoid.html"); 
        
    }
    empezar.onmousemove=function(elEvento){
        this.style.cursor="pointer";
        comenzar=true;

        this.style.color="yellow";
        puntuacion.style.color="white";
    }
    puntuacion.onmousemove=function(elEvento){
        this.style.cursor="pointer";
        comenzar=false;

        empezar.style.color="white";
        this.style.color="yellow";
    }
    document.onkeydown=function(elEvento){
        var evento = window.event||elEvento;
        if(evento.keyCode==38||evento.keyCode==40){
            if(!comenzar){
                empezar.style.color="yellow";
                puntuacion.style.color="white";
                comenzar=true;

            }else{

                
                empezar.style.color="white";
                puntuacion.style.color="yellow";
                comenzar=false;
            }
        }
        if(comenzar){

        if(evento.keyCode==13){
                window.location = ("arkanoid.html"); 

            }
        }
    }

}

   
  
