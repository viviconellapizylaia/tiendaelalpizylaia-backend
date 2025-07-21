const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta RECURSOS
app.use('/recursos', express.static('RECURSOS'));

// Ruta para descarga de recursos gratuitos
app.post('/api/descargar', (req, res) => {
  const ruta = `${__dirname}/RECURSOS/AGENDA DOCENTE PARA IMPRIMIR 2025-2026.pdf`;
  res.download(ruta, 'Agenda_Docente_2025_2026.pdf', err => {
    if (err) {
      console.error('Error al descargar:', err);
      res.status(500).send('Error al descargar el archivo.');
    }
  });
});

// Ruta para procesar pagos (simulada)
app.post('/api/pagar', (req, res) => {
  const { productId, method, currency } = req.body;
  res.json({
    url: `https://pagosimulacion.com/pago-exitoso?producto=${productId}&metodo=${method}&moneda=${currency}`
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Tu servidor funciona correctamente! 🚀');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

