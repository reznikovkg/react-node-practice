const transporter = require('../service/mailer');

const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function(templatePath, params) {
    fs.readFile(__dirname + templatePath, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            console.log(err);
        }
        else {
            var template = handlebars.compile(html);
            var htmlToSend = template(params);

            var mailOptions = {
                from: 'my@email.com',
                to : params.email,
                subject : 'test subject',
                html : htmlToSend
            };

            transporter.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
};


module.exports = readHTMLFile;
