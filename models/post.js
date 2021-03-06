module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Post.associate = function(models) {
    Post.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  Post.associate = function(models) {
    Post.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });

    Post.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };
  return Post;
};
