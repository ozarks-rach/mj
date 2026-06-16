# MJ - Real Estate Property Marketplace

A full-stack application for buying and selling properties with modern features for property search, communication, and transaction management.

## Features

- 🏠 **Property Listings** - Browse and search properties
- 🔍 **Advanced Filtering** - Filter by location, price, bedrooms, etc.
- 👤 **User Authentication** - Secure buyer and seller accounts
- 💬 **Messaging System** - Direct communication between buyers and sellers
- ❤️ **Favorites** - Save properties for later
- 📊 **Offer Management** - Make and review offers
- ⭐ **Reviews & Ratings** - Community feedback
- 📱 **Responsive Design** - Works on all devices

## Project Structure

```
mj/
├── backend/                 # Node.js Express API
├── frontend/                # React TypeScript Application
├── database/                # Database schemas and migrations
├── docs/                    # Documentation
└── docker-compose.yml       # Docker configuration
```

## Tech Stack

### Backend
- Node.js + Express.js
- PostgreSQL
- JWT Authentication
- Socket.io (real-time messaging)

### Frontend
- React 18+
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Router v6

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD

## Getting Started

See the [SETUP.md](./docs/SETUP.md) for detailed installation instructions.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ozarks-rach/mj.git
cd mj

# Start with Docker
docker-compose up

# Or install dependencies manually
cd backend && npm install
cd ../frontend && npm install
```

## Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./database/schema.sql)
- [Setup Guide](./docs/SETUP.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## License

MIT
