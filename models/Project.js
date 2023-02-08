const { Schema, model } = require('mongoose');

const projectSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  dateExpire: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
    default: 'project1',
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  timestamps: true,
});

// eslint-disable-next-line func-names
projectSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

module.exports = model('Project', projectSchema);
