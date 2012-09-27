var util = require('util');
/*
 * GET Gallery Page
 */
var data = {
    title: "Gallery"
};

exports.index = function(req, res){
  res.render("gallery", data);
};
