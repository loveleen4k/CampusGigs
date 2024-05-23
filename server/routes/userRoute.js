const userCntrl = require('../controllers/userCntrl.js');
const router=require('express').Router();
const auth=require('../middleware/auth.js');

router.post('/register', userCntrl.register);
router.post('/login',userCntrl.login);
router.get('/logout', userCntrl.logout);
router.post('/refreshtoken', userCntrl.refreshtoken);
router.get('/infor',auth,userCntrl.getUser);
router.put('/update',auth,userCntrl.update);
router.delete('/delete',auth,userCntrl.delete);

module.exports = router;
