    window.onload=function(){
        caja=document.createElement("div");
        caja.id="caja";
        //imagen = document.createElement("img");
        caja.style.width = "800px";
        caja.style.height = "600px";
        caja.style.cursor="none";
        document.body.appendChild(caja)
        informacion=document.createElement("div");
        informacion.style.left="825px";
        informacion.style.position="absolute";
        caja.appendChild(informacion);

        //caja.style.backgroundColor = "rgb(0, 0, 0)";
        //imagen.src="https://media.giphy.com/media/GC7C2Fi902BDG/giphy.gif";
        //imagen.alt="fondo"
        /*imagen.style.width = "800px";
        imagen.style.height = "600px";
        imagen.style.position = "absolute";
        imagen.setAttribute("src", "https://media.giphy.com/media/UYBDCJjwOd9Re/giphy-downsized.gif");
        imagen.setAttribute("alt", "fondo");
     
        caja.appendChild(imagen);
        imagen.style.visibility = "hidden";*/
        caja.style.backgroundImage = "url('https://media.giphy.com/media/UYBDCJjwOd9Re/giphy-downsized.gif')";
        cx=0;
        empiezaElJuego=document.getElementById("empiezaElJuego");
        duranteLaPartida=document.getElementById("duranteLaPartida");

        empiezaElJuego.play();
        empiezaElJuego.onended=function(){//si la musica ha terminado empieza el juego
            duranteLaPartida.play(); // la musica de fondo
            duranteLaPartida.loop=true; // la musica entra en bucle
            pelotaConLadrillo=document.getElementById("pelotaConLadrillo");
            barraConPelota=document.getElementById("barraConPelota");
            partidaPerdida=document.getElementById("partidaPerdida");
            partidaGanada=document.getElementById("partidaGanada");
            barraAumentada=document.getElementById("barraAumentada");
            disparos=document.getElementById("disparos");
            barraDestruida=document.getElementById("barraDestruida");
            pelotas=new Array(3);
            barra = new Barra("barra");
            barra.crearBarra();
            //datos para guardar los records
            nombre="";
            btGuardar="";
            jugadores=new Array();
            
            //booleanos para los poderes
            existeAumentar=false;
            existePastillaAumentarBarra=false;
            existePastillaAumentarVelocidadPelota=false;
            existePastillaCreacionDisparos=false;
            existePastillaCreacionPelotas=false;
            existePastillaUnaVidaMas=false;
            existeDisparos=false;
            existeCuentaAtras=false;
            //los elementos que creamos en pantalla
            pastillaAumentarBarra=0;
            pastillaAumentarVelocidadPelota=0;
            pastillaCreacionDisparos=0;
            pastillaUnaVidaMas=0;
            pastillaCreacionPelotas=0;
            //intervalos de los poderes
            intervaloPastillaAumentarBarra=0;
            intervaloPastillaAumentarVelocidadPelota=0;
            intervaloPastillaCreacionDisparos=0;
            intervaloPastillaUnaVidaMas=0;
            intervaloPastillaCreacionPelotas=0;
            cuentaAtrasBarra=0;

            pelotas[0]=new Pelota("pelota0");
            pelotas[0].crearBola();      
            moviendose = 0;
            parar =false;//si queremos parar el juego

            
            nivel=1;
            vidas=5;
            //lo que van ir avanzado las pastillas de los poderes
            contTopPastillaAumentarBarra=5;
            contTopPastillaCreacionPelotas=5;
            contTopPastillaDisparos=5;
            contTopPastillaUnaVidaMas=5;
            contTopPastillaAumentarVelocidadPelota=5;

            cantLadrillosDestruidos=0;
            ladrillos=new Array();
            ladrillosDobles=new Array();
            ladrillosAleatorios=new Array(4);
            niveles  = new Niveles(nivel,vidas);
            niveles.nivelUno();
            //console.log("Vidas: "+niveles.vidas);
            niveles.informacionDelJuego();
            caja.addEventListener("mousemove",pasarPorEncima);
            document.addEventListener("keydown",dejarPresionado);
            caja.addEventListener("click",clickRaton);
            document.addEventListener("keyup",levantarDedo);
            btInicio=document.createElement("button");
            btInicio.innerHTML="Volver a la página principal";
            btInicio.style.top="450px";
            btInicio.style.left="830px";
            btInicio.style.width="auto";
            btInicio.style.height="20px";
            btInicio.style.position="absolute";
            caja.appendChild(btInicio);
        
            btInicio.onclick=function(){
                window.location="index.html";
            }
        
        }
            
        
        
       
      
       
        /*document.getElementById(barra.id).style.opacity=0;

        document.getElementById(barra.id).style.transition="opacity 1s";
        Para eliminar la barra visualmente que hacer despues caja.removechild etc*/
}
//Creamos la "clase" pelota
/*
function Pelota(){
 
    this.width=10;
    this.height = 10;
    this.left = 420;
    this.top =  500;
    this.avanceTop=5;
    this.avanceLeft=5;
    this.random=Math.floor(Math.random()*(2))
    if(this.random==0){
        this.arriba=false;
        this.izquierda=false;
    }else if(this.random==1){
        this.arriba=true;
        this.izquierda=true;
    }
    this.intervalo=setInterval(this.moverBola.bind(this),20);  

}
*/

function Pelota(idPelota){ //metodo a sobrecargar
    this.width=10;
    this.height = 10;
  
    //this.left = Math.floor(Math.random() * (parseInt(caja.style.width)-this.width) + 0);
    //this.top =  Math.floor(Math.random() * (parseInt(caja.style.height)-this.height) + 0);
    this.left = Math.floor(Math.random() * ((barra.width)-this.width) + barra.left);
    this.top =  500;
    this.avanceTop=5;
    this.avanceLeft=5;
    //para que la pelota salga por una direccion aleatoria
    this.random=Math.floor(Math.random()*(2))
    if(this.random==0){
        this.arriba=false;
        this.izquierda=false;
    }else if(this.random==1){
        this.arriba=true;
        this.izquierda=true;
    }
    this.id=idPelota;
    this.intervalo=0;  

}
Pelota.prototype.crearBola=function(){
    var resta=""+this.top;
    this.top=this.top-parseInt(resta.substring(resta.length,resta.length-1));//resta que hacemos para que sea el ultimo numero un 0 y avance bien
    resta = ""+this.left;
    this.left=this.left-parseInt(resta.substring(resta.length,resta.length-1));//resta que hacemos para que sea el ultimo numero un 0 y avance bien

    this.bola=document.createElement("div");//Lo que crearemos en pantalla
    this.bola.style.width=this.width+"px";
    this.bola.style.height=this.height+"px";
    this.bola.style.backgroundColor="yellow";
    this.bola.style.position="absolute";
    this.bola.style.top=this.top+"px";
    this.bola.style.left=this.left+"px";
    this.bola.style.borderRadius="1em";
    this.bola.id=this.id;
    caja.appendChild(this.bola);
    this.intervalo=setInterval(this.moverBola.bind(this),20);  

}
Pelota.prototype.moverBola=function(){
    if(niveles.vidas>0){

        if(this.top>=parseInt(caja.style.height)-parseInt(this.height)){
                /*si las pelotas caen al suelo desaparecen y se les quita una vida y si es la ultima se "vuelve a empezar"
                y se coloca la barra y la pelota en su sitio y sino tiene vidas pierde el juego
                */
                for(s = 0; s < pelotas.length;s++){
                    if(this==pelotas[s]){
                        clearInterval(this.intervalo);
        
                       caja.removeChild(this.bola);
        
                        pelotas.splice(s,1);
                        if(pelotas.length==0||pelotas[0]==null){
                            niveles.vidas--;
                            console.log("Vidas: "+niveles.vidas);

                            if(niveles.vidas==0){
                                niveles.eliminarTodosLosPoderes();
                                for(var i =0; i < pelotas.length;i++){
                                    if(pelotas[i]!=null){
                                        clearInterval(pelotas[i].intervalo);
                                        caja.removeChild(document.getElementById(pelotas[i].id));
                                        pelotas[i]=null;
                                        pelotas.splice(i,1);

                                    }
                                   
                                    
                                
                                }
                                caja.removeChild(document.getElementById(barra.id)); 
                                niveles.perderLaPartida();
                            }else{
                                document.getElementById(barra.id).style.opacity=0;
                                document.getElementById(barra.id).style.transition="opacity 1s";
                                barraDestruida.load();
                                barraDestruida.play();
                                setTimeout(function(){
                                    caja.removeChild(document.getElementById(barra.id));
                                    clearTimeout(cuentaAtrasBarra);
                                    existeAumentar=false;
                                    niveles.empezar();
            
                                },1500);
            
                            }
                          
                        }
        
                    }
                }
            }else if(this.top<=0){
               
                this.arriba=true;
               
               
            }
            
            
        //this.arriba=false;
    

    }
    

    
    if(!this.arriba){
        this.top-=this.avanceTop;
        this.bola.style.top=this.top+"px";
    }else if(this.arriba){
        this.top+=this.avanceTop;
        this.bola.style.top=this.top+"px";
    }
    //si se ha cogido la pastilla de aumentar la velocidad va mas rapido
    if(existeAumentar){
        clearInterval(this.intervalo);
        this.intervalo=setInterval(this.moverBola.bind(this),15);  

    }
    
    if(this.left>=parseInt(caja.style.width)-parseInt(this.width)){
        this.izquierda=false;
        
    }else if(this.left<=0){
        this.izquierda=true;
       
    }
    if(!this.izquierda){
        this.left-=this.avanceLeft;
        this.bola.style.left=this.left+"px";
    }else if(this.izquierda){
        this.left+=this.avanceLeft;
        this.bola.style.left=this.left+"px";

    }
    this.colisionesBarra();
    /* si has destruido todos los ladrillos del nivel se eliminan todas las pelotas y si han caido poderes tambien
    y se empieza de nuevo y si has llegado al ultimo nivel y has destruido todos los bloques del juego has ganado
    */
    if(niveles.nivel==1){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=2;
            niveles.eliminarTodosLosPoderes(); 
             
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            } 
            caja.removeChild(document.getElementById(barra.id));
            niveles.nivelDos();
            
                niveles.empezar();

                        
          }        
        this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==2){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=3;
            niveles.eliminarTodosLosPoderes(); 
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            } 
                
            caja.removeChild(document.getElementById(barra.id));
  
            niveles.nivelTres();
                niveles.empezar();

                      
        } 
        this.colisionesLadrilloDoble();

    }else if(niveles.nivel==3){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=4;
            niveles.eliminarTodosLosPoderes(); 
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            } 
                
            caja.removeChild(document.getElementById(barra.id));
  
            niveles.nivelCuatro();
                niveles.empezar();

                      
        }  
         
       this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==4){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=5;
            niveles.eliminarTodosLosPoderes();
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            }  
                
            caja.removeChild(document.getElementById(barra.id));
            niveles.nivelCinco();
            
                niveles.empezar();

                       
          }  
        this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==5){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=6;
            niveles.eliminarTodosLosPoderes(); 
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            } 
                
            caja.removeChild(document.getElementById(barra.id));

            
            niveles.empezar();
            niveles.nivelSeis();
          }  
        this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==6){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=7;
            niveles.eliminarTodosLosPoderes();
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            } 
            caja.removeChild(document.getElementById(barra.id));
            niveles.nivelSiete();
            
                niveles.empezar();

                       
          }  
        this.colisionessoloUnLadrilloNivelSeis();

    }else if(niveles.nivel==7){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=8;
            niveles.eliminarTodosLosPoderes(); 
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            }    
                
            caja.removeChild(document.getElementById(barra.id));
 
            niveles.nivelOcho();
                niveles.empezar();

                     
          }  
        this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==8){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=9;
            niveles.eliminarTodosLosPoderes();
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            }    
                
            caja.removeChild(document.getElementById(barra.id));
            niveles.nivelNueve();
            
                niveles.empezar();

                       
          }  
        this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==9){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=10;
            niveles.eliminarTodosLosPoderes(); 
            caja.removeChild(document.getElementById(barra.id));
   
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            }  
            niveles.nivelDiez();
            
                niveles.empezar();

                   
          }  
        this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==10){
        if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            niveles.nivel=11;
            niveles.eliminarTodosLosPoderes(); 
            for(var i =0; i < pelotas.length;i++){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                    caja.removeChild(document.getElementById(pelotas[i].id));
    
                }
             
            
            } 
            caja.removeChild(document.getElementById(barra.id));
            niveles.nivelOnce();
            niveles.empezar();

            
          
          }  
        this.colisionessoloUnLadrillo();

    }else if(niveles.nivel==11){
         if(cantLadrillosDestruidos==niveles.ladrillosjuego){
            
             if(niveles.ganar){
                for(var i =0; i < pelotas.length;i++){
                    if(pelotas[i]!=null){
                        clearInterval(pelotas[i].intervalo);
                        caja.removeChild(document.getElementById(pelotas[i].id));
        
                        pelotas.splice(i,1);
                    }
                 
                
                } 
                    
                
                    niveles.eliminarTodosLosPoderes();
                    caja.removeChild(document.getElementById(barra.id));

                    niveles.ganarLaPartida();
                    niveles.ganar=false;
                 
              
             }
        }
        this.colisionessoloUnLadrilloNivelOnce();
    }
    for(var z =0; z < pelotas.length;z++){
        if(pelotas[z]!=null){
            niveles.informacionDelJuego();

        }
    }
    //console.log(niveles.nivel);
    //this.colisionesPelotas();
}
//esto es para si paramos el jugo o no
Pelota.prototype.estaEnMovimiento=function(){
    if(existeAumentar){
        this.intervalo=setInterval(this.moverBola.bind(this),15);

    }else{
        this.intervalo=setInterval(this.moverBola.bind(this),20);

    }
}
/*Pelota.prototype.colisionesBarra=function(){
    if(barra.left>=0&&barra.left<=(parseInt(caja.style.width)/4)-barra.width){
        if(this.top+this.width==barra.top){
            if(this.left+this.width>=barra.left&&this.left<=barra.left+barra.width){
                if(this.left+this.width>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=false;
                }else if(this.left+this.width>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left+this.width> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=false;
                }
            }
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                this.avanceLeft=5;

                arriba=false;
                izquierda=false;
            }
        }
    }else  if(barra.left>(parseInt(caja.style.width)/4)-barra.width&&barra.left<=(parseInt(caja.style.width)/2)-barra.width){
        if(this.top+this.width==barra.top){
            if(this.left+this.width>=barra.left&&this.left<=barra.left+barra.width){

                if(this.left+this.width>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=false;
                }else if(this.left+this.width>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left+this.width> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=true;
                }
            }
           
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                this.avanceLeft=5;

                arriba=false;
                izquierda=false;
            }
        }
    }else  if(barra.left>(parseInt(caja.style.width)/2)-barra.width&&barra.left<=(parseInt(caja.style.width)/2)+(parseInt(caja.style.width)/4)-barra.width){
        if(this.top+this.width==barra.top){

            if(this.left+this.width>=barra.left&&this.left<=barra.left+barra.width){
                if(this.left+this.width>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=false;
                }else if(this.left+this.width>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left+this.width> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=true;
                }
            }
          
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                this.avanceLeft=5;

                arriba=false;
                izquierda=false;
            }
        }
    }else  if(barra.left>(parseInt(caja.style.width)/2)+(parseInt(caja.style.width)/4)&&barra.left<=parseInt(caja.style.width)-barra.width){
        if(this.top+this.width==barra.top){
            if(this.left>=barra.left&&this.left<=barra.left+barra.width){

                if(this.left+this.width>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=true;
                }else if(this.left+this.width>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left+this.width> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=true;
                }
            }
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                this.avanceLeft=5;

                arriba=false;
                izquierda=false;
            }
        }
    }else{
        if(this.top+this.height==barra.top){
            if(this.left+this.width>=barra.left&&this.left<=barra.left+barra.width){
                this.avanceLeft=5;

                this.arriba=false;
            
            }
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                this.avanceLeft=5;

                arriba=false;
                izquierda=false;
            }
        }
    } 
    if(this.top==barra.top+barra.height){
        if(this.left+this.width>=barra.left&&this.left<=barra.left+barra.width){
            this.avanceLeft=5;

            this.arriba=true;
        }   
    
    }
}*/
//depende de donde caiga la pelota en la barra cogera una direccion u otra
Pelota.prototype.colisionesBarra=function(){
     if(this.top+this.width==barra.top){

            if(this.left+this.width>=barra.left&&this.left<=barra.left+barra.width){
                if(this.left+this.width>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=false;
                    barraConPelota.load();
                    barraConPelota.play();
                }else if(this.left+this.width>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.avanceLeft=0;
                    barraConPelota.load();
                    barraConPelota.play();
                }else if(this.left+this.width> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.avanceLeft=5;

                    this.arriba=false;
                    this.izquierda=true;
                    barraConPelota.load();
                    barraConPelota.play();
                }
            }
          
    }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
        if(this.left+this.width==barra.left){
            this.avanceLeft=5;
            barraConPelota.load();
            barraConPelota.play();
            arriba=false;
            izquierda=false;
        }
    }else  if(this.top==barra.top+barra.height){
        if(this.left+this.width>=barra.left&&this.left<=barra.left+barra.width){
            this.avanceLeft=5;
          
            this.arriba=true;
        }   
    
    }
}


