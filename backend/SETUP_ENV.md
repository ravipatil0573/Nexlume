# Environment Setup Instructions

## Create .env File

1. In the `backend` folder, create a new file named `.env` (with the dot at the beginning)

2. Copy and paste this content into the `.env` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/nexlume

# Server Port
PORT=5000

# Email Configuration
EMAIL_USER=nexlume.co@gmail.com
EMAIL_PASS=cypcmfkighzwmidz
```

## Important Notes:

- The Gmail app password should be **16 characters without spaces**: `cypcmfkighzwmidz`
- Make sure there are **no spaces** in the password
- Never commit the `.env` file to git (it's already in .gitignore)
- Keep your app password secure and private

## After Creating .env:

1. Make sure MongoDB is running (or set up MongoDB Atlas)
2. Run: `npm install` in the backend folder
3. Run: `npm start` or `npm run dev`

Your backend should now be able to send emails!

