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

function generarDiccionario(frecuenciasEnOrden) {
    numerosBinarios = generarNumerosBinarios(frecuenciasEnOrden.length);

    const newDiccionario = frecuenciasEnOrden.map((arr, i) => {
        arr[1] = numerosBinarios[i]
        return arr
    })
    
    return newDiccionario
}

function comprimirTexto(texto) {
    let frecuencias = {};

    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        if (frecuencias[caracter]) {
            frecuencias[caracter]++;
        } else {
            frecuencias[caracter] = 1;
        }
    }

    const frecuenciasEnOrden = Object.entries(frecuencias).sort((a, b) => b[1] - a[1]);

    const diccionario = generarDiccionario(frecuenciasEnOrden);

    const nuevoArreglo = diccionario.reduce((resultado, subarreglo) => {
        const [llave, valor] = subarreglo;
        resultado[llave] = valor;
        return resultado;
    }, {});

    let textoComprimido = "";

    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        textoComprimido += nuevoArreglo[caracter];
    }

    return textoComprimido;
}

function paraASCII(texto) {
    let ascii = "";

    for (let i = 0; i < texto.length; i++) {
        let charCode = texto.charCodeAt(i);
        ascii += charCode.toString().padStart(3, "0");
    }

    return parseInt(ascii,10)
}

//let texto = "La empresa ComprimeBit, S.A., se dedica a la transferencia de información desde hace 15 años. Con la llegada de los dispositivos móviles los usuarios requieren que la información transmitida sea de menor tamaño para reducir costos y tiempos en las transferencias, para ello el gerente de sistemas de la empresa desea implementar un software de compresión de datos. El gerente quiere reducir significativamente la cantidad de bits utilizados si emplea un código de longitud variable; es decir, un código en el cual el número de bits varíe de carácter a carácter; mediante una secuencia de caracteres que asegure que ninguna palabra es prefija de otra y que el código sea autodecodificable. Por ello contrata a un licenciado en Ciencias Computacionales para que implemente un algoritmo que, por medio de una cola de prioridad, cree prefijos óptimos para un mensaje, considerando la frecuencia de aparición de un carácter en un texto y realizando un análisis de forma que los caracteres de mayor frecuencia tengan una longitud menor en bits. Por ejemplo, para el conjunto de caracteres a, b, c, d, e y f se tienen las frecuencias de aparición en un texto de 30, 10, 7, 8, 40 y 14 respectivamente, obteniendo los siguientes códigos mediante una cola de prioridad que considera las frecuencias de cada carácter: ";
let texto = 'abfg dfg dfg dfg dfg dfg df gdfg df gdf gdfg dfgdfgdfhdsfguoyerw truiwrfiuwhgeiqg uoirqwegif'

let ascii = paraASCII(texto);
console.log("Peso texto en ascii")
console.log(ascii.toString(2).length, "Bytes");

let textoComprimido = comprimirTexto(texto);

console.log("Peso comprimido")
console.log(JSON.stringify(textoComprimido).length, "Bytes")