const PrescriptionService = require('../services/prescription')
const DiagnosisService = require('../services/diagnosis')

class PrescriptionController {
  static async getAPrescriptionPage(req, res) {
    let prescriptions = PrescriptionService.findById(req.params.prescription_id)
    res.render('prescriptions', {prescriptions})
  }

  static async getPrescriptionsPage(req, res) {
    let prescriptions = await PrescriptionService.findAll()
    res.render('prescriptions', {prescriptions})
  }

  // static async getSearchedPrescriptionPage(req, res) {
  //   let searchQuery = req.query.search
  //   try {
  //     let prescription = await PrescriptionService.findByName(searchQuery)
  //     res.render('prescription', {prescription})
  //   } catch (error) {
  //     console.log(error)
  //     res.redirect('prescription')
  //   }
  // }

  static async createPrescriptionPage(req, res) {
    if (!req.query.diagnosis_id) {
      return res.redirect('/diagnosis')
    } else {
      let diagnosis = await DiagnosisService.findById(req.query.diagnosis_id)
      if (!diagnosis) {
        return res.redirect('/diagnosis')
      }
      res.render('prescriptions-new', {diagnosis, 'error_msg': req.flash('error_msg')})
    }
  }

  static async createPrescription(req, res) {
    let dao = req.body
    try {
      await PrescriptionService.create(dao)
      res.redirect('/prescriptions')
    } catch (error) {
      console.log(error)
      res.redirect('/prescriptions')     
    }
  }

  static async removePrescription(req, res) {
    let prescription_id = req.params.prescription_id
    try {
      await PrescriptionService.removeOne(prescription_id)
      res.redirect('/prescriptions')
    } catch (error) {
      console.log(error)
      res.redirect('/prescriptions')
    }
  }
}

module.exports = PrescriptionController