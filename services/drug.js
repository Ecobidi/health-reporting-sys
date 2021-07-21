const DrugModel = require('../models/drug')

class DrugService {
  
  static async findAll() {
    return DrugModel.find()
  }

  static async findByName(name) {
    let nameRegex = new RegExp(name, 'ig')
    return DrugModel.find({ $or: [{drug_name: nameRegex}, {generic_name: nameRegex}] })
  }

  static async findById(id) {
    return DrugModel.findById(id)
  }

  static async create(drug) {
    return DrugModel.create(drug)
  }

  static async removeOne(id) {
    return DrugModel.findByIdAndRemove(id)
  }

}

module.exports = DrugService