// create a middleware to check if the logged in user is an admin or not
module.exports = function verifyAdmin(req, res, next) {
    // Get auth header value
    const token = req.header("auth-token");
    // Check if not token
    if (!token) {
        return res.status(407).json({ msg: "No token, authorization denied" });
    }
    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded;
        if (req.user.role == "admin") {
        next();
        } else {
        return res.status(407).json({ msg: "Not an admin" });
        }
    } catch (err) {
        res.status(405).json({ msg: "Token is not valid" });
    }
};