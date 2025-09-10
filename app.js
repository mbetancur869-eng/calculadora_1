// const botonNumeros = document.getElementsByName('data-number');
// const botonOpera = document.getElementsByName('data-opera');
// const botonIgual = document.getElementsByName('data-igual')[0];
// const botonDelete = document.getElementsByName('data-opera')[0];

// let result = document.getElementById('result');
// let opeActual = '';
// let opeAnterior = '';
// let operaciones = undefined;

// botonNumeros.forEach(function(boton){
//     boton.addEventListener('click', function(){
//         agregarNumero(boton.innerText);
//     });
// });

// botonOpera.forEach(function(boton){
//     boton.addEventListener('click', function(){
//         selectOperacion(boton.innerText);
//     });
// });

// botonIgual.addEventListener('click', function(){
//     calcular();
//     actualizarDisplay();
// });

// botonDelete.addEventListener('click', function(){
//     clear();
//     actualizarDisplay();
// });

// function agregarNumero(num){
//     opeActual = opeActual.toString() + num.toString();
//     actualizarDisplay();
// }

// function actualizarDisplay(){
//     result.value = opeActual;
// }


// for......

// let num = parseInt(prompt("digite un mero"));
// let resul;

// for (let i = 1; i <= 10; i++) {

// console.log(num+ "x" +i+ " = "+num*i);

// }



// while.....

// let i = 1;

// while (i <= 10) {

//   console.log(i);
// i++;

// }


// do... while
 
// let i = 1;
// while (i <= 10) {
//   console.log(`Tabla del ${i}:`);
//   let j = 1;
//   while (j <= 10) {
//     console.log(`${i} x ${j} = ${i * j}`);
//     j++;
//   }
//   console.log('----------------');
//   i++;
// }
const botonNumeros = document.getElementsByName('data-number');
const botonOpera = document.getElementsByName('data-opera');
const botonIgual = document.getElementsByName('data-igual')[0];
const botonDelete = document.getElementsByName('data-delete')[0];

let result = document.getElementById('result');
let opeActual = '';
let opeAnterior = '';
let operacion = undefined

botonNumeros.forEach(function(boton){
 boton.addEventListener('click', function(){
    agregarNumero(boton.innerText);
 });
});
botonOpera.forEach(function(boton){
boton.addEventListener('click', function(){
    selectOperacion(boton.innerText);
});
});
botonIgual.addEventListener('click',function(){
    calcular();
    actualizarDisplay();
   
});
botonDelete.addEventListener('click',function(){
    clear();
    actualizarDisplay();

});
function agregarNumero(num){
opeActual = opeActual.toString()+ num.toString();
actualizarDisplay();
}
function actualizarDisplay(){
    result.value = opeActual;
}
function selectOperacion(op){
    if(opeActual==='')return;
    if (opeAnterior !==''){
        calcular();
    }
    operacion = op.toString();
    opeAnterior = opeActual;        
    opeActual = '';
}

function calcular(){
    let calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    if(isNaN(anterior) || isNaN(actual)) return;
    switch (operacion){
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
         case 'x':
            calculo = anterior * actual;
            break;

            case '/':
            calculo = anterior / actual;
            break;
            default:
                return;

    }
    opeActual = calculo;
    operacion = undefined;
    opeAnterior = '';

}
function clear(){
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
}
clear();
