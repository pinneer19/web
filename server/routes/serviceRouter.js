const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require("../middleware/CheckRoleMiddleware");

router.post('/',  checkRole('user'), serviceController.create)
router.get('/', serviceController.getAll)
router.get('/:id', serviceController.getOne)
router.delete('/:id', checkRole('user'), serviceController.delete)

module.exports = router