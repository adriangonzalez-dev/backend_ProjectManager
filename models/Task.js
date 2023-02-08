const { Schema, model } = require('mongoose');

const taskSchema = Schema({
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
  state: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  priority: {
    type: String,
    enum: ['Baja', 'Media', 'Alta'],
    default: 'Baja',
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
}, {
  timestamps: true,
});

// eslint-disable-next-line func-names
taskSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

module.exports = model('Project', taskSchema);
