var express = require("express");
var router  = express.Router(); 
var passport = require("passport");
var User = require("../modules/user");

var middleware = require("../middleware");
router.get("/", function(req, res){
    
   
    res.render("landing");
    
});






//=========================================
//              AUTH ROUTES
//========================================

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    
    console.log("Inside Post");
    console.log(req.body.username);
    console.log(req.body.password);
    var newUser = new User({username: req.body.username});
    User.register( newUser , req.body.password , function(err, user){
        console.log("Inside register");
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Registered..Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
        
    } );
    
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//login handling
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res) {});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully Logged out! See you next time !");
    res.redirect("/campgrounds");
});



module.exports = router;