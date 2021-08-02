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
            req.file.detectedMimeType !== "image/gif" && 
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error('invalid file');

        if (req.file.size > 500000) throw Error('max size');
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }

    // Renommer le fichier
    let extension =  req.file.detectedMimeType.split('/').pop();
    fileName = req.body.name + Date.now() + "." + extension;

    console.log(fileName);
    

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../public/uploads/profil/${fileName}`
        )
    );

    try {
        console.log(fileName);
        const user = await models.User.findByPk(req.body.userId)
        user.changed('updatedAt', true)
        const updatedUser = await user.update({ picture: `uploads/profil/${fileName}` })

        return res.send(updatedUser);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
