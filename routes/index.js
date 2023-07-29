var router = require('express').Router();
var {register, login} = require('../controllers/authController')
var {profile} = require('../controllers/useController');
var checkTokent = require('../middlewares/checkTokent');
/* GET home page. */
router
  .get('/', function(req, res, next) {
  res.status(200).json({
    ok : true,
    message : "Done!"
  });
  })
  .post('/api/register',register)
  .post('/api/login',login)

  .get('/api/profile',checkTokent,profile)

module.exports = router;
