
const Mailgun = require('mailgun-js');


const domain = 'sandbox0504bded5c874ed2a85e162c895fe656.mailgun.org';
const api_key = process.env.MAILGUN_APIKEY;

const mailgun = new Mailgun({
    apiKey : api_key , domain 
})

const sendWelcomeMail =  (name, email) => {
    const data = {
        from: 'das.anupam70@gmail.com',
        to: email,
        subject: 'Welcome for joining to us',
        text: `Hi ${name} Happy to see you here, let us know about your experience.`,
    }
    mailgun.messages().send(data, (err, body) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(body)
    })
}


const sendGoodByeMail = (name, email) => {
    const data = {
        from : 'das.anupam70@gmail.com',
        to : email,
        subject : 'See you later!',
        text : `Sorry ${name}, You have to delete your account`
    }

    mailgun.messages().send(data, (err,body) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(body);
    })
}

module.exports = {
    sendWelcomeMail,
    sendGoodByeMail
}