Pelota.prototype.colisionessoloUnLadrillo=function(){
    for ( i = 0; i < ladrillos.length; i++) {
        if(!ladrillos[i].destruido){
            if (this.top == ladrillos[i].top-this.height) {
                if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                  if(i==posicionPastilla){
                    barra.aumentarBarra(ladrillos,i);
                  }
                  if(i==posicionPastillaCreacionPelotas){
                    barra.creacionPelotas(ladrillos,i);
                  }
                  if(i==posicionPastillaCrearDisparos){
                    barra.creacionDisparos(ladrillos,i);
                  }
                  if(i==posicionPastillaUnaVidaMas){
                    barra.unaVidaMas(ladrillos,i);
                  }
                  if(i==posicionPastillaAumentarVelocidadPelota){
                    barra.aumentarVelocidadPelota(ladrillos,i);
                }
                
                  caja.removeChild(document.getElementById(ladrillos[i].id));
                  ladrillos[i].destruido=true;
                  this.avanceLeft=5;50
                  cantLadrillosDestruidos++;
                  this.arriba = false;
                  niveles.sumarPuntos();
                  pelotaConLadrillo.load();

                  pelotaConLadrillo.play();                }
        
              } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                  
                  if(i==posicionPastilla){
                    barra.aumentarBarra(ladrillos,i);
                  }
                  if(i==posicionPastillaCreacionPelotas){
                    barra.creacionPelotas(ladrillos,i);
                  }
                  if(i==posicionPastillaCrearDisparos){
                    barra.creacionDisparos(ladrillos,i);
                  }
                  if(i==posicionPastillaUnaVidaMas){
                    barra.unaVidaMas(ladrillos,i);
                  }
                  if(i==posicionPastillaAumentarVelocidadPelota){
                    barra.aumentarVelocidadPelota(ladrillos,i);
                }
        
                  
                  caja.removeChild(document.getElementById(ladrillos[i].id));
                  ladrillos[i].destruido=true;
                  this.avanceLeft=5;
                  cantLadrillosDestruidos++;
                  niveles.sumarPuntos();
                 
                  this.arriba = true;
                  pelotaConLadrillo.load();

                  pelotaConLadrillo.play();                }
              }
                else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                  if (this.left+this.width == ladrillos[i].left) {
                   
                    if(i==posicionPastilla){
                        barra.aumentarBarra(ladrillos,i);
                    }
                    if(i==posicionPastillaCreacionPelotas){
                        barra.creacionPelotas(ladrillos,i);
                    }
                    if(i==posicionPastillaCrearDisparos){
                        barra.creacionDisparos(ladrillos,i);
                    }
                    if(i==posicionPastillaUnaVidaMas){
                        barra.unaVidaMas(ladrillos,i);
                    }
                    if(i==posicionPastillaAumentarVelocidadPelota){
                        barra.aumentarVelocidadPelota(ladrillos,i);
                    }
        
                  
                    caja.removeChild(document.getElementById(ladrillos[i].id));
                    ladrillos[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;
                    niveles.sumarPuntos();
         
                    this.arriba = true;
                    this.izquierda = false;
                    pelotaConLadrillo.load();

                    pelotaConLadrillo.play();                  
                } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                   
                    if(i==posicionPastilla){
                        barra.aumentarBarra(ladrillos,i);
                    }
                    if(i==posicionPastillaCreacionPelotas){
                        barra.creacionPelotas(ladrillos,i);
                    }
                    if(i==posicionPastillaCrearDisparos){
                        barra.creacionDisparos(ladrillos,i);
                    }
                    if(i==posicionPastillaUnaVidaMas){
                        barra.unaVidaMas(ladrillos,i);
                    }
                    if(i==posicionPastillaAumentarVelocidadPelota){
                        barra.aumentarVelocidadPelota(ladrillos,i);
                    }
                 
                    caja.removeChild(document.getElementById(ladrillos[i].id));
                    ladrillos[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;
                   
                    this.arriba = true;
                    this.izquierda = true;
                    niveles.sumarPuntos();
                    pelotaConLadrillo.load();

                    pelotaConLadrillo.play();                  
                }
        
            } 
        }
    }
       
}
//Son las colisiones del nivel Seis ya que hay ladrillos que son como muros
Pelota.prototype.colisionessoloUnLadrilloNivelSeis=function(){
    cantLadrillos=0;
    ladrillosFila=7;
    aux=ladrillosFila;
    fila=1;
    while(fila <=8){
        if(fila==1){
            cantLadrillos=0;
        }else{
            cantLadrillos=ladrillosFila;
            ladrillosFila+=aux;
        }
        if(fila %2==0){
            for( i=cantLadrillos;i < ladrillosFila;i++){
                if(!ladrillos[i].destruido){
                    if (this.top == ladrillos[i].top-this.height) {
                        if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                            if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                        
                          caja.removeChild(document.getElementById(ladrillos[i].id));
                          ladrillos[i].destruido=true;
                          this.avanceLeft=5;
                          cantLadrillosDestruidos++;
                          this.arriba = false;
                          niveles.sumarPuntos();
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                        }
                
                      } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                        if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                          
                            if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                
                        
                          caja.removeChild(document.getElementById(ladrillos[i].id));
                          ladrillos[i].destruido=true;
                          this.avanceLeft=5;
                          cantLadrillosDestruidos++;
                          niveles.sumarPuntos();
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                          this.arriba = true;
                        }
                      }
                        else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                          if (this.left+this.width == ladrillos[i].left) {
                           
                            if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                          
                            caja.removeChild(document.getElementById(ladrillos[i].id));
                            ladrillos[i].destruido=true;
                            this.avanceLeft=5;
                            cantLadrillosDestruidos++;
                            niveles.sumarPuntos();
                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();
                            this.arriba = true;
                            this.izquierda = false;
                          } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                           
                            if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                            
                            caja.removeChild(document.getElementById(ladrillos[i].id));
                            ladrillos[i].destruido=true;
                            this.avanceLeft=5;
                            cantLadrillosDestruidos++;
                            niveles.sumarPuntos();
                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();
                            this.arriba = true;
                            this.izquierda = true;
                
                          }
                
                        } 
                }
            }
        }else if(fila%2==1){
            for( i=cantLadrillos;i < ladrillosFila;i++){
                if(!ladrillos[i].destruido){
                    if (this.top == ladrillos[i].top-this.height) {
                        if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                          
                          for(j=0; j < ladrillosAleatorios.length;j++){

                              if(i==ladrillosAleatorios[j]){
                                console.log("valor de i: "+i);
                                if(i==posicionPastilla){
                                    barra.aumentarBarra(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCreacionPelotas){
                                    barra.creacionPelotas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCrearDisparos){
                                    barra.creacionDisparos(ladrillos,i);
                                  }
                                  if(i==posicionPastillaUnaVidaMas){
                                    barra.unaVidaMas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaAumentarVelocidadPelota){
                                    barra.aumentarVelocidadPelota(ladrillos,i);
                                }
                                caja.removeChild(document.getElementById(ladrillos[i].id));
                                ladrillos[i].destruido=true;
                                cantLadrillosDestruidos++;
                                niveles.sumarPuntos();
                                pelotaConLadrillo.load();

                                pelotaConLadrillo.play();
                              }
                          }
                         
                         
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                          this.avanceLeft=5;
                          this.arriba = false;
                          
                        }
                
                      } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                        if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                          
                          
                          for(j=0; j < ladrillosAleatorios.length;j++){

                            if(i==ladrillosAleatorios[j]){
                                console.log("valor de i: "+i);
                                if(i==posicionPastilla){
                                    barra.aumentarBarra(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCreacionPelotas){
                                    barra.creacionPelotas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCrearDisparos){
                                    barra.creacionDisparos(ladrillos,i);
                                  }
                                  if(i==posicionPastillaUnaVidaMas){
                                    barra.unaVidaMas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaAumentarVelocidadPelota){
                                    barra.aumentarVelocidadPelota(ladrillos,i);
                                }
                              caja.removeChild(document.getElementById(ladrillos[i].id));
                              ladrillos[i].destruido=true;
                              cantLadrillosDestruidos++;
                              niveles.sumarPuntos();
                              pelotaConLadrillo.load();

                              pelotaConLadrillo.play();
                            }
                        }
                         
                          
                          this.avanceLeft=5;
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                          this.arriba = true;
                        }
                      }
                        else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                          if (this.left+this.width == ladrillos[i].left) {
                           
                        
                            for(j=0; j < ladrillosAleatorios.length;j++){

                                if(i==ladrillosAleatorios[j]){
                                    console.log("valor de i: "+i);
                                    if(i==posicionPastilla){
                                        barra.aumentarBarra(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCreacionPelotas){
                                        barra.creacionPelotas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCrearDisparos){
                                        barra.creacionDisparos(ladrillos,i);
                                      }
                                      if(i==posicionPastillaUnaVidaMas){
                                        barra.unaVidaMas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaAumentarVelocidadPelota){
                                        barra.aumentarVelocidadPelota(ladrillos,i);
                                    }
                                  caja.removeChild(document.getElementById(ladrillos[i].id));
                                  ladrillos[i].destruido=true;
                                  cantLadrillosDestruidos++;
                                  niveles.sumarPuntos();
                                  pelotaConLadrillo.load();

                                  pelotaConLadrillo.play();
                                }
                            }
                         
                        
                            this.avanceLeft=5;
                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();
                            this.arriba = true;
                            this.izquierda = false;
                          } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                           
                        
                            for(j=0; j < ladrillosAleatorios.length;j++){

                                if(i==ladrillosAleatorios[j]){
                                    console.log("valor de i: "+i);
                                    if(i==posicionPastilla){
                                        barra.aumentarBarra(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCreacionPelotas){
                                        barra.creacionPelotas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCrearDisparos){
                                        barra.creacionDisparos(ladrillos,i);
                                      }
                                      if(i==posicionPastillaUnaVidaMas){
                                        barra.unaVidaMas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaAumentarVelocidadPelota){
                                        barra.aumentarVelocidadPelota(ladrillos,i);
                                    }
                                  caja.removeChild(document.getElementById(ladrillos[i].id));
                                  ladrillos[i].destruido=true;
                                  cantLadrillosDestruidos++;
                                  niveles.sumarPuntos();
                                  pelotaConLadrillo.load();

                                  pelotaConLadrillo.play();
                                }
                            }
                            
                           
                            this.avanceLeft=5;
                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();
                            this.arriba = true;
                            this.izquierda = true;
                
                          }
                
                        } 
                }
            }
        }
        fila++;
        
    }
    
       
}
//Las colisiones del nivel 11
Pelota.prototype.colisionessoloUnLadrilloNivelOnce=function(){
    cantLadrillos=0;
    ladrillosFila=14;
    aux=ladrillosFila;
    fila=1;
    while(fila <=8){
        if(fila==1){
            cantLadrillos=0;
        }else{
            cantLadrillos=ladrillosFila;
            ladrillosFila+=aux;
        }
        if(fila %2==1){
            for( i=cantLadrillos;i < ladrillosFila;i++){
                if(!ladrillos[i].destruido){
                    if (this.top == ladrillos[i].top-this.height) {
                        if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                            if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                         
                          caja.removeChild(document.getElementById(ladrillos[i].id));
                          ladrillos[i].destruido=true;
                          this.avanceLeft=5;
                          cantLadrillosDestruidos++;
                          this.arriba = false;
                          niveles.sumarPuntos();
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                          
                        }
                
                      } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                        if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                          
                            if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                
                          caja.removeChild(document.getElementById(ladrillos[i].id));
                          ladrillos[i].destruido=true;
                          this.avanceLeft=5;
                          cantLadrillosDestruidos++;
        
                          this.arriba = true;
                          niveles.sumarPuntos();
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                        }
                      }
                        else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                          if (this.left+this.width == ladrillos[i].left) {
                           
                             if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                
                        
                            caja.removeChild(document.getElementById(ladrillos[i].id));
                            ladrillos[i].destruido=true;
                            this.avanceLeft=5;
                            cantLadrillosDestruidos++;
                            niveles.sumarPuntos();

                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();
                            this.arriba = true;
                            this.izquierda = false;
                          } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                           
                            if(i==posicionPastilla){
                                barra.aumentarBarra(ladrillos,i);
                              }
                              if(i==posicionPastillaCreacionPelotas){
                                barra.creacionPelotas(ladrillos,i);
                              }
                              if(i==posicionPastillaCrearDisparos){
                                barra.creacionDisparos(ladrillos,i);
                              }
                              if(i==posicionPastillaUnaVidaMas){
                                barra.unaVidaMas(ladrillos,i);
                              }
                              if(i==posicionPastillaAumentarVelocidadPelota){
                                barra.aumentarVelocidadPelota(ladrillos,i);
                            }
                            
                            caja.removeChild(document.getElementById(ladrillos[i].id));
                            ladrillos[i].destruido=true;
                            this.avanceLeft=5;
                            cantLadrillosDestruidos++;
        
                            this.arriba = true;
                            this.izquierda = true;
                            niveles.sumarPuntos();
                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();
                
                          }
                
                        } 
                }
            }
        } if(fila%2==0){
            for( i=cantLadrillos;i < ladrillosFila;i++){
                if(!ladrillos[i].destruido){
                    if (this.top == ladrillos[i].top-this.height) {
                        if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                          
                          for(j=0; j < ladrillosAleatorios.length;j++){

                              if(i==ladrillosAleatorios[j]){
                                console.log("valor de i: "+i);
                                if(i==posicionPastilla){
                                    barra.aumentarBarra(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCreacionPelotas){
                                    barra.creacionPelotas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCrearDisparos){
                                    barra.creacionDisparos(ladrillos,i);
                                  }
                                  if(i==posicionPastillaUnaVidaMas){
                                    barra.unaVidaMas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaAumentarVelocidadPelota){
                                    barra.aumentarVelocidadPelota(ladrillos,i);
                                }
                                caja.removeChild(document.getElementById(ladrillos[i].id));
                                ladrillos[i].destruido=true;
                                cantLadrillosDestruidos++;
                                niveles.sumarPuntos();
                                pelotaConLadrillo.load();

                                pelotaConLadrillo.play();
                              }
                          }
                      
                      
                          this.avanceLeft=5;
                          this.arriba = false;
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                        }
                
                      } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                        if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                          
                          
                          for(j=0; j < ladrillosAleatorios.length;j++){

                            if(i==ladrillosAleatorios[j]){
                                console.log("valor de i: "+i);
                                if(i==posicionPastilla){
                                    barra.aumentarBarra(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCreacionPelotas){
                                    barra.creacionPelotas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaCrearDisparos){
                                    barra.creacionDisparos(ladrillos,i);
                                  }
                                  if(i==posicionPastillaUnaVidaMas){
                                    barra.unaVidaMas(ladrillos,i);
                                  }
                                  if(i==posicionPastillaAumentarVelocidadPelota){
                                    barra.aumentarVelocidadPelota(ladrillos,i);
                                }
                              caja.removeChild(document.getElementById(ladrillos[i].id));
                              ladrillos[i].destruido=true;
                              cantLadrillosDestruidos++;
                              niveles.sumarPuntos();
                              pelotaConLadrillo.load();

                              pelotaConLadrillo.play();

                            }
                        }
                         
                          pelotaConLadrillo.load();

                          pelotaConLadrillo.play();
                          this.avanceLeft=5;
        
                          this.arriba = true;
                        }
                      }
                        else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                          if (this.left+this.width == ladrillos[i].left) {
                           
                        
                            for(j=0; j < ladrillosAleatorios.length;j++){

                                if(i==ladrillosAleatorios[j]){
                                    console.log("valor de i: "+i);
                                    if(i==posicionPastilla){
                                        barra.aumentarBarra(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCreacionPelotas){
                                        barra.creacionPelotas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCrearDisparos){
                                        barra.creacionDisparos(ladrillos,i);
                                      }
                                      if(i==posicionPastillaUnaVidaMas){
                                        barra.unaVidaMas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaAumentarVelocidadPelota){
                                        barra.aumentarVelocidadPelota(ladrillos,i);
                                    }
                                  caja.removeChild(document.getElementById(ladrillos[i].id));
                                  ladrillos[i].destruido=true;
                                  cantLadrillosDestruidos++;
                                  niveles.sumarPuntos();
                                  pelotaConLadrillo.load();

                                  pelotaConLadrillo.play();

                                }
                            }
                           
                        
                            this.avanceLeft=5;
                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();

                            this.arriba = true;
                            this.izquierda = false;
                          } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                           
                        
                            for(j=0; j < ladrillosAleatorios.length;j++){

                                if(i==ladrillosAleatorios[j]){
                                    console.log("valor de i: "+i);
                                    if(i==posicionPastilla){
                                        barra.aumentarBarra(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCreacionPelotas){
                                        barra.creacionPelotas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaCrearDisparos){
                                        barra.creacionDisparos(ladrillos,i);
                                      }
                                      if(i==posicionPastillaUnaVidaMas){
                                        barra.unaVidaMas(ladrillos,i);
                                      }
                                      if(i==posicionPastillaAumentarVelocidadPelota){
                                        barra.aumentarVelocidadPelota(ladrillos,i);
                                    }
                                  caja.removeChild(document.getElementById(ladrillos[i].id));
                                  ladrillos[i].destruido=true;
                                  cantLadrillosDestruidos++;
                                  niveles.sumarPuntos();
                                  pelotaConLadrillo.load();

                                  pelotaConLadrillo.play();

                                }
                            }
                     
                           
                            this.avanceLeft=5;

                            this.arriba = true;
                            this.izquierda = true;
                            pelotaConLadrillo.load();

                            pelotaConLadrillo.play();

                          }
                
                        } 
                }
            }
        }
        fila++;
        
    }
    
       
}
//Las colisiones del nivel 2
Pelota.prototype.colisionesLadrilloDoble=function(){
    for ( i = 0; i < ladrillosDobles.length; i++) {
        if(!ladrillosDobles[i].destruido){
            if (this.top == ladrillosDobles[i].top-this.height) {
                if (this.left >= ladrillosDobles[i].left && this.left <=ladrillosDobles[i].left + ladrillosDobles[i].width) {
               
                  
                  caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                  ladrillosDobles[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;
                    niveles.sumarPuntos();
                    pelotaConLadrillo.load();

                    pelotaConLadrillo.play();


                  this.arriba = false;
                  
                }
        
              } else if (this.top ==ladrillosDobles[i].top + ladrillosDobles[i].height) {
                if (this.left >= ladrillosDobles[i].left && this.left <=ladrillosDobles[i].left +ladrillosDobles[i].width) {
                  
            
        
                  
                  caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                  ladrillosDobles[i].destruido=true;
                  this.avanceLeft=5;
                  cantLadrillosDestruidos++;

                  this.arriba = true;
                  niveles.sumarPuntos();
                  pelotaConLadrillo.load();

                  pelotaConLadrillo.play();

                }
              }
                else if (this.top >= ladrillosDobles[i].top && this.top <= ladrillosDobles[i].top + ladrillosDobles[i].height) {
                  if (this.left+this.width == ladrillosDobles[i].left) {
                 
        
                 
                    caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                    ladrillosDobles[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;
                    niveles.sumarPuntos();
                    pelotaConLadrillo.load();

                    pelotaConLadrillo.play();


                    this.arriba = true;
                    this.izquierda = false;
                  } else if (this.left == ladrillosDobles[i].left + ladrillosDobles[i].width ) {
                   
                   
                   
                    caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                    ladrillosDobles[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;

                    this.arriba = true;
                    this.izquierda = true;
                    niveles.sumarPuntos();
                    pelotaConLadrillo.load();

                    pelotaConLadrillo.play();

        
                  }
        
                } 
        }else if(ladrillosDobles[i].destruido){
            if(!ladrillos[i].destruido){
                if (this.top == ladrillos[i].top-this.height) {
                    if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                        if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                          }
                          if(i==posicionPastillaCreacionPelotas){
                            barra.creacionPelotas(ladrillos,i);
                          }
                          if(i==posicionPastillaCrearDisparos){
                            barra.creacionDisparos(ladrillos,i);
                          }
                          if(i==posicionPastillaUnaVidaMas){
                            barra.unaVidaMas(ladrillos,i);
                          }
                          if(i==posicionPastillaAumentarVelocidadPelota){
                            barra.aumentarVelocidadPelota(ladrillos,i);
                        }
                      
                      caja.removeChild(document.getElementById(ladrillos[i].id));
                      ladrillos[i].destruido=true;
                        this.avanceLeft=5;
                        cantLadrillosDestruidos++;
                        pelotaConLadrillo.load();

                        pelotaConLadrillo.play();

                      this.arriba = false;
                      
                      niveles.sumarPuntos();

                      
                    }
            
                  } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                    if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                      
                        if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                          }
                          if(i==posicionPastillaCreacionPelotas){
                            barra.creacionPelotas(ladrillos,i);
                          }
                          if(i==posicionPastillaCrearDisparos){
                            barra.creacionDisparos(ladrillos,i);
                          }
                          if(i==posicionPastillaUnaVidaMas){
                            barra.unaVidaMas(ladrillos,i);
                          }
                          if(i==posicionPastillaAumentarVelocidadPelota){
                            barra.aumentarVelocidadPelota(ladrillos,i);
                        }
            
                     
                      caja.removeChild(document.getElementById(ladrillos[i].id));
                      ladrillos[i].destruido=true;
                      this.avanceLeft=5;
                      cantLadrillosDestruidos++;
                      pelotaConLadrillo.play();

                      this.arriba = true;
                      pelotaConLadrillo.load();

                      niveles.sumarPuntos();

                    }
                  }
                    else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                      if (this.left+this.width == ladrillos[i].left) {
                        if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                          }
                          if(i==posicionPastillaCreacionPelotas){
                            barra.creacionPelotas(ladrillos,i);
                          }
                          if(i==posicionPastillaCrearDisparos){
                            barra.creacionDisparos(ladrillos,i);
                          }
                          if(i==posicionPastillaUnaVidaMas){
                            barra.unaVidaMas(ladrillos,i);
                          }
                          if(i==posicionPastillaAumentarVelocidadPelota){
                            barra.aumentarVelocidadPelota(ladrillos,i);
                        }
            
                       
                        caja.removeChild(document.getElementById(ladrillos[i].id));
                        ladrillos[i].destruido=true;
                        this.avanceLeft=5;
                        cantLadrillosDestruidos++;
                        niveles.sumarPuntos();
                        pelotaConLadrillo.load();

                        pelotaConLadrillo.play();


                        this.arriba = true;
                        this.izquierda = false;
                      } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                       
                        if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                          }
                          if(i==posicionPastillaCreacionPelotas){
                            barra.creacionPelotas(ladrillos,i);
                          }
                          if(i==posicionPastillaCrearDisparos){
                            barra.creacionDisparos(ladrillos,i);
                          }
                          if(i==posicionPastillaUnaVidaMas){
                            barra.unaVidaMas(ladrillos,i);
                          }
                          if(i==posicionPastillaAumentarVelocidadPelota){
                            barra.aumentarVelocidadPelota(ladrillos,i);
                        }
                        
                        caja.removeChild(document.getElementById(ladrillos[i].id));
                        ladrillos[i].destruido=true;
                        this.avanceLeft=5;
                        cantLadrillosDestruidos++;
                        niveles.sumarPuntos();
                        pelotaConLadrillo.load();

                        pelotaConLadrillo.play();

                        this.arriba = true;
                        this.izquierda = true;
            
                      }
            
                    } 
            }
        }
    }
       
}    
    

