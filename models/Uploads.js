const { Schema, model } = require('mongoose');

const uploadSchema = Schema({
  secure_url: {
    type: String,
    required: true,
    trim: true,
  },
  public_id: {
    type: String,
    required: true,
    trim: true,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
}, {
  timestamps: true,
});

// eslint-disable-next-line func-names
uploadSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model('Upload', uploadSchema);
