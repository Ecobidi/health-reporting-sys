const PrescriptionModel = require('../models/prescription')

class PrescriptionService {

  static async findByPatientId(patient_id) {
    return PrescriptionModel.find({patient_id}).populate('diagnosis', 'diagnosis')
  }

  static async findByDoctorId(doctor_id) {
    return PrescriptionModel.find({doctor_id}).populate('diagnosis', 'diagnosis')
  }

  static async findByDrugId(drug_id) {
    return PrescriptionModel.find({drug_id}).populate('diagnosis', 'diagnosis')
  }
  
  static async findAll() {
    return PrescriptionModel.find().populate('diagnosis', 'diagnosis')
  }

  static async findById(id) {
    return PrescriptionModel.findById(id).populate('diagnosis', 'diagnosis')
  }

  static async create(dao) {
    return PrescriptionModel.create(dao)
  }

  static async removeOne(id) {
    return PrescriptionModel.findByIdAndRemove(id)
  }

}

module.exports = PrescriptionService