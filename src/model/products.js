const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    url: String
})

const product = mongoose.model('products', userSchema)

module.exports = {
    product
}