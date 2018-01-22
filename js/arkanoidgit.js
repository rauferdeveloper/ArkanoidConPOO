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
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
                   console.log("CantiLadrillos: "+cantLadrillos);
                   console.log("ladrillosFila: "+ladrillosFila);
                
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
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
                   console.log("CantiLadrillos: "+cantLadrillos);
                   console.log("ladrillosFila: "+ladrillosFila);
                
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
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            //posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaCrearDisparos=55;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
                    console.log("posicionAEliminar: "+posicionAEliminar);
                    console.log("valor de  ladrillosAleatorios[cont]"+ parseInt(ladrillosAleatorios[cont]));
                    ladrillos[ladrillosAleatorios[cont]].color="red";
                    document.getElementById( ladrillos[ladrillosAleatorios[cont]].id).style.backgroundColor= ladrillos[ladrillosAleatorios[cont]].color;
                    cont++;
                }
                console.log("CantiLadrillos: "+cantLadrillos);
                console.log("ladrillosFila: "+ladrillosFila);
                
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
        posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
        //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
        alert("La pastilla se ha guardaddo en: "+posicionPastilla);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
               console.log("CantiLadrillos: "+cantLadrillos);
               console.log("ladrillosFila: "+ladrillosFila);
            
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
        posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
        //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
        alert("La pastilla se ha guardaddo en: "+posicionPastilla);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
        posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
        posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
        //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
        alert("La pastilla se ha guardaddo en: "+posicionPastilla);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
        alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
        while(fila <=8){
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
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaUnaVidaMas=Math.floor(Math.random()*ladrillos.length);
            //posicionPastillaAumentarVelocidadPelota=Math.floor(Math.random()*ladrillos.length);
            posicionPastillaAumentarVelocidadPelota=55;

            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaUnaVidaMas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaAumentarVelocidadPelota);


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
          
                console.log("CantiLadrillos: "+cantLadrillos);
                console.log("ladrillosFila: "+ladrillosFila);
                
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
            posicionPastilla=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCreacionPelotas=Math.floor(Math.random()*ladrillos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
            posicionPastillaCrearDisparos=ladrillos.length-14-1;

            //posicionPastillaCrearDisparos=Math.floor(Math.random()*ladrillos.length);
            //nota importante para guardar la cantidad de ladrillos es sumar el array de los 4 y las 4 filas * 14
            alert("La pastilla se ha guardaddo en: "+posicionPastilla);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCreacionPelotas);
            alert("La pastilla se ha guardaddo en: "+posicionPastillaCrearDisparos);
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
                console.log("CantiLadrillos: "+cantLadrillos);
                console.log("ladrillosFila: "+ladrillosFila);
                
                fila++;

            }
           
    }
}