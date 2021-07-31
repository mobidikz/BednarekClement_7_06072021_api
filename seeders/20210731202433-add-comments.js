'use strict';

const faker = require('faker')

const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [users, posts] = await Promise.all([
      models.User.findAll(),
      models.Post.findAll()
    ])

    // utilisateurs aléatoires
    for (let i = 0; i < 30; i++) {
      await models.Comment.create({
        postId: posts[Math.floor(Math.random() * posts.length)].id,
        commenterId: users[Math.floor(Math.random() * users.length)].id,
        text: faker.lorem.lines()
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
