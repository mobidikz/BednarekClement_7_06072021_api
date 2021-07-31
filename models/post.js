'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, { as: 'comments' })

      this.belongsTo(models.User, { as: 'poster' })
    }
  };

  Post.init(
    {
      posterId: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      picture: DataTypes.STRING,
      video: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts'
    }
  );

  return Post;
}
