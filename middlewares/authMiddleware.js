const JWT = require("jsonwebtoken");

// this authorization middleware verifies the authenticity of the token, 
// extracts the user ID from the decoded token, 
// and attaches it to the req.body.userId property. 
// This allows subsequent middleware or route handlers to identity 
// and handle authenticated requests appropriately.

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]; // Bearer wndkjnTOKENwjdqkj;
        // we used JWT_SECRET to encrypt, so we use here as decrypt key
        JWT.verify(token, process.env.JWT_SECRET,(err, decodedToken) => {
            if (err) return res.status(200).send({
                success: false,
                message: "auth failed"
            });
            else {
                req.body.userId = decodedToken.id;
                // req is modified in middleware
                next(); // execute next code
            }
        });
    } catch (err) {
        res.status(401).send({
            success: false,
            message: "Auth failed in authMiddleware",
        })
    }
}