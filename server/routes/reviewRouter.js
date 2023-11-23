const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const authMiddleware = require("../middleware/AuthMiddleware");

router.post('/',  authMiddleware, reviewController.create)
router.get('/', reviewController.getAll)

module.exports = router