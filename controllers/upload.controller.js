const models = require('../models');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" && 
            req.file.detectedMimeType !== "image/png" && 
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error('invalid file');

        if (req.file.size > 500000) throw Error('max size');
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../public/uploads/profil/${fileName}`
        )
    );

    try {
        const user = models.User.findByPk(req.body.userId)
        const updatedUser = user.update({ picture: `uploads/profil/${fileName}` })

        return res.send(updatedUser);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
