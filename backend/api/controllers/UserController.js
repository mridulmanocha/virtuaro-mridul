var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcryptjs");


exports.register_user = (req, res, next) => {
  var user = JSON.parse(JSON.stringify(req.body));
  User.create(user, (err, user) => {
    if (err) res.send(err);
    else if (!user) res.status(500).send("Internal Server Error");
    else res.send(user.role);
  });
};

exports.login_user = (req, res, done) => {
    var body = JSON.parse(JSON.stringify(req.body));
    User.findOne(
        {
          "email": body.email
        },
        function(err, user) {
        
            bcrypt.compare(body.password, user.password, function(
              err,
              isMatch
            ) {
              if(err) { res.send(err)
              } else {
                if(isMatch == true) {
                  res.send(user.role)
                } else {
                  res.send('incorrect password')
                }
              }
            });
          
        }
      );
}; 
