var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var { User } = require('../models/user/user');

require('dotenv').config()
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
} = process.env;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true,
}, function (request, email, password, done) {
    User.authenticate(email, password.toString(), result => {
        return done(null, result);
    }, err => {
        return done(err, false)
    })
}));

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ google_id: profile.id }, async function (err, existUser) {
            user = existUser;
            if (!user) {

                let profileUser = {
                    full_name: profile._json.name,
                    image: profile._json.picture,
                }

                let user = new User({
                    google_id: profile.id,
                    email: profile._json.email,
                    profile: profileUser,
                    favorite_writer: [],
                    favorite_book: [],
                })

                await user.save();
            }
            return done(null, user);
        })
    }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ facebook_id: profile.id }, async function (err, existUser) {
            user = existUser;
            if (!user) {
                FB_URL = 'http://graph.facebook.com/';
                
                let profileUser = {
                    full_name: profile._json.name,
                    image: FB_URL+profile.id+'/picture?type=large&access_token='+accessToken,
                }

                let user = new User({
                    facebook_id: profile.id,
                    email: profile._json.email,
                    profile: profileUser,
                    favorite_writer: [],
                    favorite_book: [],
                });
                
                await user.save();
            }
            return done(null, user);
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;