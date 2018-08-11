var mongoose = require("mongoose");

var Campground = require("./modules/campground");

var Comment  = require("./modules/comment");
 
var data = [
    {
        name: "Kaduthuruthy", 
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Pattambi", 
        image: "https://images.unsplash.com/photo-1519790751650-82078ca9d4f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dbccd134520f0fa2a2cda23edf237e0&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Melbourne", 
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


function seedDB(){

//Remove all campgrounds
Campground.remove({}, function(err){
    
    if (err) {
        console.log(err);
    } else {
        console.log("Campground data removed !!");
        
        data.forEach(function(seed){
    
    Campground.create(seed, function(err,createdSeed){
        
        if (err) {
            console.log(err);
        } else {
            console.log("Added a Campground");
            
            Comment.create({
                
                text: "Adipoly place aanu. But internet illa..!!",
                author: "Sanjukuttan"
                
            }, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    createdSeed.comments.push(comment);
                    createdSeed.save();
                    console.log("Created new comment");
                }
                
                
                
            });
            
            
        }
        
    });
    
});
    }
    
});




}

module.exports = seedDB;