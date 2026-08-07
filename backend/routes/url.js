import express from 'express'
import Url from '../models/Url.js'

const router = express.Router();

router.post('/shorten',async(req,res)=>{
    try {
        const {originalurl} = req.body;
        if(!originalurl) return res.status(400).json({error: 'Please provide a URL'})

        try {
            new URL(originalurl)
        } catch (error) {
            return res.status(400).json({error:"Invalid URL"})
        }

        let shortId;
        let exists = true;

        while(exists){
            shortId = nanoid(5);
            exists = await Url.findOne({shortId})
        }

        const url = await Url.create({
            originalurl,
            shortId
        })

        res.status(200).json({
            shortId: url.shortId,
            shortUrl: `${process.env.BASE_URL}/${url.shortId}`
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
})

router.get('/:shortId',async(req,res)=>{
    try {
        const {shortId} = req.params;

        const url = await Url.findOne({shortId})
        if(!url) return res.status(404).json({error:"URL not found"})

        url.clicks += 1;
        await url.save();

        return res.redirect(url.originalUrl)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})       
    }
})



export default router;