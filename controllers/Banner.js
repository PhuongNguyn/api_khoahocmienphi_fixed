const HomeBanner = require('../models/Banner')

class Banner{
    async getBanner(req, res){
        try {
            const banner = await HomeBanner.find()
            if(banner)
                return res.status(200).json({message: "Success", status:1 , banner: banner[0]})
            else
                return res.status(200).json({message: "Success", status:1 , banner: {}})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Error", status: -1})
        }
    }

    async updateBanner(req, res){
        try {
            const bannerLeft1 = req.body.bannerLeft1
            const bannerLeft2 = req.files?.bannerLeft2
            const bannerRight = req.body.bannerRight
            const bannerBot = req.body.bannerBot
            const linkBannerRight = req.body.linkBannerRight
            const linkBannerBot = req.body.linkBannerBot
            const banner = await HomeBanner.find({})

         
            if(bannerLeft2){
                bannerLeft2.mv(`${__dirname}/../public/uploads/${bannerLeft2.name}`, (err) => {
                    if(err)
                        return res.status(500).json({message: "Failed", status: -1})
                })
            }

            if(banner.length > 0){
                let query = {
                    bannerLeft1,
                    bannerRight: bannerRight,
                    linkBannerRight: linkBannerRight,
                    bannerBot: bannerBot,
                    linkBannerBot: linkBannerBot
                }

                if(bannerLeft2){
                    query.bannerLeft2 = bannerLeft2?.name
                }else{
                    query.bannerLeft2 = '' 
                }

                const update = await HomeBanner.findByIdAndUpdate(banner[0]?._id, query)

                return res.status(200).json({status: 1, message: "Success"})
            }

            const newBanner = await HomeBanner.create({
                bannerLeft1,
                bannerLeft2: bannerLeft2?.name,
                bannerRight: bannerRight,
                linkBannerRight: linkBannerRight,
                bannerBot: bannerBot,
                linkBannerBot: linkBannerBot 
            })

            return res.status(200).json({message: "Success", status: 1})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Failed', error: error})
        }
    }
}

module.exports = new Banner()