import prisma from "../prisma.js";

export const getNotifications = async (req, res) => {
  const userId = Number(req.params.userId); // still Number because Employee.id is Int
  if (!userId) return res.status(400).json({ success: false, message: "Invalid userId" });

  try {
    const notifications = await prisma.notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ success: true, data: notifications });
  } catch (err) {
    console.error("getNotifications error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const deleteNotification = async (req, res) => {
  const notifId = req.params.id; // String, not Number
  if (!notifId) {
    return res.status(400).json({ success: false, message: "Invalid notificationId" });
  }

  try {
    await prisma.notification.delete({
      where: { id: notifId }, // works with String ID
    });
    return res.json({ success: true, message: "Notification deleted successfully" });
  } catch (err) {
    console.error("deleteNotification error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};