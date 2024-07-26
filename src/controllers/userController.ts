import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: new Date(req.body.dob),
        password: req.body.password,
        acceptTerms: req.body.acceptTerms,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while creating the user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: new Date(req.body.dob),
        password: req.body.password,
        acceptTerms: req.body.acceptTerms,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while updating the user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while deleting the user" });
  }
};
