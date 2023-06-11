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

// Función para generar el diccionario de códigos Huffman
function generarDiccionario(sortedArray) {
    numerosBinarios = generarNumerosBinarios(sortedArray.length);

    const newArr = sortedArray.map((arr, i) => {
        arr[1] = numerosBinarios[i]
        return arr
    })
    //console.log(sortedArray)
    //console.log(newArr)

    return newArr


}

// Función para comprimir un texto utilizando el algoritmo de Huffman
function comprimirTexto(texto) {
    // Calcular frecuencias de los caracteres
    let frecuencias = {};
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        if (frecuencias[caracter]) {
            frecuencias[caracter]++;
        } else {
            frecuencias[caracter] = 1;
        }
    }
    const sortedArray = Object.entries(frecuencias).sort((a, b) => b[1] - a[1]);

    // Generar el diccionario de códigos Huffman
    const diccionario = generarDiccionario(sortedArray);

    const nuevoArreglo = diccionario.reduce((resultado, subarreglo) => {
        const [llave, valor] = subarreglo;
        resultado[llave] = valor;
        return resultado;
    }, {});

    // Comprimir el texto utilizando los códigos Huffman
    let textoComprimido = "";
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        //textoComprimido += diccionario[caracter];
        textoComprimido += nuevoArreglo[caracter];
    }

    return textoComprimido;
}

function stringToASCII(texto) {
    let ascii = "";
    for (let i = 0; i < texto.length; i++) {
        let charCode = texto.charCodeAt(i);
        ascii += parseInt(charCode.toString().padStart(3, "0"),10); // Rellena con ceros a la izquierda para obtener siempre 3 dígitos
    }
    let thing = parseInt(ascii,10)
    console.log(typeof thing)
    console.log(thing)
    return thing;
}

// Ejemplo de uso
//let texto = "La empresa ComprimeBit, S.A., se dedica a la transferencia de información desde hace 15 años. Con la llegada de los dispositivos móviles los usuarios requieren que la información transmitida sea de menor tamaño para reducir costos y tiempos en las transferencias, para ello el gerente de sistemas de la empresa desea implementar un software de compresión de datos. El gerente quiere reducir significativamente la cantidad de bits utilizados si emplea un código de longitud variable; es decir, un código en el cual el número de bits varíe de carácter a carácter; mediante una secuencia de caracteres que asegure que ninguna palabra es prefija de otra y que el código sea autodecodificable. Por ello contrata a un licenciado en Ciencias Computacionales para que implemente un algoritmo que, por medio de una cola de prioridad, cree prefijos óptimos para un mensaje, considerando la frecuencia de aparición de un carácter en un texto y realizando un análisis de forma que los caracteres de mayor frecuencia tengan una longitud menor en bits. Por ejemplo, para el conjunto de caracteres a, b, c, d, e y f se tienen las frecuencias de aparición en un texto de 30, 10, 7, 8, 40 y 14 respectivamente, obteniendo los siguientes códigos mediante una cola de prioridad que considera las frecuencias de cada carácter: ";
let texto = 'abfg dfg dfg dfg dfg dfg df gdfg df gdf gdfg dfgdfgdfhdsfguoyerw truiwrfiuwhgeiqg uoirqwegif'

let ascii = stringToASCII(texto);
let asciiBinary = ascii.toString(2)
//console.log(asciiBinary)
//let jsonString = JSON.stringify(ascii);
//console.log(thing)
let sizeInBytes = asciiBinary.length;
console.log("Peso texto en ascii")
console.log(sizeInBytes, "Bytes");

let textoComprimido = comprimirTexto(texto);

let jsonString2 = JSON.stringify(textoComprimido);
let sizeInBytes2 = jsonString2.length;
console.log("Peso comprimido")
console.log(sizeInBytes2, "Bytes")
//console.log(textoComprimido); // Imprime: 10111010