/*Pelota.prototype.colisionesPelotas=function(){
    for(i =0; i < pelotas.length;i++){
        if(pelotas[i]!=null||pelotas[i]!=undefined){
                // Si la bola choca con otra bola desde la izquierda.

            if( (this.left == (pelotas[i].left-this.width)) && (this.top >= (pelotas[i].top - this.height)) && (this.top <= (pelotas[i].top + this.height)) ) {
                this.izquierda=false;
                pelotas[i].izquierda=true;
            }
            // Si la bola choca con otra bola desde la derecha.
            if( (this.left == (pelotas[i].left + this.width)) && (this.top >= (pelotas[i].left - this.height)) && (this.top <= (pelotas[i].top + this.height)) ) {
                    this.izquierda=true;
                    pelotas[i].izquierda=false;
            }
            // Si la bola choca con otra bola desde arriba.
            if( (this.top == (pelotas[i].top - this.height)) && (this.left >= (pelotas[i].left - this.width)) && (this.left <= (pelotas[i].left + this.width)) ) {
                this.arriba=false;
                pelotas[i].arriba=true;                    }
            // Si la bola choca con otra bola desde abajo.
            if( (this.top == (pelotas[i].top + this.height)) && (this.left >= (pelotas[i].left - this.width)) && (this.left <= (pelotas[i].left + this.width)) ) {
                this.arriba=true;
                pelotas[i].arriba=false;
            }
        }
        
    }
}*/
            
