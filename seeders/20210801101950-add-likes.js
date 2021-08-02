'use strict';

const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [users, posts] = await Promise.all([
      models.User.findAll(),
      models.Post.findAll()
    ])

    // utilisateurs aléatoires
    for (let i = 0; i < 30; i++) {
      await models.Like.create({
        postId: posts[Math.floor(Math.random() * posts.length)].id,
        likerId: users[Math.floor(Math.random() * users.length)].id
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('likes', null, {});
  }
};
