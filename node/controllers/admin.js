


const db = require("../config/index");
const AdminSchema = db.admin;
const TestSchema = db.test;
const QuestionSchema = db.question;
const TestresultSchema = db.Test_result;
const ResultSchema = db.result;


const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.createAdmin = (req, res) => {
    console.log("12346516");
    res.render('admin-form', {
        title: 'Admin login form',
        nav: '<h1>THIS IS A FORM FOR ADMIN</h1>'
    });
}
exports.getAdmin = async (req, res) => {
    const insRs = await AdminSchema.findAll();
    // console.log(insRs, 'insRs')
    // console.log(req.user, "req.user");
    if (insRs) {
        return res.status(200).json({ status: true, data: insRs });
    } else {
        return res.status(200).json({ status: false, message: "Failed to create users.", data: insRs });
    }
}

exports.saveAdmin = (req, res) => {
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

                // console.log(hash)


                const insRs = await AdminSchema.create({
                    name: req.body.name,
                    contact: req.body.contact,
                    email: req.body.email,
                    password: hash,
                });


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
exports.adminLogin = async (req, res) => {
    try {
        // console.log(req.body, 'req')

        const insRes = await AdminSchema.findOne({
            where: {
                email: req.body.email
            },
            raw: true
        });
        // console.log(insRes)
        if (insRes) {
            await bcrypt.compare(req.body.password, insRes.password,
                function (err, isMatch) {
                    if (isMatch) {

                        const token = jwt.sign(insRes, "testabc123");
                        const login = {
                            ...insRes,
                            token
                        }
                        return res.status(200).json({ status: true, message: "User login successfully", data: login });
                    }
                    else if (!isMatch) {
                        return res.status(200).json({ status: false, message: "Invalid password." });
                    }

                });

        }
        else {
            return res.status(200).json({ status: false, message: "User Not found." });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}


exports.DeleteUser = async (req, res) => {

    try {

        const insRes = await AdminSchema.findAll({
            where: {
                id: req.body.id
            },
            // logging: console.log
        });
        // console.log(insRes, "insRes");
        if (insRes) {
            await AdminSchema.destroy({
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
        const insRs = await AdminSchema.update({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password
        },
            {
                where: {
                    id: req.body.id
                },
                // logging: console.log
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
exports.createtest = async (req, res) => {
    try {
        const insObj = {
            testName: req.body.testName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        }

        const insRs = await TestSchema.create(insObj);


        if (insRs) {
            return res.status(200).json({ status: true, message: "Test created successfully", data: insRs });

        } else {
            return res.status(200).json({ status: false, message: "Failed to create Test.", data: insRs });
        }

    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}
exports.testlist = async (req, res) => {
    const insRs = await TestSchema.findAll();
    // console.log(insRs, 'insRs')
    // console.log(req.user, "req.user");
    if (insRs) {
        return res.status(200).json({ status: true, data: insRs });
    } else {
        return res.status(200).json({ status: false, message: "Failed to create users.", data: insRs });
    }
}

exports.addQuestion = async (req, res) => {
    try {
        
        const insObj = {
            question: req.body.question,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            answer: req.body.answer,
            testId: req.body.id
        }

        const insRs = await QuestionSchema.create(insObj);


        if (insRs) {
            return res.status(200).json({ status: true, message: "Test created successfully", data: insRs });

        } else {
            return res.status(200).json({ status: false, message: "Failed to create Test.", data: insRs });
        }

    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}


exports.DeleteTest = async (req, res) => {

    try {

        const insRes = await TestSchema.findAll({
            where: {
                id: req.body.id
            },
        });
        const insRs = await QuestionSchema.findAll({
            where: {
                testId: req.body.id
            },
        });
        if (insRes && insRs ) {
            await TestSchema.destroy({
                where: {
                    id: req.body.id
                }
            });
            await QuestionSchema.destroy({
                where: {
                    testId: req.body.id
                }
            });
            res.status(200).json({ status: true, message: "Test has been deleted successfully" });
        } else {
            res.status(200).json({ status: false, message: error.message || "Invalid Test id" });
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}

exports.listQuestion = async (req, res) => {
    // console.log(req.body.id,'id')
    const insRs = await QuestionSchema.findAll({
        where:{
            testId:req.body.id
        }
    });
    // console.log(insRs, 'insRs')
    // console.log(req.user, "req.user");
    if (insRs) {
        return res.status(200).json({ status: true, data: insRs });
    } else {
        return res.status(200).json({ status: false, message: "Failed to create users.", data: insRs });
    }
}
exports.EditQuestion = async (req, res) => {
    console.log(req.body, "body");
    try {
        let obj={}
        obj.question= req.body.question,
        obj.option1= req.body.option1,
        obj.option2= req.body.option2,
        obj.option3= req.body.option3,
        obj.option4= req.body.option4,
        obj.answer = req.body.answer
        const insRs = await QuestionSchema.update(obj,
            {
                where: {
                    id: req.body.id
                },
                // logging: console.log
            });

        // console.log(insRs, "insRs");
        if (insRs) {
            return res.status(200).json({ status: true, message: "User edited successfully", data: obj });
        } else {
            return res.status(200).json({ status: false, message: "Failed to edit users.", data: insRs });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}

exports.EditTest = async (req, res) => {
    console.log(req.body, "body");
    try {
        let obj={}
        obj.testName= req.body.testName,
        obj.startDate= req.body.startDate,
        obj.endDate= req.body.endDate;

        const insRs = await TestSchema.update(obj,
            {
                where: {
                    id: req.body.id
                },
                // logging: console.log
            });

        // console.log(insRs, "insRs");
        if (insRs) {
            return res.status(200).json({ status: true, message: "User edited successfully", data: obj });
        } else {
            return res.status(200).json({ status: false, message: "Failed to edit users.", data: insRs });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}

exports.testresult = async (req, res) => {
    try {

        console.log(req.body,"res");
        const insRs = await TestresultSchema.bulkCreate(req.body,{
            returning: true
        });


        if (insRs) {
            return res.status(200).json({ status: true, message: "Test created successfully", data: insRs });

        } else {
            return res.status(200).json({ status: false, message: "Failed to create Test.", data: insRs });
        }

    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}

exports.result = async (req, res) => {
    try {

        console.log("result");
        // const insRs = await TestresultSchema.bulkCreate(req.body,{
        //     returning: true
        // });


        // if (insRs) {
        //     return res.status(200).json({ status: true, message: "Test created successfully", data: insRs });

        // } else {
        //     return res.status(200).json({ status: false, message: "Failed to create Test.", data: insRs });
        // }

    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Something went wrong" });
    }
}