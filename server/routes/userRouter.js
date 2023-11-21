const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/auth', authMiddleware, userController.check)
router.get('/auth/google', userController.googleAuth)
router.get('/auth/google/callback', userController.googleAuthCallback)
router.get('/', (req, res) => {
    res.json({message: req.user})
})

module.exports = router