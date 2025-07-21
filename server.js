const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta RECURSOS
app.use('/recursos', express.static('RECURSOS'));

app.post('/api/descargar', (req, res) => {
  const { id } = req.body;

  // Aquí se puede hacer lógica más avanzada. Por ahora solo servimos 1 archivo fijo.
  const ruta = `${__dirname}/RECURSOS/AGENDA DOCENTE PARA IMPRIMIR 2025-2026.pdf`;

  res.download(ruta, 'Agenda_Docente_2025_2026.pdf', err => {
    if (err) {
      console.error('Error al descargar:', err);
      res.status(500).send('Error al descargar el archivo.');
    }
  });
});

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
