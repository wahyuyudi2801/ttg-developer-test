const express = require("express");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
require("dotenv").config();
const userSchema = require("./validate.js");
const connectDB = require("./database.js");

const app = express();
app.use(express.json());

//* routes
// create user
app.post("/register", async (req, res) => {
  try {
    const db = await connectDB();
    // request body validate
    const validatedData = userSchema.parse(req.body);

    // hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [validatedData.fullname, validatedData.email, hashedPassword]
    );

    res.status(201).json({
      message: "user created",
      data: result.insertId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.issues,
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});

// read users
app.get("/users", async (req, res) => {
  try {
    const db = await connectDB();
    const [result] = await db.execute("SELECT id, fullname, email FROM users");

    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// read user by user_id
app.get("/users/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const [result] = await db.execute(
      "SELECT id, fullname, email FROM users WHERE id = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update user
app.put("/users/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const validatedData = userSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const [result] = await db.execute(
      "UPDATE users SET fullname = ?, email = ?, password = ? WHERE id = ?",
      [
        validatedData.fullname,
        validatedData.email,
        hashedPassword,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated" });
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ errors: error.issues });

    res.status(500).json({ error: error.message });
  }
});

// delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
