const mongoose = require('mongoose');
const WeekOff = new mongoose.Schema({
    emailId : String,
    date : Date,
    history : [{
        from: {
            type: String,
            default: ''
        },
        to: {
            type: String,
            default: ''
        }
    }]   
},{
    collection:"weekoff"
})

module.exports = mongoose.model('Weekoff',WeekOff);
 