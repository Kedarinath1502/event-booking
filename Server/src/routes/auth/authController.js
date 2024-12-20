const oAuth2Client = require('../../config/googleconfig');

const getAuthURL = (req, res) => {
    const scopes = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"];
    const authURL = oAuth2Client.generateAuthUrl({
       access_type: "offline",
       scope: scopes,
    });
    res.redirect(authURL);
};

const handleAuthCallback = async (req, res) => {
    console.log("OAuth callback is working");
    const { code } = req.query;
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        console.log(tokens);
        oAuth2Client.setCredentials(tokens);
        res.json({
            message: "Authentication successful",
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expiry_date,
        });
    } catch (error) {
        console.error("Error authenticating", error);
        res.status(500).send("Authentication failed");
    }
};

module.exports = { getAuthURL, handleAuthCallback};