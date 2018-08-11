var Campground = require("../modules/campground")
var Comment = require("../modules/comment")
var middlewareObject = {};

middlewareObject.checkCampGroundOwnership = function(req, res, next){
    
    //Middleware to check if the campground owner is same
    if(req.isAuthenticated()){
            
            Campground.findById(req.params.id, function(err, foundGround){
            if (err) {
                req.flash("error", "Oops! Campground not found !!");
                console.log(err);
                res.redirect("back");
            } else {
                if(foundGround.author.id.equals(req.user._id)){
                   next();
                }else{
                    req.flash("error", "You dont have permission to do that..!!");
                    res.redirect("back");
                }
                
            }
    });
        
    }else{
        //go to the previous page where user was
        req.flash("error", "You need to be logged in to do that..!!");
        res.redirect("back");
    }
};


middlewareObject.checkCommentOwnership = function(req, res, next){
    
    //Middleware to check if the comment owner is same
    if(req.isAuthenticated()){
            
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                   next();
                }else{
                    req.flash("error", "You dont have permission to do that..!!");
                    res.redirect("back");
                }
                
            }
    });
        
    }else{
        //go to the previous page where user was
        req.flash("error", "You need to be logged in to do that..!!");
        res.redirect("back");
    }
};

middlewareObject.isLoggedIn = function(req, res, next){
  
  //Middleware to check if the user is logged in
    if(req.isAuthenticated()){
        console.log("Inside isLoggedIn");
        return next();
    }
    req.flash("error", "You need to be Logged in to do that..!!");
    res.redirect("/login");
};


module.exports = middlewareObject;