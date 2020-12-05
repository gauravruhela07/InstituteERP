const router = require('express').Router();
let AdminCred = require('../models/admin_credentials.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var salt = 7;
var secret_key = 'secret_key_admin';

router.route('/add').post((req, res) => {
    const adminId = req.body.adminId;
    const adminPassword = req.body.adminPassword;

    AdminCred.find({ 'adminId': adminId })
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    message: "adminId already in database"
                })
            }
            else {
                bcrypt.hash(adminPassword, salt, (err, hash) => {
                    if (err) {
                        return res.json({
                            message: "error found"
                        })
                    }
                    else {
                        const admin_cred = new AdminCred({ 'adminId': adminId, 'adminPassword': hash });
                        admin_cred.save()
                            .then(result => {
                                res.json({
                                    message: "Admin Credentials Added"
                                })
                            })
                            .catch(err => res.json({
                                message: "error found"
                            }));
                    }
                });

            }
        })
        .catch(err => res.json({
            message: "error found"
        }))
})

router.route('/validate/').post((req, res) => {
    const adminId = req.body.adminId;
    const adminPassword = req.body.adminPassword;

    AdminCred.find({ 'adminId': adminId })
        .exec()
        .then(data => {
            // data is array of objects, its length is 1 if match is found
            // console.log(data);
            if (data.length == 0) {
                // console.log("data.length is zero");
                res.json({
                    message: "Auth Failed"
                });
            }

            bcrypt.compare(adminPassword, data[0].adminPassword, (err, result) => {
                if (result) {

                    // console.log("Successful match");
                    const token = jwt.sign({
                        adminId: data[0].adminId,
                        adminPassword: data[0].adminPassword
                    },
                        secret_key);
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token,
                        adminId: data[0].adminId,
                        adminPassword: data[0].adminPassword,
                    });
                }
                else if (err) {
                    // console.log("Password mismatch");
                    return res.status(401).json({
                        message: "Auth Failed"
                    })
                }
            })
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// router.route('/add').post((req, res) => {
//     const adminId = req.body.adminId;
//     const adminPassword = req.body.adminPassword;

//     const admin_cred = new AdminCred({ "adminId": adminId, "adminPassword": adminPassword });
//     console.log(admin_cred);

//     admin_cred.save()
//         .then(() => res.json('credentials added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;