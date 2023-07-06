import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController
} from "../controllers/authController.js"
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();
//routing

/**  REGISTER || Method POST  */
router.post("/register",registerController);


/** LOGIN  || POST  */
router.post("/login",loginController);

//test routes
router.get('/test',requireSignIn , isAdmin , testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//Forgot password || Post
router.post('/forgot-password',forgotPasswordController);

//protected Admin route auth


export default router;