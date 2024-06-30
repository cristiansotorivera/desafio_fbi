import { Router } from "express";
import { signIn, veryfyTokenUser } from "../controllers/fbi.controller.js";

const router = Router();

router.get("/SignIn", signIn);
router.get("/Dashboard", veryfyTokenUser);
export default router;
