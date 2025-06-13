exports.handler = async (event, context) => {
  console.log('Function started');
  console.log('HTTP Method:', event.httpMethod);
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('Parsing request body...');
    const formData = JSON.parse(event.body);
    console.log('Received form submission:', JSON.stringify(formData, null, 2));

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      console.log('Missing required fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Check environment variables
    console.log('Checking environment variables...');
    console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
    
    // For now, let's just return success and log the data
    // We'll add email functionality once we confirm the function works
    console.log('Form data received successfully:', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      timestamp: new Date().toISOString()
    });

    // Try to send emails if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Email credentials found, attempting to send emails...');
      
      try {
        // Import nodemailer only when needed
        const nodemailer = require('nodemailer');
        
        console.log('Creating email transporter...');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Send admin notification
        console.log('Sending admin email...');
        const adminResult = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || 'info@lw-builders.com',
          subject: 'New Lead Form Submission - Legacy Wealth Builders',
          html: `
            <h2>New Lead Form Submission</h2>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> Legacy Wealth Builders Website</p>
          `,
        });
        console.log('Admin email sent:', adminResult.messageId);

        // Send user confirmation with PDF attachment
        console.log('Sending user email with PDF attachment...');
        
        // Read the PDF file
        const fs = require('fs');
        const path = require('path');
        const pdfPath = path.join(process.cwd(), 'static', 'legacy-wealth-guide.pdf');
        
        let pdfAttachment = null;
        try {
          if (fs.existsSync(pdfPath)) {
            console.log('PDF file found, attaching to email');
            pdfAttachment = {
              filename: 'Legacy-Wealth-Guide-to-Precious-Metals.pdf',
              path: pdfPath,
              contentType: 'application/pdf'
            };
          } else {
            console.log('PDF file not found at:', pdfPath);
          }
        } catch (pdfError) {
          console.error('Error accessing PDF file:', pdfError);
        }

        const userMailOptions = {
          from: process.env.EMAIL_USER,
          to: formData.email,
          subject: 'Your Legacy Wealth Guide to Precious Metals - Thank You!',
          html: `
            <h2>Thank you for your interest!</h2>
            <p>Dear ${formData.firstName},</p>
            <p>Thank you for requesting our <strong>Legacy Wealth Guide to Precious Metals</strong>. We have received your information and are excited to share this valuable resource with you.</p>
            ${pdfAttachment ? '<p><strong>Your free guide is attached to this email.</strong> Please download and save it for your reference.</p>' : '<p>We will be sending you the guide shortly in a separate email.</p>'}
            <p>This comprehensive guide will help you understand:</p>
            <ul>
              <li>The fundamentals of precious metals investing</li>
              <li>How to protect your wealth with physical assets</li>
              <li>Strategies for building long-term financial security</li>
              <li>Important considerations for precious metals IRAs</li>
            </ul>
            <p>We will also be in touch with you shortly to discuss how we can help you achieve your financial goals.</p>
            <p>In the meantime, if you have any questions, please don't hesitate to contact us at info@lw-builders.com or call us directly.</p>
            <p>Best regards,<br>The Legacy Wealth Builders Team</p>
            <hr>
            <p><small>This email was sent because you requested information from Legacy Wealth Builders. If you did not make this request, please ignore this email.</small></p>
          `,
        };

        // Add attachment if PDF is available
        if (pdfAttachment) {
          userMailOptions.attachments = [pdfAttachment];
        }

        const userResult = await transporter.sendMail(userMailOptions);
        console.log('User email sent:', userResult.messageId);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Thank you! Your information has been submitted successfully and emails have been sent.',
            data: formData
          }),
        };

      } catch (emailError) {
        console.error('Email error:', emailError);
        console.error('Email error details:', emailError.message);
        
        // Still return success but note the email issue
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Thank you! Your information has been submitted successfully. We will contact you soon.',
            emailError: emailError.message,
            data: formData
          }),
        };
      }
    } else {
      console.log('Email not configured, returning success without sending emails');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Thank you! Your information has been submitted successfully. We will contact you soon.',
          note: 'Email not configured',
          data: formData
        }),
      };
    }

  } catch (error) {
    console.error('Function error:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'There was an error processing your request. Please try again or contact us directly at info@lw-builders.com.',
        details: error.message
      }),
    };
  }
}; 