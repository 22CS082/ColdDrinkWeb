const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(500).json({ message: "Internal Server Error. User data not available." });
        }
        
        const adminRole = req.user.isadmin;

        if (adminRole === undefined) {
            console.error("adminMiddleware: req.user.isAdmin is undefined.");
        } else if (!adminRole) {
            return res.status(403).json({ message: "You are not authorized to access this route." });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;
