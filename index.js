const express = require('express');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

const port = 5000;

const db = require('./database/database');


const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'some66819@gmail.com',
    from: 'samridhharsh@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js'
};
sgMail.send(msg)
    .catch(reason => console.log(reason));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//use cors to allow cross origin resource sharing
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//posting host info
app.post('/host/formSubmit', (req, res) => {
    // console.log(req.body.name);
    const details = {
        hostname: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno
    };

    db.connection.query(`insert into host set ?`, details, (err, details, fields) => {
        if (err) throw err;
        console.log(details);
    })
});

//posting customer checkin details
app.post('/customer/checkinform', (req,res) => {
    console.log(req.body);
    const details = {
        customername: req.body.name,
        email: req.body.email,
        phone: req.body.phoneno,
        checkintime: req.body.checkintime,
        hostId: req.body.hostId
    };

    db.connection.query(`insert into customer set ?`, details, (err, details, fields) => {
        if (err) throw err;
        console.log(details.name);

        db.connection.query(`select * from customer`, details, (err, details, fields) => {
            if (err) throw err;
            console.log(details[0]);

            const text = `"name" : ${details[0].customername} "phone" : ${details[0].phone} "checkintime": ${details[0].checkintime}` +
                ` "host" : ${details[0].hostId}`;
            console.log(text);
            // console.log(process.env.SENDGRID_API_KEY);
            const msg = {
                to: 'some66819@gmail.com',
                from: 'samridhharsh@gmail.com',
                subject: 'Sending with Twilio SendGrid is Fun',
                text: text
            };
            sgMail.send(msg)
                .catch(reason => console.log(reason));
        })


    })
});


//posting customer cheout details
app.post('/customer/checkoutform', (req,res) => {
   // console.log(req.body);

    const phone = req.body.phoneno;
    db.connection.query(`select * from customer where phone = ?`, phone, (err, customerdetails, fields) => {
        if (err) throw err;
        // console.log(customerdetails[0]);
        if (customerdetails[0]) {
            if (customerdetails[0].checkouttime == null) {
                res.send(customerdetails);
            }else {
                res.send({display: 'none'});
            }
        } else {
            // console.log("no customer found!");
            res.send("no customer found!");
        }
    });
});

//submitting final form
app.post('/customer/submitcheckoutform', (req, res) => {
    const customername = req.body.name;
    const checkouttime = req.body.checkouttime;
    db.connection.query(`update customer set checkouttime = ? where customername = ? `, [checkouttime, customername], (err, details, fields) => {
        if (err) throw err;
        console.log(details);

        db.connection.query(`select * from customer`, details, (err, details, fields) => {
            if (err) throw err;
            console.log(details[0]);

            const text = `"name" : ${details[0].customername} "phone" : ${details[0].phone} "checkintime": ${details[0].checkintime}` +
                ` "checkouttime : ${details[0].checkouttime}" "host" : ${details[0].hostId}`;
            console.log(text);
            // console.log(process.env.SENDGRID_API_KEY);
            const msg = {
                to: 'some66819@gmail.com',
                from: 'samridhharsh@gmail.com',
                subject: 'Sending with Twilio SendGrid is Fun',
                text: text
            };
            sgMail.send(msg)
                .catch(reason => console.log(reason));
        })
    })
});


app.listen(port, (req, res) => {
    console.log(`listening to  port ${port}`);
});
