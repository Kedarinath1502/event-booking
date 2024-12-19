const oauth = require('../../config/googleconfig')

const getAuthURL = (req, res) => {
    const scopes = ["https://www.googleapis.com/auth/calendar"];
    const authURL = oauth.generateAuthUrl({
       access_type: "offline",
       scope: scopes,
    });
    res.redirect(authURL)
};

const handleAuthCallback = async (req, res) =>{
    console.log("its working");
    const { code } = req.query;
    try{
        const { tokens } = await oauth.getToken(code);
        console.log(tokens)
        oauth.setCredentials(tokens);
        res.json(tokens);
    } catch(error){
        console.error("error authenticating", error);
        res.status(500).send("auth failed");
    }
};

module.exports = { getAuthURL, handleAuthCallback};