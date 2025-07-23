const express = require('express');
const cors = require('cors');
const path = require('path');
const mercadopago = require('mercadopago');

// Configuración de MercadoPago
mercadopago.configure({
  access_token: 'APP_USR-4401658136441176-072220-cfdfb79758a540f18ed79639dc9b0dca-232985972'
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta RECURSOS
app.use('/recursos', express.static(path.join(__dirname, 'RECURSOS')));

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: '¡Tu servidor funciona correctamente! 🚀',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Ruta para descarga de recursos gratuitos
app.post('/api/descargar', (req, res) => {
  const rutaArchivo = path.join(__dirname, 'RECURSOS', 'AGENDA DOCENTE PARA IMPRIMIR 2025-2026.pdf');
  const nombreDescarga = 'Agenda_Docente_2025_2026.pdf';
  
  res.download(rutaArchivo, nombreDescarga, (err) => {
    if (err) {
      console.error('Error al descargar archivo:', err);
      res.status(500).json({ 
        error: 'Error al descargar el archivo',
        message: err.message 
      });
    }
  });
});

// Ruta para procesar pagos simulados
app.post('/api/pagar', (req, res) => {
  const { productId, method, currency } = req.body;
  
  if (!productId || !method || !currency) {
    return res.status(400).json({
      error: 'Faltan parámetros requeridos',
      required: ['productId', 'method', 'currency']
    });
  }
  
  res.json({
    success: true,
    url: `https://pagosimulacion.com/pago-exitoso?producto=${productId}&metodo=${method}&moneda=${currency}`,
    timestamp: new Date().toISOString()
  });
});

// Ruta para procesar pagos reales con MercadoPago
app.post('/api/pago-carrito', async (req, res) => {
  const { items, email } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: 'Items del carrito son requeridos'
    });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      error: 'Email válido es requerido'
    });
  }

  try {
    const preference = {
      items: items.map(item => ({
        title: item.nombre || 'Producto sin nombre',
        quantity: parseInt(item.cantidad) || 1,
        currency_id: "COP",
        unit_price: parseFloat(item.precio) > 0 ? parseFloat(item.precio) : 1,

      })),
      payer: {
        email: email
      },
      back_urls: {
        success: 'https://tusitio.com/pago-exitoso',
        failure: 'https://tusitio.com/pago-fallido',
        pending: 'https://tusitio.com/pago-pendiente'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    
    res.json({ 
      success: true,
      init_point: response.body.init_point,
      preference_id: response.body.id
    });

  } catch (error) {
    console.error('Error al crear preferencia de MercadoPago:', error);
    res.status(500).json({
      error: 'Error al generar pago',
      message: error.message
    });
  }
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  console.log(`📍 URL local: http://localhost:${PORT}`);
});