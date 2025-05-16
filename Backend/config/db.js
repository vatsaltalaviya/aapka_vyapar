const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGOURL).then(()=>console.log("database connected"))