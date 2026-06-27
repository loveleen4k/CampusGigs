const Users = require('../models/userModel.js');
const ensureUserRole = require('../utils/ensureUserRole.js');

const requireRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await Users.findById(req.user.id).select('role');
            if (!user) return res.status(400).json({ msg: 'User not found' });
            const role = await ensureUserRole(user);
            if (!allowedRoles.includes(role)) {
                return res.status(403).json({ msg: 'You are not authorized to perform this action.' });
            }
            req.userRole = role;
            next();
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    };
};

module.exports = requireRole;
