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
  const arr = ['hola', 'mundo', 'hola', 'amigo','amigosina', 'hola', 'adios'];
  const resultado = compararDesdeElFinal(arr);
  
  console.log(resultado);
  