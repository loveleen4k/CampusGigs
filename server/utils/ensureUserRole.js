const { STUDENT_EMPLOYEE } = require('../constants/userRoles.js');

const ensureUserRole = async (userDoc) => {
    if (!userDoc.role) {
        userDoc.role = STUDENT_EMPLOYEE;
        await userDoc.save();
    }
    return userDoc.role;
};

module.exports = ensureUserRole;
