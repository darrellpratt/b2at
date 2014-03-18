exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    // db.collection('employees', function(err, collection) {
    //     collection.findOne({'id': id}, function(err, item) {
    //         console.log(item);
    //         res.jsonp(item);
    //     });
    // });
    

};
