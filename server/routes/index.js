const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const doctorRouter = require('./doctorRouter')
const reviewRouter = require('./reviewRouter')
const serviceRouter = require('./serviceRouter')


router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/doctor', doctorRouter)
router.use('/review', reviewRouter)

module.exports = router