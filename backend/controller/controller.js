
//import required packages
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userModal = require('../modals/userModal');
const resultModal = require("../modals/resultModal")
const forgotPasswordTokenModal = require('../modals/forgotPasswordToken')
const transporter = require('../config/emailconfig');
const quizModal = require("../modals/quizModal");
const tokenModal = require("../modals/tokenModal");
const { v4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');
const { default: axios } = require("axios");
const countryList = require("../modals/countryModal");
const stateList = require("../modals/stateModal");
const cityList = require("../modals/cityModal");




// controller class

class Controller {
    static getCountries = async (req, res) => {
        const result = await countryList.find({})
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send("There is no Data")
        }
    }
    static getStates = async (req, res) => {
        const { id } = req.params
        const country = await countryList.findOne({ id: id })
        if (country) {
            const result = await stateList.find({ country_id: Number(id) })
            if (result) {
                res.status(200).send({ result: result, phoneCode: country.phone_code })
            } else {
                res.status(404).send("There is no Data")
            }
        } else {
            res.status(404).send("There is no Data")
        }
    }
    static getCities = async (req, res) => {
        const { id } = req.params
        const state = await stateList.findOne({ id: id })
        if (state) {
            const result = await cityList.find({ state_id: Number(id) })
            if (result) {
                res.status(200).send(result)
            } else {
                res.status(404).send("There is no Data")
            }

        } else {
            res.status(404).send("There is no Data")
        }
    }
    static userSignup = async (req, res) => {
        const {email, password, firstName, lastName, DOB, designation,address ,state ,gender , country , city , phoneCode  } = req.body;
        const { filename } = req.file
        // find user is already exist or not
        const user = await userModal.findOne({ email: email })
        if (user) {
            res.send({ "status": "failed", "message": "Email already exists" })
        } else {
            // Add new user in database
            if (email && password && firstName && lastName && DOB && designation) {

                // hashing Password
                const hashPassword = await bcrypt.hash(password, 10);

                // new user model
                const data = new userModal({
                    email: email,
                    password: hashPassword,
                    firstName: firstName,
                    lastName: lastName,
                    DOB: DOB,
                    designation: designation,
                    image: filename,
                    authBy: "email",
                    state:state,
                    country: country,
                    city: city,
                    gender: gender,
                    address: address,
                    phoneCode: phoneCode
                })

                const result = await data.save();
                res.status(201).send({ "status": "success", "message": "Registration Success", result })
            } else {
                res.send({ "status": "failed", "message": "All fields are required" })
            }
        }
    }

    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        if (email && password) {
            // find user is already exist or not
            const user = await userModal.findOne({ email: email })

            if (user !== null) {
                const userInfo = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    designation: user.designation,
                    image: user.image
                }
                // compare password
                const isMatched = await bcrypt.compare(password, user.password)
                if (user.email === email && isMatched) {
                    // Generate JWT Token
                    const access_token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
                    //Generate JWT Refresh Token
                    const refresh_token = jwt.sign({ uuId: v4() }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" })
                    //save this tokens in Database
                    const tokens = new tokenModal({
                        userID: user._id,
                        refresh_token: refresh_token,
                        createdAt: Date.now(),
                        expireAt: new Date(Date.now() + 24 * 60 * 60), // Set to expire after 1 day (24 hours)
                    })
                    await tokens.save();
                    res.send({ "status": "success", "message": "Login Success", "access_token": access_token, "refresh_token": refresh_token, userInfo })
                } else {
                    res.send({ "status": "failed", "message": "Email or Password is invalid" })
                }
            } else {
                res.send({ "status": "not-registered", "message": "You are not a Registered User" })
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" })
        }

    }
    static googleLogin = async (req, res) => {
        const { clientId, credential: token } = req.body

        try {
            // Verify the Google ID token
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
            const googleData = response.data;

            if (googleData.aud !== clientId) {
                return res.status(400).json({ error: 'Invalid Google Client ID' });
            }
            // Check if user exists in your database (pseudo-code)
            const userExists = await userModal.findOne({ email: googleData.email })
            // Create a new user if not exists
            if (!userExists) {
                const data = new userModal({
                    email: googleData.email,
                    googleId: googleData.sub,
                    firstName: googleData.given_name,
                    lastName: googleData.family_name,
                    image: googleData.picture,
                    authBy: 'Google'
                })
                const newUser = await data.save();
                // Generate JWT Token
                const access_token = jwt.sign({ userID: newUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
                //Generate JWT Refresh Token
                const refresh_token = jwt.sign({ uuId: v4() }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" })

                const tokens = new tokenModal({
                    userID: newUser._id,
                    refresh_token: refresh_token,
                    createdAt: Date.now(),
                })
                await tokens.save();
                res.send({ "status": "success", "message": "Login Success", "access_token": access_token, "refresh_token": refresh_token, user: newUser })
            } else {

                // Generate JWT Token
                const access_token = jwt.sign({ userID: userExists._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
                //Generate JWT Refresh Token
                const refresh_token = jwt.sign({ uuId: v4() }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" })
                const tokens = new tokenModal({
                    userID: userExists._id,
                    refresh_token: refresh_token,
                    createdAt: Date.now(),
                })
                await tokens.save();
                res.send({ "status": "success", "message": "Login Success", "access_token": access_token, "refresh_token": refresh_token, user: userExists })
            }
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static requiredFields = async (req, res) => {
        const id = req.params.id
        const item = req.body
        const data = await userModal.find({ _id: id })
        if (data) {
            const user = await userModal.updateOne({ _id: id }, {
                $set: {
                    DOB: item.DOB, designation: item.designation
                }
            })
            if (user) {
                res.send({ "status": "success" })
            }
        }

    }
    static getNewAccessToken = async (req, res) => {
        const { refreshToken } = req.body
        const token = await tokenModal.findOne({ refresh_token: refreshToken })
        if (token) {
            // Generate new access token
            const access_token = jwt.sign({ userID: token.userID }, process.env.SECRET_KEY, { expiresIn: "10m" })
            res.send({ "message": "Generated New Access Token", "status": "successfull", newAccessToken: access_token })
        } else {
            res.send({ "status": "failed", "message": "Invalid Refreesh Token" })
        }

    }
    static sendUserPasswordResetEmail = async (req, res) => {
        const { email } = req.body;
        if (email) {
            const user = await userModal.findOne({ email: email })
            if (user) {
                const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, { expiresIn: '10m' })         //generate token
                //store password reset token in database
                const passwordResetToken = new forgotPasswordTokenModal({
                    token: token,
                    createdAt: new Date(),
                });
                await passwordResetToken.save();
                const link = `http://localhost:3000/user/resetpassword/${token}`      // create link and send it to the user mail
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER,
                    subject: "Verify Account",
                    html: `<a href=${link}>Click Here</a> to Reset Your Password , This Link Valid till 10 minuts`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error" + error)
                    } else {
                        console.log("Email sent:" + info.response);
                        res.send({ "status": "success", info })
                    }
                })
            } else {
                res.send({ "status": "failed", "message": "Email doesn't exists" })
            }
        } else {
            res.send({ "status": "failed", "message": "Email field is required" })
        }
    }

    static userPasswordReset = async (req, res) => {
        const { newPassword } = req.body
        const { token } = req.params
        const passwordResetToken = await forgotPasswordTokenModal.findOne({ token });
        //check token is expired or not
        const isExpired = (createdAt) => {
            const expirationTime = 10 * 60 * 1000            //convert 10 min to milisecinds
            const currentTime = new Date().getTime();
            const tokenExpirationTime = new Date(createdAt).getTime() + expirationTime;
            return currentTime > tokenExpirationTime;
        }
        if (!passwordResetToken || isExpired(passwordResetToken.createdAt)) {
            return res.send({ "status": "Expired Token", "error": 'Invalid or expired token' });
        }
        if (passwordResetToken) {

            const { userID } = jwt.verify(passwordResetToken.token, process.env.SECRET_KEY)
            const user = await userModal.find({ _id: userID })
            const oldPassword = user?.[0].password                            // retrive old password 
            const isMatched = await bcrypt.compare(newPassword, oldPassword)  // compare old password with new one
            if (!isMatched) {
                const newHashPassword = await bcrypt.hash(newPassword, 10);
                await userModal.findOneAndUpdate({ _id: userID }, { $set: { password: newHashPassword } })
                res.send({ "status": "success", "message": "Password Reset Successfully" })
                await forgotPasswordTokenModal.deleteOne({ token: token })               // delete forgot password token from database
            } else {
                res.send({ "status": "same-password", "message": "Please Use Different Password" })
            }
        }
    }

    static getUser = async (req, res) => {
        const user = req.user;
        if (user) {

            res.send({ "status": "Authorized User", user })
        } else {

            res.send({ "status": "Unauthorized User" })
        }
    }

    static submitAnswer = async (req, res) => {
        const quizID = req.params.id                                //get quiz id
        const { userID, startTime, endTime, totalTime, totalMarks, ...body } = req.body     //get use id , startting Time , ending time ,totalTime
        const userSelectedAnswers = body                            //get all user selected answers
        const data = await quizModal.findOne({ _id: quizID }).populate("questions")
        const questions = data.questions
        if (questions) {
            let marks = 0;
            let percentage;
            questions.forEach(question => {
                const questionId = question._id;                      // get question id
                const correctAnswer = question.answer;                // get correct answer
                const userAnswer = userSelectedAnswers[questionId];   //get user selected answer

                // compare both answers and add marks accordingly
                if (userAnswer === correctAnswer) {
                    marks += question.marks;
                }
            });
            percentage = (marks / totalMarks) * 100
            const correctAnswers = questions.reduce((acc, question) => {
                acc[question._id] = question.answer;
                return acc;
            }, {});

            //calculate how much time is taken by user to complerte quiz

            const calculateTimeDifferenceInSeconds = (startTime, endTime) => {
                // Parse the date strings into Date objects
                const date1 = new Date(startTime);
                const date2 = new Date(endTime);

                // Calculate the time difference in milliseconds
                const timeDifferenceInMilliseconds = date2 - date1;

                // Convert the time difference to seconds
                const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
                return timeDifferenceInSeconds;
            }
            const timeDifferenceInSeconds = calculateTimeDifferenceInSeconds(startTime, endTime);


            //calculate percentage 


            // Create a new quiz result
            const result = new resultModal({
                quizID: quizID,
                userID: userID,
                marks: marks,
                totalMarks: totalMarks,
                userSelectedAnswers: userSelectedAnswers,
                correctAnswers: correctAnswers,
                startTime: startTime,
                endTime: endTime,
                totalTime: totalTime,
                timeTaken: timeDifferenceInSeconds,
                percentage: percentage,
            });
            const data = await result.save();
            if (data) {
                res.send({ "status": "submitted", "attemptId": data?._id })
            } else {
                res.send({ 'message': "error" })
            }
        } else {
            res.send({ "mesage": "error" })
        }
    }
}

//export module
module.exports = Controller;

