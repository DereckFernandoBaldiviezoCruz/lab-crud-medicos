import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { sequelize } from './database/database.js'; // Asegúrate de importar esto correctamente
import medicRoutes from './routes/medic.routes.js'; // Usa la nueva ruta
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto definido en las variables de entorno, o 3000 por defecto

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Rutas
app.use('/medics', medicRoutes);

// Sincronizar los modelos con la base de datos y luego iniciar el servidor
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos: ', error);
  });
