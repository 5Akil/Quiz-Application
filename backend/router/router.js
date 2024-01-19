const express = require('express');
const router = express.Router();
const Controller = require('../controller/controller');
const adminController = require('../controller/adminController')
const userAuth = require('../middleware/userAuth')
const adminAuth = require('../middleware/adminAuth');
const multer = require('multer');
const {v4} = require('uuid')

const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,   v4() + file.originalname );
    }
  });
  const upload = multer({
    storage: storage,
  });

//Public Route
router.get('/countries' , Controller.getCountries)
router.get('/states/:id' , Controller.getStates)
router.get('/cities/:id' , Controller.getCities)
router.post('/usersignup', upload.single('image') ,  Controller.userSignup)
router.post('/userlogin', Controller.userLogin),
router.post('/googlelogin' , Controller.googleLogin)
router.post('/requiredfields/:id' ,Controller.requiredFields)
router.post('/new-access-token',Controller.getNewAccessToken)
router.post('/adminLogin', adminController.adminLogin)

//protected Route
router.get('/userdashboard', userAuth, Controller.getUser)
router.get('/admindashboard', adminAuth, adminController.getAdminInfo)



router.get('/user-list', adminAuth, adminController.getAllUser)
router.get('/user-list/:id' , adminAuth ,adminController.getSingleUser)
router.patch('/edit-user/:id', adminAuth, adminController.editUser)
router.delete('/delete-user/:id', adminAuth, adminController.deleteUser)
router.post('/reset-password-email', Controller.sendUserPasswordResetEmail)
router.post('/change-password/:token' , Controller.userPasswordReset)


router.get('/quiz-list', adminController.getQuizList)
router.get('/quiz-list/:id',  adminController.getQuiz)
router.post('/add-quiz', adminAuth, adminController.addQuiz)
router.patch('/edit-quiz/:id', adminAuth, adminController.editQuiz)
router.delete('/delete-quiz/:id', adminAuth, adminController.deleteQuiz)


router.get('/total-questions',adminController.getTotalQuestions)
router.get('/get-questions/:id', adminController.getQuestions)
router.get('/single-question/:id', adminController.getSingleQuestion)
router.post('/add-questions', adminAuth, adminController.addQuestion)
router.delete('/delete-question/:id', adminAuth, adminController.deleteQuestion)
router.patch('/edit-question/:id', adminAuth, adminController.editQuestion)

router.post('/submit/:id',  Controller.submitAnswer)
router.get('/result/:attemptId', adminController.getResult)
router.get('/result-record/:userID' , userAuth , adminController.getResultRecord)
router.get('/result/:userID/:quizID' ,adminAuth ,adminController.getUserResult)


module.exports = router;