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

const AirplaneTicketSchema = new mongoose.Schema({
    fromTime: String,
    toTime: String,
    price: Number,
    from: String,
    to: String,
    date: String,
    tickets: {
        type: Number,
        default: 5
    },
    isThings: Boolean,
    isReturn: Boolean,
    airport: String,
    ratio: {
        type: String,
        default: '0.0'
    }
}, { collection : 'myairplanetickets' });
const AirplaneTicketModel = mongoose.model('AirplaneTicketModel', AirplaneTicketSchema);

const RailwayTicketSchema = new mongoose.Schema({
    fromTime: String,
    toTime: String,
    prices: String,
    from: String,
    to: String,
    date: String,
    compartmentTickets: {
        type: Number,
        default: 5
    },
    reservedSeatTickets: {
        type: Number,
        default: 5
    },
    author: String,
    comments: {
        type: Number,
        default: 0
    },
    ratio: {
        type: String,
        default: '0.0'
    }
}, { collection : 'myrailwaytickets' });
const RailwayTicketModel = mongoose.model('RailwayTicketModel', RailwayTicketSchema);

const BussTicketSchema = new mongoose.Schema({
    fromTime: String,
    toTime: String,
    price: Number,
    from: String,
    to: String,
    date: String,
    days: {
        type: String,
        default: 'неизвестно'
    },
    driver: {
        type: String,
        default: 'неизвестно'
    },
    ratio: {
        type: String,
        default: '0.0'
    }
}, { collection : 'mybussesickets' });
const BussTicketModel = mongoose.model('BussTicketModel', BussTicketSchema);

const TrainTicketSchema = new mongoose.Schema({
    fromTime: String,
    toTime: String,
    from: String,
    to: String,
    date: String,
}, { collection : 'mytrainstickets' });
const TrainTicketModel = mongoose.model('TrainTicketModel', TrainTicketSchema);

const url = `mongodb+srv://glebClusterUser:glebClusterUserPassword@cluster0.fvfru.mongodb.net/travelers?retryWrites=true&w=majority`;
mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.get("/api/offers/get", (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    if(req.query.offerstype.includes('airplanes')) {
        let query = AirplaneTicketModel.find({  })
        query.exec((err, airplanes) => {
            if(err){
                return res.json({ "status": "Error" })
            }
            return res.json({ "status": "OK", "offers": airplanes })
        })
    } else if(req.query.offerstype.includes('railways')) {
        let query = RailwayTicketModel.find({  })
        query.exec((err, railways) => {
            if(err){
                return res.json({ "status": "Error" })
            }
            return res.json({ "status": "OK", "offers": railways })
        })
    } else if(req.query.offerstype.includes('busses')) {
        let query = BussTicketModel.find({  })
        query.exec((err, busses) => {
            if(err){
                return res.json({ "status": "Error" })
            }
            return res.json({ "status": "OK", "offers": busses })
        })
    } else if(req.query.offerstype.includes('trains')) {
        let query = TrainTicketModel.find({  })
        query.exec((err, trains) => {
            if(err){
                return res.json({ "status": "Error" })
            }
            return res.json({ "status": "OK", "offers": trains })
        })
    }

})

app.get('/api/tickets/airplanes/create', async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    const newAirplaneOffer = new AirplaneTicketModel({ fromTime: req.query.newairplaneofferfromtime, toTime: req.query.newairplaneoffertotime, price: Number(req.query.newairplaneofferprice), from: req.query.newairplaneofferfrom, to: req.query.newairplaneofferto, date: req.query.newairplaneofferdate, airport: req.query.newairplaneofferairport, isReturn: req.query.newairplaneofferisreturn, isThings: req.query.newairplaneofferisthings })
    newAirplaneOffer.save(function (err) {
        if(err){
            return res.json({ "status": "Error" })
        } else {
            return res.json({ status: "OK" })
        }
    })
})

app.get('/api/tickets/pay', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    
    if(req.query.offerstype.includes('airplanes')) {
        let query = AirplaneTicketModel.findOne({ _id: req.query.offerid })
        query.exec((err, airplane) => {
            if(err){
                return res.json({ "status": "Error" })
            }
            if(airplane.tickets >= 1) {
                AirplaneTicketModel.updateOne({ _id: req.query.offerid }, 
                    {
                        "$inc": { "tickets": -1 }        
                    }, (err, offer) => {
                    if(err){
                        return res.json({ "status": "Error" })        
                    }
                    return res.json({ "status": "OK" })
                })
            } else {
                return res.json({ "status": "Error" })
            }
        })
    
    }
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