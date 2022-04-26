//inicilizacion de variables
let tarjetasdestapadas=0;
let tarjeta1= null;
let tarjeta2= null;
let primer_resultado=null;
let segundo_resultado=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let timer =30;
let tiempoId=null;

//apuntando a documento HTML
//Esto es para 
let mostrarmovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo= document.getElementById('tiempo');

//generacion de numeros aleatorios
let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
//desordenamos los numeros
numeros=numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);


//declaramos la funcion que nos permite ver la informacion del boton o recuadro
const contarTiempo=()=>{
    //nos permite que el tiempo cuente regresivamente hasta llegar a cero
    tiempoId =setInterval(()=>{//funciona como reloj
        timer--;//regresa el tiempo en uno en uno 
        //muestra en pantalla html el tiempo que le queda al usuario
        mostrartiempo.innerHTML = `Tiempo:  ${timer} Segundos`;
        if(timer==0){
            //esto nos permite que cuando el usuario no alcanza a completar el juego
            //el usuario pierde y luego se muestra la ubicacion de los numeros que no se 
            //emparejaron 
            clearInterval(tiempoId);//finaliza el tiempo de reloj
            bloqueartarjetas();//muestra la posicion de los numeros de cada recuadro
            window.alert("LO SIENTO PERDISTE")
        }
    },1000);
}
//declaramos la funcion que nos permite mostrar los la ubicacion de los numeros no emparejados 
const bloqueartarjetas=()=>{
    //recorre por cada una de las tarjetas mostrando la ubicacion en la que estaban las no emparejada
    for (let i = 0; i<=15;i++){
        let tarjetabloqueada= document.getElementById(i);
        //muestra el valor de cada una de las tarjetas
        tarjetabloqueada.innerHTML = numeros[i];
        //bloquea las tarjetas para que no se vuelva a clickear
        tarjetabloqueada.disabled= true;
    }
    
}

//declaramos la funcion que nos permite destapar cada recuadro del juego
const destapar = (id) => {
    //desde que el primer recuadro se clickea comienza el tiempo a contar regresivamente
    if(temporizador==false){
        contarTiempo();
        temporizador=true;
    }
    //cuenta la antidad de recuadros que se clickea
    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);
    if (tarjetasdestapadas == 1){
        //mostrar primer numero del recuadro y lo guarda en una variable su valor
        tarjeta1= document.getElementById(id);
        tarjeta1.innerHTML = numeros[id];
        primer_resultado=numeros[id]
        tarjeta1.innerHTML=primer_resultado;
        //deshabilitar boton
        tarjeta1.disabled =true;
    }else if(tarjetasdestapadas ==2){
        //mostrar segundo numero del recuadro y lo guarda en una variable su valor
        tarjeta2= document.getElementById(id);
        segundo_resultado= numeros[id]
        tarjeta2.innerHTML=segundo_resultado;
        //deshabilitar boton
        tarjeta2.disabled =true;
        //cada ves que se destapan dos recuadros se incrementa los movimientos
        movimientos++;
        //luego se muestran en pantalla 
        mostrarmovimientos.innerHTML = `Movimientos:  ${movimientos}`;

        if(primer_resultado==segundo_resultado){//se compara el valor de los recuadros que se destaparon 
            //si al comparar son iguales, este se vuelve cero para que 
            //permite destapar otros recuadros 
            tarjetasdestapadas=0;
            //aumentar aciertos
            aciertos++;
            //Luego se muestran en pantalla la cantidad de aciertos
            mostraraciertos.innerHTML = `Aciertos:  ${aciertos}`;

            if(aciertos==8){//esta condicion es que si el usuario llegara a completar los aciertos
                //en menos de 30sg se muestre en pantalla la siguiente informacion 
                window.alert("FELLICITACIONES GANASTE")
            }
       }else{
           //nos permite Mostrar momentaneamente el valor del recuadro
           // y si se equivoca que no son iguales se vuelve a tapar 
           setTimeout(()=>{
               tarjeta1.innerHTML = "";
               tarjeta2.innerHTML = "";
               tarjeta1.disabled = false;
               tarjeta2.disabled = false;
               tarjetasdestapadas =0; 
           },800);

       }
    }   
}