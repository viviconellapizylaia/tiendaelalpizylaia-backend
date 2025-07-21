const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Tu servidor funciona correctamente! 🚀');
});

// Ruta para descarga de recursos gratuitos
app.post('/api/descargar', (req, res) => {
  const { id } = req.body;
  const filePath = path.join(__dirname, 'archivos', `recurso-${id}.pdf`);

  res.download(filePath, err => {
    if (err) {
      console.error("Error al descargar el archivo:", err);
      res.status(404).send("Archivo no encontrado.");
    }
  });
});

// Ruta para procesar pagos
app.post('/api/pagar', (req, res) => {
  const { productId, method, currency } = req.body;

  // Aquí normalmente generarías un link de pago
  // De momento, solo simularemos una URL de redirección
  res.json({
    url: `https://pagosimulacion.com/pago-exitoso?producto=${productId}&metodo=${method}&moneda=${currency}`
  });
});

// Escuchar en Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
