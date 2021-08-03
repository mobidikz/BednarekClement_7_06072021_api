'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { as: 'posts', foreignKey: 'posterId' })
      this.hasMany(models.Comment, { as: 'comments', foreignKey: 'commenterId' })
    }
  };

  User.init(
    {
      picture: DataTypes.STRING,
      pseudo: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        isEmail: true
      },
      password: DataTypes.STRING,
      bio: DataTypes.TEXT
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  );

  return User;
};
