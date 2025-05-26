import nodemailer from 'nodemailer';
import { LeadFormData } from '../types';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendAdminNotification = async (formData: LeadFormData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Lead Form Submission',
    html: `
      <h2>New Lead Form Submission</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
      <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw new Error('Failed to send admin notification');
  }
};

export const sendUserConfirmation = async (formData: LeadFormData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: formData.email,
    subject: 'Your Legacy Wealth Guide to Precious Metals',
    html: `
      <h2>Thank You for Your Interest!</h2>
      <p>Dear ${formData.firstName},</p>
      <p>Thank you for requesting our Legacy Wealth Guide to Precious Metals. We're excited to share this valuable resource with you!</p>
      <p>You can download your guide by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/download-guide" 
           style="background-color: #D4AF37; color: #1A2744; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Download Your Guide
        </a>
      </div>
      <p>If you have any questions about precious metals or would like to speak with one of our experts, please don't hesitate to contact us at ${process.env.ADMIN_EMAIL}.</p>
      <p>Best regards,<br>The Legacy Wealth Builders Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending user confirmation:', error);
    throw new Error('Failed to send user confirmation');
  }
}; 