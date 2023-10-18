import express from "express";

import { completeRegistration, register } from "../controllers/auth/register";

const router = express.Router();

router.post("/register", register);
router.post("/complete-register", completeRegistration)

export default router;