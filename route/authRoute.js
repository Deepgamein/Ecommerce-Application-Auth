const {Router} = require('express')
const {registerController, loginController, testController} = require('../controllers/authController')
const { requireSignin, isAdmin } = require('../Middleware/authMiddleware')

const route = Router()

route.get('/',(req, res) => {
    res.send('I am from router ')
})

route.post("/register", registerController)

route.post("/login", loginController)
route.get("/test", requireSignin, isAdmin, testController)

module.exports = route;