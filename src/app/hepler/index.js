function verifyToken(req, res, next) {
    console.log("vao verifyToken")
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        console.log("vao verifyToken2:", req.token)

        next();
    } else {
        // Forbidden
        res.json({
            status: 403,
            message: "k xác thực token"
        });
    }
}

module.exports = {
    verifyToken
}