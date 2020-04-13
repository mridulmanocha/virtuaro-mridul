var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name : {
      type : String
    },
    lastname : {
      type : String
    },
    email: {
      type: String,
      unique: true
    },
    password : {
      type: String,
    },
    role : {
      type : String
    }
  }  
);

UserSchema.pre("save", function(next) {
  var user = this;
  console.log("save triggered");
  if (!user.isModified("password")) return next();

  
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    
  bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
UserSchema.post("save", () => {});

module.exports = mongoose.model("User", UserSchema);
