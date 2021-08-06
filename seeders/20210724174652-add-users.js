'use strict';

const faker = require('faker')
const fs = require('fs');
require("dotenv").config();
const models = require('../models')

const testFolder = './public/uploads/profil/';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pictures = fs.readdirSync(testFolder)

    const user = await models.User.findOne({ where: { email: 'demo@gmail.com' }})

    if (!user) {
      await models.User.create({
        id: 1,
        email: 'demo@gmail.com',
        password: 'demodemo',
        picture: "uploads/profil/" + pictures[Math.floor(Math.random() * pictures.length)],
        pseudo: 'demodemo'
      })
    }

    // utilisateurs aléatoires
    for (let i = 0; i < 10; i++) {
      await models.User.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: "uploads/profil/" + pictures[Math.floor(Math.random() * pictures.length)],
        pseudo: faker.internet.userName()
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
