const express = require('express');
const cors = require('cors');
const app = express(); 

const personRoute = require('./routes/person.route');
const requestRoute = require('./routes/request.route');

const PORT = 3030;

app.use(cors())
app.use(express.json())
app.use('/api', personRoute)
app.use('/api', requestRoute)

app.listen(PORT, () => console.log(`port ${PORT}`))