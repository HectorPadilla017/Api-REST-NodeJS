const { Router } = require('express')
const router = Router()
const _ = require('underscore')
const cors = require("cors")
const nodemailer = require("nodemailer")

// middleware
router.use(cors())

router.post("/", cors(), async (req, res) => {
    let { name, email, message } = req.body
    if (name && email && message) {
        contentHTML = `
            <h1>Pagina Oficial</h1>
            <ul>
                <li>Usuario: ${name}</li>
                <li>Email: ${email}</li>
            </ul>
            <h2>Mensaje</h2>
            <p>${message}</p>
        `;
    
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    
        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Mensaje de ${name}`,
            html: contentHTML,
        })
        res.send('Enviado')
    } else {
        res.status(500).json({error: 'Error al guardar'})
    }
})

module.exports = router