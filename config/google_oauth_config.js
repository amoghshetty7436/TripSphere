var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User} = require('../models/user');
const passport = require("passport");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try{
      let user = await User.findOne({ email: profile.emails[0].value });

      if(!user){
        user = new User({
          name: profile.displayName,
          email:  profile.emails[0].value,
        });

        await user.save();
      }
      cb(null, user);
    }
    catch(err){
      cb(err,false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findOne({ _id: id });
  done(null, user);
});

module.exports = passport;