const jobCntrl = require('../controllers/jobCntrl.js');
const router=require('express').Router();
const auth=require('../middleware/auth.js');

router.post('/create', auth, jobCntrl.createJob);
router.get('/get', jobCntrl.getJobs);
router.put('/update/:id', auth, jobCntrl.updateJob);
router.get('/get/:id', jobCntrl.getJobById);
router.get('/userJobs/:id',jobCntrl.userJobs);
router.delete('/delete/:id', auth, jobCntrl.deleteJob);

module.exports = router;