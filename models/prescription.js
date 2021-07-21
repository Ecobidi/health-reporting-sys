const mongoose = require('mongoose')

let PrescriptionSchema = new mongoose.Schema({
  patient_reg_no: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'diagnosis',
  },
  doctor_user_id: {
    type: String,
    required: true,
  },
  drug_prescription: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('prescription', PrescriptionSchema)