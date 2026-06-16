import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const messages: any[] = [];

// Get messages between two users
router.get('/:conversationId', authenticate, (req: AuthRequest, res) => {
  const conversationMessages = messages.filter(m => m.conversationId === req.params.conversationId);
  res.json({
    status: 'success',
    data: conversationMessages
  });
});

// Send message
router.post('/', authenticate, (req: AuthRequest, res) => {
  try {
    const { conversationId, recipientId, content } = req.body;

    const message = {
      id: Date.now().toString(),
      conversationId,
      senderId: req.userId,
      recipientId,
      content,
      read: false,
      createdAt: new Date()
    };

    messages.push(message);

    res.status(201).json({
      status: 'success',
      data: message
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
