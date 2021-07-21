const mongoose = require('mongoose')

let DiagnosisSchema = new mongoose.Schema({
  patient_reg_no: {
    type: String,
    required: true,
  },
  doctor_user_id: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  doctor_remarks: {
    type: String,
  },
  date_of_diagnosis: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('diagnosis', DiagnosisSchema)