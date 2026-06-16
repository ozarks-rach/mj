import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const users: any[] = [];

// Get user profile
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  res.json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      avatar: user.avatar,
      bio: user.bio,
      phone: user.phone
    }
  });
});

// Update profile
router.put('/profile', authenticate, (req: AuthRequest, res) => {
  try {
    const user = users.find(u => u.id === req.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const { name, bio, phone, avatar } = req.body;
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.phone = phone || user.phone;
    user.avatar = avatar || user.avatar;

    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
