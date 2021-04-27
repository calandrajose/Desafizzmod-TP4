const nodemailer = require('nodemailer')
const fs = require('fs')
const {ADMIN_PASSWORD} = require('../../env')

const setEmailBody = (products) => {
    if (!Array.isArray(products)) return console.log('erroror en formato de listado');
    let emailBody = ''
    products.forEach(product => {
        emailBody += `
        <hr/>
        <div >   
            <span>Nombre: </span>  ${product.name}
            <br>
            <span>Precio: </span> ${product.price}
            <br>
            <span>Descricion: </span> ${product.description}
            <br>
            <span>URL de Imagen: </span> ${product.url}
            <br>
        </div>
        `
    })
    return emailBody;
}

const sendEmail = async (products) => {

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'desafizzmod2021@gmail.com',
            pass: ADMIN_PASSWORD//'educacionIT2021!'
        }
    });

    let emailBody = setEmailBody(products)

    try {
        const emailTo = await fs.promises.readFile('correo.dat', 'utf-8');
        const mailOptions = {
            from: 'desafizzmod2021@gmail.com',
            to: emailTo,
            subject: 'Stock de productos',
            html: emailBody
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error en el mail: ' + error)
                return error
            }
            console.log(`Enviado con exito: `)
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendEmail,
}