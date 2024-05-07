const express = require('express');
const corsMiddleware = require('./core/middleware/corsMiddleware');
const authRoutes = require('./core/routes/authRoutes');
const { sequelize } = require('./data/models');
require('dotenv').config();

const port = process.env.PORT;
const app = express();


app.use(corsMiddleware);
app.use('/api', authRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));


app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await sequelize.sync({ alter: false });
});