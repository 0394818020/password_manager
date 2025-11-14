import express from "express"
import sign_up from "../controller/authController/Sign_up.js"
import forgot_password from "../controller/authController/Forgot_password.js"
import verify_OTP from "../controller/authController/Verify_OTP.js"
import sign_in from "../controller/authController/Sign_in.js"

const router = express.Router();

router.post('/sign-up', sign_up);
router.post('/forgot-password', forgot_password);
router.post('/otp', verify_OTP);
router.post('/sign-in', sign_in);

export default router;