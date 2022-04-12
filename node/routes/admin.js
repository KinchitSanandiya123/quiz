var express = require('express');
const adminController = require('../controllers/admin')
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/create', adminController.createAdmin);

router.post('/save', adminController.saveAdmin);
router.get('/list', adminController.getAdmin);
router.post('/login', adminController.adminLogin);
router.delete('/delete', adminController.DeleteUser);
router.put('/edit', adminController.EditUser);

router.post('/createtest',adminController.createtest);
router.get('/testlist', adminController.testlist);

router.post('/addQuestion', adminController.addQuestion)
router.delete('/deleteTest', adminController.DeleteTest);
router.post('/questionlist', adminController.listQuestion);
router.post('/editQuestion', adminController.EditQuestion)
router.post('/editTest', adminController.EditTest)

router.post('/testresult',adminController.testresult);
router.post('/result',adminController.result);


module.exports = router;
