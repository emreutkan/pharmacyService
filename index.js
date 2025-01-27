const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { PORT, MONGO_URI } = require('./utils/env');
require('cors');
require('swagger-ui-express');
const yaml = require('yamljs');
require('path');
dotenv.config();

const authRoutes = require('./routes/v1/authRoutes');
const {serve, setup} = require("swagger-ui-express");
const {join} = require("node:path");

const app = express();
app.use(express.json());

const swaggerDocument = yaml.load(join(__dirname, 'swagger.yaml'));

app.use('/swagger', serve, setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/swagger');
});

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => res.send('Pharmacy Service is running'));

app.listen(PORT, () => {
    console.log(`Doctor Service running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/swagger`);
});
