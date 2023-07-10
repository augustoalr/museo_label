function capitalizeFirstLetter(input) {
  let value = input.value;
  input.value = value.charAt(0).toUpperCase() + value.slice(1);
}

var num_rotulos = 0; // Número de rótulos guardados
var datos_rotulos = []; // Arreglo para almacenar los datos de los rótulos

function guardarDatos() {
  // Obtener los valores del formulario
  var author = document.getElementById("author").value;
  var title = document.getElementById("title").value;
  var date = document.getElementById("date").value;
  var technique = document.getElementById("technique").value;
  var measurements = document.getElementById("measurements").value;
  var inventory_number = document.getElementById("inventory_number").value;

  // Validar que se hayan ingresado todos los campos obligatorios
  if (author && title && date && technique && measurements && inventory_number) {
    // Incrementar el contador de rótulos
    num_rotulos++;

    // Guardar los datos del rótulo en el arreglo
    datos_rotulos.push({
      author: author,
      title: title,
      date: date,
      technique: technique,
      measurements: measurements,
      inventory_number: inventory_number
    });

    // Limpiar los campos del formulario
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("technique").value = "";
    document.getElementById("measurements").value = "";
    document.getElementById("inventory_number").value = "";

    // Mostrar mensaje de éxito
    alert("Datos guardados correctamente.");
  } else {
    alert("Por favor, complete todos los campos.");
  }
}




function HTMLtoPDF() {
  var doc = new jsPDF({
    orientation: "portrait", // Orientación vertical
    unit: "mm" // Unidades en milímetros
  });

  // Configuración de las líneas
  var line_width = 0.1; // Ancho de la línea
  var line_color = "#000"; // Color de la línea

  // Calculamos la cantidad de filas y columnas necesarias
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
    doc.line(x + 2, y + 2, x + 4, y + 4);
    doc.line(x + 2, y + 4, x + 4, y + 2);
    doc.line(x + 2, y + 58, x + 4, y + 60);
    doc.line(x + 2, y + 60, x + 4, y + 58);
    doc.line(x + 96, y + 2, x + 98, y + 4);
    doc.line(x + 96, y + 4, x + 98, y + 2);
    doc.line(x + 96, y + 58, x + 98, y + 60);
    doc.line(x + 96, y + 60, x + 98, y + 58);



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