const Router = require('express')
const router = new Router()
const doctorController = require('../controllers/doctorController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, doctorController.create)
router.get('/', doctorController.getAll)
router.get('/:id', doctorController.getOne)
router.delete('/:id', doctorController.delete)

module.exports = router