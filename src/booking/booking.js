const axios = require('axios')

const booking = (req, res) =>{
    console.log("booking page");
    res.status(200).send("its working")
}

module.exports = { booking };