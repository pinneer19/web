const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const doctorRouter = require('./doctorRouter')
const appointmentRouter = require('./appointmentRouter')
const serviceRouter = require('./serviceRouter')


router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/doctor', doctorRouter)
router.use('/appointment', appointmentRouter)

module.exports = router