const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  console.log('Function started');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  
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
    
    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email not configured, returning success without sending');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Form submitted successfully! We will contact you soon. (Email not configured)',
          data: formData
        }),
      };
    }

    console.log('Creating email transporter...');
    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter
    console.log('Verifying email transporter...');
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Email configuration error',
          message: 'There was an issue with email configuration. Please contact us directly at info@lw-builders.com.'
        }),
      };
    }

    // Send admin notification
    console.log('Preparing admin email...');
    const adminMailOptions = {
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
    };

    // Send user confirmation
    console.log('Preparing user email...');
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Thank you for your interest in Legacy Wealth Builders',
      html: `
        <h2>Thank you for your interest!</h2>
        <p>Dear ${formData.firstName},</p>
        <p>Thank you for requesting our Legacy Wealth Guide to Precious Metals. We have received your information and will be in touch with you shortly.</p>
        <p>In the meantime, if you have any questions, please don't hesitate to contact us at info@lw-builders.com or call us directly.</p>
        <p>Best regards,<br>The Legacy Wealth Builders Team</p>
        <hr>
        <p><small>This email was sent because you requested information from Legacy Wealth Builders. If you did not make this request, please ignore this email.</small></p>
      `,
    };

    // Send both emails
    console.log('Sending emails...');
    try {
      console.log('Sending admin email to:', adminMailOptions.to);
      const adminResult = await transporter.sendMail(adminMailOptions);
      console.log('Admin email sent successfully:', adminResult.messageId);
      
      console.log('Sending user email to:', userMailOptions.to);
      const userResult = await transporter.sendMail(userMailOptions);
      console.log('User email sent successfully:', userResult.messageId);
      
      console.log('Both emails sent successfully');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      console.error('Email error details:', JSON.stringify(emailError, null, 2));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Form submitted successfully, but there was an issue sending emails. We will contact you directly.',
          emailError: emailError.message
        }),
      };
    }

    console.log('Function completed successfully');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Thank you! Your information has been submitted successfully. We will contact you soon with your free guide.',
        data: formData
      }),
    };

  } catch (error) {
    console.error('Function error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
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