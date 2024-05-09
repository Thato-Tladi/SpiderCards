const express = require('express');
require('dotenv').config();
const corsMiddleware = require('./core/middleware/corsMiddleware');
const { sequelize } = require('./data/models');
const authRoutes = require('./core/routes/authRoutes');
const gameRoutes = require('./core/routes/gameRoutes');
const userRoutes = require('./core/routes/userRoutes');
const { startIdleSessionChecker } = require('./core/jobs/idleSessionChecker');

const app = express();

startIdleSessionChecker(5);

//app.use(corsMiddleware);
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://127.0.0.1:${PORT}`));