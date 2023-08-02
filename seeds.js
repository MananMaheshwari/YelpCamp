var mongoose = require("mongoose");
const campground = require("./models/campground");
var Campground = require("./models/campground");
var Comment    =  require("./models/comment")
var data=[
    {
        name: "camp1",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg/1200px-Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "camp2",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg/1200px-Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "camp3",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg/1200px-Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Removed campgrounds");
            Comment.deleteMany({}, function(err){
                if(err){
                    console.log(err);
                } else{
                    console.log("Removed Comments");
                    data.forEach(function(seed){
                        Campground.create(seed, function(err, addedCamp){
                            if(err){
                                console.log(err);
                            } else{
                                console.log("Camp added!!");
                                Comment.create({
                                    author: "Cindy Harrinson",
                                    text: "This is just a seed comment to see if the things are working as expected"
                                }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    } else{
                                        addedCamp.comments.push(comment);
                                        addedCamp.save();
                                        console.log("Added the comment to the campground");
                                    }
                                });
                            }
                        });
                    });
                }
            })
            
        }
    });
    
}

module.exports = seedDB;
