const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ivan.sem2019@gmail.com',
        pass: 'a3fawWdr56gb'
    }
});

module.exports = transporter;
