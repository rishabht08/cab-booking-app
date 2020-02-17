const express = require("express");
const router = express.Router();

//importing controllers to use it with express routers

const ride = require('./models/Ride.js');
const user = require('./models/User.js')

const controllers = require('./controllers/index.js');




router.get("/", function(request, response) {
    response.render("home", {
      title: "Flash Rides - Flash speed commuting service.",
      layout: "guest.hbs"
    });
  });
  
  
  router.get("/dashboard", function(request, response) {
    response.render("dashboard", {
      title: "User Dashboard",
      page_name: "dashboard",
      layout: "user.hbs"
    });
  });
  router.get("/dashboard/rides", function(request, response) {
   
    response.render("rides", {
      title: "User Rides",
      layout: "user.hbs",
      page_name: "rides",
     
    });
  });
  router.get("/dashboard/billing", function(request, response) {
    
    response.render("billing", {
      title: "User Billing",
      layout: "user.hbs",
      page_name: "billing"
    });
  });
  router.get("/dashboard/profile", function(request, response) {
    response.render("profile", {
      title: "User Support",
      layout: "user.hbs",
      page_name: "profile"
    });
  });
  router.get("/dashboard/support", function(request, response) {
    response.render("support", {
      title: "User Support",
      layout: "user.hbs",
      page_name: "support"
    });
  });

router.post('/signup', controllers.UserController.register);

router.post('/login', controllers.UserController.login);

router.post("/logout", controllers.UserController.logout);




/**<=========post-route-to-create-ride-respect-user-start=================>*/
// Route for creating a new Ride and updating user "rides" field with it
router.post("/user/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  ride.create(req.body)
      .then(function (dbRide) {
          // If a Ride was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the user to be associated with the new Ride
          // { new: true } tells the query that we want it to return the updated user -- it returns the original by default
          // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
          return user.findOneAndUpdate({ _id: req.params.id }, { $push: { rides: dbRide._id } }, { new: true });
      })
      .then(function (dbUser) {
          // If we were able to successfully update a user, send it back to the client
          res.json(dbUser);
      })
      .catch(function (err) {
          // If an error occurred, send it to the client
          res.json(err);
      });
});

/**<=========post-route-to-create-ride-respect-user-end=================>*/


/**<================get-route-to-get-user-with-ride-details-start========================>*/

// Route for retrieving a Product by id and populating it's Review.
router.get("/user/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  user.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate('rides')
    .then(function(dbUser) {
      // If we were able to successfully find an user with the given id, send it back to the client
      res.json(dbUser)
      })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});



/**<================Get-Route-To-Get-User-With-Ride-Details-End========================>*/



module.exports = router;
