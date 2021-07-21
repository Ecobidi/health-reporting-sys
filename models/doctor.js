const mongoose = require('mongoose')

let DoctorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  other_names: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  role: {
    type: String,
    default: 'doctor',
  }
})

module.exports = mongoose.model('doctor', DoctorSchema)