function generarNumerosBinarios(cantidad) {
    let numerosBinarios = [];

    for (let i = 0; i < cantidad; i++) {
        numerosBinarios.push(decimalABinario(i));
    }

    return numerosBinarios;
}

function decimalABinario(decimal) {
    let binario = '';

    while (decimal > 0) {
        binario = (decimal % 2) + binario;
        decimal = Math.floor(decimal / 2);
    }

    if (binario === '') {
        binario = '0';
    }

    return binario;
}

// Ejemplo de uso
const cantidadNumeros = 256;
const numerosBinarios = generarNumerosBinarios(cantidadNumeros);
//numerosBinarios.splice(1,1)
//numerosBinarios.splice(2,9)

console.log(numerosBinarios);






/*

function compararDesdeElFinal(arr) {
    const n = arr.length;

    for (let i = n - 1; i >= 0; i--) {
        const pivote = arr[i];

        for (let j = 0; j < i; j++) {
            if (pivote.startsWith(arr[j])) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    return arr;
}

// Ejemplo de uso
//const arr = ['hola', 'mundo', 'hola', 'amigo', 'amigosina', 'hola', 'adios'];
const resultado = compararDesdeElFinal(numerosBinarios);

console.log(resultado);
console.log(resultado.length);
*/