const User = require('../models/user')
const jwt = require('jsonwebtoken')

const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')?.[1]

        if(!token){
            return res.status(400).json({message: 'Token is required'})
        }

        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)

        if(!verifyToken){
            return res.status(403).json({message: 'You are not authorized'})
        }
        const user = await User.findById(verifyToken.id)

        if(!user){
            return res.status(404).json({message: "User is not existed"})
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        return res.status(403).json({message: 'You are not authorized'})
    }
}

module.exports = authMiddleWare