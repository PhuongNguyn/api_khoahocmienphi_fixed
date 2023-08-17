const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/login', UserController.authentication)

module.exports = router