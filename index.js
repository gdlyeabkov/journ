const express = require('express')
const path = require('path')
const app = express()
const serveStatic = require('serve-static')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")

// pass: 'myreversepassword'
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gdlyeabkov@gmail.com',
        pass: 'reversepassword'
    }
})

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

const TravelerSchema = new mongoose.Schema({
    name: String,
    section: {
        type: String,
        default: "news"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection : 'mytravelers' });
const TravelerModel = mongoose.model('TravelerModel', TravelerSchema);

const url = `mongodb+srv://glebClusterUser:glebClusterUserPassword@cluster0.fvfru.mongodb.net/travelers?retryWrites=true&w=majority`;
mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.get("/client/info", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    let query = ClientModel.findOne({ _id: req.query.clientid })
    query.exec((err, clientinfo) => {
        if(err){
            return res.json({ "status": "Error" })
        }
        return res.json({ "status": "OK", "clientinfo": clientinfo })
    })

})

app.get("**", (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    return res.json({ "status": "OK" })
})
    


// const port = process.env.PORT || 8080
const port = 4000 

app.listen(port)