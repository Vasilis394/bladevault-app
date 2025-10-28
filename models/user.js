const mongoose = require('mongoose');

const knifeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    category: {
        type: String,
    enum: ["hunting-knife", "combat-knife", "kitchen-knife", "survival-knife", "throwing-knife", "automatic-knife"],
    required: true
    },
    description: String
});

const userSchema = mongoose.Schema({
    username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  blade: [knifeSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;