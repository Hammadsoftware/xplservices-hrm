// routes/notificationRoutes.js
import { Router } from "express";
import {
  getNotifications,
  
  deleteNotification,
} from "../controllers/notificationController.js"; // ✅ match your filename

const router = Router();
router.get("/:userId", getNotifications);
router.delete("/:id", deleteNotification);


export default router;