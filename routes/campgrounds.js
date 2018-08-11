var express = require("express");
var router  = express.Router(); 
var Campground = require("../modules/campground");

var middleware = require("../middleware");

router.get("/campgrounds", function(req, res){
    
           
        Campground.find({}, function(err, allCamps){
            
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index",{campgrounds: allCamps, currentUser: req.user });
            }
        });
        
    
});


router.post("/campgrounds", middleware.isLoggedIn , function(req, res){
    
    var name = req.body.campname;
    var image = req.body.imageurl;
    var desc = req.body.description;
    var author = {
            id: req.user._id,
            username: req.user.username
    };
    var newground = { name: name, image: image, description: desc, author: author };
    
    Campground.create(newground, function(err,camp){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
    
    
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    
    res.render("campgrounds/new");
    
});

//Show one campground details
router.get("/campgrounds/:id", function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundGround){
        
        if (err) {
            console.log(err);   
            
        } else {
            //console.log(foundGround);
            res.render("campgrounds/show", {ground: foundGround});
        }
        
    });
    
    
    
});

// EDIT CAMPGROUND ROUTE

router.get("/campgrounds/:id/edit", middleware.checkCampGroundOwnership, function(req, res){
    
            Campground.findById(req.params.id, function(err, foundGround){
                res.render("campgrounds/edit", {ground: foundGround}); 
});
});
//UPDATE CAMPGROUND ROUTE

router.put("/campgrounds/:id", middleware.checkCampGroundOwnership , function(req, res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.ground, function(err, updatedGround){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            
            res.redirect("/campgrounds/" + req.params.id  );
        }
    });
    
});

//DESTROY GROUND

router.delete("/campgrounds/:id", middleware.checkCampGroundOwnership, function(req, res){
    
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});

module.exports = router;