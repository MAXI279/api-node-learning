require('dotenv').config();

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')
/* APP Express */
const app = express()

/* Parseo body */
app.use( express.json() )

/* CORS */
app.use(cors());
/* Conexion BD */
dbConnection();

/* Funcionalidad */

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

/* Publico API */
// eslint-disable-next-line no-undef
app.listen(process.env.PORT,()=>{
    console.log('Servidor online')
});
