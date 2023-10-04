document.addEventListener('DOMContentLoaded', () => {
  // Definir las dimensiones originales del escenario
  const originalWidth = 800;  // Ejemplo de ancho original
  const originalHeight = 300; // Ejemplo de altura original
  
  var stage = new Konva.Stage({
      container: 'container',
      width: originalWidth,
      height: originalHeight,
  });

  var layer = new Konva.Layer();
  stage.add(layer);

  var imageObj = new Image();
  imageObj.src = 'https://media-cdn.tripadvisor.com/media/photo-s/06/71/e8/c9/suites-del-real.jpg';
  imageObj.onload = function() {
    var konvaImage = new Konva.Image({
      x: 0,
      y: 0,
      image: imageObj,
      width: originalWidth,
      height: originalHeight,
    });

    layer.add(konvaImage);
    layer.batchDraw();
        // Agregar un rectángulo por defecto
    addRectangle(236.53556221741417, 32.91746668070211, 100, 100, 0.8589511968947054, 0.4145068984078339,  'datos 1'); 
     addCircle(721.7096732412269, 146.81200768167847, 50, 0.5775789845582637, 0.38250735588795787, 'datos 2');
  };

  var rectangles = [];

  document.getElementById('addRect').addEventListener('click', () => {
    var rectData = document.getElementById('rectDataInput').value;
    if (!rectData) {
      alert('Por favor, introduce los datos para el selector antes de agregarlo.');
      return;
    }

    addRectangle(20, 20, 100, 100,0.9,0.9, rectData); 
  });

  document.getElementById('addCircle').addEventListener('click', () => {
      var rectData = document.getElementById('rectDataInput').value;
      if (!rectData) {
        alert('Por favor, introduce los datos para el selector antes de agregarlo.');
        return;
      }    
      // Puedes ajustar x, y y radio según lo necesitas
      addCircle(150, 150, 50, 0.9, 0.9, rectData);
  });  

  document.getElementById('getRectData').addEventListener('click', () => {
    rectangles.forEach((rectangle, index) => {
      alert(`
                Rectángulo ${index + 1}: 
                X: ${rectangle.rect.x()}
                Y: ${rectangle.rect.y()}
                Data: ${rectangle.data}
            `)
      console.log(rectangle);
    });
  });

    document.getElementById('deleteRect').addEventListener('click', () => {
        if (selectedRectIndex !== null && selectedRectIndex !== undefined) {
            // Elimina el rectángulo y su transformer del layer
            rectangles[selectedRectIndex].rect.destroy();
            rectangles[selectedRectIndex].tr.destroy();
            // Elimina el rectángulo del array rectangles
            rectangles.splice(selectedRectIndex, 1);
            layer.draw();
            // Restablece el índice seleccionado
            selectedRectIndex = null;
        } else {
            alert('Por favor, selecciona un rectángulo para eliminar haciendo clic en él.');
        }
    });  

    // Botón para alternar 'draggable' de los rectángulos
    document.getElementById('toggleDraggable').addEventListener('click', toggleDraggable);     document.getElementById('toggleAlertas').addEventListener('click', toggleAlertas);  

      function updateStageSize() {
        // Obtener el nuevo ancho del viewport o del contenedor del canvas
        let newWidth = window.innerWidth;
        
        // Calcular el factor de escala basado en el nuevo ancho
        let scale = newWidth / originalWidth;
        
        // Configurar las nuevas dimensiones y escala del escenario
        stage.width(originalWidth * scale);
        stage.height(originalHeight * scale);
        stage.scale({ x: scale, y: scale });
        stage.draw();
    }

    // Llamar a updateStageSize cuando la ventana se redimensione
    window.addEventListener('resize', updateStageSize);
    
    // Llamar a updateStageSize al inicio para establecer la escala inicial
    updateStageSize();

    let isDraggable = true;  // Booleano para manejar el estado de 'draggable'

    function toggleDraggable() {
        isDraggable = !isDraggable;  // Alternar el estado de 'draggable'
        rectangles.forEach(r => {
            r.rect.draggable(isDraggable);  // Establecer 'draggable' para cada rectángulo

            // Controlar la visibilidad y funcionalidad del Transformer
            if (isDraggable) {
                r.tr.show();  // Mostrar el Transformer si 'isDraggable' es verdadero
            } else {
                r.tr.hide();  // Ocultar el Transformer si 'isDraggable' es falso
            }
        });
        layer.draw();  // Redibujar la capa para reflejar los cambios
    }

    let fill = 'gray';
  
    function toggleAlertas() {
        rectangles.forEach(r => {
            if (fill === 'yellow') {
                r.rect.fill('green');  // Establecer 'draggable' para cada rectángulo
                fill = 'green';
            } else if (fill === 'gray') {
                r.rect.fill('yellow');
                fill = 'yellow';
            } else if (fill === 'green') {
                r.rect.fill('red');
                fill = 'red';
            } else {
              r.rect.fill('gray');
              fill = 'gray';
            }
        });
        layer.draw();  // Redibujar la capa para reflejar los cambios
    }  

    let selectedRectIndex = null;

    function addCircle(x, y, radius, scaleX, scaleY, data) {
        var circle = new Konva.Circle({
            x: x,
            y: y,
            scaleX: scaleX,
            scaleY: scaleY,
            radius: radius,
            fill: 'gray',
            draggable: true,
            opacity: 0.5,
        });

       var tr = new Konva.Transformer();
        layer.add(tr);
        layer.add(circle);
        tr.attachTo(circle);      

        circle.on('click', () => {
            alert(`
                Círculo: 
                X: ${circle.x()}
                Y: ${circle.y()}
                Radio: ${circle.radius()}
                Data: ${data}
            `);
          selectedRectIndex = rectangles.findIndex(r => r.rect === circle);
        });

        // Evento al pasar el mouse sobre el rectángulo
        circle.on('mouseenter', () => {
          circle.opacity(0.9); // Cambio de color al color deseado
          layer.draw(); // Redibuja la capa para reflejar los cambios
        });
      
        // Evento al mover el mouse fuera del rectángulo
        circle.on('mouseleave', () => {
          circle.opacity(0.5); // Devuelve el color a su estado original
          layer.draw(); // Redibuja la capa para reflejar los cambios
        });      

        // Guarda el rectángulo y sus datos en el array
        rectangles.push({ rect: circle, tr: tr, data: data });
    
        // Limpia el campo de texto después de agregar un rectángulo
        document.getElementById('rectDataInput').value = '';
    
        layer.draw(); 
    }  

    function addRectangle(x, y, width, height, scaleX, scaleY, data) {
        var rectData = new Konva.Rect({
          x: x,
          y: y,
          width: width,
          height: height,
          scaleX: scaleX,
          scaleY: scaleY,
          fill: 'gray',
          draggable: true,
          opacity: 0.5,
        });
    
        var tr = new Konva.Transformer();
        layer.add(tr);
        layer.add(rectData);
        tr.attachTo(rectData);

        // Evento de clic en el rectángulo
        rectData.on('click', () => {
            alert(`
                Rectángulo: 
                X: ${rectData.x()}
                Y: ${rectData.y()}
                Width: ${rectData.width() * rectData.scaleX()}
                Height: ${rectData.height() * rectData.scaleY()}
                Data: ${data}
            `);

          selectedRectIndex = rectangles.findIndex(r => r.rect === rectData);
        });   

        // Evento al pasar el mouse sobre el rectángulo
        rectData.on('mouseenter', () => {
          rectData.opacity(0.9); // Cambio de color al color deseado
          layer.draw(); // Redibuja la capa para reflejar los cambios
        });
      
        // Evento al mover el mouse fuera del rectángulo
        rectData.on('mouseleave', () => {
          rectData.opacity(0.5); // Devuelve el color a su estado original
          layer.draw(); // Redibuja la capa para reflejar los cambios
        });       
    
        // Guarda el rectángulo y sus datos en el array
        rectangles.push({ rect: rectData, tr: tr, data: data });
    
        // Limpia el campo de texto después de agregar un rectángulo
        document.getElementById('rectDataInput').value = '';
    
        layer.draw();      
    }

 
});
