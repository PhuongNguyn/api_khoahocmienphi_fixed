const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    async authentication (req, res){
        try {
            const username = req.body.username 
            const user_password = req.body.password

            if(!username || !user_password){
                return res.status(400).json({message: 'Missing username or password'})
            }

            const checkExist = await User.findOne({username: username})

            if(!checkExist){
                return res.status(404).json({message: 'User is not exist'})
            }

            const checkPassword = bcryptjs.compareSync(user_password, checkExist.password)

            if(!checkPassword)
                return res.status(401).json({message: 'Password is wrong'})

            const accessToken = jwt.sign({
                id: checkExist._id
            }, process.env.TOKEN_SECRET, {
                expiresIn: '1d',
            })

            const {password, ...returnUser} = checkExist._doc

            return res.status(200).json({message: 'Login success', user: returnUser, token: accessToken, status: 1})
        } catch (error) {
            console.log(error)
            return res.status(401).json({message: 'Authentication Failed'})
        }
    }

    async autoCreateAccount (){
        try {
            const checkExistUser = await User.find({})

            if(checkExistUser.length == 0){
                const salt = bcryptjs.genSaltSync(10)
                const password = bcryptjs.hashSync('123123@', salt)
                const user1 = await User.create({
                    username: 'admin',
                    password: password,
                    email: 'admin@gmail.com',
                    name: 'Admin'
                })

                const user2 = await User.create({
                    username: 'admin1',
                    password: password,
                    email: 'admin1@gmail.com',
                    name: 'Admin1'
                })

                const user3 = await User.create({
                    username: 'admin2',
                    password: password,
                    email: 'admin2@gmail.com',
                    name: 'Admin2'
                })

                console.log('Create users success')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()