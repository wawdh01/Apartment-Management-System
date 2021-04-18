const mongoose = require('mongoose');

const flatSchema = mongoose.Schema({
    email:{type: String, required: true},
    flat: {type:String, required: true}
});

const Flats = mongoose.model("flats", flatSchema);

module.exports = Flats;