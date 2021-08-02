const models = require('../models');

module.exports.getAllUsers = async (req, res) => {
    const users = await models.User.findAll({ attributes: { exclude: ['password'] } }) // on ne veut pas retourner le mot de passe

    res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID unknown')

    try {
        const user = await models.User.findByPk(req.params.id, { attributes: {exclude: ['password'] } })

        res.send(user)
    } catch (err) {
        console.log(err)
    }
}

module.exports.updateUser = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID unknown')

    try {
        const user = await models.User.findByPk(req.params.id)
        await user.update({ bio: req.body.bio })

        res.send(user)
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!req.params.id)
        return res.status(400).send('ID unknown')
    
    try {
        // la suppression en cascade de Sequelize ne fonctionne pas
        const posts = await models.Post.findAll({ where: { posterId: req.params.id }, attributes: ['id'] })
        const postsIds = posts.map(p => p.id)
    
        await Promise.all([
            models.Like.destroy({ where: { postId: postsIds } }),
            models.Like.destroy({ where: { likerId: req.params.id } }),
            models.Comment.destroy({ where: { postId: postsIds } }),
            models.Comment.destroy({ where: { commenterId: req.params.id } })
        ])
    
        await models.Post.destroy({ where: { posterId: req.params.id } })
        await models.User.destroy({ where: { id: req.params.id } })
    
        res.status(200).json({ message: "Successfully deleted."});
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}
