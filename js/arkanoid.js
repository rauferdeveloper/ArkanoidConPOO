    window.onload=function(){
        caja=document.getElementById("caja");
        caja.style.width = "800px";
        caja.style.height = "600px";
        caja.style.backgroundColor = "rgb(0, 0, 0)";
        cx=0;
        pelota=new Pelota("pelota");
        pelota.crearBola();
        delete pelota;
        //clearInterval(pelota.intervalo);
        barra = new Barra("barra");
        barra.crearBarra();
        contTopPastillaAumentarBarra=5;
        cantLadrillosDestruidos=0;
        nivel=1;
        ladrillos=new Array();
        ladrillosDobles=new Array();
        niveles  = new Niveles(nivel);
        niveles.nivelUno();
          
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
  
    this.left = Math.floor(Math.random() * (parseInt(caja.style.width)-this.width) + 0);
    this.top =  Math.floor(Math.random() * (parseInt(caja.style.height)-this.height) + 0);
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
    this.id=idPelota;
    this.intervalo=setInterval(this.moverBola.bind(this),20);  

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
    
}
Pelota.prototype.moverBola=function(){
    
    if(this.top>=parseInt(caja.style.height)-parseInt(this.height)){
        this.arriba=false;

    }else if(this.top<=0){
        this.avanceLeft=5;

        this.arriba=true;
       
    }
    if(!this.arriba){
        this.top-=this.avanceTop;
        this.bola.style.top=this.top+"px";
    }else if(this.arriba){
        this.top+=this.avanceTop;
        this.bola.style.top=this.top+"px";
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
    //this.colisionesPelotas();
    this.colisionesBarra();
    if(niveles.nivel==1){
        if(cantLadrillosDestruidos==ladrillos.length){
            niveles.nivel=2;
            if(existePastillaAumentarBarra){
              clearInterval(intervaloPastillaAumentarBarra);
              caja.removeChild(pastillaAumentarBarra);
              existePastillaAumentarBarra=false;
            }
            niveles.nivelDos();
          }        
        this.colisionesLadrillo();

    }else if(niveles.nivel==2){
        this.colisionesLadrilloDoble();

    }
}
Pelota.prototype.colisionesBarra=function(){
    if(barra.left>=0&&barra.left<=(parseInt(caja.style.width)/4)-barra.width){
        if(this.top+this.width==barra.top){
            if(this.left>=barra.left&&this.left<=barra.left+barra.width){
                if(this.left>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.arriba=false;
                    this.izquierda=false;
                }else if(this.left>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.arriba=false;
                    this.izquierda=false;
                }
            }
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                arriba=false;
                izquierda=false;
            }
        }
    }else  if(barra.left>(parseInt(caja.style.width)/4)-barra.width&&barra.left<=(parseInt(caja.style.width)/2)-barra.width){
        if(this.top+this.width==barra.top){
            if(this.left>=barra.left&&this.left<=barra.left+barra.width){
                if(this.left>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.arriba=false;
                    this.izquierda=false;
                }else if(this.left>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.arriba=false;
                    this.izquierda=true;
                }
            }
           
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                arriba=false;
                izquierda=false;
            }
        }
    }else  if(barra.left>(parseInt(caja.style.width)/2)-barra.width&&barra.left<=(parseInt(caja.style.width)/2)+(parseInt(caja.style.width)/4)-barra.width){
        if(this.top+this.width==barra.top){
            if(this.left>=barra.left&&this.left<=barra.left+barra.width){
                if(this.left>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.arriba=false;
                    this.izquierda=false;
                }else if(this.left>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.arriba=false;
                    this.izquierda=true;
                }
            }
          
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                arriba=false;
                izquierda=false;
            }
        }
    }else  if(barra.left>(parseInt(caja.style.width)/2)+(parseInt(caja.style.width)/4)&&barra.left<=parseInt(caja.style.width)-barra.width){
        if(this.top+this.width==barra.top){
            if(this.left>=barra.left&&this.left<=barra.left+barra.width){
                if(this.left>=barra.left&&this.left<=barra.left+(barra.width/3)){
                    this.arriba=false;
                    this.izquierda=true;
                }else if(this.left>barra.left+(barra.width/3)&& this.left<= barra.left+barra.width-(barra.width/3)){
                    this.arriba=false;
                    this.avanceLeft=0;
                }else if(this.left> barra.left+barra.width-(barra.width/3)&&this.left<=barra.left+barra.width){
                    this.arriba=false;
                    this.izquierda=true;
                }
            }
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                arriba=false;
                izquierda=false;
            }
        }
    }else{
        if(this.top+this.width==barra.top){
            if(this.left>=barra.left&&this.left<=barra.left+barra.width){
                this.arriba=false;
            
            }
        }else if(this.top>barra.top&&this.top<=barra.top+barra.height){
            if(this.left+this.width==barra.left){
                arriba=false;
                izquierda=false;
            }
        }
    } 
    if(this.top+this.width==barra.top+barra.height){
        if(this.left>=barra.left&&this.left<=barra.left+barra.width){
            this.arriba=true;
        }   
    
    }
}

