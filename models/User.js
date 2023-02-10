/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcryptjs');

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: 'https://www.w3schools.com/howto/img_avatar.png',
  },
  id_avatar: {
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await hash(this.password, 10);
});

userSchema.methods.checkedPassword = async function (password) {
  // eslint-disable-next-line no-return-await
  return await compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const { __v, password, ...data } = this.toObject();
  return data;
};

module.exports = model('User', userSchema);
