const mongoose = require('mongoose');


const replySchema = mongoose.Schema({
    name: {type: String, required: true},
    replyText: {type: String, required: true}
}, {
    timestamps: true,
})

const discussionSchema = mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    reply: [replySchema]
}, {
    timestamps: true,
})


const Discussion = mongoose.model("discussion", discussionSchema);

module.exports = Discussion;