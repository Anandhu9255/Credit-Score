// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, upiId, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password, upiId, phone });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    upiId: user.upiId,
    token: generateToken(user),
  });
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      upiId: user.upiId,
      token: generateToken(user),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get logged-in user
export const getMe = async (req: any, res: Response) => {
  const user = req.user;
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
