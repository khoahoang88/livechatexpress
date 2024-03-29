const express = require('express')
const path = require('path')
const port = 5000
const app = express()
const hogan = require('hogan-middleware')
const bodyParser = require('body-parser')
const request = require('request')
const handlers = require('./modules/handlers')
const messenger = require('./modules/messenger')
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', hogan.__express)
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log('000000')

//app.use(updateClient)

app.get('/', (req, res) => {
	console.log('2222: %i', handlers.startAgent('XXX', 'XXXX'))
	console.log('RES %j', res)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))