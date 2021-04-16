const mongoose = require('mongoose');

const parcelSchema = mongoose.Schema({
    parcel_id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true}
});

const Parcel = mongoose.model("parcel", parcelSchema);

module.exports = Parcel;