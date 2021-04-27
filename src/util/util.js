const model = require('../model/products')
const {sendEmail} = require('./email')
const fs = require('fs')

const checkForMailing = (res) => {
    model.product.find({}, async (error, products) => {
        if (error) {
            res.send(newProd);
        }
        // if (products.length % 10 == 0) {
        if (products.length % 2 == 0) {
            await sendEmail(products)
        }
    }).lean();
}

const setDefaultEmail = async () => {
    try {
        let file = fs.existsSync('./correo.dat')
        if (!file) {
            let email = 'calandrajosei@gmail.com'
            await fs.promises.writeFile('./correo.dat', email) 
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkForMailing,
    setDefaultEmail
}