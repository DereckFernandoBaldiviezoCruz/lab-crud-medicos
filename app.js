import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { sequelize } from './database/database.js'; // Asegúrate de importar esto correctamente
import medicRoutes from './routes/medic.routes.js'; // Usa la nueva ruta

const app = express();
const PORT = process.env.PORT || 3000;

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
