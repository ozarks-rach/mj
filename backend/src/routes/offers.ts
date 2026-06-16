import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const offers: any[] = [];

// Get offers for a property
router.get('/property/:propertyId', authenticate, (req: AuthRequest, res) => {
  const propertyOffers = offers.filter(o => o.propertyId === req.params.propertyId);
  res.json({
    status: 'success',
    data: propertyOffers
  });
});

// Create offer
router.post('/', authenticate, (req: AuthRequest, res) => {
  try {
    const { propertyId, offerPrice, message } = req.body;

    const offer = {
      id: Date.now().toString(),
      propertyId,
      buyerId: req.userId,
      offerPrice,
      message,
      status: 'pending',
      createdAt: new Date()
    };

    offers.push(offer);

    res.status(201).json({
      status: 'success',
      data: offer
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Accept/Reject offer
router.put('/:id', authenticate, (req: AuthRequest, res) => {
  try {
    const offer = offers.find(o => o.id === req.params.id);
    if (!offer) {
      return res.status(404).json({ status: 'error', message: 'Offer not found' });
    }

    const { status } = req.body;
    offer.status = status; // 'accepted' or 'rejected'

    res.json({
      status: 'success',
      data: offer
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
