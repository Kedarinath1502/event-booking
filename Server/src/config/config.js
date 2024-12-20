require('dotenv').config();

const config = {
    port: process.env.PORT || 4000,
    environment: process.env.NODE_ENV || 'development'
}

module.exports = config;