require('dotenv').config();

var express             = require("express"),
    app                 = express(),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    methodOverride      = require("method-override"),
    flash               = require("connect-flash"),
    User                = require("./models/user"),
    seedDB              = require("./seeds"),
    campgroundRoutes     = require("./routes/campground"),
    commentRoutes        = require("./routes/comment"),
    indexAuthRoutes      = require("./routes/indexAuth");


// seedDB();  //seed the database

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(express.urlencoded({extended: true}));
app.use(flash());

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//=============================================
//PASSPORT CONFIGURE
app.use(require("express-session")({
    secret: "I am a good person",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexAuthRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//=============================================
// SETTING UP ROUTES
//=============================================

app.listen(3000, function(){
    console.log("YelpCamp server has started");
});


