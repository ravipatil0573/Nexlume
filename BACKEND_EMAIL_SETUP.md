# Backend Email Setup Guide

## Step 1: Install Required Packages

In your backend directory, install nodemailer:

```bash
npm install nodemailer
```

## Step 2: Add Route to Your Server

1. Create a file `routes/team.js` in your backend
2. Copy the code from `backend-email-route.js` to `routes/team.js`
3. In your main `server.js`, add this route:

```javascript
import teamRouter from "./routes/team.js";

// Add this with your other routes
app.use("/api/team", teamRouter);
```

## Step 3: Configure Email Credentials

### For Gmail:

1. Go to your Google Account settings
2. Enable "2-Step Verification"
3. Go to "App Passwords" (https://myaccount.google.com/apppasswords)
4. Generate an app password for "Mail"
5. Add to your `.env` file:

```env
EMAIL_USER=nexlume.co@gmail.com
EMAIL_PASS=your-app-password-here
```

### For Other Email Services:

Update the transporter configuration in `routes/team.js`:

```javascript
// For Outlook
const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// For Custom SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.yourdomain.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Step 4: Update .env File

Add these to your backend `.env` file:

```env
EMAIL_USER=nexlume.co@gmail.com
EMAIL_PASS=your-app-password-here
```

## Step 5: Test the API

Test the endpoint:

```bash
curl -X POST http://localhost:5000/api/team/enroll \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Important Notes:

- **Gmail App Password**: You MUST use an app password, not your regular Gmail password
- **Security**: Never commit your `.env` file to git
- **Rate Limits**: Email services have rate limits, consider adding rate limiting
- **Error Handling**: The frontend will show appropriate error messages

## Alternative: Using Email Services

For production, consider using:
- **SendGrid** (Free tier: 100 emails/day)
- **Mailgun** (Free tier: 5,000 emails/month)
- **AWS SES** (Pay as you go)
- **Resend** (Free tier: 3,000 emails/month)

