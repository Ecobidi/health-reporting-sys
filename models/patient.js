const mongoose = require('mongoose')

let PatientSchema = new mongoose.Schema({
  reg_no: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: 'test'
  },
  other_names: {
    type: String,
    required: true,
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
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  known_allergies: {
    type: String,
  },
  blood_group: {
    type: String,
  },
  genotype: {
    type: String
  }
})

module.exports = mongoose.model('patient', PatientSchema)