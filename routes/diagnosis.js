const router = require('express').Router()
const DiagnosisController = require('../controllers/diagnosis')

router.get('/', DiagnosisController.getDiagnosisPage)

router.get('/new', DiagnosisController.createDiagnosisPage)

router.post('/new', DiagnosisController.createDiagnosis)

router.get('/remove/:diagnosis_id', DiagnosisController.removeReport)

module.exports = router
