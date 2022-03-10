const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Image', imageSchema);