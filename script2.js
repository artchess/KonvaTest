// Asegúrate de incluir Konva en tu HTML mediante su CDN o instalación local
// Este código es solo JavaScript y debe ser incorporado en un entorno HTML completo
// con el canvas de Konva preparado.

document.addEventListener('DOMContentLoaded', function() {
  // Primero, configuramos el Stage, que es el contenedor de dibujo
  var stage = new Konva.Stage({
    container: 'container',   // el id del div en tu HTML
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Luego, creamos una Layer, que es una capa de dibujo
  var layer = new Konva.Layer();
  stage.add(layer);

  // Dibujamos un rectángulo para representar la pestaña
  var tabRect1 = new Konva.Rect({
    x: 100,
    y: 50,
    width: 150,
    height: 30,
    fill: 'lightgrey',
    stroke: 'black',
    strokeWidth: 1
  });
  layer.add(tabRect1);

  var tabRectCont = new Konva.Rect({
    x: 100,
    y: 80,
    width: 500,
    height: 500,
    stroke: 'black',
    strokeWidth: 1
  });

  layer.add(tabRect1);
  layer.add(tabRectCont);

  var tabText = new Konva.Text({
    x: 150,
    y: 55,
    text: 'Datos',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
  });
  layer.add(tabText);

  // Ahora dibujamos los campos del formulario dentro de la pestaña
  // Rectángulo para el campo de nombre
  var nameBox = new Konva.Rect({
    x: 150,
    y: 120,
    width: 300,
    height: 30,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true
  });
  layer.add(nameBox);

  // Rectángulo para la fecha de nacimiento
  var dobBox = new Konva.Rect({
    x: 150,
    y: 160,
    width: 300,
    height: 30,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
  });
  layer.add(dobBox);

  // Rectángulos para las opciones de sexo
  var maleBox = new Konva.Rect({
    x: 150,
    y: 200,
    width: 30,
    height: 30,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true
  });
  layer.add(maleBox);

  var femaleBox = maleBox.clone({
    y: 240,
  });
  layer.add(femaleBox);

  // Agregar texto al lado de las casillas de verificación para identificarlas
  var maleText = new Konva.Text({
    x: 190,
    y: 205,
    text: 'Masculino',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
      draggable:true
  });
  layer.add(maleText);

  var femaleText = maleText.clone({
    y: 245,
    text: 'Femenino',
  });
  layer.add(femaleText);


  var imageObj = new Image();
  imageObj.src = 'data:image/png;base64,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';

  var konvaImage = new Konva.Image({
    x: 30,
    y: 200,
    image: imageObj,
    width: 200, // Puedes ajustar el tamaño como quieras
    height: 40,
    draggable: true
  });

  // Paso 5: Agregar la imagen de Konva al Layer y dibujar
  layer.add(konvaImage);

  maleBox.on('dragmove', function () {
      maleText.x(maleBox.x()+40);
      maleText.y(maleBox.y()+5);
    layer.batchDraw();
  });

  maleText.on('dragmove', function () {
      maleBox.x(maleText.x()-40);
      maleBox.y(maleText.y()-5);
    layer.batchDraw();
  });

  maleText.on('dragstart', function () {
    // Mueve el círculo al frente cuando el evento dragstart es disparado
    this.moveToTop();
    maleBox.moveToTop();
  });

  maleBox.on('dragstart', function () {
    // Mueve el círculo al frente cuando el evento dragstart es disparado
    this.moveToTop();
    maleText.moveToTop()
  });

  konvaImage.on('dragstart', function () {
    // Mueve el círculo al frente cuando el evento dragstart es disparado
    this.moveToTop();
  });


  function isInside(container, element) {
    var containerRect = container.getClientRect(); // obtener las coordenadas y tamaño del contenedor
    var elementRect = element.getClientRect(); // obtener las coordenadas y tamaño del elemento

    // Verificar si el elemento está dentro del contenedor
    return (
      elementRect.x > containerRect.x &&
      elementRect.x + elementRect.width < containerRect.x + containerRect.width &&
      elementRect.y > containerRect.y &&
      elementRect.y + elementRect.height < containerRect.y + containerRect.height
    );
  }

  // Escuchar el evento 'dragmove' del elemento
  konvaImage.on('dragmove', function () {
    // Verificar si el elemento está dentro del contenedor después de cada movimiento
    if (isInside(tabRectCont, konvaImage)) {
      // Si es así, puedes hacer algo aquí, como cambiar de color o considerar como 'hijo'
        konvaImage.opacity(1);
        tabRectCont.stroke('red')
    } else {
        konvaImage.opacity(0.4);
        konvaImage.fill('gray');
      tabRectCont.stroke('black')
    }

    // Actualizar el layer para aplicar cambios visuales
    layer.batchDraw();
  });

  konvaImage.on('dragend', function () {
    tabRectCont.stroke('black')
  });

  // Actualizamos la Layer para dibujar todo
  layer.draw();
});
