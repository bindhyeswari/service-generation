var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* Work with Contacts */
var ContactsModel = mongoose.model('contact', {
  name: String,
  email: String,
  phone: String
});



router.get('/contacts', function (req, res) {

  ContactsModel.find(function (err, results) {
    if (err) res.status(500).json({err: err});
    else res.status(200).json({
      results: results
    });
  });

});


router.post('/contacts', function (req, res) {

  (new ContactsModel(req.body)).save(function (err, result) {
    if (err) res.status(500).json({err: err});
    else res.status(201).json({
      result: result
    });
  });

});

router.put('/contacts/:id', function (req, res) {

  ContactsModel.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    if (err) res.status(500).json({err: err});
    else res.status(200).json({
      result: result
    });
  });

});

router.delete('/contacts/:id', function (req, res) {
    ContactsModel.findByIdAndRemove(req.params.id, function (err, result) {
      if (err) res.status(500).json({err: err});
      else res.status(200).json({
        result: result
      });
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;




// Create a new contact
/*(new ContactsModel({
 name: 'Chandrashekar Srinivasulu',
 email: 'chandu@gmail.com',
 phone: '112356898'
 })).save(function (err, results) {
 if (err) console.log(err);
 else console.log(results);
 });*/
