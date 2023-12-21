


// Función para que la primera palabra que se escriba en el input sea en mayúscula
function capitalizeFirstLetter(input) {
  let value = input.value;
  input.value = value.charAt(0).toUpperCase() + value.slice(1);
}




var num_rotulos = 0; // Número de rótulos guardados
var datos_rotulos = []; // Arreglo para almacenar los datos de los rótulos



//Version vieja de function de guardarDatos
// function guardarDatos() {
//   // Obtener los valores del formulario
//   var author = document.getElementById("author").value;
//   var title = document.getElementById("title").value;
//   var date = document.getElementById("date").value;
//   var technique = document.getElementById("technique").value;
//   var measurements = document.getElementById("measurements").value;
//   var inventory_number = document.getElementById("inventory_number").value;



//   // Validar que se hayan ingresado todos los campos obligatorios
//   if (author && title && date && technique && measurements && inventory_number) {
//     num_rotulos++;

//     // Guardar los datos del rótulo en el arreglo
//     datos_rotulos.push({
//       author: author,
//       title: title,
//       date: date,
//       technique: technique,
//       measurements: measurements,
//       inventory_number: inventory_number,

//     });


//     // Limpiar los campos del formulario
//     document.getElementById("author").value = "";
//     document.getElementById("title").value = "";
//     document.getElementById("date").value = "";
//     document.getElementById("technique").value = "";
//     document.getElementById("measurements").value = "";
//     document.getElementById("inventory_number").value = "";


//     // Mostrar mensaje de éxito
//     alert("Datos guardados correctamente.");
//   } else {
//     alert("Por favor, complete todos los campos.");
//   }


//   // Actualizar la vista previa de los rótulos
//   actualizarVistaPrevia();
// }


function guardarDatos() {
  var author = document.getElementById("author").value;
  var title = document.getElementById("title").value;
  var date = document.getElementById("date").value;
  var technique = document.getElementById("technique").value;
  var measurements = document.getElementById("measurements").value;
  var inventory_number = document.getElementById("inventory_number").value;

  var newTitle = title;
  var newDate = date;
  var newTechnique = technique;
  var newMeasurements = measurements;

  // Verificar si la longitud del título excede el límite
  if (title.length > 38) {
    // Insertar un salto de línea después de los primeros 50 caracteres
    newTitle = title.substring(0, 38) + "\n" + title.substring(38);

    // Agregar una nueva línea a los campos date, technique y measurements
    newDate = "\n" + date;
    newTechnique = "\n" + technique;
    newMeasurements = "\n" + measurements;
  }

  
  // Verificar si la longitud de la técnica excede el límite
  if (technique.length > 38) {
    // Insertar un salto de línea después de los primeros 38 caracteres
    newTechnique = technique.substring(0, 38) + "\n" + technique.substring(38);
    newMeasurements = "\n" + measurements;
    
    // Si la longitud del campo technique supera los 38 caracteres y también la suma de title y technique es mayor a 76, entonces insertar un salto de línea
    if (newTechnique.length > 38 && (newTitle.length + newTechnique.length) > 76) {
      newMeasurements = "\n" + newMeasurements;
      newTechnique = "\n" + newTechnique;
    }
  }

  if (author && newTitle && newDate && newTechnique && newMeasurements && inventory_number) {
    num_rotulos++;

    datos_rotulos.push({
      author: author,
      title: newTitle,
      date: newDate,
      technique: newTechnique,
      measurements: newMeasurements,
      inventory_number: inventory_number,
    });

    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("technique").value = "";
    document.getElementById("measurements").value = "";
    document.getElementById("inventory_number").value = "";

    alert("Datos guardados correctamente.");
  } else {
    alert("Por favor, complete todos los campos.");
  }

  actualizarVistaPrevia();
}




