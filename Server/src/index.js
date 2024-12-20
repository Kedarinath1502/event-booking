const express = require('express');
const config = require('./config/config');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const { createEvent } = require('./booking/booking')
const app = express()

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use("/auth", authRouter);

app.post("/createEvent", createEvent);

app.get('/', (req, res) => {
    return res.send("its working 🙌");
})

app.listen(config.port, () => {
    console.log(`server running on ${config.port} in ${config.environment} mode`);
})