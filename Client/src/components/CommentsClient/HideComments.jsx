

// Realizar una solicitud al servidor para verificar si el cliente ha comprado recientemente
fetch(`http://localhost:3001/payments`)
  .then((response) => response.json())
  .then((data) => {
    // data.hasPurchased indicará si el cliente ha comprado recientemente
    if (data.hasPurchased) {
      // Mostrar el cuadro de comentarios ya que el cliente ha comprado recientemente
      showCommentBox();
    } else {
      // No mostrar el cuadro de comentarios ya que el cliente no ha comprado recientemente
      hideCommentBox();
    }
  })
  .catch((error) => {
    console.error("Error al verificar la compra:", error);
    // Puedes manejar errores aquí
  });

function showCommentBox() {
  // Implementa la lógica para mostrar el cuadro de comentarios
}

function hideCommentBox() {
  // Implementa la lógica para ocultar el cuadro de comentarios
}
