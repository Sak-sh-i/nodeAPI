const mongoose = require("mongoose");

// Database
const imagesSchema = new mongoose.Schema({
    img:
    {
        data: JSON,   // base64 encoded
        contentType: {
            type: String,
            default: "img/png",
        }
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Images = mongoose.model("Images", imagesSchema);

module.exports = Images;