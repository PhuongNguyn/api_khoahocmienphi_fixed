const mongoose = require('mongoose')

const Banner = mongoose.Schema({
    bannerLeft1: String,
    bannerLeft2: String,
    bannerBot: String,
    linkBannerBot: String,
    bannerRight: String,
    linkBannerRight: String
})

module.exports = mongoose.model('banners', Banner)