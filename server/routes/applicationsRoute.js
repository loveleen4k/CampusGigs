const router=require('express').Router();
const auth=require('../middleware/auth');
const applicationsCntrl=require('../controllers/applicationCntrl.js');

router.get('/get/:id',auth,applicationsCntrl.getUserApplications);
router.post('/newApplication/:id',auth,applicationsCntrl.createApplication);
router.get('/applications/:id',auth,applicationsCntrl.getjobApplications);
router.delete('/delete/:id',auth,applicationsCntrl.deleteApplication);

module.exports=router;