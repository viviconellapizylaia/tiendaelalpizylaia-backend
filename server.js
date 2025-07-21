const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Tu servidor funciona correctamente! 🚀');
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
