
// Generate an automated end point

var express = require('express');
var mongoose = require('mongoose');


function generateEndPoint(name_of_collection, schema) {

    var router = express.Router();
    var Model = mongoose.model(name_of_collection, schema);
    var baseurl = '/' + name_of_collection;
    var baseurl_with_id = baseurl + '/:id';

    router.get(baseurl, function (req, res) {

        Model.find(function (err, results) {
            if (err) res.status(500).json({err: err});
            else res.status(200).json({
                results: results
            });
        });

    });

    router.post(baseurl, function (req, res) {

        (new Model(req.body)).save(function (err, result) {
            if (err) res.status(500).json({err: err});
            else res.status(201).json({
                result: result
            });
        });

    });

    router.put(baseurl_with_id, function (req, res) {

        Model.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
            if (err) res.status(500).json({err: err});
            else res.status(200).json({
                result: result
            });
        });

    });

    router.delete(baseurl_with_id, function (req, res) {
        Model.findByIdAndRemove(req.params.id, function (err, result) {
            if (err) res.status(500).json({err: err});
            else res.status(200).json({
                result: result
            });
        });
    });

    return router;
}

module.exports = {
    generateEndPoint: generateEndPoint
};
