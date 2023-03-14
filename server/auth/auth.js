const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./models/user");

passport.use(
     new GoogleStrategy(
       {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "http://localhost:3000/auth/google/callback",
       },
       async (accessToken, refreshToken, profile, done) => {
         try {
           // Check if the user is already in the database
           let user = await User.findOne({ googleId: profile.id });
           if (!user) {
             // If the user is not in the database, create a new user
             user = new User({
               googleId: profile.id,
               displayName: profile.displayName,
               email: profile.emails[0].value,
             });
             await user.save();
           }
           // Return the user
           return done(null, user);
         } catch (error) {
           console.error(error);
           return done(error);
         }
       }
     )
   );

   passport.serializeUser((user, done) => {
     done(null, user.id);
   });
   
   passport.deserializeUser(async (id, done) => {
     try {
       const user = await User.findById(id);
       done(null, user);
     } catch (error) {
       done(error);
     }
   });


   module.exports = {
     initialize: () => passport.initialize(),
     session: () => passport.session(),
     authenticateGoogle: () =>
       passport.authenticate("google", {
         scope: ["profile", "email"],
       }),
     authenticateGoogleCallback: () =>
       passport.authenticate("google", {
         failureRedirect: "/login",
         successRedirect: "/dashboard",
       }),
   };