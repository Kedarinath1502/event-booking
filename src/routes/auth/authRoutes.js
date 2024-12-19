const express = require('express');
const { getAuthURL, handleAuthCallback} = require('./authController');

const router = express.Router();

router.get("/url", getAuthURL);
router.get("/callback", handleAuthCallback);

module.exports = router;
