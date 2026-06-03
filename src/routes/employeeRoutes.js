import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  updateProfilePicture,
} from "../controllers/employeeController.js";

const router = express.Router();

/* ================= BASIC ROUTES ================= */

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);

/* ✅ PROFILE PICTURE ROUTE (NO AUTH) */
router.put("/profile-pic/:id", updateProfilePicture);

/* NORMAL UPDATE */
router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;
