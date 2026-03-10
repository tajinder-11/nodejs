import db from "../db/index.js";
import { usersTable } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  const users = await db.select().from(usersTable);
  res.status(200).json(users);
};

export const createUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const user = await db
      .insert(usersTable)
      .values({ name, age, email })
      .returning();

    res.status(201).json({
      message: "User created successfully",
      user: user[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
