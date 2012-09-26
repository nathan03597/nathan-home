var util = require('util');
/*
 * GET home page.
 */
var data = {
    title: "Nathan Home",
    show_name: "Nathan Ma",
    contact_mail: "nathan.mading@gmail.com"
};

exports.index = function(req, res){
  res.render("index", data);
};
