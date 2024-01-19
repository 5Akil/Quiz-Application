require("dotenv").config();
const jwt = require('jsonwebtoken')
const adminModal = require('../modals/adminModal');
const quizModal = require('../modals/quizModal');
const questionModal = require('../modals/questionModal')
const mongoose = require("mongoose");
const userModal = require("../modals/userModal");
const resultModal = require("../modals/resultModal");

class adminController {
    static adminLogin = async (req, res) => {
        const { email, password } = req.body;

        try {
            if (email && password) {
                /*---------------  find admin is already exist or not------------*/
                const admin = await adminModal.findOne({ email: email })
                if (admin !== null) {

                    if (admin.email === email && admin.password === password) {

                        /*------ --------Generate JWT Token----------------*/
                        const token = jwt.sign({ adminID: admin._id }, process.env.SECRET_KEY)

                        res.send({ "status": "success", "message": "Login Success", "token": token })
                    } else {
                        res.send({ "status": "failed", "message": "Email or Password is invalid" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "Unaurthorized Admin" })
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required" })
            }
        } catch (error) {
            return res.send({ error: "oh no!!!" });
        }

    }

    static getAdminInfo = async (req, res) => {
        const info = req.user;
        try {
            // res.send(user)  
            res.send({ "status": "ok", "admin": info })

        } catch (error) {
            // return res.json({ error: error });
        }
    }
    static getAllUser = async (req, res) => {
        const user_list = await userModal.find();
        if (user_list) {
            res.send({ "status": "success", "message": "Successfully getting Users", "users": user_list })
        }
    }
    static getSingleUser = async (req, res) => {
        const id = req.params.id
        const user = await userModal.find({ _id: id })
        if (user) {
            res.send(user[0]);
        } else {
            res.send({ "status": "failed" })
        }

    }
    static deleteUser = async (req, res) => {
        const quiz = await userModal.deleteOne({ _id: req.params.id })
        if (quiz) {
            res.send({ "status": "success", "message": "User deleted Successfully" })
        }
    }
    static editUser = async (req, res) => {
        const id = req.params.id
        console.log(id);
        const data = await userModal.find({ _id: id })
        const item = req.body;
        if (item.email || item.firstName || item.lastName || item.designation) {

            if (data) {
                const user = await userModal.updateOne({ _id: id }, {
                    $set: req.body
                })
                if (user) {
                    res.send({ "status": "success", "message": "User's Detail updated", "data": user })
                }
            } else {
                res.send({ "status": "failed", "message": "Something Went Wrong" })
            }
        }
        else {
            res.send({ "status": "failed", "message": "Please Fill The Field You Want to Update" })
        }


    }

    static addQuiz = async (req, res) => {
        const { title, questions, totalTime } = req.body
        if (title && questions && totalTime) {

            console.log(totalTime);
            const quiz = new quizModal({
                title: title,
                questions: questions,
                totalTime: totalTime
            })

            await quiz.save()
            res.send({ "status": "success", "message": "Quiz Added Successfully" })
        } else {
            res.send({ "status": "failed", "message": "Something went wrong" })
        }

    }
    static getQuizList = async (req, res) => {

        const quiz_List = await quizModal.find().populate({
            path: "questions",
            select: {
                "answer": 0
            }
        })
        if (quiz_List) {
            res.send({ "status": "success", "quizList": quiz_List })
        } else {
            res.send({ "status": "failed", "quizList": "there is no any Quiz" })
        }


    }
    static getQuiz = async (req, res) => {
        const id = req.params.id
        const quiz = await quizModal.findOne({ _id: id }).populate({
            path: "questions",
            select: {
                "answer": 0
            }
        })

        if (quiz) {
            res.send({ "status": "success", quiz })
        } else {
            res.send({ 'status': "failed" })
        }
    }

    static editQuiz = async (req, res) => {
        const id = req.params.id
        const data = await userModal.find({ _id: id })
        const item = req.body;

        if (item.title || item.totalMarks || item.totalQuestions || item.totalTime) {

            if (data) {
                const quiz = await quizModal.updateOne({ _id: id }, {
                    $set: req.body
                })
                if (quiz) {
                    res.send({ "status": "success", "message": " Detail updated", "data": quiz })
                }
            } else {
                res.send({ "status": "failed", "message": "Something Went Wrong" })
            }
        }
        else {
            res.send({ "status": "failed", "message": "Please Fill The Field that You Want to Update" })
        }
    }
    static deleteQuiz = async (req, res) => {

        const quiz = await quizModal.deleteOne({ _id: req.params.id })
        const result = await resultModal.deleteMany({ quizID: req.params.id })
        const questions = await questionModal.deleteMany({ catagory_id: req.params.id })
        if (quiz) {
            res.send({ "status": "success", "message": "Quiz deleted Successfully" })
        }

    }
    static getTotalQuestions = async (req, res) => {

        const response = await questionModal.find({}, { answer: 0 });
        if (response) {
            res.send({ "status": "success", "message": "Successfully getting Users", "totalQuestions": response })
        }
    }
    static getQuestions = async (req, res) => {
        const id = req.params.id
        if (id === "all") {
            const questions = await questionModal.find({}, { answer: 0 });
            res.send({ "status": "success", questions });
        } else {
            const questions = await questionModal.find({ catagory_id: id }, { answer: 0 })
            if (questions) {
                res.send({ "status": "success", questions });
            } else {
                res.send({ "status": "failed" })
            }
        }

    }
    static getSingleQuestion = async (req, res) => {
        const id = req.params.id
        const question = await questionModal.find({ _id: id }, { answer: 0 })
        if (question) {
            res.send(question[0]);
        } else {
            res.send({ "status": "failed" })
        }
    }
    static addQuestion = async (req, res) => {

        const { id, question, options, correct, marks } = req.body

        const data = new questionModal({
            catagory_id: id,
            question: question,
            options: options,
            answer: correct,
            marks: marks,
        })
        const result = await data.save();

        //push reference id to quiz modal
        const quiz = await quizModal.findOneAndUpdate({ _id: id }, { $push: { questions: result._id } })

        if (result) {
            res.send({ "status": "success", "message": "Question Added Successfully" });
        }

    }
    static deleteQuestion = async (req, res) => {

        const id = req.params.id;                    //selected question id
        const quizID = req.body.id;                   // quiz id that question belongs too
        const remove = await questionModal.deleteOne({ _id: id })

        if (remove) {
            const h = await quizModal.findOneAndUpdate({ _id: quizID }, { $pull: { questions: id } })
            res.send({ "status": "success", "message": "Question deleted Successfully" })
        } else {
            res.send({ "status": "failed", "message": "There might be some error" })
        }

    }

    static openQuestion = async (req, res) => {

        const id = req.params.id

        const data = await questionModal.find({ catagory_id: id }, { answer: 0 })

        if (data) {
            res.send(data)
        } else {
            res.send({ "status": "failed", "message": "There is no any Questions in this Quiz" })
        }
    }
    static editQuestion = async (req, res) => {
        const id = req.params.id

        const data = await questionModal.findOneAndUpdate({ _id: id }, { $set: req.body })


        if (data) {
            res.send({ "status": "success", "message": "Question Updated Successfully" })
        }

    }
    static getResult = async (req, res) => {

        const { attemptId } = req.params

        const result = await resultModal.findOne({ _id: attemptId }).populate("userID").populate({
            path: 'quizID',
            populate: {
                path: 'questions',
                select: {
                    "answer": 0
                }
            }
        })
        if (result) {
            res.send({ "mesage": "success", result: result })
        } else {
            res.send({ "mesage": "failed" })
        }
    }
    static getResultRecord = async (req, res) => {
        const { userID } = req.params
        const includedFields = { marks: 1, timeStamps: 1, timeTaken: 1, quizID: 1, percentage: 1, totalTime: 1 };
        const record = await resultModal.find({ userID: userID }, includedFields).populate("quizID")
        if (record) {
            res.send({ "message": "successful", record })
        } else {
            res.send({ "mesage": "failed" })
        }
    }
    static getUserResult = async (req, res) => {
        const { userID, quizID } = req.params
        const includedFields = { marks: 1, timeStamps: 1, timeTaken: 1, quizID: 1, percentage: 1, totalTime: 1 };
        const record = await resultModal.find({ userID: userID, quizID: quizID }, includedFields).populate("quizID")
        if (record) {
            res.send({ "message": "successful", record })
        } else {
            res.send({ "mesage": "failed" })
        }
    }


}

module.exports = adminController