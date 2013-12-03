/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    _ = require('underscore');


/**
 * Find profile by id
 */
exports.profile = function(req, res, next, id) {
    Profile.load(id, function(err, profile) {
        if (err) return next(err);
        if (!profile) return next(new Error('Failed to load profile' + id));
        req.profile = profile;
        next();
    });
};

/**
 * Create a profile
 */
exports.create = function(req, res) {
    var profile = new Profile(req.body);
    profile.user = req.user;

    profile.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                profile: profile
            });
        } else {
            res.jsonp(profile);
        }
    });
};

/**
 * Update a profile
 */
exports.update = function(req, res) {
    var profile = req.profile;

    profile = _.extend(profile, req.body);

    profile.save(function(err) {
        res.jsonp(profile);
    });
};

/**
 * Delete an profile
 */
exports.destroy = function(req, res) {
    var profile = req.profile;

    profile.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(profile);
        }
    });
};

/**
 * Show an profile
 */
exports.show = function(req, res) {
    res.jsonp(req.profile);
};

/**
 * List of profiles
 */
exports.all = function(req, res) {
    Profile.find().sort('-created').populate('user', 'name username').exec(function(err, profiles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(profiles);
        }
    });
};
