const express = require('express');
// const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient
const app = express();
const path = require('path')

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/2022.html')
})



app.listen(4000, () => {
    console.log('listening on 4000')
})   