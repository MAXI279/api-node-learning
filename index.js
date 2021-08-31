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
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));

/* Publico API */
// eslint-disable-next-line no-undef
app.listen(process.env.PORT,()=>{
    console.log('Servidor online')
});