//Creamos la "clase" barra 
function Barra(idBarra){
    this.id=idBarra;
    this.width=100;
    this.height=20;
    this.left=380;
    this.top=520;
    this.avance=20;
  
} 

Barra.prototype.crearBarra=function(elEvento){
    this.divBarra=document.createElement("div");//creamos la barra en el entorno de juego
    this.divBarra.style.height = this.height+"px";
    this.divBarra.style.width = this.width+"px";
    this.divBarra.style.backgroundColor = "#9a0827";
    this.divBarra.style.position = "absolute";
    this.divBarra.style.left = this.left+"px" ;
    this.divBarra.style.top = this.top+"px";
    this.divBarra.style.borderRadius="1em";
    this.divBarra.id=this.id;
    caja.appendChild(this.divBarra);
    //console.log("valor del left de la barra: "+this.left);
    //this.moverBarra();
}

/*Barra.prototype.moverBarra=function(){
    raqueta=this;
    caja.onmousemove=function (elEvento){
        eventoBarra = window.event||elEvento;
        cx = eventoBarra.clientX;
        cy = eventoBarra.clientY;
        //console.log("Cliente X "+cx+" Cliente Y "+cy);
        if (cx >= 0 && cx <= parseInt(caja.style.width) - raqueta.width){
            raqueta.left=cx;
            raqueta.divBarra.style.left=raqueta.left+"px";
            //console.log(raqueta.barra.style.left);
            //console.log(barra.left);

        }
            //contLeftBarra = cx;
            //informacionDelJuego();
           
        }
        document.onkeydown=function(elEvento){
            var evento=window.event||elEvento;
            if (evento.keyCode == 90 || evento.keyCode == 37) { //Si presionamos la tecla Z o flecha izquierda la barra se mueve hacia a la izquierda
                if (raqueta.left <= parseInt(caja.style.width) - raqueta.width && raqueta.left > 0) {
                    raqueta.left-=20;
                    if (raqueta.left < 0) {
                        raqueta.left = 0;
                    
                    }
                  //console.log(contLeftBarra);
                  raqueta.divBarra.style.left =raqueta.left+"px";

                }
            } else if (evento.keyCode == 88 || evento.keyCode == 39) { //Si presionamos la tecla X o flecha derecha la barra se mueve hacia a la derecha
                if (raqueta.left >= 0 && raqueta.left <= parseInt(caja.style.width) - raqueta.width){
                    raqueta.left+=20;
                    if (raqueta.left > parseInt(caja.style.width) - raqueta.width) {
                        raqueta.left = parseInt(caja.style.width) - raqueta.width;
                      }
                    raqueta.divBarra.style.left =raqueta.left+"px";
                   
                  //console.log(contLeftBarra);
    
                }
              }
        }
}*/
Barra.prototype.moverRaton=function(elEvento){
        eventoBarra = elEvento;
        cx = eventoBarra.clientX;
        cy = eventoBarra.clientY;
        //console.log("Cliente X "+cx+" Cliente Y "+cy);
        if (cx >= 0 && cx <= parseInt(caja.style.width) - this.width){
            
                this.left=cx;
                this.divBarra.style.left=this.left+"px";

            /*
            this.left=cx;
            this.divBarra.style.left=this.left+"px";
            */

            //console.log(raqueta.barra.style.left);
            //console.log(barra.left);
            for(var z =0; z < pelotas.length;z++){
                if(pelotas[z]!=null){
                    niveles.informacionDelJuego();
        
                }
            }
        }
            //contLeftBarra = cx;
            //informacionDelJuego();
           
        
}
Barra.prototype.moverTeclado=function(elEvento){
        var evento=elEvento;
        if (evento.keyCode == 90 || evento.keyCode == 37) { //Si presionamos la tecla Z o flecha izquierda la barra se mueve hacia a la izquierda
            if (this.left <= parseInt(caja.style.width) - this.width && this.left > 0) {
                this.left-=this.avance;
                if(this.left<=0){
                    this.left=0;
                }
                /*moviendose+=1;
                setTimeout(function()
            {moviendose-=1;}, 100);
                if(moviendose>=4)
                {
                    this.left-=10;
                }
                else
                {
                    this.left-=5;
                }
                if (this.left < 0) {
                    this.left = 0;
                }*/
                
              //console.log(contLeftBarra);
              this.divBarra.style.left =this.left+"px";

            }
        } else if (evento.keyCode == 88 || evento.keyCode == 39) { //Si presionamos la tecla X o flecha derecha la barra se mueve hacia a la derecha
            if (this.left >= 0 && this.left <= parseInt(caja.style.width) - this.width){
                this.left+=this.avance;
                /*
                moviendose+=1;
                setTimeout(function()
            {moviendose-=1;}, 100);
                if(moviendose>=4)
                {
                    this.left+=10;
                }
                else{
                    this.left+=5;
                }
                */
                if (this.left > parseInt(caja.style.width) - this.width) {
                    this.left = parseInt(caja.style.width) - this.width;
                }
                  this.divBarra.style.left =this.left+"px";
               
              //console.log(contLeftBarra);

            }
          }
          for(var z =0; z < pelotas.length;z++){
            if(pelotas[z]!=null){
                niveles.informacionDelJuego();
    
            }
        }}

