var easyimg = require('easyimage');
var Log = require('log')
  , fs = require('fs')
  , stream = fs.createWriteStream(__dirname + '/stdout.log', { flags: 'a' })
  , log = new Log('debug', stream);

easyimg.resize({src:'test.jpg', dst:'test-small.jpg', width:640, height:480}, function(err, stdout, stderr) {
    if (err) 
		log.debug(err.message);
    log.debug('Resized to 640x480');
});