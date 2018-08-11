var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    methodOverride = require("method-override"),
    Campground  = require("./modules/campground.js"),
    Comment    = require("./modules/comment.js"),
    seedDB      = require("./seeds"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User        = require("./modules/user");
    

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");

var dbURL = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";

mongoose.connect(dbURL , { useNewUrlParser: true });


//PASSPORT CONFIG
app.use(require("express-session")({
    
    secret: "YelpCamp 1234",
    resave: false,
    saveUninitialized: false
    
}));

app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Seed Database
//seedDB();

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);       

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("YelpCamp Server has started..!!");
    
});