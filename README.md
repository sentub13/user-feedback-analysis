# User Feedback Analysis

A comprehensive application for analyzing user feedback with sentiment analysis and data visualization.

## Project Structure

```
user-feedback-analysis/
├── backend/          # Backend API server
├── frontend/         # Frontend web application
└── README.md         # This file
```

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL or MongoDB
- Git

## Database Setup

### Option 1: PostgreSQL

1. Install PostgreSQL:
   ```bash
   # Windows (using chocolatey)
   choco install postgresql
   
   # Or download from https://www.postgresql.org/download/
   ```

2. Create database:
   ```sql
   CREATE DATABASE user_feedback_db;
   CREATE USER feedback_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE user_feedback_db TO feedback_user;
   ```

3. Update connection string in backend configuration

### Option 2: MongoDB

1. Install MongoDB:
   ```bash
   # Windows (using chocolatey)
   choco install mongodb
   
   # Or download from https://www.mongodb.com/try/download/community
   ```

2. Start MongoDB service:
   ```bash
   mongod --dbpath "C:\data\db"
   ```

## Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   # For Python/Flask backend
   pip install -r requirements.txt
   
   # For Node.js/Express backend
   npm install
   ```

3. Set environment variables:
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your database credentials
   DATABASE_URL=postgresql://feedback_user:your_password@localhost:5432/user_feedback_db
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Run database migrations (if applicable):
   ```bash
   # For Python/Flask with Alembic
   flask db upgrade
   
   # For Node.js with Sequelize
   npx sequelize-cli db:migrate
   ```

5. Start the backend server:
   ```bash
   # Python/Flask
   python app.py
   # or
   flask run
   
   # Node.js/Express
   npm start
   # or
   node server.js
   ```

   Backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables:
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env with backend URL
   REACT_APP_API_URL=http://localhost:5000/api
   # or for Vue.js
   VUE_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

## Running the Complete Application

1. Start the database service
2. Start the backend server: `cd backend && npm start`
3. Start the frontend server: `cd frontend && npm start`
4. Open your browser to `http://localhost:3000`

## API Endpoints

- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit new feedback
- `GET /api/analytics` - Get feedback analytics
- `GET /api/sentiment` - Get sentiment analysis results

## Features

- User feedback collection
- Sentiment analysis
- Data visualization and analytics
- Real-time feedback monitoring
- Export functionality

## Development

### Backend Development
```bash
cd backend
# Install dev dependencies
pip install -r requirements-dev.txt  # Python
npm install --save-dev  # Node.js

# Run tests
pytest  # Python
npm test  # Node.js
```

### Frontend Development
```bash
cd frontend
# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
# Set production environment variables
export NODE_ENV=production  # Node.js
export FLASK_ENV=production  # Python
```

## Troubleshooting

- **Database connection issues**: Check database service is running and credentials are correct
- **Port conflicts**: Ensure ports 3000 and 5000 are available
- **CORS errors**: Verify backend CORS configuration includes frontend URL
- **Module not found**: Run `npm install` or `pip install -r requirements.txt`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request