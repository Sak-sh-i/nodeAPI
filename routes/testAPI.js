const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// var b64toBlob = require('b64-to-blob');

router.use(bodyParser.json());

// Database
const imagesSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,   // base64 encoded
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

const Image = mongoose.model("Image", imagesSchema);

router.post("/", async (req, res) => {
    try {
        await Image.create({ img: { data: req.body } })
        console.log(`---from api: Saved to DB`);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;