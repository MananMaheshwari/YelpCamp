var Campground = require("../models/campground"),
    Comment    = require("../models/comment");

var middlewareObj={};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground ){
                req.flash("error", "Camp doesn't exist");
                res.redirect("back");
            } else{
                if(foundCampground.author.id.equals(req.user._id)){ // equals method by provided by mongoose is used bcz
                    next();                                         // foundCampground.author.id is a mongoose object and
                } else{                                             // req.user.id is a string so they can't be compared by === operator
                    req.flash("error", "You don't have permission to do that action")
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to login to perform the action");
        req.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that action")
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You need to be logged in first")
        res.redirect("back");
    }
}

module.exports = middlewareObj;


