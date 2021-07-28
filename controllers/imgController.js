const Image = require('../models/imgModel');
const fs = require("fs");

const tempCard = fs.readFileSync(`${__dirname}/../public/temp-card.html`, "utf-8");
const tempIndex = fs.readFileSync(`${__dirname}/../public/temp-index.html`, "utf-8");

const replaceTemplate = (template, value) => {
    let output = template;
    output = output.replace(/{%IMG_URL%}/g, value);
    return output;
};

const getImages = async (req, res) => {
    try {
        const images = await Image.find();
        const imagesJSON = images.map(img => img.toJSON());
        const imgSrc = imagesJSON.map(img => img["img"]["data"])

        // Preparing template
        const cardsHtml = imgSrc.map((src) => replaceTemplate(tempCard, src)).join("");
        let output = "";
        if (cardsHtml) {
            output = tempIndex.replace("{%IMG_CARDS%}", cardsHtml);
        } else {
            output = tempIndex.replace("{%IMG_CARDS%}", "Server Error");
        }

        res.end(output);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = getImages;