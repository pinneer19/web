const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/',  authMiddleware, serviceController.create)
router.get('/', serviceController.getAll)
router.get('/:id', serviceController.getOne)
router.delete('/:id', authMiddleware, serviceController.delete)
router.get('/search/:input', serviceController.search)

module.exports = router