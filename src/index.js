const express = require("express")
const app = express()
const morgan = require('morgan')
require("dotenv").config()
const bodyParser = require("body-parser")

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// settings
app.set('port', process.env.PORT || 4000)
app.set('json spaces', 2)

//routes
app.use('/api/banner',require('./routes/Banner'))
app.use('/api/send-mail',require('./routes/Email'))


app.listen(
    app.get('port'), 
    () => {
        console.log(`Server is listening on port ${app.get('port')}`)
    }
)