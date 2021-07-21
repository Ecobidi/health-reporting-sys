const router = require('express').Router()
const PrescriptionController = require('../controllers/prescription')

router.get('/', PrescriptionController.getPrescriptionsPage)

router.get('/new', PrescriptionController.createPrescriptionPage)

router.post('/new', PrescriptionController.createPrescription)

router.get('/remove/:prescription_id', PrescriptionController.removePrescription)

module.exports = router
