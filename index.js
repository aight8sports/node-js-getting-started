const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000

const mailApi = require('./services/mail');


express()
  // parse application/x-www-form-urlencoded
  .use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use('/mail', mailApi)
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