function actualizarVistaPrevia() {
  var rotulosPreviewDiv = document.querySelector('.rotulos-preview');
  rotulosPreviewDiv.innerHTML = '';


  for (var i = 0; i < num_rotulos; i++) {
    var rotulo = datos_rotulos[i];

    var rotuloDiv = document.createElement('div');
    rotuloDiv.classList.add('rotulo-preview');

    // Contenedor para el texto "Rótulo X" y el enlace "Modificar"
    var contenedorRotulo = document.createElement('div');
    contenedorRotulo.classList.add('contenedor-rotulo');

    // Texto "Rótulo X" con descripción al pasar el cursor
    var textoRotulo = document.createElement('span');
    textoRotulo.textContent = 'Rótulo ' + (i + 1);
    textoRotulo.title = rotulo.inventory_number + ' - ' + rotulo.author + ' - ' + rotulo.title + ' - ' + rotulo.date + ' - ' + rotulo.technique + ' - ' + rotulo.measurements;
    contenedorRotulo.appendChild(textoRotulo);

    // Enlace "Modificar"
    var modificarEnlace = document.createElement('a');
    modificarEnlace.innerHTML = '<i class="fa-solid fa-pencil fa-beat" style="color: #45a049;"></i>';
    modificarEnlace.href = 'javascript:void(0);'; // Usar "javascript:void(0);" para evitar que se recargue la página
    modificarEnlace.classList.add('modificar-enlace');
    modificarEnlace.addEventListener('click', function () {
      modificarRotulo(this);
    });

    contenedorRotulo.appendChild(modificarEnlace);


    // Enlace "Eliminar"
    var eliminarEnlace = document.createElement('a');
    // eliminarEnlace.innerHTML = 'Eliminar';
    eliminarEnlace.innerHTML = '<i class="fas fa-trash-alt"></i>';

    eliminarEnlace.href = 'javascript:void(0);'; // Usar "javascript:void(0);" para evitar que se recargue la página
    eliminarEnlace.classList.add('eliminar-enlace');
    eliminarEnlace.dataset.rotuloIndex = i;
    eliminarEnlace.addEventListener('click', function () {
      eliminarRotulo(this);
    });
    contenedorRotulo.appendChild(eliminarEnlace);

    rotuloDiv.appendChild(contenedorRotulo);
    rotulosPreviewDiv.appendChild(rotuloDiv);

  }
}




function eliminarRotulo(botonEliminar) {

  // Obtener el índice del rótulo
  var rotulo = botonEliminar.parentNode.parentNode;
  var indice = Array.from(rotulo.parentNode.children).indexOf(rotulo);

  // Eliminar el rótulo del array
  datos_rotulos.splice(indice, 1);
  num_rotulos--;

  // Actualizar la vista
  actualizarVistaPrevia();

}



function modificarRotulo(enlaceModificar) {
  var rotuloPreview = enlaceModificar.parentNode.parentNode;
  var indice = Array.from(rotuloPreview.parentNode.children).indexOf(rotuloPreview);

  var rotulo = datos_rotulos[indice];

  // Actualizar los campos del formulario con los datos del rótulo
  document.getElementById('author').value = rotulo.author;
  document.getElementById('title').value = rotulo.title;
  document.getElementById('date').value = rotulo.date;
  document.getElementById('technique').value = rotulo.technique;
  document.getElementById('measurements').value = rotulo.measurements;
  document.getElementById('inventory_number').value = rotulo.inventory_number;

  // Eliminar el rótulo y sus datos del array
  datos_rotulos.splice(indice, 1);
  num_rotulos--;

  // Actualizar la vista previa de los rótulos
  actualizarVistaPrevia();
}




