const mongoose = require('mongoose')

let DrugSchema = new mongoose.Schema({
  drug_name: {
    type: String, required: true,
  },
  generic_name: {
    type: String,
  },
  brand_name: {
    type: String,
  },
  manufacturer : {
    type: String,
  },
  manufacture_date: {
    type: Date,
  },
  expire_date: { 
    type: Date,
  },
  route_of_administration: {
    type: String,
  },
  dose_description: {
    type: String,
  },
  net_quantity: {
    type: String,
  },
  active_ingredients: {
    type: String,
  },
  package_type: {
    type: String
  },
  remarks: {
    type: String,
  }
})

module.exports = mongoose.model('drug', DrugSchema)