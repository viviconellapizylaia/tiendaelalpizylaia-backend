const express = require('express');
const cors = require('cors');
const path = require('path');
<<<<<<< HEAD
const mercadopago = require('mercadopago');

// Configura tu token de acceso
mercadopago.configure({
  access_token: 'APP_USR-4401658136441176-072220-cfdfb79758a540f18ed79639dc9b0dca-232985972'
});

=======
>>>>>>> df6b877fffa3058fb24f36cf37485e3f1cdcbd6c
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
<<<<<<< HEAD
app.post('/api/pago-carrito', async (req, res) => {
  const { items, email } = req.body;

  try {
    const preference = {
      items: items.map(item => ({
        title: item.nombre,
        quantity: item.cantidad,
        currency_id: "COP",
        unit_price: item.precio
      })),
      payer: {
        email: email
      },
      back_urls: {
        success: 'https://tusitio.com/pago-exitoso',
        failure: 'https://tusitio.com/pago-fallido'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia de MercadoPago:', error);
    res.status(500).send('Error al generar pago.');
  }
});

=======
>>>>>>> df6b877fffa3058fb24f36cf37485e3f1cdcbd6c

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Tu servidor funciona correctamente! 🚀');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

