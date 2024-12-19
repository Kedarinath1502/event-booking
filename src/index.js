const express = require('express');
const config = require('./config/config');
const helmet = require('helmet');
const morgan = require('morgan')
const app = express()

app.use(helmet())
app.use(morgan('dev'));
app.get('/', (req, res) => {
    return res.send("its working 🙌")
})

app.listen(config.port, () => {
    console.log(`server running on ${config.port} in ${config.environment} mode`);
})