

const db = require("../config/index");
const UserSchema = db.users;
const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
    res.render('user-form', {
        title: 'Form Validation by ejs',
        nav: '<h1>THIS IS A FORM FOR USER</h1>'
    });
}
exports.getUsers = async (req, res) => {

    const insRs = await UserSchema.findAll();


    if (insRs) {
        return res.status(200).json({ status: true, data: insRs });
    } else {
        return res.status(200).json({ status: false, message: "Failed to create users.", data: insRs });
    }
}

exports.saveUser = async (req, res) => {
    try {
        const insObj = {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
        }
        bcrypt.genSalt(10, function (err, Salt) {

            // The bcrypt is used for encrypting password.
            bcrypt.hash(insObj.password, Salt, async function (err, hash) {

                if (err) {
                    return console.log('Cannot encrypt');
                }

                console.log(hash)

                const insRs = await UserSchema.create({
                    name: req.body.name,
                    contact: req.body.contact,
                    email: req.body.email,
                    password: hash,
                })

        if (insRs) {
            return res.status(200).json({ status: true, message: "User created successfully", data: insRs });
        } else {
            return res.status(200).json({ status: false, message: "Failed to create users.", data: insRs });
        }
    });
});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}


exports.DeleteUser = async (req, res) => {

    try {

        const insRes = await UserSchema.findAll({
            where: {
                id: req.body.id
            },
            // logging: console.log
        });
        // console.log(insRes, "insRes");
        if (insRes) {
            await UserSchema.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json({ status: true, message: "User has been deleted successfully" });
        } else {
            res.status(200).json({ status: false, message: error.message || "Invalid user id" });
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}


exports.EditUser = async (req, res) => {
    // console.log(req.body, "body");
    try {
        const insRs = await UserSchema.update({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password
        },
        {
            where: {
                id: req.body.id
            },
            logging: console.log
        });

        // console.log(insRs, "insRs");
        if (insRs) {
            return res.status(200).json({ status: true, message: "User edited successfully", data: insRs });
        } else {
            return res.status(200).json({ status: false, message: "Failed to edit users.", data: insRs });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}


