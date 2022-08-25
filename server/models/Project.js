// Project.js

const { ObjectID, Int32 } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema({
    creator_id: {
        type: ObjectID
    },
    img_link: {
        type: String
    },
    canvas_width: {
        type: Int32
    },
    canvas_height: {
        type: Int32
    },
    unit: {
        type: String
    },
    lastWorkedOn: {
        type: Date
    }
})

module.exports = mongoose.model('Project', Project);