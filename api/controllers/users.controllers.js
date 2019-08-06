var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

// localhost:3000/api/users/register
module.exports.register = function(req, res){
    console.log('register user');

    var username = req.body.username;
    // name is optional so
    // if req.body.name else null.
    var name = req.body.name || null;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        //password: password
        // encrypt password before storing
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user){
        if (err){
            console.log(err);
            res.status(400).json(err);
        }
        else{
            console.log('user created', user);
            res.status(201).json(user);
        }
    })
}

module.exports.login = function(req, res){
    console.log('register user');
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username
    }).exec(function(err, user){
        if (err){
            console.log(err);
            res.status(400).json(err);
        }
        else{
            // compare encryption of pass with encryp in database
            if (bcrypt.compareSync(password, user.password)){
                console.log('user found', user);
                var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
                //res.status(200).json(user);
                res.status(200).json({success: true, token: token});
            }
            else{
                res.status(401).json('unauthorized');
            }
        }
    });
}

// create a middleware function
// execute on a request next execute next function
module.exports.authenticate = function(req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
      var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
      jwt.verify(token, 's3cr3t', function(error, decoded) {
        if (error) {
          console.log(error);
          res.status(401).json('Unauthorized');
        } else {
          // reinject information to the request
          // here we add the username
          // then exec next function
          req.user = decoded.username;
          next();
        }
      });

    } else {
      res.status(403).json('No token provided');
    }
  };