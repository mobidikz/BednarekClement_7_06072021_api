'use strict';

const faker = require('faker')

const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await models.User.findAll()

    // utilisateurs aléatoires
    for (let i = 0; i < 10; i++) {
      await models.Post.create({
        posterId: users[Math.floor(Math.random() * users.length)].id,
        message: faker.lorem.sentence(),
        picture: null,
        video: null
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
