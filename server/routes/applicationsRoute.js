const router=require('express').Router();
const auth=require('../middleware/auth');
const requireRole = require('../middleware/requireRole.js');
const { STUDENT_EMPLOYEE, EMPLOYER } = require('../constants/userRoles.js');
const applicationsCntrl=require('../controllers/applicationCntrl.js');

router.get('/get/:id', auth, requireRole(STUDENT_EMPLOYEE), applicationsCntrl.getUserApplications);
router.post('/newApplication/:id', auth, requireRole(STUDENT_EMPLOYEE), applicationsCntrl.createApplication);
router.get('/jobApplications/:id', auth, requireRole(EMPLOYER), applicationsCntrl.getjobApplications);
router.put('/update/:id', auth, requireRole(EMPLOYER), applicationsCntrl.updateApplication);
router.delete('/delete/:id', auth, requireRole(STUDENT_EMPLOYEE), applicationsCntrl.deleteApplication);

module.exports=router;