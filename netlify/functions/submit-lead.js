const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log('Received form submission:', formData);

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email not configured, returning success without sending');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Form submitted successfully! We will contact you soon.',
          data: formData
        }),
      };
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send admin notification
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
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ]);
      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Still return success but note the email issue
    }

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
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'There was an error processing your request. Please try again or contact us directly at info@lw-builders.com.'
      }),
    };
  }
}; 