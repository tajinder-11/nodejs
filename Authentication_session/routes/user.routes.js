import express from "express";
import {getAllUsers, createUser} from "../controllers/usersController.js"

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.post("/createNewUser", createUser)

export default router;