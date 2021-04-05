const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "850052351064-g49rc9ins4606o33ujpgdocc31p9fu2m.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const googleAuth = async (req, res, next) => {
        try {
                const idToken = req.header("Authorization").replace("Bearer ", "");
                const ticket = await client.verifyIdToken({
                        idToken,
                        audience: CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (payload["hd"] !== "iitbbs.ac.in")
                        throw new Error();
                const requiredUser = req.body;
                if (!requiredUser.user || (requiredUser.email === ""))
                {
                        req.user = {
                                firstName: payload["given_name"],
                                lastName: payload["family_name"],
                                email: payload["email"]
                        };
                }
                else
                        req.user = requiredUser.user;
                next();

        } catch (err) {
                res.status(401).send("Please authenticate!");
        }
};

module.exports = googleAuth;
