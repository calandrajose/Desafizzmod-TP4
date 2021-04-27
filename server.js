const handlebars = require('express-handlebars')
const express = require('express')
const mongoose = require('mongoose')
const { checkForMailing, setDefaultEmail } = require('./util/util')
const model = require('./model/products')
const { validateProducts } = require('./validations/products')
const { validateEmail } = require('./validations/email')
const { MONGO_PASSWORD } = require('./env')
const fs = require('fs')

//import express from 'express'

/* ------------ INSTANCIA DE SERVIDOR --------------- */
const app = express()
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('hbs', handlebars({ extname: '.hbs', defaultLayout: 'index.hbs' }))
app.set('views', './views')
app.set('view engine', 'hbs')

/* Middleware custom */
app.use((req, res, next) => {
    next()
})

/* ---------------------------------------------------- */
/*              Definición de rutas GET                 */
/* ---------------------------------------------------- */

app.get('/listar', async (req, res) => {
    let query = {}
    const products = await model.product.find(query, (error, products) => {
        if (error) throw new Error(`Error en lectura de producto: ${error}`)
    }).lean()
    res.render('table', { products })
})


app.get('/set-correo', (req, res) => {
    res.sendFile(process.cwd() + '/public/set-correo.html');
});


/* ---------------------------------------------------- */
/*              Definición de rutas POST                */
/* ---------------------------------------------------- */
app.post('/ingreso', async (req, res) => {
    let product = req.body

    const isValid = validateProducts(product)
    try {
        if (isValid) {
            const newProduct = new model.product(product)
            newProduct.save(error => {
                if (error) throw new Error(`Error en escritura de producto: ${error}`)
            })
            await checkForMailing();
            res.redirect('/');
        } else {
            res.send(isValid.error)
        }

    } catch (error) {
        console.log(error);
    }
}
)


app.post('/set-correo', async (req, res) => {
    let email = req.body.email
    console.log(req.body);

    const isValid = validateEmail(email)
    if (isValid) {
        try {
            await fs.promises.writeFile('correo.dat', email);
            res.redirect('/');
        }
        catch (error) {
            console.log(`error: ${error}`);
            res.send(error);
        }
    } else {
        res.send(isValid.error)
    }
})


const PORT = process.env.PORT || 8080
/* -----CONEXION A MONGODB-------- */
// mongoose.connect('mongodb+srv://calandrajosei:MONGO_PASSWORD@firstmongo.vlbx5.mongodb.net/TP4?retryWrites=true&w=majority', {
mongoose.connect('mongodb://localhost/tp4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) throw new Error(`Error de conexion en la base de datos: ${error}`)
    console.log('Base de datos conectada!');
})

/* ----------- app.listen : pone en marcha el listen del servidor ------------------ */
const server = app.listen(PORT, async () => {
    await setDefaultEmail()
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))
