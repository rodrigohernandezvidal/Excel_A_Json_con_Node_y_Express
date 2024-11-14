const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Cargar el archivo Excel
const workbook = xlsx.readFile('Datos.xlsx');

// Usar la primera hoja del archivo
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convertir la hoja de Excel a formato JSON
const data = xlsx.utils.sheet_to_json(worksheet);

//Para consumir API desde cliente web
app.use(cors());

// Ruta para obtener todos los datos
app.get('/api/datos', (req, res) => {
  res.json(data);
});

// Ruta para obtener un registro por índice (parámetro en la URL)
app.get('/api/datos/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < data.length) {
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Dato no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
