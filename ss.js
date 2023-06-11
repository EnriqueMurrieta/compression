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
  const cantidadNumeros = 500;
  const numerosBinarios = generarNumerosBinarios(cantidadNumeros);
  
  console.log(numerosBinarios);
  