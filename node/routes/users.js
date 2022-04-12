var express = require('express');
const userController = require('../controllers/user')
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/create', userController.createUser);

router.post('/save', userController.saveUser);
router.get('/list', userController.getUsers);
router.delete('/delete', userController.DeleteUser);
router.put('/edit', userController.EditUser);


module.exports = router;
