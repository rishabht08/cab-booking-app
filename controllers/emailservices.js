const sendMailModel = require('../models/EmailServices.js');
const sendMailController = {};


// contact us email service

sendMailController.contactUsEmail = function (req, res) {

    sendMailModel.contactusMail(req.body.from, req.body.subject, req.body.text, function (error, data) {
        if (error) {

            res.json({ message: "Error" });
        }
        else {
            res.json({ message: "Success" });
        }

    });
};


// subscribe email service
sendMailController.subscribeEmail = function (req, res) {

    sendMailModel.subscribeMail(req.body.email, function (error, data) {
        if (error) {

            res.json({ message: "Error" });
        }
        else {
            res.json({ message: "Success" });
        }

    });
};

//support email service

sendMailController.supportEmail = function (req, res) {

    sendMailModel.supportMail(req.body.subject,req.body.text1,req.body.text2, function (error, data) {
        if (error) {

            res.json({ message: "Error" });
        }
        else {
            res.json({ message: "Success" });
        }

    });
}

module.exports = sendMailController;