Barra.prototype.aumentarBarra=function(ladrillos,posicion){
    pastillaAumentarBarra=document.createElement("div");
    pastillaAumentarBarra.style.width="20px";
    pastillaAumentarBarra.style.height="10px";
    pastillaAumentarBarra.style.backgroundColor="green";
    pastillaAumentarBarra.style.borderRadius="5px";
    pastillaAumentarBarra.style.position="absolute";
    pastillaAumentarBarra.style.left=parseInt(ladrillos[posicion].left)+"px";
    pastillaAumentarBarra.style.top=parseInt(ladrillos[posicion].height)+parseInt(ladrillos[posicion].top)+"px";
    caja.appendChild(pastillaAumentarBarra);//creo la pastilla en la caja
    existePastillaAumentarBarra=true;
    intervaloPastillaAumentarBarra=setInterval(function(){// el movimiento de la pastilla
      pastillaAumentarBarra.style.top=parseInt(parseInt(pastillaAumentarBarra.style.top)+contTopPastillaAumentarBarra)+"px";//aqui va bajando poco a poco
      //console.log("Altura de la pastilla: "+parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height)));
      //si la pastilla se encuentra en la misma altura que la barra entra en la siguiente condicion    
      if(parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))>=parseInt(barra.top)&&parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))<=parseInt(barra.top)+parseInt(barra.height)){
           //aqui evaluo todas las posibilidades para que la barra coja la pastilla
        if (barra.left>=pastillaAumentarBarra.style.left|| barra.left <= parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width)&&
            barra.left+barra.width>=parseInt(pastillaAumentarBarra.style.left) ||barra.left +barra.width == parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width) ) {
                caja.removeChild(pastillaAumentarBarra);
 
                clearInterval(intervaloPastillaAumentarBarra);
                   barra.width=parseInt(barra.width)+parseInt(pastillaAumentarBarra.style.width);
                   document.getElementById(barra.id).style.width=barra.width+"px";
                   barraAumentada.play();

                   //barraAumentada.play();
                  if(existePastillaAumentarBarra){

                    cuentaAtrasBarra=setTimeout(function(){
                      barra.width=parseInt(barra.width)-parseInt(pastillaAumentarBarra.style.width);
                      document.getElementById(barra.id).style.width=barra.width+"px";

                      barraAumentada.play();

                    },60000);
                    existePastillaAumentarBarra=false;

                  }
            }
          }else if(parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))==parseInt(caja.style.height)){//si llega al tocar el suelo y no llega darle la barra desaparece
            clearInterval(intervaloPastillaAumentarBarra);
            if(existePastillaAumentarBarra){
              caja.removeChild(pastillaAumentarBarra);
              existePastillaAumentarBarra=false;
            }
          }
    },50)    
        

}
Barra.prototype.creacionPelotas=function(ladrillos,posicion){
    pastillaCreacionPelotas=document.createElement("div");
    pastillaCreacionPelotas.style.width="20px";
    pastillaCreacionPelotas.style.height="10px";
    pastillaCreacionPelotas.style.backgroundColor="red";
    pastillaCreacionPelotas.style.borderRadius="5px";
    pastillaCreacionPelotas.style.position="absolute";
    pastillaCreacionPelotas.style.left=parseInt(ladrillos[posicion].left)+"px";
    pastillaCreacionPelotas.style.top=parseInt(ladrillos[posicion].height)+parseInt(ladrillos[posicion].top)+"px";
    caja.appendChild(pastillaCreacionPelotas);//creo la pastilla en la caja
    existePastillaCreacionPelotas=true;
    intervaloPastillaCreacionPelotas=setInterval(function(){// el movimiento de la pastilla
        pastillaCreacionPelotas.style.top=parseInt(parseInt(pastillaCreacionPelotas.style.top)+contTopPastillaCreacionPelotas)+"px";//aqui va bajando poco a poco
      //console.log("Altura de la pastilla: "+parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height)));
      //si la pastilla se encuentra en la misma altura que la barra entra en la siguiente condicion    
      if(parseInt(parseInt(pastillaCreacionPelotas.style.top)+parseInt(pastillaCreacionPelotas.style.height))>=parseInt(barra.top)&&parseInt(parseInt(pastillaCreacionPelotas.style.top)+parseInt(pastillaCreacionPelotas.style.height))<=parseInt(barra.top)+parseInt(barra.height)){
           //aqui evaluo todas las posibilidades para que la barra coja la pastilla
        if (barra.left >=pastillaCreacionPelotas.style.left|| barra.left <= parseInt(pastillaCreacionPelotas.style.left) + parseInt(pastillaCreacionPelotas.style.width)&&
            barra.left+barra.width >=parseInt(pastillaCreacionPelotas.style.left) || barra.left+barra.width == parseInt(pastillaCreacionPelotas.style.left) + parseInt(pastillaCreacionPelotas.style.width) ) {
                  clearInterval(intervaloPastillaCreacionPelotas);
                
                  if(existePastillaCreacionPelotas){
                     for(var i =1;i < pelotas.length;i++){
                         pelotas[i]=new Pelota("pelota"+i);
                         pelotas[i].crearBola();
                     }
                     
                    caja.removeChild(pastillaCreacionPelotas);
                    existePastillaCreacionPelotas=false;
                  }
            }
          }else if(parseInt(parseInt(pastillaCreacionPelotas.style.top)+parseInt(pastillaCreacionPelotas.style.height))==parseInt(caja.style.height)){//si llega al tocar el suelo y no llega darle la barra desaparece
            clearInterval(intervaloPastillaCreacionPelotas);
            if(existePastillaCreacionPelotas){
              caja.removeChild(pastillaCreacionPelotas);
              existePastillaCreacionPelotas=false;
            }
          }
    },50)    
        

}
Barra.prototype.creacionDisparos=function(ladrillos,posicion){
    pastillaCreacionDisparos=document.createElement("div");
    pastillaCreacionDisparos.style.width="20px";
    pastillaCreacionDisparos.style.height="10px";
    pastillaCreacionDisparos.style.backgroundColor="blue";
    pastillaCreacionDisparos.style.borderRadius="5px";
    pastillaCreacionDisparos.style.position="absolute";
    pastillaCreacionDisparos.style.left=parseInt(ladrillos[posicion].left)+"px";
    pastillaCreacionDisparos.style.top=parseInt(ladrillos[posicion].height)+parseInt(ladrillos[posicion].top)+"px";
    caja.appendChild(pastillaCreacionDisparos);//creo la pastilla en la caja
    existePastillaCreacionDisparos=true;
    intervaloPastillaCreacionDisparos=setInterval(function(){// el movimiento de la pastilla
        pastillaCreacionDisparos.style.top=parseInt(parseInt(pastillaCreacionDisparos.style.top)+contTopPastillaDisparos)+"px";//aqui va bajando poco a poco
      //console.log("Altura de la pastilla: "+parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height)));
      //si la pastilla se encuentra en la misma altura que la barra entra en la siguiente condicion    
      if(parseInt(parseInt(pastillaCreacionDisparos.style.top)+parseInt(pastillaCreacionDisparos.style.height))>=parseInt(barra.top)&&parseInt(parseInt(pastillaCreacionDisparos.style.top)+parseInt(pastillaCreacionDisparos.style.height))<=parseInt(barra.top)+parseInt(barra.height)){
           //aqui evaluo todas las posibilidades para que la barra coja la pastilla
        if (barra.left>=pastillaCreacionDisparos.style.left|| barra.left <= parseInt(pastillaCreacionDisparos.style.left) + parseInt(pastillaCreacionDisparos.style.width)&&
            barra.left +barra.width>=parseInt(pastillaCreacionDisparos.style.left) ||barra.left+barra.width == parseInt(pastillaCreacionDisparos.style.left) + parseInt(pastillaCreacionDisparos.style.width) ) {
                if(existePastillaCreacionDisparos){
                    clearInterval(intervaloPastillaCreacionDisparos);
                 
                    caja.removeChild(pastillaCreacionDisparos);
                    existeDisparos=true;
                    existePastillaCreacionDisparos=false;
                } 
             

            }
          }else if(parseInt(parseInt(pastillaCreacionDisparos.style.top)+parseInt(pastillaCreacionDisparos.style.height))==parseInt(caja.style.height)){//si llega al tocar el suelo y no llega darle la barra desaparece
            clearInterval(intervaloPastillaCreacionDisparos);
            if(existePastillaCreacionDisparos){
              caja.removeChild(pastillaCreacionDisparos);
              existePastillaCreacionDisparos=false;
            }
          }
    },50)    
        

}
Barra.prototype.unaVidaMas=function(ladrillos,posicion){
    pastillaUnaVidaMas=document.createElement("div");
    pastillaUnaVidaMas.style.width="20px";
    pastillaUnaVidaMas.style.height="10px";
    pastillaUnaVidaMas.style.backgroundColor="lime";
    pastillaUnaVidaMas.style.borderRadius="5px";
    pastillaUnaVidaMas.style.position="absolute";
    pastillaUnaVidaMas.style.left=parseInt(ladrillos[posicion].left)+"px";
    pastillaUnaVidaMas.style.top=parseInt(ladrillos[posicion].height)+parseInt(ladrillos[posicion].top)+"px";
    caja.appendChild(pastillaUnaVidaMas);//creo la pastilla en la caja
    existePastillaUnaVidaMas=true;
    intervaloPastillaUnaVidaMas=setInterval(function(){// el movimiento de la pastilla
        pastillaUnaVidaMas.style.top=parseInt(parseInt(pastillaUnaVidaMas.style.top)+contTopPastillaUnaVidaMas)+"px";//aqui va bajando poco a poco
      //console.log("Altura de la pastilla: "+parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height)));
      //si la pastilla se encuentra en la misma altura que la barra entra en la siguiente condicion    
      if(parseInt(parseInt(pastillaUnaVidaMas.style.top)+parseInt(pastillaUnaVidaMas.style.height))>=parseInt(barra.top)&&parseInt(parseInt(pastillaUnaVidaMas.style.top)+parseInt(pastillaUnaVidaMas.style.height))<=parseInt(barra.top)+parseInt(barra.height)){
           //aqui evaluo todas las posibilidades para que la barra coja la pastilla
        if (barra.left>=pastillaUnaVidaMas.style.left|| barra.left <= parseInt(pastillaUnaVidaMas.style.left) + parseInt(pastillaUnaVidaMas.style.width)&&
            barra.left +barra.width>=parseInt(pastillaUnaVidaMas.style.left) ||barra.left+barra.width == parseInt(pastillaUnaVidaMas.style.left) + parseInt(pastillaUnaVidaMas.style.width) ) {
                 
                  if(existePastillaUnaVidaMas){
                    clearInterval(intervaloPastillaUnaVidaMas);

                    niveles.vidas++;
                    console.log(niveles.vidas);
                    caja.removeChild(pastillaUnaVidaMas);
                    existePastillaUnaVidaMas=false;
                  }

            }
          }else if(parseInt(parseInt(pastillaUnaVidaMas.style.top)+parseInt(pastillaUnaVidaMas.style.height))==parseInt(caja.style.height)){//si llega al tocar el suelo y no llega darle la barra desaparece
            clearInterval(intervaloPastillaUnaVidaMas);
            if(existePastillaUnaVidaMas){
              caja.removeChild(pastillaUnaVidaMas);
              existePastillaUnaVidaMas=false;
            }
          }
    },50)    
        

}
Barra.prototype.aumentarVelocidadPelota=function(ladrillos,posicion){
    pastillaAumentarVelocidadPelota=document.createElement("div");
    pastillaAumentarVelocidadPelota.style.width="20px";
    pastillaAumentarVelocidadPelota.style.height="10px";
    pastillaAumentarVelocidadPelota.style.backgroundColor="silver";
    pastillaAumentarVelocidadPelota.style.borderRadius="5px";
    pastillaAumentarVelocidadPelota.style.position="absolute";
    pastillaAumentarVelocidadPelota.style.left=parseInt(ladrillos[posicion].left)+"px";
    pastillaAumentarVelocidadPelota.style.top=parseInt(ladrillos[posicion].height)+parseInt(ladrillos[posicion].top)+"px";
    caja.appendChild(pastillaAumentarVelocidadPelota);//creo la pastilla en la caja
    existePastillaAumentarVelocidadPelota=true;
    intervaloPastillaAumentarVelocidadPelota=setInterval(function(){// el movimiento de la pastilla
        pastillaAumentarVelocidadPelota.style.top=parseInt(parseInt(pastillaAumentarVelocidadPelota.style.top)+contTopPastillaAumentarVelocidadPelota)+"px";//aqui va bajando poco a poco
      //console.log("Altura de la pastilla: "+parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height)));
      //si la pastilla se encuentra en la misma altura que la barra entra en la siguiente condicion    
      if(parseInt(parseInt(pastillaAumentarVelocidadPelota.style.top)+parseInt(pastillaAumentarVelocidadPelota.style.height))>=parseInt(barra.top)&&parseInt(parseInt(pastillaAumentarVelocidadPelota.style.top)+parseInt(pastillaAumentarVelocidadPelota.style.height))<=parseInt(barra.top)+parseInt(barra.height)){
           //aqui evaluo todas las posibilidades para que la barra coja la pastilla
        if (barra.left>=pastillaAumentarVelocidadPelota.style.left|| barra.left <= parseInt(pastillaAumentarVelocidadPelota.style.left) + parseInt(pastillaAumentarVelocidadPelota.style.width)&&
            barra.left +barra.width>=parseInt(pastillaAumentarVelocidadPelota.style.left) ||barra.left+barra.width == parseInt(pastillaAumentarVelocidadPelota.style.left) + parseInt(pastillaAumentarVelocidadPelota.style.width) ) {
                  clearInterval(intervaloPastillaAumentarVelocidadPelota);
                 
                  if(existePastillaAumentarVelocidadPelota){
                    existeAumentar=true;
                  
                    caja.removeChild(pastillaAumentarVelocidadPelota);
                    existePastillaAumentarVelocidadPelota=false;
                  }

            }
          }else if(parseInt(parseInt(pastillaAumentarVelocidadPelota.style.top)+parseInt(pastillaAumentarVelocidadPelota.style.height))==parseInt(caja.style.height)){//si llega al tocar el suelo y no llega darle la barra desaparece
            clearInterval(intervaloPastillaAumentarVelocidadPelota);
            if(existePastillaAumentarVelocidadPelota){
              caja.removeChild(pastillaAumentarVelocidadPelota);
              existePastillaAumentarVelocidadPelota=false;
            }
          }
    },50)    
        

}
function Ladrillo(id,width,height,top,left,color){
    this.width=width;
    this.height=height;
    this.top=top;
    this.left=left;
    this.color=color;
    this.id=id;
    this.destruido=false;
    this.crearLadrillo();
}
Ladrillo.prototype.crearLadrillo=function(){
    this.bloque=document.createElement("div");
    this.bloque.style.left=this.left+"px";
    this.bloque.style.top=this.top+"px";
    this.bloque.style.width=this.width+"px";
    this.bloque.style.height=this.height+"px";
    this.bloque.style.backgroundColor=this.color;
    this.bloque.style.position="absolute";
    this.bloque.id=this.id;
    caja.appendChild(this.bloque);
}
//Los disparos de la barra
function Disparo(width,height,top,left,color){
    this.width=width;
    this.height=height;
    this.top=top;
    this.left=left;
    this.color=color;
    this.avanceDisparo=5;
    this.destruido=false;
    this.intervalo=setInterval(this.Disparar.bind(this),10); 
}
Disparo.prototype.crearDisparo=function(){
    this.bala=document.createElement("div");
    this.bala.style.left=this.left+"px";
    this.bala.style.top=this.top+"px";
    this.bala.style.width=this.width+"px";
    this.bala.style.height=this.height+"px";
    this.bala.style.backgroundColor=this.color;
    this.bala.style.position="absolute";
    caja.appendChild(this.bala);
}
Disparo.prototype.Disparar=function(){
    if(this.top>0){
        this.top-=this.avanceDisparo;
        this.bala.style.top=this.top+"px";
    }else if(this.top==0){
       if(!this.destruido){
        clearInterval(this.intervalo);
        caja.removeChild(this.bala);
        this.destruido=true;
       }

    }
        if(niveles.nivel==2){
            this.colisionesLadrilloDobleDisparos();
        }else{
            this.colisionesLadrillosDisparos();

        }

    

    /*if(niveles.nivel==6){
                this.colisionesLadrillosDisparosNivelSeis();

    }else{

    }*/
}
Disparo.prototype.colisionesLadrillosDisparos=function(){
    for ( i = 0; i < ladrillos.length; i++) {
        if(!ladrillos[i].destruido){
            if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                  
                    if(i==posicionPastilla){
                        barra.aumentarBarra(ladrillos,i);
                      }
                      if(i==posicionPastillaCreacionPelotas){
                        barra.creacionPelotas(ladrillos,i);
                      }
                      if(i==posicionPastillaUnaVidaMas){
                        barra.unaVidaMas(ladrillos,i);
                      }
                      if(i==posicionPastillaAumentarVelocidadPelota){
                        barra.aumentarVelocidadPelota(ladrillos,i);
                    }
                
                  if(!this.destruido){
                    clearInterval(this.intervalo);
                    caja.removeChild(this.bala);
                    this.destruido=true;
                   }

                  caja.removeChild(document.getElementById(ladrillos[i].id));
                  ladrillos[i].destruido=true;
                  cantLadrillosDestruidos++;
                  pelotaConLadrillo.load();

                   pelotaConLadrillo.play();
                   niveles.sumarPuntos();
              
                }
              }
               
        }
       
    }
}
//Los disparos del nivel 2
Disparo.prototype.colisionesLadrilloDobleDisparos=function(){
    for ( i = 0; i < ladrillosDobles.length; i++) {
        if(!ladrillosDobles[i].destruido){
            if (this.top ==ladrillosDobles[i].top + ladrillosDobles[i].height) {
                if (this.left >= ladrillosDobles[i].left && this.left <=ladrillosDobles[i].left +ladrillosDobles[i].width) {
                  caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                  ladrillosDobles[i].destruido=true;
                  cantLadrillosDestruidos++;
                  if(!this.destruido){
                    clearInterval(this.intervalo);
                    caja.removeChild(this.bala);
                    this.destruido=true;
                   }
                  niveles.sumarPuntos();
                  pelotaConLadrillo.load();

                  pelotaConLadrillo.play();

                }
              }
                
        }else if(ladrillosDobles[i].destruido){
            if(!ladrillos[i].destruido){
              if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                    if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                      
                        if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                          }
                          if(i==posicionPastillaCreacionPelotas){
                            barra.creacionPelotas(ladrillos,i);
                          }
                        
                          if(i==posicionPastillaUnaVidaMas){
                            barra.unaVidaMas(ladrillos,i);
                          }
                          if(i==posicionPastillaAumentarVelocidadPelota){
                            barra.aumentarVelocidadPelota(ladrillos,i);
                        }
                        if(!this.destruido){
                            clearInterval(this.intervalo);
                            caja.removeChild(this.bala);
                            this.destruido=true;
                           }
                  
                      caja.removeChild(document.getElementById(ladrillos[i].id));
                      ladrillos[i].destruido=true;
                      cantLadrillosDestruidos++;
                      pelotaConLadrillo.load();

                      pelotaConLadrillo.play();

                      niveles.sumarPuntos();

                    }
                  }
                     
            }
        }
    }
       
}    
/*Disparo.prototype.colisionesLadrillosDisparosNivelSeis=function(){
    cantLadrillos=0;
    ladrillosFila=7;
    aux=ladrillosFila;
    fila=1;
    while(fila <=8){
        if(fila==1){
            cantLadrillos=0;
        }else{
            cantLadrillos=ladrillosFila;
            ladrillosFila+=aux;
        }
        if(fila %2==0){
            for( i=cantLadrillos;i < ladrillosFila;i++){
                if(!ladrillos[i].destruido){
                   if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                        if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                          
                          if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                          }
                          if(i==posicionPastillaCreacionPelotas){
                            barra.creacionPelotas(ladrillos,i);
                          }
                            
                
                          /*pelotaConLadrillo.play();
                
                          cantLadrillosDestruidos++;
                          //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                          sumarPuntos();
                          if(!this.destruido){
                            clearInterval(this.intervalo);
                            caja.removeChild(this.bala);
                            this.destruido=true;
                            delete this;
                          }
                          caja.removeChild(document.getElementById(ladrillos[i].id));
                          ladrillos[i].destruido=true;
                          this.avanceLeft=5;
                          cantLadrillosDestruidos++;
        
                          this.arriba = true;
                        }
                      }
                }
            }
        }else if(fila%2==1){
            for( i=cantLadrillos;i < ladrillosFila;i++){
                if(!ladrillos[i].destruido){
                     if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                        if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                          
                            if(!this.destruido){
                                clearInterval(this.intervalo);
                                caja.removeChild(this.bala);
                                this.destruido=true;
                                delete this;
                               }
                          for(j=0; j < ladrillosAleatorios.length;j++){

                            if(i==ladrillosAleatorios[j]){
                                console.log("valor de i: "+i);
                                if(i==posicionPastilla){
                                    barra.aumentarBarra(ladrillos,i);
                                  }
                                if(i==posicionPastillaCreacionPelotas){
                                    barra.creacionPelotas(ladrillos,i);
                                }
                                if(i==posicionPastillaCrearDisparos){
                                    barra.creacionDisparos(ladrillos,i);
                                  }
                              caja.removeChild(document.getElementById(ladrillos[i].id));
                              ladrillos[i].destruido=true;
                              cantLadrillosDestruidos++;
                            }
                        }
                          /*pelotaConLadrillo.play();
                
                          cantLadrillosDestruidos++;
                          //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                          sumarPuntos();
                          
                          this.avanceLeft=5;
        
                          this.arriba = true;
                        }
                      }
                       
                }
            }
        }
        fila++;
        
    }
}*/
function Niveles(nivel,vidas){
    this.nivel=nivel;
    this.vidas=vidas;
    this.ladrillosjuego=0;
    this.ganar=true;
    this.sumaDePuntos=10;
    this.puntos=0;
    this.aumento=1;
}
//Cuando queremos que empieza como el principio
Niveles.prototype.empezar=function(){
    barra = new Barra("barra");
    barra.crearBarra();
        pelotas=new Array(3);
        pelotas[0] = new Pelota("pelota0");
        pelotas[0].crearBola();

    
    
}
//para crear el cuadro de texto donde el jugado metera su nombre
Niveles.prototype.crearNombre=function(){
    nombre = document.createElement("input");
    nombre.setAttribute("type", "text");
    nombre.style.left="275px";
    nombre.style.top="400px";
    nombre.style.height="50px";
    nombre.style.width="150px";
    nombre.style.position="absolute";
    nombre.placeholder="Introduce aqui tu nombre";
    caja.appendChild(nombre);
    
}
// El boton para guardar la puntuacion
Niveles.prototype.crearBtGuardar=function(){
     btGuardar = document.createElement("button");
    var textoGuardar = document.createTextNode("Guardar");
    btGuardar.appendChild(textoGuardar);
    btGuardar.style.top="400px";
    btGuardar.style.left="430px";
    btGuardar.style.height="55px";
    btGuardar.style.width="75px";
    btGuardar.style.position="absolute";
    caja.appendChild(btGuardar);


}
//Para eliminar todas las pastillas en el caso de que se destruya el ultimo ladrillo y estan desaparezcan
Niveles.prototype.eliminarTodosLosPoderes=function(){
    
    
    if(existePastillaAumentarBarra){
        clearInterval(intervaloPastillaAumentarBarra);
        caja.removeChild(pastillaAumentarBarra);
        existePastillaAumentarBarra=false;
    }
    if(existePastillaAumentarVelocidadPelota){
        clearInterval(intervaloPastillaAumentarVelocidadPelota);
        caja.removeChild(pastillaAumentarVelocidadPelota);
        existePastillaAumentarVelocidadPelota=false;
    }
    if(existePastillaCreacionPelotas){
        clearInterval(intervaloPastillaCreacionPelotas);
        caja.removeChild(pastillaCreacionPelotas);
        existePastillaCreacionPelotas=false;
    } 
    if(existePastillaCreacionDisparos){
        clearInterval(intervaloPastillaCreacionDisparos);
        caja.removeChild(pastillaCreacionDisparos);
        existePastillaCreacionDisparos=false;
    }
    if(existePastillaUnaVidaMas){
        clearInterval(intervaloPastillaUnaVidaMas);
        caja.removeChild(pastillaUnaVidaMas);
        existePastillaUnaVidaMas=false;
    } 
    if(existeCuentaAtras){
        clearTimeout(cuentaAtrasBarra);
    }

}
////Para ganar la partida
Niveles.prototype.ganarLaPartida=function(){
          //eliminamos todos los datos y creamos una caja con un texto de has ganado
      
        //eliminamos todos los eventos
        caja.removeEventListener("click",clickRaton);
        caja.removeEventListener("mousemove",pasarPorEncima);
        document.removeEventListener("keyup",levantarDedo);
        document.removeEventListener("keydown",dejarPresionado);
        informacion.innerHTML="";
        ganar = document.createElement("div");
        titulo = document.createElement("h1");
        clearTimeout(cuentaAtrasBarra);

        hasGanado = document.createTextNode("Has ganado");
        titulo.appendChild(hasGanado);
        ganar.style.top = "100px";
        ganar.style.left = "200px";
        ganar.style.width = "300px";
        ganar.style.height = "200px";
        ganar.style.textAlign = "center";
        ganar.style.display = "table-cell";
        ganar.style.verticalAlign = "middle";
        ganar.style.backgroundColor = "aqua";
        ganar.style.position = "relative";
        cambiarColor=false;
        intervaloColor = setInterval(function () {
          if (!cambiarColor) {
            ganar.style.backgroundColor = "#bce409";
            cambiarColor = true;

          } else {
            ganar.style.backgroundColor = "aqua";
            cambiarColor = false;

          }
        }, 400);
        ganar.appendChild(titulo);
        caja.appendChild(ganar);
        duranteLaPartida.currentTime=duranteLaPartida.duration;
        duranteLaPartida.loop=false;
        partidaGanada.play();
        caja.style.cursor="default";// para que nos salga el cursor por defecto
        niveles.crearNombre();//Creamos el cuadro de texto
        niveles.crearBtGuardar();//Creamos el boton de guardar el record
        btGuardar.onclick=niveles.guardarRecord; //si hacemos click al boton de guardar
        /*divPuntos = document.createElement("div");
        divPuntos.style.top = "310px";
        divPuntos.style.width = "200px";
        divPuntos.style.height = "200px";
        divPuntos.style.left = ganar.style.left;
        divPuntos.style.color = "white";

        divPuntos.style.position = "absolute";
        divPuntos.innerHTML = "Has obtenido " + puntos + " puntos <br> y has destruido " + cantLadrillosDestruidos + " ladrillos";
        caja.appendChild(divPuntos);
        caja.removeChild(pelota);
        caja.removeChild(barra);
      
        existePastillaAumentarBarra=false;
      }
        panel.removeChild(informacion);
        duranteLaPartida.currentTime=duranteLaPartida.duration;
        duranteLaPartida.loop=false;
        barraAumentada.pause();
        partidaGanada.play();*/
    
    
}
Niveles.prototype.guardarRecord=function(){
    jugadores=new Array();
    //Si no hay ningun record lo guardamos por defecto
    if(localStorage.length==0){
        jugadores[0]=new Jugador(nombre.value,niveles.puntos);
        localStorage.setItem(jugadores[0].nombre,jugadores[0].puntos);

    }else{
        //vamos guardando todas las puntuaciones en el array de jugadores
        for( var j = 0; j < localStorage.length;j++){
            var n = localStorage.key(j);
            var p =localStorage.getItem(n);
            parseInt(p);
            jugadores[j]=new Jugador(n,p);
          

        }
        localStorage.clear(); //los elimino todos ya que los voy a ordenar
      
        jugador = new Jugador(nombre.value,niveles.puntos);
        //añado el ultimo jugador
        jugadores.push(jugador);
        jugadores.sort(function (jug1, jug2) {
            return (parseInt(jug1.puntos) - parseInt(jug2.puntos))
        }); 
         jugadores.reverse();
         //ya estan ordenados y los guardamos
        for(var i=0; i < jugadores.length;i++){
            localStorage.setItem(jugadores[i].nombre,parseInt(jugadores[i].puntos));

        }
    }
    window.location="records.html";   
    caja.removeChild(nombre);
    caja.removeChild(btGuardar); 
}
Niveles.prototype.perderLaPartida=function(){
      
      
      caja.removeEventListener("click",clickRaton);
      caja.removeEventListener("mousemove",pasarPorEncima);
      document.removeEventListener("keyup",levantarDedo);
      document.removeEventListener("keydown",dejarPresionado);
      informacion.innerHTML="";
      clearTimeout(cuentaAtrasBarra);
    perder = document.createElement("div");
    hasPerdido = document.createTextNode("Has perdido");
    titulo = document.createElement("h2");

    perder.style.top = "300px";
    perder.style.left = "300px";
    perder.style.width = "200px";
    perder.style.height = "60px";
    perder.style.textAlign = "center";
    perder.style.display = "table-cell";
    perder.style.verticalAlign = "middle";
    perder.style.backgroundColor = "aqua";
    perder.style.position = "relative";
    titulo.appendChild(hasPerdido);
        cambiarColor=false;

    intervaloColor = setInterval(function () {
      if (!cambiarColor) {
        perder.style.backgroundColor = "red";
        cambiarColor = true;

      } else {
        perder.style.backgroundColor = "aqua";
        cambiarColor = false;

      }
    }, 400);
    //pausa=true;
    perder.appendChild(titulo);
    caja.appendChild(perder);
    duranteLaPartida.currentTime=duranteLaPartida.duration;
    duranteLaPartida.loop=false;
    partidaPerdida.play();
   

    caja.style.cursor="default";
    niveles.crearNombre();
    niveles.crearBtGuardar();
    btGuardar.onclick=niveles.guardarRecord;
    /*if(existePastillaAumentarBarra){
      clearInterval(intervaloPastillaAumentarBarra);
      caja.removeChild(pastillaAumentarBarra);
      existePastillaAumentarBarra=false;
    }
    duranteLaPartida.currentTime=duranteLaPartida.duration;
    duranteLaPartida.loop=false;
    barraAumentada.pause();
    partidaPerdida.play();*/
}
//toda la informacion del juego
Niveles.prototype.informacionDelJuego=function() {
    informacion.style.cursor="default";
    informacion.style.width="38%";
    informacion.style.height="500px";
    informacion.style.color="red";
    informacion.style.backgroundImage = "url('https://media.giphy.com/media/UYBDCJjwOd9Re/giphy-downsized.gif')";
    informacion.style.padding="10px";
    informacion.innerHTML="";
    informacion.innerHTML+="<strong>Informacion del juego:</strong>"+ "<br>" ;

    for(var i =0;i < pelotas.length;i++){
        if(pelotas[i]!=null){
            informacion.innerHTML+= "<br>" + "<strong> Pelota "+ i +"</strong>" 
            + "<br>" + "<strong> Posicion X (left) de la pelota:  </strong>" + pelotas[i].left
            + "<br>" + " <strong>Posicion Y (top) de la pelota: </strong>" + pelotas[i].top
            +"<br>"
        }
    }
    informacion.innerHTML += 
       "<br>" + " <strong> Cantidad de ladrillos destruidos: </strong>" + cantLadrillosDestruidos
      + "<br>" + "<strong>Posicion de la barra con el raton: </strong>" + cx
      + "<br>" + " <strong>Posicion de la barra con las teclas: </strong>" + barra.left
      + "<br>" + " <strong>Puntos: </strong>" +niveles.puntos
      + "<br>" + " <strong>Vidas: </strong>" + niveles.vidas
      + "<br>" + " <strong>Nivel: </strong>" + niveles.nivel;
  }
  //los eventos del juego parar,mover la barra con el raton y el teclado y para los disparos
