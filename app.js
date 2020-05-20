const express = require('express')
const app = express()
const router= require('./routes')
const nunjucks= require('nunjucks')
const morgan=require('morgan')
const {sequelize} = require('./models')


var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(express.static('./public'));

app.use(express.json())
app.use(express.urlencoded())

app.use(morgan('combined'))

app.use(router)





sequelize.sync({force: false})
.then(()=>{
    console.log('Conectado a la base de datos')
    app.listen(3000, console.log('Conectado al Servidor'))
}).catch((err)=> console.log(err))