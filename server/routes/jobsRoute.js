const jobCntrl = require('../controllers/jobCntrl.js');
const router=require('express').Router();
const auth=require('../middleware/auth.js');
const requireRole = require('../middleware/requireRole.js');
const { EMPLOYER } = require('../constants/userRoles.js');

router.post('/create', auth, requireRole(EMPLOYER), jobCntrl.createJob);
router.get('/get', jobCntrl.getJobs);
router.put('/update/:id', auth, requireRole(EMPLOYER), jobCntrl.updateJob);
router.get('/get/:id', jobCntrl.getJobById);
router.get('/userJobs/:id',jobCntrl.userJobs);
router.delete('/delete/:id', auth, requireRole(EMPLOYER), jobCntrl.deleteJob);

module.exports = router;