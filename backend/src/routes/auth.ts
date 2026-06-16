import { Router, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Mock database - replace with actual DB
const users: any[] = [];

// Register
router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, userType } = req.body;

      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new AppError('Email already registered', 400);
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const user = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        name,
        userType: userType || 'buyer',
        createdAt: new Date()
      };

      users.push(user);

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d'
      });

      res.status(201).json({
        status: 'success',
        token,
        user: { id: user.id, email: user.email, name: user.name, userType: user.userType }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = users.find(u => u.email === email);
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401);
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d'
      });

      res.json({
        status: 'success',
        token,
        user: { id: user.id, email: user.email, name: user.name, userType: user.userType }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }
);

export default router;
