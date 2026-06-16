import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import authRoutes from './routes/auth';
import propertyRoutes from './routes/properties';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';
import offerRoutes from './routes/offers';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/offers', offerRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'API is running' });
});

// Socket.IO for real-time messaging
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join_room', (room: string) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handler
app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export { app, io };
