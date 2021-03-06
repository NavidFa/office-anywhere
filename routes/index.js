var express = require('express');
var router = express.Router();
var passport = require('../passport');
var flash = require('connect-flash');
var users = require("../users")
var queries = require("../db/queries")
var knex = require('../db/knex.js')


/* GET home page. */
router.get('/', getHomePage); //Retrieves '/'
router.get('/register', getHomePage) // Will redirect new users to main page after creating account.

function getHomePage(req, res, next) {
    res.render('index', {
        title: 'Office Anywhere',
        brand: 'Office Anywhere',
        verified: req.isAuthenticated(),
        user: req.user
    })
}
router.get('/login', function(req, res, next) {
    res.render('login', {
      title: 'Office Anywhere',
      brand: 'Office Anywhere',
      flash: req.flash(),
      verified: req.isAuthenticated(),
      user: req.user
    })
});
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect(req.get('referer'));
})
router.get('/signup', function(req, res, next) {
    res.render('register', {
      title: 'Office Anywhere',
      brand: 'Office Anywhere',
      verified: req.isAuthenticated(),
      user: req.user
    })
});
router.post('/register', function(req, res, next) {
    users.Register(req.body.username, req.body.password, req.body.password1)
        .then(function(message) {
            if (message.rowCount == 1) {
                res.render('login')
            } else {
                res.render('register', {
                    message: message,
                    verified: req.isAuthenticated(),
                    user: req.user
                })
            }
        })
});
router.post('/login', passport.authenticate('local', {
    successRedirect: 'back',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
}));
router.get('/modify/:id', function(req, res, next) {
    queries.comment(req.params.id)
        .then(function(comment) {
            res.render('modify', {
              title: 'Office Anywhere',
              brand: 'Office Anywhere',
              comment: comment[0],
              verified: req.isAuthenticated(),
              user: req.user
            })
        })
})


router.post('/isUpdated/:id/:locid', function(req, res, next) {
    var Id = req.params.locid
    queries.updateComments(req.params.id, req.body.title, req.body.body)
        .then(function() {
            res.redirect('/locations/' + Id)
        })
})

router.post('/isDeleted/:id/:locid', function(req, res, next) {
    var Id = req.params.locid
    queries.deleteComments(req.params.id)
        .then(function() {
            res.redirect('/locations/' + Id)

        })
})

module.exports = router;
