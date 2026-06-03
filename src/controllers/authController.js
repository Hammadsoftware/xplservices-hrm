import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

const JWT_SECRET = "my-super-secret-key-123456"; // hard-coded (dev only)
const JWT_EXPIRE = "1h";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const employee = await prisma.employee.findUnique({
      where: { username },
    });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    if (!employee.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    const isPasswordValid = password === employee.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // ✅ Update last login
    await prisma.employee.update({
      where: { id: employee.id },
      data: { lastLogin: new Date() },
    });

    // ✅ Create login notification
    await prisma.notification.create({
      data: {
        recipientId: employee.id,   // Int
        type: "LOGIN",
        message: "You logged into your account.",
      },
    });

    // ✅ Create JWT
    const token = jwt.sign(
      {
        id: employee.id,
        username: employee.username,
        role: employee.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: employee.id,
        username: employee.username,
        role: employee.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
 export const logout = async (req, res) => {
  
  // For JWT, logout is handled on the client side by deleting the token.
  // Optionally, you can implement token blacklisting on the server side.

  return res.json({
    success: true,
    message: "Logout successful",
  });
};
