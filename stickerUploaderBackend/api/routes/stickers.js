const express = require('express');
const Stickers = require('../models/sticker');
const router = express.Router();
const mongoose = require('mongoose');
const isImageUrl = require('is-image-url');

router.get('/',(req,res,next)=>{
    Stickers
    .find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            stickers: docs
        };

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

router.post('/',(req,res,next)=>{

    const body = req.body;

    const requestFormatCorrect = body["stickerContent"] != undefined && body["name"] != undefined && body["stickerURL"] != undefined;
    if(!requestFormatCorrect)
    {
        const msg = {"error": "request format has to contain name, stickerContent, StickerURL"};
        console.log(msg);
        res.status(500).json(msg);
        return;
    }

    const stickerContentArrayValid = (req.body.stickerContent instanceof Array);
    
    if(!stickerContentArrayValid)
    {
        const msg = {"error": "request.stickerContent has to be an array of image url"};
        console.log(msg);
        res.status(500).json(msg);
        return;
    }

    req.body.stickerContent.forEach((value)=>{
        if(!isImageUrl(value))
        {
            const msg = {"error": "request.stickerContent children has to be an image url"};
            console.log(msg);
            res.status(500).json(msg);
            return; 
        }
    })

    Stickers.find({"name":body.name})
            .exec()
            .then(stickerFound => {
                if(stickerFound.length >= 1){
                    return res.status(422).json({
                        error: 'Sticker Name Existed'
                    });
                }
                else
                {
                    const sticker = new Stickers({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        stickerURL: req.body.stickerURL,
                        stickerContent: req.body.stickerContent
                    });

                    sticker.save()
                    .then(result=>{
                        console.log(result);
                        response = {...result._doc};
                        delete response["__v"];
                        res.status(201).json({
                            message:'User Created',
                            result: response
                        })
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    error: err
                });
            })
})


/////////////////////////////////////////////////////////////////////////////////////////
// HELPER
/////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;