function pasarPorEncima(elEvento){
    var evento=window.event||elEvento;
    if(!parar){
        barra.moverRaton(evento);

    }

}
function clickRaton(elEvento){
    var evento=window.event||elEvento;

    if(!parar){
        if(existeDisparos){
    
                new Disparo(5,20,500,barra.left,"white").crearDisparo();
                new Disparo(5,20,500,(barra.left+barra.width-5),"white").crearDisparo();
                niveles.informacionDelJuego();
                disparos.load();
                disparos.play();
            
        }
    }
    
    
}
function levantarDedo(elEvento){
    var evento=window.event||elEvento;
    if(!parar){
        if(existeDisparos){
            if(evento.keyCode==32){
    
                new Disparo(5,20,500,barra.left,"white").crearDisparo();
                new Disparo(5,20,500,(barra.left+barra.width-5),"white").crearDisparo();
                niveles.informacionDelJuego();
                disparos.load();
                disparos.play();
            }
        }
    }
  
   
}
function dejarPresionado(elEvento){
    var evento=window.event||elEvento;
    if(parar){
        if(evento.keyCode==82){ //si pulsamos R continua el juego
            parar=false;
            for(var i =0; i <pelotas.length;i++ ){
                if(pelotas[i]!=null){
                    pelotas[i].estaEnMovimiento();
                }
            }
         }
         duranteLaPartida.play();
         duranteLaPartida.loop=true; 
    }
  
     if(!parar){
        if(evento.keyCode==80){ //si pulsamos P paramos el juego
            parar=true;
            for(var i =0; i <pelotas.length;i++ ){
                if(pelotas[i]!=null){
                    clearInterval(pelotas[i].intervalo);
                }
            } 
            duranteLaPartida.pause();
            duranteLaPartida.loop=false;
        }
     }
    
    if(!parar){
        barra.moverTeclado(evento);

    }
    
}
//La construccion de todos los niveles del juego y donde meto de forma aleatoria los poderes
Niveles.prototype.nivelUno=function(){
    if(this.nivel==1){
            /* nivel 1*/
            cantLadrillos=0;
            ladrillosFila=14;
            distancia=25;
            aux=ladrillosFila;
            fila=1;
            maxLadrillos=112;
            color="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            //posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            /*alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/
            while(fila<=8){
                if(fila==1){
                    cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0-14
                }else{
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
                }
                for (i = cantLadrillos; i< ladrillosFila; i++) {
                    //cada fila tendra un color distinto
                    if(fila==1){
                        color="red";
                    
            
                    }else  if(fila==2){
                        color="aqua";
                    
            
                    }else  if(fila==3){
                        color="green";
                    
            
                    }else  if(fila==4){
                        color="orange";
                    
            
                    }else  if(fila==5){
                        color="white";
                    
            
                    }else  if(fila==6){
                        color="blue";
                    
            
                    }else  if(fila==7){
                        color="brown";
                    
            
                    }else if(fila==8){
                        color="teal";
                    
            
                    }
                    if(i==cantLadrillos){
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                    }else{
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,color);

                    }
                }
                fila++;
            }
    }
}
Niveles.prototype.nivelDos=function(){
     if(this.nivel==2){
            cantLadrillos=0;
            ladrillosFila=14;
            distancia=25;
            aux=ladrillosFila;

            fila=1;
            maxLadrillos=112;
            color="";
            colorDoble="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;

            ladrillosDobles=new Array(ladrillos.length);
            this.ladrillosjuego+=ladrillosDobles.length;

            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            /*alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

            while(fila <=8){
                    if(fila==1){
                        cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0-14
                    }else{
                        cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                        ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
                    }
                    for (i = cantLadrillos; i< ladrillosFila; i++) {
                        //cada fila tendra un color distinto
                        if(fila==1){
                            color="red";
                            colorDoble="aqua"
                
                        }else  if(fila==2){
                            color="aqua";
                            colorDoble="green";
                
                        }else  if(fila==3){
                            color="green";
                            colorDoble="red";
                
                        }else  if(fila==4){
                            color="orange";
                            colorDoble="teal";
                
                        }else  if(fila==5){
                            color="white";
                            colorDoble="blue";
                
                        }else  if(fila==6){
                            color="blue";
                            colorDoble="brown";
                
                        }else  if(fila==7){
                            color="brown";
                            colorDoble="white";
                
                        }else if(fila==8){
                            color="teal";
                            colorDoble="orange";
                
                        }
                        if(i==cantLadrillos){
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                            ladrillosDobles[i]=new Ladrillo("doble"+i,50,20,distancia*fila,10,colorDoble);

                        }else{
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,color);
                            ladrillosDobles[i]=new Ladrillo("doble"+i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,colorDoble);

                        }
                }
                fila++;
            }   
    }
 
}
Niveles.prototype.nivelTres=function(){
    if(this.nivel==3){
            /* nivel 3*/
            cantLadrillos=0;
            ladrillosFila=12;
            distancia=25;
            aux=ladrillosFila;
            fila=1;
            maxLadrillos=96;

            color="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;

            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            /*alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

            while(fila <=8){
                if(fila==1){
                    cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0-14
                }else{
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
                }
                for (i = cantLadrillos; i< ladrillosFila; i++) {
                         //cada fila tendra un color distinto
                        if(fila==1){
                            color="red";
                        
                
                        }else  if(fila==2){
                            color="aqua";
                        
                
                        }else  if(fila==3){
                            color="green";
                        
                
                        }else  if(fila==4){
                            color="orange";
                        
                
                        }else  if(fila==5){
                            color="white";
                        
                
                        }else  if(fila==6){
                            color="blue";
                        
                
                        }else  if(fila==7){
                            color="brown";
                        
                
                        }else if(fila==8){
                            color="teal";
                        
                
                        }
                        if(i==cantLadrillos){
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                        }else if(i==cantLadrillos+aux/2){
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*3,color);

                        }else{
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,color);

                        }
                    }
                   
                
                fila++;
            }
    }
}
Niveles.prototype.nivelCuatro=function(){
    if(this.nivel==4){
            /* nivel 4*/
            cantLadrillos=0;
            ladrillosFila=1;
            distancia=25;
            aux=2;
            fila=1;
            maxLadrillos=57;
            color="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;

            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            /*alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

            while(fila <=8){
                if(fila==1){
                    cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0
                }else{
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
                    aux+=2;

                }
                for (i = cantLadrillos; i < ladrillosFila; i++) {
                         //cada fila tendra un color distinto
                        if(fila==1){
                            color="red";
                        
                
                        }else  if(fila==2){
                            color="aqua";
                        
                
                        }else  if(fila==3){
                            color="green";
                        
                
                        }else  if(fila==4){
                            color="orange";
                        
                
                        }else  if(fila==5){
                            color="white";
                        
                
                        }else  if(fila==6){
                            color="blue";
                        
                
                        }else  if(fila==7){
                            color="brown";
                        
                
                        }else if(fila==8){
                            color="teal";
                        
                
                        }
                        if(i==cantLadrillos){
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                        }else{
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,color);

                        }
                    }
                  /* console.log("CantiLadrillos: "+cantLadrillos);
                   console.log("ladrillosFila: "+ladrillosFila);*/
                
                fila++;

            }
    }
}
Niveles.prototype.nivelCinco=function(){
    if(this.nivel==5){
            /* nivel 5*/
            cantLadrillos=0;
            ladrillosFila=14;
            distancia=25;
            aux=ladrillosFila;
            fila=1;
            maxLadrillos=40;
            color="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;

            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
           /* alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

            while(fila <=8){
                if(fila==1){
                    cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0
                }else if(fila==8){
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
                }else{
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += 2;
                }
                for (i = cantLadrillos; i < ladrillosFila; i++) {
                         //cada fila tendra un color distinto
                        if(fila==1){
                            color="red";
                        
                
                        }else  if(fila==2){
                            color="aqua";
                        
                
                        }else  if(fila==3){
                            color="green";
                        
                
                        }else  if(fila==4){
                            color="orange";
                        
                
                        }else  if(fila==5){
                            color="white";
                        
                
                        }else  if(fila==6){
                            color="blue";
                        
                
                        }else  if(fila==7){
                            color="brown";
                        
                
                        }else if(fila==8){
                            color="teal";
                        
                
                        }
                        if(fila==1|fila==8){
                            if(i==cantLadrillos){
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                            }else{
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,color);
    
                            }
                        }else{
                            if(i==cantLadrillos){
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                            }else if(i==cantLadrillos+1){
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*(aux-1),color);
    
                            }
                        }
                      
                    }
                   /*console.log("CantiLadrillos: "+cantLadrillos);
                   console.log("ladrillosFila: "+ladrillosFila);*/
                
                fila++;

            }
    }
}
Niveles.prototype.nivelSeis=function(){
    if(this.nivel==6){
            /* nivel 6*/
            cantLadrillos=0;
            ladrillosFila=7;
            distancia=25;
            aux=ladrillosFila;
            fila=1;
            maxLadrillos=56;
            cont=0;
            color="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;

            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            //posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaCrearDisparos=55;
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
           /* alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

            while(fila <=8){
                if(fila==1){
                    cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0
                }else{
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += aux;
                }
                for (i = cantLadrillos; i < ladrillosFila; i++) {
                        //cada fila tendra un color distinto
                        if(fila %2==0){
                            color="white";
                           

                        }else{
                            color="orange";

                        }
                    
                        
                        if(fila %2==1){
                      
                            if(i==cantLadrillos){
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,65,color);
                            }else{
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*2,color);
    
                            }

                        }else{
                            if(i==cantLadrillos){
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                            }else{
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*2,color);
    
                            }

                        }
                        
                    
                }
                if(fila%2==1){
                    posicionAEliminar=Math.floor(Math.random()*aux +cantLadrillos);
                    ladrillosAleatorios[cont]=parseInt(posicionAEliminar);
                    /*console.log("posicionAEliminar: "+posicionAEliminar);
                    console.log("valor de  ladrillosAleatorios[cont]"+ parseInt(ladrillosAleatorios[cont]));*/
                    ladrillos[ladrillosAleatorios[cont]].color="red";
                    document.getElementById( ladrillos[ladrillosAleatorios[cont]].id).style.backgroundColor= ladrillos[ladrillosAleatorios[cont]].color;
                    cont++;
                }
                /*console.log("CantiLadrillos: "+cantLadrillos);
                console.log("ladrillosFila: "+ladrillosFila);*/
                
                fila++;

            }
           
    }
}

