import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Mock database
const properties: any[] = [];

// Get all properties
router.get('/', (req, res) => {
  const { type, minPrice, maxPrice, bedrooms, city } = req.query;

  let filtered = properties;

  if (type) filtered = filtered.filter(p => p.type === type);
  if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
  if (bedrooms) filtered = filtered.filter(p => p.bedrooms === Number(bedrooms));
  if (city) filtered = filtered.filter(p => p.city?.toLowerCase().includes(String(city).toLowerCase()));

  res.json({
    status: 'success',
    count: filtered.length,
    data: filtered
  });
});

// Get property by ID
router.get('/:id', (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ status: 'error', message: 'Property not found' });
  }
  res.json({ status: 'success', data: property });
});

// Create property (seller only)
router.post('/', authenticate, (req: AuthRequest, res) => {
  try {
    const { title, description, price, bedrooms, bathrooms, area, address, city, images, amenities } = req.body;

    const property = {
      id: Date.now().toString(),
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      area,
      address,
      city,
      images: images || [],
      amenities: amenities || [],
      sellerId: req.userId,
      status: 'available',
      createdAt: new Date()
    };

    properties.push(property);

    res.status(201).json({
      status: 'success',
      message: 'Property created successfully',
      data: property
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Update property
router.put('/:id', authenticate, (req: AuthRequest, res) => {
  try {
    const property = properties.find(p => p.id === req.params.id);
    if (!property) {
      return res.status(404).json({ status: 'error', message: 'Property not found' });
    }

    if (property.sellerId !== req.userId) {
      return res.status(403).json({ status: 'error', message: 'Not authorized' });
    }

    Object.assign(property, req.body);

    res.json({
      status: 'success',
      message: 'Property updated successfully',
      data: property
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Delete property
router.delete('/:id', authenticate, (req: AuthRequest, res) => {
  try {
    const index = properties.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ status: 'error', message: 'Property not found' });
    }

    if (properties[index].sellerId !== req.userId) {
      return res.status(403).json({ status: 'error', message: 'Not authorized' });
    }

    properties.splice(index, 1);

    res.json({
      status: 'success',
      message: 'Property deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