function HTMLtoPDF() {


  var doc = new jsPDF({
    orientation: "portrait", // Orientación vertical
    unit: "mm", // Unidades en milímetros
    format: [215.9, 279.4], // Tamaño de la hoja carta en milímetros (8.5 x 11 pulgadas)
    // compress:false
  });


  // Configuración de las líneas
  var line_width = 0.1; // Ancho de la línea
  var line_color = "#000"; // Color de la línea



  //Calculamos la cantidad de filas y columnas necesarias
  var num_filas = Math.ceil(num_rotulos / 2);
  var num_columnas = num_rotulos >= 2 ? 2 : num_rotulos;




  // Generar cada rótulo con la información almacenada
  for (var i = 0; i < num_rotulos; i++) {
    var rotulo = datos_rotulos[i]; // Obtener los datos del rótulo actual



    // Calcular la posición del rótulo actual
    var fila = Math.floor(i / 2); // Número de fila
    var columna = i % 2; // Número de columna

    var x = 10 + columna * 100; // Posición horizontal
    var y = 10 + fila * 60; // Posición vertical

    // Dibujar las cruces pequeñas
    doc.setLineWidth(line_width);
    doc.setDrawColor(line_color);
    // doc.line(x + 2, y + 2, x + 4, y + 4); // Esquina sup izq
    // doc.line(x + 2, y + 4, x + 4, y + 2); //Esquina sup izq
    // doc.line(x + 2, y + 58, x + 4, y + 60); //Esquina inf izq
    // doc.line(x + 2, y + 60, x + 4, y + 58); //Esquina inf izq


    // // Esquina superior izquierda 
    // doc.line(x , y + 4, x + 6, y + 4) // Línea horizontal
    // doc.line(x + 3, y + 2, x + 3, y + 6) // Línea vertical

    // // Esquina inferior izquierda
    // doc.line(x + 2, y + 58, x + 4, y + 58)
    // doc.line(x + 3, y + 56, x + 3, y + 60)

    // // Igual para otras esquinas

    // doc.line(x + 96, y + 2, x + 98, y + 4); //Esquina sup der
    // doc.line(x + 96, y + 4, x + 98, y + 2); //Esquina sup der
    // doc.line(x + 96, y + 58, x + 98, y + 60); //Esquina inf der
    // doc.line(x + 96, y + 60, x + 98, y + 58); //Esquina inf der


    //DESDE AQUI SERIA LA ULTIMA VERSION DEL DIBUJO DE CRUCES *****************

    // Cruz superior izquierda
    doc.line(x, y + 4, x + 6, y + 4)
    doc.line(x + 3, y + 2, x + 3, y + 6)

    // Cruz superior derecha 
    doc.line(x + 94, y + 4, x + 100, y + 4)
    doc.line(x + 97, y + 2, x + 97, y + 6)

    // Cruz inferior izquierda
    doc.line(x, y + 58, x + 6, y + 58)
    doc.line(x + 3, y + 56, x + 3, y + 60)

    // Cruz inferior derecha  
    doc.line(x + 94, y + 58, x + 100, y + 58)
    doc.line(x + 97, y + 56, x + 97, y + 60)

    // HASTA AQUI*******************************************








    


    // Escribir los datos del rótulo
    doc.setFontSize(12);

    var text_x = x + 13; // Posición horizontal del texto
    var text_y = y + 16; // Posición vertical del texto
    // var text_options = { align: "center" }; // Opciones de alineación para el texto

    doc.setFontType("bold");
    doc.text(rotulo.author, text_x, text_y);
    doc.setFontType("italic")
    doc.text(rotulo.title, text_x, text_y + 6);
    doc.setFontType("normal");
    doc.text(rotulo.date, text_x, text_y + 12);
    doc.text(rotulo.technique, text_x, text_y + 18);

    doc.text(rotulo.measurements, text_x, text_y + 24);
    doc.text(rotulo.inventory_number, text_x + 63, text_y + 36);







  }






  // Obtenemos la representación en formato data URI del PDF
  var pdfData = doc.output('datauristring');

  // Abrimos el PDF en una nueva pestaña o ventana
  var newTab = window.open();
  newTab.document.write("<iframe width='100%' height='100%' src='" + pdfData + "'></iframe>");


};


