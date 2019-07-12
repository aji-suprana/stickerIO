const express = require('express');
const Reports = require('../models/report');
const router = express.Router();
const mongoose = require('mongoose');

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
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    ...doc._doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/stickers/id' + req.body.reportedSticker
                    }
                }
            })
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
