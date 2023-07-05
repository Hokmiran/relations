const express = require('express');
const cors = require('cors')
const { db } = require('./config/db'); 
const { JobRoutes } = require('./routes/JobRoutes');
const { LocationRoutes } = require('./routes/LocationRoutes');
const app = express();
require('dotenv').config()
const port = 8080;


db.connect();

app.use(express.json())
app.use(cors());


app.use('/api/jobs', JobRoutes);
app.use('/api/location', LocationRoutes);



app.listen(port, () => {
    console.log('Server is running...');
})