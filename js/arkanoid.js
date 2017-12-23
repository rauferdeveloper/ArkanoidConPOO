    window.onload=function(){
            caja=document.getElementById("caja");
            caja.style.width = "800px";
            caja.style.height = "600px";
            caja.style.backgroundColor = "rgb(0, 0, 0)";
           
            pelota = new Pelota();
            pelota.crearBola();
            //clearInterval(pelota.intervalo);
            raqueta = new Barra();
            raqueta.crearBarra();
            caja.onmousemove=function (elEvento){
                eventoBarra = window.event||elEvento;
                cx = eventoBarra.clientX;
                cy = eventoBarra.clientY;
                console.log("Cliente X "+cx+" Cliente Y "+cy);
                if (cx >= 0 && cx <= parseInt(caja.style.width) - parseInt(raqueta.width)){
                    raqueta.left= cx;
                    console.log("Valor del ancho de la barra: "+raqueta.left);
                    //contLeftBarra = cx;
                    //informacionDelJuego();
                }
        }

           
          
    }
//Creamos la "clase" pelota
function Pelota(){
    this.width=10;
    this.height = 10;
    this.left = 420;
    this.top =  480;
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
Pelota.prototype.crearBola=function(){
    this.bola=document.createElement("div");//Lo que crearemos en pantalla
    this.bola.style.width=this.width+"px";
    this.bola.style.height=this.height+"px";
    this.bola.style.backgroundColor="yellow";
    this.bola.style.position="absolute";
    this.bola.style.top=this.top+"px";
    this.bola.style.left=this.left+"px";
    this.bola.style.borderRadius="1em";

    caja.appendChild(this.bola);
}

Pelota.prototype.moverBola=function(){
    
    if(this.top>=parseInt(caja.style.height)-parseInt(this.height)){
        this.top=parseInt(caja.style.height)-parseInt(this.height);
        this.arriba=false;

    }else if(this.top<=0){
        this.top=0;
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
        this.left=parseInt(caja.style.width)-parseInt(this.width);
        this.izquierda=false;
    }else if(this.left<=0){
        this.left=0;
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
}
/*function Pelota(){ metodo a sobrecargar
    this.width=20;
    this.height = 20;
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
    
    this.intervalo=setInterval(this.moverBola.bind(this),20);  

}
*/

/*
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
}*/
            
//Creamos la "clase" barra 
function Barra(){
    this.width=100;
    this.height=20;
    this.left=380;
    this.top=520;
} 
Barra.prototype.crearBarra=function(elEvento){
    this.barra=document.createElement("div");//creamos la barra en el entorno de juego
    this.barra.style.height = this.height+"px";
    this.barra.style.width = this.width+"px";
    this.barra.style.backgroundColor = "#9a0827";
    this.barra.style.position = "absolute";
    this.barra.style.left = this.left+"px" ;
    this.barra.style.top = this.top+"px";
    this.barra.style.borderRadius = "1em";
    caja.appendChild(this.barra);
       
   
}
    



       
