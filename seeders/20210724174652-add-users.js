'use strict';

const faker = require('faker')

const models = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await models.User.findOne({ where: { email: 'demo@gmail.com' }})

    if (!user) {
      await models.User.create({
        id: 1,
        email: 'demo@gmail.com',
        password: 'demodemo',
        picture: faker.image.avatar(),
        pseudo: 'demodemo'
      })
    }

    // utilisateurs aléatoires
    for (let i = 0; i < 10; i++) {
      await models.User.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: Math.random() > 0.5 ? faker.image.avatar() : null,
        pseudo: faker.internet.userName()
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
