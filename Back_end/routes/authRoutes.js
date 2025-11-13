import express from "express"
import sign_up from "../controller/Sign_up.js"
import forgot_password from "../controller/Forgot_password.js"
import verify_OTP from "../controller/Verify_OTP.js";

const router = express.Router();

router.post('/sign-up', sign_up);
router.post('/forgot-password', forgot_password);
router.post('/otp', verify_OTP);

export default router;