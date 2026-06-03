import prisma from "../prisma.js";

/* ================= CREATE ================= */
export const createEmployee = async (req, res) => {
  try {
    const data = req.body;

    // ✅ Ensure profilePicture is string if provided
    if (data.profilePicture && typeof data.profilePicture !== "string") {
      return res.status(400).json({ error: "Invalid profile picture format" });
    }

    const employee = await prisma.employee.create({
      data,
    });

    // ✅ Create notification after employee creation
    await prisma.notification.create({
      data: {
        recipientId: employee.id,   // must match Int
        type: "EMPLOYEE_CREATED",
        message: "Your employee account has been created.",
      },
    });

    res.status(201).json(employee);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET ALL ================= */
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // ✅ Only allow base64 string for profilePicture
    if (data.profilePicture && typeof data.profilePicture !== "string") {
      return res.status(400).json({ error: "Invalid profile picture format" });
    }

    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/* ================= UPDATE PROFILE PICTURE ================= */
export const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const { profilePicture } = req.body;

    // ✅ Validate profilePicture is a string (base64)
    if (!profilePicture || typeof profilePicture !== "string") {
      return res.status(400).json({ error: "Invalid profile picture format" });
    }

    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: { profilePicture },
    });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};