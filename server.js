const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios')

app.use(express.static(__dirname + '/dist/dito-desafio/'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api', function(req, res) {
    
    axios.get('https://storage.googleapis.com/dito-questions/events.json')
    .then((response) => {
        console.log('response: ', response.data);
        res.status(200).send(response.data)
    }).catch((err)=>{
        console.log('err: ', err);
        res.status(500).send(err)
    })

})


app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/dito-desafio/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);