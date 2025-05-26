import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { sendAdminNotification, sendUserConfirmation } from './services/emailService';
import { LeadFormData } from './types';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.post('/api/submit-lead', async (req: Request, res: Response) => {
  try {
    const formData: LeadFormData = req.body;
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Send emails
    await Promise.all([
      sendAdminNotification(formData),
      sendUserConfirmation(formData)
    ]);
    
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ error: 'Failed to process form submission' });
  }
});

app.get('/api/download-guide', (req: Request, res: Response) => {
  const pdfPath = path.join(__dirname, '../public/legacy-wealth-guide.pdf');
  
  res.download(pdfPath, 'legacy-wealth-guide.pdf', (err) => {
    if (err) {
      console.error('Error downloading guide:', err);
      res.status(500).json({ error: 'Failed to download guide' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 