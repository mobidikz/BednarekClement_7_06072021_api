const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const models = require('../models')

module.exports.readPost = async (req, res) => {
    const posts = await models.Post.findAll(
        { include: {
            model: models.Comment,
            as: 'comments',
            attributes: {
                exclude: ['postId', 'PostId', 'commenterId']
            },
            include: {
                model: models.User,
                as: 'commenter',
                attributes: ['id', 'pseudo']
            }
        }
    })

    res.status(200).send(posts)
}

module.exports.createPost = async (req, res) => {

    let fileName;

    if (req.file !== null) {
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
    
        const fileName = req.body.posterId + Date.now() +  ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );
    }

    const newPost = new models.Post({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
 };

module.exports.updatePost = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID unknown')

    try {
        const post = await models.Post.findByPk(req.params.id)
        const updatedPost = await post.update({ message: req.body.message })

        res.send(updatedPost)
    } catch (err) {
        console.log('Update error : ' + err);
    } 
}

module.exports.deletePost = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID unknown')

    try {
        await models.Post.destroy({ where: { id: req.params.id } })

        res.send()
    } catch (err) {
        console.log("Delete error : " + err)
    }  
};

// module.exports.likePost = async (req, res) => {
//     if (!ObjectID.isValid(req.params.id)) {
//         return res.status(400).send('ID unknown : ' + req.params.id);
//     }

//     try {
//         await PostModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $addToSet: { likers: req.body.id }
//             },
//             { new: true},
//             (err, docs) => {
//                 if (err) return res.status(400).send(err)
//             }
//         );
//         await UserModel.findByIdAndUpdate(
//             req.body.id,
//             {
//                 $addToSet: { likes: req.params.id}
//             },
//             { new: true },
//             (err, docs) => {
//                 if (!err) res.send(docs);
//                 else return res.status(400).send(err);
//             }
//         )
//     } catch (err) {
//         return res.status(400).send(err);
//     }
// };

// module.exports.unlikePost = async (req, res) => {
//     if (!ObjectID.isValid(req.params.id)) {
//         return res.status(400).send('ID unknown : ' + req.params.id);
//     }

//     try {
//         await PostModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $pull: { likers: req.body.id }
//             },
//             { new: true},
//             (err, docs) => {
//                 if (err) return res.status(400).send(err)
//             }
//         );
//         await UserModel.findByIdAndUpdate(
//             req.body.id,
//             {
//                 $pull: { likes: req.params.id}
//             },
//             { new: true },
//             (err, docs) => {
//                 if (!err) res.send(docs);
//                 else return res.status(400).send(err);
//             }
//         )
//     } catch (err) {
//         return res.status(400).send(err);
//     }
// }

module.exports.commentPost = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID unknown')

    try {
        const post = await models.Post.findByPk(req.params.id)
        console.log(post)
        const comment = await post.createComment({
            commenterId: req.body.commenterId,
            text: req.body.text
        })

        res.send(comment)
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.editCommentPost = async (req, res) => {
    if (!req.params.postId || !req.params.id)
        return res.status(400).send('ID unknown')

    try {
        const comment = await models.Comment.findOne({ where: { postId: req.params.postId, id: req.params.id }})
        const updatedComment = await comment.update({ text: req.body.text })

        res.status(200).send(updatedComment)
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.deleteCommentPost = async (req, res) => {
    if (!req.params.postId || !req.params.id)
        return res.status(400).send('ID unknown')

    try {
        await models.Comment.destroy({ where: { postId: req.params.postId, id: req.params.id }})

        res.send()
    } catch (err) {
        res.status(400).send(err);
    }
};