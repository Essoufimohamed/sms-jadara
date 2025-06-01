export const checkRoles = (...Roles) => {
    return (req, res, next) => {
        if (!req.user || !Roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
