const DiagnosisModel = require('../models/diagnosis')

class DiagnosisService {

  static async findByPatientId(patient_id) {
    return DiagnosisModel.find({patient_id})
  }

  static async findByDoctorId(doctor_id) {
    return DiagnosisModel.find({doctor_id})
  }
  
  static async findAll() {
    return DiagnosisModel.find()
  }

  static async findById(id) {
    return DiagnosisModel.findById(id)
  }

  static async create(report) {
    return DiagnosisModel.create(report)
  }

  static async removeOne(id) {
    return DiagnosisModel.findByIdAndRemove(id)
  }

}

module.exports = DiagnosisService