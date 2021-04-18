const mongoose = require('mongoose');

const maintenanceSchema = mongoose.Schema({
    flat_num: {type:String, required: true},
    date: {type: String, required: true},
    month: {type: String, required: true},
    status: {type: Boolean, required: true}
});

const Maintenance = mongoose.model("maintenance", maintenanceSchema);

module.exports = Maintenance;