'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, { as: 'post' })
      this.belongsTo(models.User, { as: 'commenter' })
    }
  };

  Comment.init(
    {
      commenterId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      text: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments'
    }
  );

  return Comment;
};