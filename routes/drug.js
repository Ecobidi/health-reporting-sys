const router = require('express').Router()
const DrugController = require('../controllers/drug')

router.get('/', DrugController.getDrugsPage)

router.get('/new', DrugController.createDrugPage)

router.post('/new', DrugController.createDrug)

router.get('/remove/:drug_id', DrugController.removeDrug)

module.exports = router
