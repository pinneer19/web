const Router = require('express')
const router = new Router()
const doctorController = require('../controllers/doctorController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole('user'), doctorController.create)
router.get('/', doctorController.getAll)
router.get('/:id', doctorController.getOne)
router.delete('/:id', doctorController.delete)

module.exports = router