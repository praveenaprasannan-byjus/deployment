const mongoose = require('mongoose');
const Employee = new mongoose.Schema({
    ename : String,
    tnlId : String,
    emailId  : String,
    department : String 
},{
    collection:"employees"
})

module.exports = mongoose.model('Employee',Employee);
