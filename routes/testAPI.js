const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

router.use(bodyParser.json());

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

const Image = mongoose.model("Image", imagesSchema);

router.post("/", async (req, res) => {
    try {
        const newImg = await Image.create(req.body);
        console.log(`---from api: Saved to DB`);
        res.status(201).json({
            status: "success",
            data: {
                img: newImg,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
});

module.exports = router;