const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.DB_URL)
                        .then(() => console.log('Database connect successful'))
                        .catch((err) => console.log(err))
}