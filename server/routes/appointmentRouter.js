const Router = require('express')
const router = new Router()
const appointmentController = require('../controllers/appointmentController')
const authMiddleware = require("../middleware/AuthMiddleware");

router.post('/',  authMiddleware, appointmentController.create)
router.get('/', appointmentController.getAll)
router.get('/:doctor', appointmentController.getByDoctor)
router.get('/:user', appointmentController.getByUser)
router.get('/:user/:doctor', appointmentController.getByUserAndDoctor)
router.get('/:id', appointmentController.getById)
router.delete('/:id', appointmentController.delete)

module.exports = router