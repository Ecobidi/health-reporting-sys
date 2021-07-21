const PatientService = require('../services/patient')
const Appointments

class PatientController {

  static async loginPage(req, res) {
    res.render('patient/login')
  }

  static async handleLogin(req, res) {
    let patient = await PatientService.findByRegNo(req.body.patient_reg_no)
    if (patient && patient.password == req.body.password) {
      req.session.patient = patient
      return res.redirect('/patient/home')
    }
    req.flash('error_msg', 'Bad Login Credentials')
    res.redirect('/patient/login')
  }

  static async resetPasswordPage(req, res) {
    let patient = await PatientService.findById(req.params.patient_id)
    if (!patient) {
      req.flash('error_msg', 'Bad Parameters Passed')
      return res.redirect('/patient/home')
    }
    res.render('/patient/reset-password', { patient })
  }

  static async handleResetPassword(req, res) {
    try {
      if (req.body.password !== req.body.retype_password) {
        req.flash('error', 'Passwords Do Not Match')
        return res.redirect('/patient/reset-password/' + req.body.patient_id)
      }
      await PatientService.updatePassword(req.body.patient_id, req.body.password)
      res.redirect('/patient/home')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error resetting password')
      res.redirect('/patient/reset-password/' + req.body.patient_id)
    }
  }

  

  static async home(req, res) {

  }


}