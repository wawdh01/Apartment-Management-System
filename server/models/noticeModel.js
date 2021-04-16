const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
});

const Notice = mongoose.model("notice", noticeSchema);

module.exports = Notice;