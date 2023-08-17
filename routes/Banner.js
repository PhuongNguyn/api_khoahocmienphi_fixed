const router = require('express').Router()
const bannerController = require('../controllers/Banner')

router.put(`/update`, bannerController.updateBanner)
router.get(`/`, bannerController.getBanner)

module.exports = router