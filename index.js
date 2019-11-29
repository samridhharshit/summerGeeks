const express = require('express');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

const port = 5000;

// fetching database connection
const db = require('./database/database');

//Message sending library
const Nexmo = require('nexmo');

//Mail sending plugin
const sgMail = require('@sendgrid/mail');

//API key...to be generated by the user
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



// parse application/json
app.use(bodyParser.json());

// parse application/
app.use(bodyParser.urlencoded({ extended: true }));

//to allow cross origin resource sharing
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//Saving data of host in database
app.post('/host/formSubmit', (req, res) => {

    //Fetching data of host from the UI
    const details = {
        hostname: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno
    };

    //Saving the details in the database
    db.connection.query(`insert into host set ?`, details, (err, details, fields) => {
        if (err) throw err;
        console.log(details);
    })
});

//saving data of customer after check-in and sending an auto generated message and mail to the host
app.post('/customer/checkinform', (req,res) => {

    //Fetching data from the UI
    const details = {
        customername: req.body.name,
        email: req.body.email,
        phone: req.body.phoneno,
        checkintime: req.body.checkintime,
        hostId: req.body.hostId
    };
    
    //Saving the fetched data into the database
    db.connection.query(`insert into customer set ?`, details, (err, details, fields) => {
        if (err) throw err;
    })
    
     //Format of message to be sent
     const text = `"name" : ${details[0].customername} "phone" : ${details[0].phone} "checkintime": ${details[0].checkintime}` +
                  `"host" : ${details[0].hostId}`;
            
     //Email sending structure
     const msg = {
           to: `${details.email}`,
           from: 'samridhharsh@gmail.com',
           subject: 'Sending with Twilio SendGrid is Fun',
           text: text
     };
     sgMail.send(msg)
           .catch(reason => console.log(reason));
            
     //Message sending structure
     const nexmo = new Nexmo({
         apiKey: 'c129fca1',
         apiSecret: 'NSx2UZUMkdYDOLVV',
     });
                
     const from = 'Nexmo';
     const to = '+91'+deatils.phoneno;
     const text = 'Visitor Details are \nName:- '+na+"\nEmail:- "+em+"\nPhone:- "+ph;

     nexmo.message.sendSms(from, to, text);
     res.json({submit:"true"});
            
});


//posting customer cheout details
app.post('/customer/checkoutform', (req,res) => {

    //fetching data from the UI and checking in the database wheather the customer has checkedin or not
    const phone = req.body.phoneno;
    db.connection.query(`select * from customer where phone = ?`, phone, (err, customerdetails, fields) => {
        if (err) throw err;
        
        //check if customer exists
        if (customerdetails[0]) {
            //if exists then check if he/she has already checked out
            if (customerdetails[0].checkouttime == null) {
                //if not send the customer details to the UI for customer side visual verification
                res.send(customerdetails);
            }else {
                //if customer has already checkout then the button to submit the checkout form will no tbe activated, hence disabling the person from checking out
                res.send({display: 'none'});
            }
        } else {
            //if the customer has not checked in then no checkout option will be shown
            res.send("no customer found!");
        }
    });
});

//submitting final form for checkedin customer
app.post('/customer/submitcheckoutform', (req, res) => {
    
    //fetch name and time of checkout from the user
    const customernumber = req.body.phoneno;
    const checkouttime = req.body.checkouttime;
    
    //updating the customer details with his/her checkoutime idetifying the customer by their phone number
    db.connection.query(`update customer set checkouttime = ? where phone = ? `, [checkouttime, customernumber], (err,              details, fields) => {
            if (err) throw err;
    })
    
    //format of text that has to be send to mail and sms
    const text = `"name" : ${details[0].customername} "phone" : ${details[0].phone}                                        "checkintime":${details[0].checkintime}` +
                ` "checkouttime : ${details[0].checkouttime}" "host" : ${details[0].hostId}`;

    //Email Sending
    const msg = {
        to: `${details.email}`,
        from: 'samridhharsh@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js'
    };
    sgMail.send(msg)
        .catch(reason => console.log(reason));
    
    //Message sending
    const nexmo = new Nexmo({
        apiKey: 'c129fca1',
        apiSecret: 'NSx2UZUMkdYDOLVV',
    });
              
    const from = 'Nexmo';
    const to = '+91'+deatils.phoneno;
    const text = 'Your visit informationare: \nName:- '+${details.customerinfo}+"\nEmail:- "+${details.email}+"\nPhone:-              "+${details.phoneno}
                  "\nCheckin time:- "+${details.checkintime} + "\nCheckout Time:- "+${details.checkouttime};

    nexmo.message.sendSms(from, to, text);
    res.json({submit:"true"});    
});

// port listening at 5000
app.listen(port, (req, res) => {
    console.log(`listening to  port ${port}`);
});
