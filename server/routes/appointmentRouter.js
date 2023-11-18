const Router = require('express')
const router = new Router()
const appointmentController = require('../controllers/appointmentController')
const checkRole = require("../middleware/CheckRoleMiddleware");

router.post('/',  checkRole('user'), appointmentController.create)
router.get('/', appointmentController.getAll)
router.get('/:doctor', appointmentController.getByDoctor)
router.get('/:user', appointmentController.getByUser)
router.get('/:user/:doctor', appointmentController.getByUserAndDoctor)
router.get('/:id', appointmentController.getById)
router.delete('/:id', appointmentController.delete)

module.exports = router