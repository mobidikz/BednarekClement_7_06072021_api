const mongoose = require('mongoose');
const { isEmail } = require('validator');
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true //supprime les espaces
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail], //vérification de l'email par validator plutôt qu'une simple regex
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024, //comme le mot de passe sera crypté on prévoit un très long mdp au cas où
        minlength: 6
    },
    picture: {
        type: String,
        default: "./uploads/profil/random-user.png"
    },
    bio: {
        type: String,
        max: 1024,
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    },
  },
  {
      timestamps: true,
  }
);

// lecture de la fonction avant enregistrement dans : 'block',
userSchema.pre("save",)


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;