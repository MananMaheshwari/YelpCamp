var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middlewareObj = require("../middleware");

router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: foundCamp});
        }
    });
});

router.post("/", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    console.log(comment);
                    res.redirect("/campgrounds/"+ foundCamp._id);
                }
            });
        }
    });
});    

router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No such Campground");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                res.render("comments/edit", {campgroundID: req.params.id, comment: foundComment});
            }
        });

    })
    
});

router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

module.exports= router;