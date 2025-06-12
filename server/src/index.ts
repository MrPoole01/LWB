import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { sendAdminNotification, sendUserConfirmation } from './services/emailService';
import { LeadFormData } from './types';
import { validateEnv } from './config/env';
import fs from 'fs';

// Load environment variables
dotenv.config();
console.log('Environment variables loaded');

// Validate environment variables
const envValidation = validateEnv();
if (!envValidation.success) {
  console.error('Server startup failed: Invalid environment configuration');
  process.exit(1);
}
console.log('Environment validation successful');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://www.lw-builders.com',
    'https://lw-builders.com',
    'https://leads.lw-builders.com',
    'https://app.lw-builders.com'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
console.log('CORS configured to allow:', [
  'http://localhost:5173', 
  'http://localhost:5174',
  'https://www.lw-builders.com',
  'https://lw-builders.com',
  'https://leads.lw-builders.com',
  'https://app.lw-builders.com'
]);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

// API Routes
app.post('/api/submit-lead', async (req: Request, res: Response) => {
  console.log('Received form submission:', req.body);
  try {
    const formData: LeadFormData = req.body;
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.log('Missing required fields:', { formData });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In development, make email sending optional
    if (process.env.NODE_ENV === 'development' && (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)) {
      console.log('Skipping email sending in development mode');
      console.log('Form data:', formData);
      return res.json({ success: true, message: 'Form submitted successfully (email sending skipped in development)' });
    }
    
    // Send emails
    try {
      await Promise.all([
        sendAdminNotification(formData),
        sendUserConfirmation(formData)
      ]);
    } catch (error) {
      console.error('Error sending emails:', error);
      if (process.env.NODE_ENV === 'development') {
        // In development, allow the submission to succeed even if emails fail
        return res.json({ 
          success: true, 
          message: 'Form submitted successfully (but email sending failed)',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      throw error; // Re-throw in production
    }
    
    console.log('Form submission successful:', formData);
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ error: 'Failed to process form submission' });
  }
});

app.get('/api/download-guide', (req: Request, res: Response) => {
  const pdfPath = path.join(__dirname, '../public/legacy-wealth-guide.pdf');
  
  // Check if file exists
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF file not found at:', pdfPath);
    return res.status(404).json({ error: 'Guide not found' });
  }

  // Get file stats
  const stats = fs.statSync(pdfPath);
  
  // Set proper headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', stats.size);
  res.setHeader('Content-Disposition', 'attachment; filename="legacy-wealth-guide.pdf"');
  res.setHeader('Accept-Ranges', 'bytes');
  
  // Stream the file
  const fileStream = fs.createReadStream(pdfPath);
  
  // Handle errors
  fileStream.on('error', (error) => {
    console.error('Error streaming PDF:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download guide' });
    }
  });

  // Handle client disconnect
  req.on('close', () => {
    fileStream.destroy();
  });

  // Pipe the file to the response
  fileStream.pipe(res);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`API Prefix: ${process.env.API_PREFIX}`);
}); 