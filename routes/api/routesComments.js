const express = require('express');
const router = express.Router();

//importamos el modelo
const Comment = require('../../models/modelComment');

router.post('/newComment', async (req, res) => {
    try {
        const commentCreated = new Comment({
            itineraryId: req.body.itineraryId,
            username: req.body.username,
            profilePic: req.body.profilePic,
            comment: req.body.comment,
            date: req.body.date
        })
        const commentSaved = await commentCreated.save();
        res.status(200).json({
            comment: commentSaved
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/:itineraryId', async (req, res) => { 
    try {
        const commentsObtained = await Comment.find({itineraryId: req.params.itineraryId});
        console.log(commentsObtained);
        if (commentsObtained) {
            res.status(200).json({
                comments: commentsObtained
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});

module.exports = router;