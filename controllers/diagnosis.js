const DiagnosisService = require('../services/diagnosis')
const DiagnosisModel = require('../models/diagnosis')
// const PatientService = require('../services/patient')
// const DoctorService = require('../services/doctor')

class DiagnosisController {

  // static async getADiagnosis(req, res) {
  //   try {
  //     let report = await DiagnosisService.findById(req.query.report_id)
  //     res.render('diagnosis', { report})
  //   } catch (err) {
  //     console.log(err)
  //     res.redirect('/diagnosis')
  //   }
  // }

  static async getDiagnosisPage(req, res) {
    let id_type = req.query.id_type
    try {
      let diagnosis
      switch (id_type) {
        case 'patient': {
          diagnosis = await DiagnosisService.findByPatientRegNo(req.query.search)
          break
        }
        case 'doctor': {
          diagnosis = await DiagnosisService.findByDoctor(req.query.search)
          break
        }
        default: {
          diagnosis = await DiagnosisService.findAll()
          break
        }
      }
      res.render('diagnosis', { diagnosis })
    } catch (err) {
      console.log(err)
      res.redirect('/diagnosis')
    }
  }

  static async createDiagnosisPage(req, res) {
    res.render('diagnosis-new', { errors: req.flash('errors'), error_msg: req.flash('error_msg') || '', dao: new DiagnosisModel() } )
  }

  static async createDiagnosis(req, res) {
    try {
      let dao = req.body
      // let patient = await PatientService.findByRegNo(dao.patient_reg_no)
      // let doctor = await DoctorService.findByUsername(dao.doctor_username)
      // if (!patient || !doctor) {
      //   let error_msg
      //   if (!patient) error_msg = 'No Patient With This Registration Number'
      //   if (!doctor) error_msg = 'No Doctor With This Doctor ID Found!'
      //   return res.render('diagnosis-new', {dao, error_msg})
      // }
      await DiagnosisService.create(dao)
      res.redirect('/diagnosis')
    } catch (err) {
      console.log(err)
      res.redirect('/diagnosis/new')
    }
  }

  static async removeReport(req, res) {
    try {
      await DiagnosisService.removeOne(req.params.diagnosis_id)
      res.redirect('/diagnosis')
    } catch (err) {
      console.log(err)
      res.redirect('/diagnosis')
    }
  }

}

module.exports = DiagnosisController