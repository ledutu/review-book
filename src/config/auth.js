var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var { User } = require('../models/user/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true,
}, function (request, email, password, done) {
    User.authenticate(email, password, result => {
        return done(null, result);
    }, err => {
        return done(err, false)
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;