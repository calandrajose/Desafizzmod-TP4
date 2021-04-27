const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchemma = new Schema({
    name: String,
    price: Number,
    description: String,
    url: String
})

const product = mongoose.model('products', productSchemma)

module.exports = {
    product
}