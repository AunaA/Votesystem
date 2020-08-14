const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
   live: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }   

});
 // Collection'u yarattık ve Schema ekledik.
 const Vote = mongoose.model('Vote', VoteSchema);

 module.exports = Vote;