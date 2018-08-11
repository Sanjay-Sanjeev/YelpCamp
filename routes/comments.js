var express = require("express");
var router  = express.Router(); 

var middleware = require("../middleware");

var Campground = require("../modules/campground");
var Comment    = require("../modules/comment");

// ===========Comments Routes ====================

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn , function(req, res) {
    
    //find by ID
    console.log("User is authenticated and logged in");
    Campground.findById(req.params.id, function(err, ground){
        if (err) {
            console.log(err);
        } else {
            //console.log(ground)
            res.render("comments/new", {campground: ground});
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn ,function(req, res){
    //lookup campground using id
    //create new comment
    //add comment to campground
    //redirect
    
     Campground.findById(req.params.id, function(err, ground) {
         if (err) {
             console.log(err);
             res.redirect("/campgrounds");
         } else {
              console.log(req.body.comment);
             Comment.create(req.body.comment, function(err, comment){
                 
                 if (err) {
                     console.log(err);
                 } else {
                      
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     comment.save();
                     ground.comments.push(comment);
                     ground.save();
                     var url  = "/campgrounds/" + ground._id;
                     req.flash("success", "Successfully added comment...!!");
                     res.redirect(url);
                 }
             });
         }
     });
    
});


// comment route edit

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership,function(req, res){
    
    Comment.findById(req.params.comment_id ,function(err, comment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
    
});

// comment PUT route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership ,function(req, res){
    
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
         if (err) {
             console.log(err);
             res.redirect("back");
         } else {
             res.redirect("/campgrounds/" + req.params.id );
         }
     } );
    
});

//DESTROY ROUTE

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req, res){
    
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Success..!! Comment deleted..!!");
            res.redirect("/campgrounds/" + req.params.id );
        }
    });
    
});


module.exports = router;