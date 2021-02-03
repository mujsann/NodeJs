const express = require('express')
const app = express()


app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));


const routes = require('./routes')
app.use('/', routes)


const port  = 3500
app.listen(port, ()=>{console.log(`server is running on ${port}`)})

module.exports = app
