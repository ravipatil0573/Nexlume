# NexLume Backend Server

## Quick Start Guide

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` folder:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/nexlume
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexlume

# Server Port
PORT=5000

# Email Configuration (for team enrollment)
EMAIL_USER=nexlume.co@gmail.com
EMAIL_PASS=your-gmail-app-password-here
```

### 3. Set Up Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Generate an app password for "Mail"
3. Copy the 16-character password
4. Add it to your `.env` file as `EMAIL_PASS`

### 4. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Use: `MONGODB_URI=mongodb://localhost:27017/nexlume`

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Use: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexlume`

### 5. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start at: `http://localhost:5000`

### 6. Test the API

```bash
# Health check
curl http://localhost:5000/api/health

# Get all projects
curl http://localhost:5000/api/projects

# Get single project
curl http://localhost:5000/api/projects/1
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project by ID
- `POST /api/team/enroll` - Send enrollment email to user

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables (create this)
├── models/
│   └── Project.js    # Project model
└── routes/
    ├── projects.js   # Project routes
    └── team.js       # Team/email routes
```

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running (if local)
- Check your MONGODB_URI in .env
- Verify network access (if using Atlas)

**Email Not Sending:**
- Verify EMAIL_USER and EMAIL_PASS in .env
- Make sure you're using Gmail App Password (not regular password)
- Check Gmail account has 2-Step Verification enabled

**Port Already in Use:**
- Change PORT in .env to a different port (e.g., 5001)
- Or stop the process using port 5000

