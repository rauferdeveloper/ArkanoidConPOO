window.onload=function(){
    caja = document.createElement("div");
    imagen = document.getElementById("img");
    imagen.style.position="absolute";
    caja.style.width="100%";
    caja.style.height="100%";
    caja.style.backgroundImage=imagen;
    caja.style.position="absolute";
    caja.style.bgproperties="fixed";
    document.body.appendChild(caja);
    cabeceraNombre=document.createElement("div");
    cabeceraPuntos=document.createElement("div");
    cabeceraPuesto=document.createElement("div");
    cabeceraNombre.style.top="100px";
    cabeceraNombre.style.left="500px";
    cabeceraNombre.style.width="auto";
    cabeceraNombre.style.height="auto";
    cabeceraPuntos.style.top="100px";
    cabeceraPuntos.style.left="750px";
    cabeceraPuntos.style.width="auto";
    cabeceraPuntos.style.height="auto";
    cabeceraPuesto.style.top="100px";
    cabeceraPuesto.style.left="300px";
    cabeceraPuntos.style.width="auto";
    cabeceraPuesto.style.height="auto";
    cabeceraPuntos.style.position="absolute";
    cabeceraNombre.style.position="absolute";
    cabeceraPuesto.style.position="absolute";
    textoNombre="Nombre";
    textoPuntos="Puntos";
    textoPuesto="Puesto";
    cabeceraNombre.innerHTML=textoNombre;
    cabeceraPuntos.innerHTML=textoPuntos;
    cabeceraPuesto.innerHTML=textoPuesto;
    cabeceraNombre.style.color="red";
    cabeceraPuntos.style.color="red";
    cabeceraPuesto.style.color="red";

    cabeceraPuntos.style.fontSize="20px";
    cabeceraNombre.style.fontSize="20px";
    cabeceraPuesto.style.fontSize="20px";
    caja.appendChild(cabeceraNombre);
    caja.appendChild(cabeceraPuntos);
    caja.appendChild(cabeceraPuesto);


    distancia=20;
    records=new Array();
    jugadores=new Array();
      
    
        
    for(var i =0; i < localStorage.length;i++){
        var nombre=localStorage.key(i);
        var puntos=localStorage.getItem(nombre);
        parseInt(puntos);
        jugadores[i]=new Jugador(nombre,puntos);  
    }
    jugadores.sort(function (jug1, jug2) {
        return (parseInt(jug1.puntos) - parseInt(jug2.puntos))
    }); 
    jugadores.reverse();
    for(var i =0 ; i < jugadores.length;i++){
        cabeceraNombre.innerHTML+="<br>"+jugadores[i].nombre;
        cabeceraPuntos.innerHTML+="<br>"+jugadores[i].puntos;
        cabeceraPuesto.innerHTML+="<br>"+(i+1);
    }
    borrarRecords=document.createElement("button");
    borrarRecords.innerHTML="Borrar todos los records";
    borrarRecords.style.top="100px";
    borrarRecords.style.left="100px";
    borrarRecords.style.width="auto";
    borrarRecords.style.height="20px";
    borrarRecords.style.position="absolute";
    caja.appendChild(borrarRecords);
    borrarRecords.onclick=function(elEvento){
        localStorage.clear();
        cabeceraNombre.innerHTML="Nombre";
        cabeceraPuesto.innerHTML="Puesto";
        cabeceraPuntos.innerHTML="Puntos";
    }
    btInicio=document.createElement("button");
    btInicio.innerHTML="Volver a la página principal";
    btInicio.style.top="125px";
    btInicio.style.left="100px";
    btInicio.style.width="auto";
    btInicio.style.height="20px";
    btInicio.style.position="absolute";
    caja.appendChild(btInicio);

    btInicio.onclick=function(){
        window.location="index.html";
    }
}
function Jugador(nombre,puntos){
    this.nombre=nombre;
    this.puntos=puntos;
}