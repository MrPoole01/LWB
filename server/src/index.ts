import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { sendAdminNotification, sendUserConfirmation } from './services/emailService';
import { LeadFormData } from './types';
import fs from 'fs';

// Load environment variables
dotenv.config();
console.log('Environment variables loaded');

const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration - Allow all origins for now to debug
app.use(cors({
  origin: true, // Allow all origins temporarily
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Add explicit OPTIONS handler for preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.headers['user-agent']);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.post('/api/submit-lead', async (req: Request, res: Response) => {
  console.log('Received form submission:', req.body);
  console.log('Request headers:', req.headers);
  
  try {
    const formData: LeadFormData = req.body;
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.log('Missing required fields:', { formData });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In development or if email not configured, skip email sending
    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Skipping email sending - development mode or email not configured');
      console.log('Form data:', formData);
      return res.json({ 
        success: true, 
        message: 'Form submitted successfully (email sending skipped)',
        data: formData
      });
    }
    
    // Send emails in production
    try {
      await Promise.all([
        sendAdminNotification(formData),
        sendUserConfirmation(formData)
      ]);
      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
      // Still return success but log the email error
      return res.json({ 
        success: true, 
        message: 'Form submitted successfully (but email sending failed)',
        error: error instanceof Error ? error.message : 'Unknown email error'
      });
    }
    
    console.log('Form submission successful:', formData);
    res.json({ success: true, message: 'Form submitted and emails sent successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ 
      error: 'Failed to process form submission',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('/api/download-guide', (req: Request, res: Response) => {
  const pdfPath = path.join(__dirname, '../public/legacy-wealth-guide.pdf');
  
  console.log('PDF download requested, path:', pdfPath);
  
  // Check if file exists
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF file not found at:', pdfPath);
    return res.status(404).json({ error: 'Guide not found' });
  }

  // Get file stats
  const stats = fs.statSync(pdfPath);
  console.log('PDF file stats:', { size: stats.size, modified: stats.mtime });
  
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

// Catch-all route for debugging
app.use('*', (req: Request, res: Response) => {
  console.log('Unmatched route:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    url: req.originalUrl,
    availableRoutes: ['/health', '/api/submit-lead', '/api/download-guide']
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Email configured: ${!!(process.env.EMAIL_USER && process.env.EMAIL_PASS)}`);
  console.log('Available routes:');
  console.log('  GET  /health');
  console.log('  POST /api/submit-lead');
  console.log('  GET  /api/download-guide');
}); 