Pelota.prototype.colisionesLadrillo=function(){
    for ( i = 0; i < ladrillos.length; i++) {
        if(!ladrillos[i].destruido){
            if (this.top == ladrillos[i].top-this.height) {
                if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                  if(i==posicionPastilla){
                    barra.aumentarBarra(ladrillos,i);
                  }
                  /*
                  pelotaConLadrillo.load();
                  pelotaConLadrillo.play();
                  cantLadrillosDestruidos++;
                  //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);*/
                  caja.removeChild(document.getElementById(ladrillos[i].id));
                  ladrillos[i].destruido=true;
                  this.avanceLeft=5;
                  cantLadrillosDestruidos++;
                  this.arriba = false;
                  
                }
        
              } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                  
                  if(i==posicionPastilla){
                    barra.aumentarBarra(ladrillos,i);
                  }
        
                  /*pelotaConLadrillo.play();
        
                  cantLadrillosDestruidos++;
                  //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                  sumarPuntos();*/
                  caja.removeChild(document.getElementById(ladrillos[i].id));
                  ladrillos[i].destruido=true;
                  this.avanceLeft=5;
                  cantLadrillosDestruidos++;

                  this.arriba = true;
                }
              }
                else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                  if (this.left+this.width == ladrillos[i].left) {
                   
                    if(i==posicionPastilla){
                        barra.aumentarBarra(ladrillos,i);
                    }
        
                   /* pelotaConLadrillo.play();
                    sumarPuntos();
        
                    cantLadrillosDestruidos++;
                    //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);*/
                    caja.removeChild(document.getElementById(ladrillos[i].id));
                    ladrillos[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;

                    this.arriba = true;
                    this.izquierda = false;
                  } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                   
                    if(i==posicionPastilla){
                        barra.aumentarBarra(ladrillos,i);
                    }
                    /*pelotaConLadrillo.play();
                    cantLadrillosDestruidos++;
                    //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                    sumarPuntos();*/
                    caja.removeChild(document.getElementById(ladrillos[i].id));
                    ladrillos[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;

                    this.arriba = true;
                    this.izquierda = true;
        
                  }
        
                } 
        }
    }
       
}
Pelota.prototype.colisionesLadrilloDoble=function(){
    for ( i = 0; i < ladrillosDobles.length; i++) {
        if(!ladrillosDobles[i].destruido){
            if (this.top == ladrillosDobles[i].top-this.height) {
                if (this.left >= ladrillosDobles[i].left && this.left <=ladrillosDobles[i].left + ladrillosDobles[i].width) {
               
                  /*
                  pelotaConLadrillo.load();
                  pelotaConLadrillo.play();
                  cantLadrillosDestruidos++;
                  //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);*/
                  caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                  ladrillosDobles[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;

                  this.arriba = false;
                  
                }
        
              } else if (this.top ==ladrillosDobles[i].top + ladrillosDobles[i].height) {
                if (this.left >= ladrillosDobles[i].left && this.left <=ladrillosDobles[i].left +ladrillosDobles[i].width) {
                  
            
        
                  /*pelotaConLadrillo.play();
        
                  cantLadrillosDestruidos++;
                  //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                  sumarPuntos();*/
                  caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                  ladrillosDobles[i].destruido=true;
                  this.avanceLeft=5;
                  cantLadrillosDestruidos++;

                  this.arriba = true;
                }
              }
                else if (this.top >= ladrillosDobles[i].top && this.top <= ladrillosDobles[i].top + ladrillosDobles[i].height) {
                  if (this.left+this.width == ladrillosDobles[i].left) {
                 
        
                   /* pelotaConLadrillo.play();
                    sumarPuntos();
        
                    cantLadrillosDestruidos++;
                    //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);*/
                    caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                    ladrillosDobles[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;

                    this.arriba = true;
                    this.izquierda = false;
                  } else if (this.left == ladrillosDobles[i].left + ladrillosDobles[i].width ) {
                   
                   
                    /*pelotaConLadrillo.play();
                    cantLadrillosDestruidos++;
                    //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                    sumarPuntos();*/
                    caja.removeChild(document.getElementById(ladrillosDobles[i].id));
                    ladrillosDobles[i].destruido=true;
                    this.avanceLeft=5;
                    cantLadrillosDestruidos++;

                    this.arriba = true;
                    this.izquierda = true;
        
                  }
        
                } 
        }else if(ladrillosDobles[i].destruido){
            if(!ladrillos[i].destruido){
                if (this.top == ladrillos[i].top-this.height) {
                    if (this.left >= ladrillos[i].left && this.left <= ladrillos[i].left + ladrillos[i].width) {
                      if(i==posicionPastilla){
                        barra.aumentarBarra(ladrillos,i);
                      }
                      /*
                      pelotaConLadrillo.load();
                      pelotaConLadrillo.play();
                      cantLadrillosDestruidos++;
                      //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);*/
                      caja.removeChild(document.getElementById(ladrillos[i].id));
                      ladrillos[i].destruido=true;
                        this.avanceLeft=5;
                        cantLadrillosDestruidos++;

                      this.arriba = false;
                      
                    }
            
                  } else if (this.top ==ladrillos[i].top + ladrillos[i].height) {
                    if (this.left >= ladrillos[i].left && this.left <=ladrillos[i].left +ladrillos[i].width) {
                      
                      if(i==posicionPastilla){
                        barra.aumentarBarra(ladrillos,i);
                      }
            
                      /*pelotaConLadrillo.play();
            
                      cantLadrillosDestruidos++;
                      //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                      sumarPuntos();*/
                      caja.removeChild(document.getElementById(ladrillos[i].id));
                      ladrillos[i].destruido=true;
                      this.avanceLeft=5;
                      cantLadrillosDestruidos++;

                      this.arriba = true;
                    }
                  }
                    else if (this.top >= ladrillos[i].top && this.top <= ladrillos[i].top + ladrillos[i].height) {
                      if (this.left+this.width == ladrillos[i].left) {
                       
                        if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                        }
            
                       /* pelotaConLadrillo.play();
                        sumarPuntos();
            
                        cantLadrillosDestruidos++;
                        //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);*/
                        caja.removeChild(document.getElementById(ladrillos[i].id));
                        ladrillos[i].destruido=true;
                        this.avanceLeft=5;
                        cantLadrillosDestruidos++;

                        this.arriba = true;
                        this.izquierda = false;
                      } else if (this.left == ladrillos[i].left + ladrillos[i].width ) {
                       
                        if(i==posicionPastilla){
                            barra.aumentarBarra(ladrillos,i);
                        }
                        /*pelotaConLadrillo.play();
                        cantLadrillosDestruidos++;
                        //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                        sumarPuntos();*/
                        caja.removeChild(document.getElementById(ladrillos[i].id));
                        ladrillos[i].destruido=true;
                        this.avanceLeft=5;
                        cantLadrillosDestruidos++;

                        this.arriba = true;
                        this.izquierda = true;
            
                      }
            
                    } 
            }
        }
    }
       
}    
    


Pelota.prototype.colisionesPelotas=function(){
    for(i =0; i < pelotas.length;i++){
        
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
    this.barra=document.createElement("div");//creamos la barra en el entorno de juego
    this.barra.style.height = this.height+"px";
    this.barra.style.width = this.width+"px";
    this.barra.style.backgroundColor = "#9a0827";
    this.barra.style.position = "absolute";
    this.barra.style.left = this.left+"px" ;
    this.barra.style.top = this.top+"px";
    this.barra.style.borderRadius="1em";
    this.barra.id=this.id;
    caja.appendChild(this.barra);
    //console.log("valor del left de la barra: "+this.left);
    this.moverBarra();
}
Barra.prototype.moverBarra=function(){
    raqueta=this;
    caja.onmousemove=function (elEvento){
        eventoBarra = window.event||elEvento;
        cx = eventoBarra.clientX;
        cy = eventoBarra.clientY;
        //console.log("Cliente X "+cx+" Cliente Y "+cy);
        if (cx >= 0 && cx <= parseInt(caja.style.width) - raqueta.width){
            raqueta.left=cx;
            raqueta.barra.style.left=raqueta.left+"px";
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
                  raqueta.barra.style.left =raqueta.left+"px";

                }
            } else if (evento.keyCode == 88 || evento.keyCode == 39) { //Si presionamos la tecla X o flecha derecha la barra se mueve hacia a la derecha
                if (raqueta.left >= 0 && raqueta.left <= parseInt(caja.style.width) - raqueta.width){
                    raqueta.left+=20;
                    if (raqueta.left > parseInt(caja.style.width) - raqueta.width) {
                        raqueta.left = parseInt(caja.style.width) - raqueta.width;
                      }
                    raqueta.barra.style.left =raqueta.left+"px";
                   
                  //console.log(contLeftBarra);
    
                }
              }
        }
}
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
        if ((barra.left || cx)>=pastillaAumentarBarra.style.left|| (barra.left || cx) <= parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width)&&
            (barra.left || cx)+parseInt(barra.width)>=parseInt(pastillaAumentarBarra.style.left) ||(barra.left || cx)+parseInt(barra.width) <= parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width) ) {
                  clearInterval(intervaloPastillaAumentarBarra);
                   barra.width=parseInt(barra.width)+parseInt(pastillaAumentarBarra.style.width);
                   document.getElementById(barra.id).style.width=barra.width+"px";
                   //barraAumentada.play();
                  if(existePastillaAumentarBarra){
                    cuentaAtrasBarra=setTimeout(function(){
                      barra.width=parseInt(barra.width)-parseInt(pastillaAumentarBarra.style.width);
                      document.getElementById(barra.id).style.width=barra.width+"px";

                      //barraAumentada.play();

                    },60000);
                    caja.removeChild(pastillaAumentarBarra);
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
function Niveles(nivel){
    this.nivel=nivel;
}
Niveles.prototype.nivelUno=function(){
    if(this.nivel==1){
            /* nivel 1*/
            cantLadrillos=0;
            ladrillosFila=1;
            distancia=25;
            aux=ladrillosFila;
            fila=1;
            maxLadrillos=1;
            color="";
            ladrillos=new Array(maxLadrillos);
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            while(fila <=1){
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
            ladrillosDobles=new Array(ladrillos.length);
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
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