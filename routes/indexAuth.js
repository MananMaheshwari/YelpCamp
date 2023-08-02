var express = require("express");
var router  = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

//REGISTER 

//SIGNUP FORM ROUTE
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup and logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("back");
        } else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success", "Welcome to the YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        }
    })
})

//LOGIN 
//login route
router.get("/login", function(req,res){
    res.render("login");
});

//handle login and logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) , function(req,res){

});

//LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged Out!")
    res.redirect("/campgrounds");
});


module.exports= router;