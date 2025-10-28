// Email notification helper for job applications
// Uses NodeMailer or simple email API

export interface EmailConfig {
  to: string;
  subject: string;
  html: string;
}

export async function sendApplicationNotificationEmail(data: {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  jobTitle: string | null;
  cvUrl: string;
  coverLetter?: string | null;
  submittedAt: Date;
}) {
  const companyEmail = process.env.COMPANY_EMAIL || 'hr@sobekpharma.com';
  
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #dc2626; }
    .info-label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
    .info-value { color: #111827; font-size: 16px; }
    .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">🎯 New Job Application Received</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Sobek Pharma - HR System</p>
    </div>
    
    <div class="content">
      <p style="font-size: 16px; margin-bottom: 20px;">
        A new job application has been submitted through the careers page.
      </p>

      ${data.jobTitle ? `
      <div class="info-box" style="border-left-color: #3b82f6;">
        <div class="info-label">Position Applied For</div>
        <div class="info-value" style="font-size: 18px; font-weight: bold; color: #3b82f6;">
          ${data.jobTitle}
        </div>
      </div>
      ` : ''}

      <div class="info-box">
        <div class="info-label">Applicant Name</div>
        <div class="info-value">${data.applicantName}</div>
      </div>

      <div class="info-box">
        <div class="info-label">Email Address</div>
        <div class="info-value">
          <a href="mailto:${data.applicantEmail}" style="color: #dc2626;">${data.applicantEmail}</a>
        </div>
      </div>

      <div class="info-box">
        <div class="info-label">Phone Number</div>
        <div class="info-value">
          <a href="tel:${data.applicantPhone}" style="color: #dc2626;">${data.applicantPhone}</a>
        </div>
      </div>

      <div class="info-box">
        <div class="info-label">Submission Date & Time</div>
        <div class="info-value">
          ${data.submittedAt.toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'short' 
          })}
        </div>
      </div>

      ${data.coverLetter ? `
      <div class="info-box" style="border-left-color: #10b981;">
        <div class="info-label">Cover Letter</div>
        <div class="info-value" style="font-style: italic; color: #374151; line-height: 1.8;">
          "${data.coverLetter}"
        </div>
      </div>
      ` : ''}

      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.cvUrl}" class="button" style="color: white;">
          📄 Download CV / Resume
        </a>
      </div>

      <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #92400e;">
          <strong>⚡ Action Required:</strong> Review this application in the admin panel and update the candidate's status.
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/applications" 
           style="color: #dc2626; text-decoration: none; font-weight: bold;">
          → View All Applications in Admin Panel
        </a>
      </div>
    </div>

    <div class="footer">
      <p>This is an automated notification from Sobek Pharma HR System</p>
      <p style="margin: 5px 0;">© ${new Date().getFullYear()} Sobek Pharma. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  // Check if we're using a third-party email service or local SMTP
  const emailService = process.env.EMAIL_SERVICE || 'console'; // 'resend', 'sendgrid', 'gmail', or 'console'

  if (emailService === 'console') {
    // Development mode - just log the email
    console.log('📧 ===== EMAIL NOTIFICATION =====');
    console.log(`To: ${companyEmail}`);
    console.log(`Subject: New Job Application - ${data.applicantName}${data.jobTitle ? ` for ${data.jobTitle}` : ''}`);
    console.log('HTML Body:');
    console.log(emailHtml);
    console.log('📧 ===== END EMAIL =====');
    return { success: true, service: 'console' };
  }

  if (emailService === 'resend') {
    // Using Resend.com (recommended for production)
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'hr@sobekpharma.com',
          to: companyEmail,
          subject: `New Job Application - ${data.applicantName}${data.jobTitle ? ` for ${data.jobTitle}` : ''}`,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend API error: ${response.statusText}`);
      }

      return { success: true, service: 'resend' };
    } catch (error) {
      console.error('Failed to send email via Resend:', error);
      return { success: false, error };
    }
  }

  if (emailService === 'sendgrid') {
    // Using SendGrid
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: companyEmail }],
          }],
          from: { email: process.env.EMAIL_FROM || 'hr@sobekpharma.com' },
          subject: `New Job Application - ${data.applicantName}${data.jobTitle ? ` for ${data.jobTitle}` : ''}`,
          content: [{
            type: 'text/html',
            value: emailHtml,
          }],
        }),
      });

      if (!response.ok) {
        throw new Error(`SendGrid API error: ${response.statusText}`);
      }

      return { success: true, service: 'sendgrid' };
    } catch (error) {
      console.error('Failed to send email via SendGrid:', error);
      return { success: false, error };
    }
  }

  // Gmail SMTP would require NodeMailer - not recommended for Edge Runtime
  console.warn('Email service not configured. Set EMAIL_SERVICE in .env');
  return { success: false, error: 'Email service not configured' };
}
