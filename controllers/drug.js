const DrugService = require('../services/drug')

class DrugController {
  static async getADrugPage(req, res) {
    let drug = DrugService.findById(req.params.drug_id)
    res.render('drug', {drug})
  }

  static async getDrugsPage(req, res) {
    let drugs = await DrugService.findAll()
    res.render('drugs', {drugs})
  }

  static async getSearchedDrugsPage(req, res) {
    let searchQuery = req.query.search
    try {
      let drugs = await DrugService.findByName(searchQuery)
      res.render('drugs', {drugs})
    } catch (error) {
      console.log(error)
      res.redirect('drugs')
    }
  }

  static async createDrugPage(req, res) {
    res.render('drugs-new')
  }

  static async createDrug(req, res) {
    let dao = req.body
    try {
      await DrugService.create(dao)
      res.redirect('/drugs')
    } catch (error) {
      console.log(error)
      res.redirect('/drugs')     
    }
  }

  static async removeDrug(req, res) {
    let drug_id = req.params.drug_id
    try {
      await DrugService.removeOne(drug_id)
      res.redirect('/drugs')
    } catch (error) {
      console.log(error)
      res.redirect('/drugs')
    }
  }
}

module.exports = DrugController