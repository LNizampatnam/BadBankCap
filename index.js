var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password/:role', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User name already exists');
                res.send('User name already exists. Choose a different user name');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password,req.params.role).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});

// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// add transactions to user account
app.get('/account/findOneAndUpdate/:email/:id/:type/:amount/:date', function (req, res) {
    var id = Number(req.params.id);
    var type = String(req.params.type);
    var amount = Number(req.params.amount);
    var date = String(req.params.date);
    var trx = {ID: id, Type: type, Amount: amount, Date: date};
    // check if account exists
    dal.findOneAndUpdate(req.params.email, trx).
        then((response) => {
            console.log(response);
            res.send(response);
    }); 
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);