Niveles.prototype.nivelSiete=function(){
    if(this.nivel==7){
        /* nivel 7*/
        cantLadrillos=0;
        ladrillosFila=2;
        distancia=25;
        aux=ladrillosFila;
        fila=1;
        maxLadrillos=16;
        color="";
        ladrillos=new Array(maxLadrillos);
        this.ladrillosjuego+=ladrillos.length;

        posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
        posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
        //posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);
        posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

        //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
        /*alert("La pastilla se ha guardaddo en: "+posicionPastilla);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

        while(fila <=8){
            if(fila==1){
                cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0
            }else if(fila==8){
                cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
            }else{
                cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                ladrillosFila += 2;
            }
            for (i = cantLadrillos; i < ladrillosFila; i++) {
                     //cada fila tendra un color distinto
                    if(fila==1){
                        color="red";
                    
            
                    }else  if(fila==2){
                        color="aqua";
                    
            
                    }else  if(fila==3){
                        color="green";
                    
            
                    }else  if(fila==4){
                        color="orange";
                    
            
                    }else  if(fila==5){
                        color="white";
                    
            
                    }else  if(fila==6){
                        color="blue";
                    
            
                    }else  if(fila==7){
                        color="brown";
                    
            
                    }else if(fila==8){
                        color="teal";
                    
            
                    }
                    if(i==cantLadrillos){
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                    }else if(i==ladrillosFila-1){
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*(13),color);

                    }
                    
                  
                }
               /*console.log("CantiLadrillos: "+cantLadrillos);
               console.log("ladrillosFila: "+ladrillosFila);*/
            
            fila++;

        }
    }
}
Niveles.prototype.nivelOcho=function(){
    if(this.nivel==8){
        /* nivel 8*/
        cantLadrillos=0;
        ladrillosFila=7;
        distancia=25;
        aux=ladrillosFila;
        fila=1;
        maxLadrillos=56;
        color="";
        ladrillos=new Array(maxLadrillos);
        this.ladrillosjuego+=ladrillos.length;

        posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
        posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
        //posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);
        posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

        //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
        /*alert("La pastilla se ha guardaddo en: "+posicionPastilla);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

        while(fila <=8){
            if(fila==1){
                cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0-14
            }else{
                cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
            }
            for (i = cantLadrillos; i< ladrillosFila; i++) {
                //cada fila tendra un color distinto
                if(fila==1){
                    color="red";
                
        
                }else  if(fila==2){
                    color="aqua";
                
        
                }else  if(fila==3){
                    color="green";
                
        
                }else  if(fila==4){
                    color="orange";
                
        
                }else  if(fila==5){
                    color="white";
                
        
                }else  if(fila==6){
                    color="blue";
                
        
                }else  if(fila==7){
                    color="brown";
                
        
                }else if(fila==8){
                    color="teal";
                
        
                }
                if(i==cantLadrillos){
                    ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,60,color);
                }else {
                    ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*2,color);

                }
            }
            fila++;
        }
    }
}
Niveles.prototype.nivelNueve=function(){
    if(this.nivel==9){
        /* nivel 9*/
        cantLadrillos=0;
        ladrillosFila=2;
        distancia=25;
        aux=ladrillosFila;
        fila=1;
        maxLadrillos=26;
        color="";
        ladrillos=new Array(maxLadrillos);
        this.ladrillosjuego+=ladrillos.length;

        posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
        posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
        //posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);
        posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

        //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
       /* alert("La pastilla se ha guardaddo en: "+posicionPastilla);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/
        while(fila<=8){
            if(fila==1){
                cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0-14
            }else if(fila==8){
                aux=12;
                cantLadrillos=ladrillosFila;
                ladrillosFila += aux;
            }
            else{
                cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
            }
            for (i = cantLadrillos; i< ladrillosFila; i++) {
                //cada fila tendra un color distinto
                if(fila==1){
                    color="red";
                
        
                }else  if(fila==2){
                    color="aqua";
                
        
                }else  if(fila==3){
                    color="green";
                
        
                }else  if(fila==4){
                    color="orange";
                
        
                }else  if(fila==5){
                    color="white";
                
        
                }else  if(fila==6){
                    color="blue";
                
        
                }else  if(fila==7){
                    color="brown";
                
        
                }else if(fila==8){
                    color="teal";
                
        
                }
                if( fila>=1 && fila <8){
                  
                    if(i==cantLadrillos){
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                    }else if(i==ladrillosFila-1){
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*(13),color);

                    }
                }else if(fila==8){
                    if(i==cantLadrillos){
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                    }else if(i==cantLadrillos+aux/2){
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*3,color);

                    }else{
                        ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,color);

                    }
                    
                }
               
            }
            fila++;
        }
    }
}
Niveles.prototype.nivelDiez=function(){
    if(this.nivel==10){
            /* nivel 10*/
            cantLadrillos=0;
            ladrillosFila=7;
            distancia=25;
            aux=ladrillosFila;
            fila=1;
            maxLadrillos=56;
            cont=0;
            color="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;

            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            //posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=55;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
           /* alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/


            while(fila <=8){
                if(fila==1){
                    cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0
                }else{
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += aux;
                }
                for (i = cantLadrillos; i < ladrillosFila; i++) {
                        //cada fila tendra un color distinto
                      
                        if(fila==1){
                            color="red";
                        
                
                        }else  if(fila==2){
                            color="aqua";
                        
                
                        }else  if(fila==3){
                            color="green";
                        
                
                        }else  if(fila==4){
                            color="orange";
                        
                
                        }else  if(fila==5){
                            color="white";
                        
                
                        }else  if(fila==6){
                            color="blue";
                        
                
                        }else  if(fila==7){
                            color="brown";
                        
                
                        }else if(fila==8){
                            color="teal";
                        
                
                        }
                        if(fila %2==0){
                      
                            if(i==cantLadrillos){
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,65,color);
                            }else{
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*2,color);
    
                            }

                        }else{
                            if(i==cantLadrillos){
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                            }else{
                                ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + (50 + 5)*2,color);
    
                            }

                        }
                        
                        
                    
                }
          
               /*console.log("CantiLadrillos: "+cantLadrillos);
                console.log("ladrillosFila: "+ladrillosFila);*/
                
                fila++;

            }
           
    }
}
Niveles.prototype.nivelOnce=function(){
    if(this.nivel==11){
            /* nivel 11*/
            cantLadrillos=0;
            ladrillosFila=14;
            distancia=25;
            aux=ladrillosFila;
            fila=1;
            maxLadrillos=112;
            cont=0;
            color="";
            ladrillos=new Array(maxLadrillos);
            this.ladrillosjuego+=ladrillos.length;

            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=ladrillos.length-14-1;

            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            //posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            /*alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);*/

            while(fila <=8){
                if(fila==1){
                    cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0
                }else{
                    cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
                    ladrillosFila += aux;
                }
                for (i = cantLadrillos; i < ladrillosFila; i++) {
                        //cada fila tendra un color distinto
                        if(fila %2==0){
                            color="orange";
                           

                        }else{
                            color="white";

                        }
                    
                        
                        if(i==cantLadrillos){
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,10,color);
                        }else{
                            ladrillos[i]=new Ladrillo(i,50,20,distancia*fila,ladrillos[i - 1].left + 50 + 5,color);

                        }
                        
                    
                }
                if(fila%2==0){
                    posicionAEliminar=Math.floor(Math.random()*aux +cantLadrillos);
                    ladrillosAleatorios[cont]=parseInt(posicionAEliminar);
                    console.log("posicionAEliminar: "+posicionAEliminar);
                    console.log("valor de  ladrillosAleatorios[cont]"+ parseInt(ladrillosAleatorios[cont]));
                    ladrillos[ladrillosAleatorios[cont]].color="red";
                    document.getElementById( ladrillos[ladrillosAleatorios[cont]].id).style.backgroundColor= ladrillos[ladrillosAleatorios[cont]].color;
                    cont++;
                }
               /* console.log("CantiLadrillos: "+cantLadrillos);
                console.log("ladrillosFila: "+ladrillosFila);*/
                
                fila++;

            }
           
    }
}
//Funcion para sumar los puntos del juego en funcion de los ladrillos destruidos
Niveles.prototype.sumarPuntos=function() {
    if (cantLadrillosDestruidos >= 0 && cantLadrillosDestruidos <= 150) {
      niveles.puntos = niveles.puntos + niveles.sumaDePuntos * niveles.aumento;//puntos +10
    } if (cantLadrillosDestruidos > 150 && cantLadrillosDestruidos <= 300) {
        niveles.aumentoaumento = 2;
      niveles.puntos = niveles.puntos + (niveles.sumaDePuntos * niveles.aumento);//puntos +20
    } if (cantLadrillosDestruidos > 300 && cantLadrillosDestruidos <= 450) {
        niveles.aumentoaumento = 3;
        niveles.puntos = niveles.puntos + (niveles.sumaDePuntos  * niveles.aumento);//puntos +30

    } if (cantLadrillosDestruidos > 450&& cantLadrillosDestruidos<=580) {
        niveles.aumento = 4;
        niveles.puntos = niveles.puntos + (niveles.sumaDePuntos  * niveles.aumento);//puntos +40

    }if (cantLadrillosDestruidos > 580&& cantLadrillosDestruidos<=690) {
        niveles.aumento = 5;
      niveles.puntos = niveles.puntos + (niveles.sumaDePuntos  * niveles.aumento);//puntos +50

    }
    if (cantLadrillosDestruidos > 690&& cantLadrillosDestruidos<=740) {
        niveles.aumento = 6;
        niveles.puntos  = niveles.puntos + (niveles.sumaDePuntos  * niveles.aumento);//puntos +60

    }    
    if (cantLadrillosDestruidos > 740&& cantLadrillosDestruidos<=770) {
        niveles.aumento = 7;
        niveles.puntos = niveles.puntos + (niveles.sumaDePuntos  * niveles.aumento);//puntos +70

    }
    if(cantLadrillosDestruidos > 770) {
        niveles.aumento = 10;
      niveles.puntos = niveles.puntos + (niveles.sumaDePuntos * niveles.aumento);//puntos +80

    }
  }

//La clase jugador para guardar la puntuacion
function Jugador(nombre,puntos){
    this.nombre=nombre;
    this.puntos=puntos;
   
}