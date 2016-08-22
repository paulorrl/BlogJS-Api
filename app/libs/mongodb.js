var mongoose = require('mongoose');

var mongoUrl = process.env.MONGODB_URL || 'mongodb://prrl:prrl@ds053164.mlab.com:53164/blogjs';
mongoose.connect(mongoUrl);