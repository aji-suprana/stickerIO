const express = require('express');
const Stickers = require('../models/sticker');
const router = express.Router();
const mongoose = require('mongoose');
const isImageUrl = require('is-image-url');

/////////////////////////////////////////////////////////
// link: {stagebaseurl}/stickers/
// HTTPMethod: GET
// Request Format:
// 
// Response Format:
// {
//     "count": 1,
//     "stickers": [
//         {
//             "stickerContent": [
//                 "name,name,name"
//             ],
//             "_id": "5d280bc66c23f0234cfe35a5",
//             "name": "name",
//             "stickerURL": "name",
//             "__v": 0
//         }
//     ]
// }
////////////////////////////////////////////////////////
router.get('/',(req,res,next)=>{
    Stickers
    .find()
    .select('name _id thumbnailURL')
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

/////////////////////////////////////////////////////////
// link: {stagebaseurl}/stickers/
// HTTPMethod: GET
// Request Format:
// 
// Response Format:
//
////////////////////////////////////////////////////////
router.get('/:stickerId',(req,res,next)=>{
    const id = req.params.stickerId;

    Stickers
    .findById(id)
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


/////////////////////////////////////////////////////////
// link: {stagebaseurl}/stickers/upload
// HTTPMethod: POST
// Request Format:
// {
//     "name" : "na2me2",
//     "stickerURL" : "https://t.me/addstickers/MelieTheCavy",
//     "thumbnail" : "https://i.ibb.co/Y0qtBxt/Untitled-1.png",
//     "stickerContent" : ["https://i.ibb.co/Y0qtBxt/Untitled-1.png","https://i.ibb.co/Y0qtBxt/Untitled-1.png","https://i.ibb.co/Y0qtBxt/Untitled-1.png"]
//   }
// Response Format:
// {
//     "message": "Sticker Uploaded",
//     "result": {
//         "stickerContent": [
//             "https://i.ibb.co/Y0qtBxt/Untitled-1.png",
//             "https://i.ibb.co/Y0qtBxt/Untitled-1.png",
//             "https://i.ibb.co/Y0qtBxt/Untitled-1.png"
//         ],
//         "_id": "5d2838d9fbbe5b4d08c26042",
//         "name": "na2me2",
//         "stickerURL": "https://i.ibb.co/Y0qtBxt/Untitled-1.png",
//         "thumbnailURL": "https://i.ibb.co/Y0qtBxt/Untitled-1.png"
//     }
// }
////////////////////////////////////////////////////////
router.post('/upload',(req,res,next)=>{

    const body = req.body;

    const requestFormatCorrect = body["stickerContent"] != undefined && body["name"] != undefined && body["stickerURL"] != undefined && body["thumbnail"] != undefined;
    if(!requestFormatCorrect)
    {
        const msg = {"error": "request format has to contain name, stickerContent, StickerURL, thumbnail"};
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
                        thumbnailURL: req.body.thumbnail,
                        stickerContent: req.body.stickerContent
                    });

                    sticker.save()
                    .then(result=>{
                        console.log(result);
                        response = {...result._doc};
                        delete response["__v"];
                        res.status(201).json({
                            message:'Sticker Uploaded',
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