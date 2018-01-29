window.onload=function(){
    cuerpo=document.body;
    instrucciones = document.getElementById("instrucciones");
    instrucciones.style.color="yellow";
    //ponemos imagen de fondo
 
    cuerpo.style.backgroundImage = "url('https://media.giphy.com/media/UYBDCJjwOd9Re/giphy-downsized.gif')";
    comienzo=document.getElementById("comienzo");
   
    //menu
    empezar=document.createElement("div");
    empezar.innerHTML+="Empezar partida";
    empezar.style.color="yellow";
    empezar.style.position="absolute";
    empezar.style.top=(window.innerHeight/2)+"px";
    empezar.style.left=(window.innerWidth/2)+"px";
    empezar.style.fontSize="20px";
    comienzo.play();
    comienzo.loop=true;//La musica pasa a estar en bucle
    comienzo.duration = 3;
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
            comienzo.pause();

        
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
    empezar.onmouseout=function(){
        this.style.color="white";
    }
    puntuacion.onmouseout=function(){
        this.style.color="white";
    }
    puntuacion.onclick=function(){
        window.location = ("records.html"); 
        comienzo.pause();


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

        if(evento.keyCode==13){
                if(comenzar){
                    window.location = ("arkanoid.html"); 
                    comienzo.pause();
                } if(!comenzar){
                    window.location = ("records.html"); 
                    comienzo.pause();


                }

            }
        }
    

}

   
  
