let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TodoSchema = new Schema({
    name: String,
    priority: String,
    isFinished: Boolean
})

module.exports = mongoose.model('Task', TodoSchema);