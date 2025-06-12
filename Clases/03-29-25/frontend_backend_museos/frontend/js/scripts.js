const cargarMuseos = () => {
   const museos = fetch("http://localhost:3000/api/museos");
   
   //ejecucion de la promesa 
   museos
     .then((respuesta) => {
      //transforma respuesta a objeto javascript
      console.log(respuesta);
       return respuesta.json();
     })
     .then((museos) => {
      //carga filas de la tabla con los datos de los museos
       const listaMuseos = document.getElementById("lista-museos");
       listaMuseos.innerHTML = ''; // Limpiar lista existente antes de añadir nuevas entradas
       for (let museo of museos) {
         const row = `
           <tr>
             <td>${museo.nombre}</td>
             <td>${museo.ubicacion}</td>
             <td>${museo.exposiciones}</td>
             <td>${museo.horarios}</td>
             <td>${museo.precioEntrada}</td>
           </tr>
         `;
         listaMuseos.innerHTML += row; // Agregar fila a la tabla}
         console.log(row);  // Imprimir museo en consola
       }
     })
     .catch((error) => console.log("Error al cargar los museos: ", error));

     console.log("Carga pendiente de museos...");
};


cargarMuseos();
