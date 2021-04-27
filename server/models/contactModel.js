const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {type: String, required: true},
    role: {type: String, required: true},
    address: {type: String, required: true},
    contact: {type: String, required: true}
})

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;