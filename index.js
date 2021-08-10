require('dotenv').config();

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

const app = express()

app.use(cors());

dbConnection();


app.get('/', (req, res) => {
    console.log('/')
    res.status(200).json({ status: 'success'})
})

app.listen(process.env.PORT,()=>{
    console.log('Servidor online')
});
