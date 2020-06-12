const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.get("/allpost", requireLogin, (req, res) =>{
    Post.find().populate("postedBy", "_id name").then(posts =>{
        res.json({posts});
    }).catch(error =>{
        console.log(error);
    });
});

router.post("/createPost", requireLogin, (req, res) =>{
    const {title, body, pic} = req.body;
    if(!title || !body || !pic){
        res.status(422).json({error: "Please add a title and body"});
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy: req.user
    });
    post.save().then(result =>{
        res.json({post: result});
    }).catch(error =>{
        console.log(error);
    });
});

router.get('/myposts', requireLogin, (req, res) =>{
    Post.find({postedBy: req.user._id})
    .populate("PostedBy", "_id name")
    .then(myposts =>{
        res.json({myposts});
    }).catch(error =>{
        console.log(error);
    });
});

router.put("/like", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    },{
        new: true
    }).exec((err, result) =>{
        if(err){
            return res.status(222).json({err:err})
        }
        else{
            res.json(result);
        }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    },{
        new: true
    }).exec((err, result) =>{
        if(err){
            return res.status(222).json({err:err})
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;