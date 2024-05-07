const express = require('express');
require('dotenv').config();
const corsMiddleware = require('./core/middleware/corsMiddleware');
const { sequelize } = require('./data/models');
const authRoutes = require('./core/routes/authRoutes');
const gameRoutes = require('./core/routes/gameRoutes');

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/game', gameRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://127.0.0.1:${PORT}`));
