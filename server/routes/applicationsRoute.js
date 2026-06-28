const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole.js');
const { STUDENT_EMPLOYEE, EMPLOYER } = require('../constants/userRoles.js');
const {
    requireSelf,
    requireJobOwner,
    requireValidJobListing,
    requireApplicationApplicant,
    requireApplicationJobOwner,
} = require('../middleware/applicationOwnership.js');
const applicationsCntrl = require('../controllers/applicationCntrl.js');

router.use(auth);

router.get('/get/:id', requireRole(STUDENT_EMPLOYEE), requireSelf, applicationsCntrl.getUserApplications);
router.post('/newApplication/:id', requireRole(STUDENT_EMPLOYEE), requireValidJobListing, applicationsCntrl.createApplication);
router.get('/jobApplications/:id', requireRole(EMPLOYER), requireJobOwner, applicationsCntrl.getjobApplications);
router.put('/update/:id', requireRole(EMPLOYER), requireApplicationJobOwner, applicationsCntrl.updateApplication);
router.delete('/delete/:id', requireRole(STUDENT_EMPLOYEE), requireApplicationApplicant, applicationsCntrl.deleteApplication);

module.exports = router;
