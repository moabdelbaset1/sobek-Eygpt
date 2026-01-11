import { NextResponse } from 'next/server';
import { jobApplicationsAPI, jobsAPI } from '@/lib/appwrite';
import { sendApplicationNotificationEmail } from '@/lib/emailService';

// GET /api/applications - Get all applications or by job ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    const applications = jobId
      ? await jobApplicationsAPI.getByJobId(jobId)
      : await jobApplicationsAPI.getAll();

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST /api/applications - Submit application
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.full_name || !data.email || !data.phone || !data.cv_url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const application = await jobApplicationsAPI.create(data);

    // Get job title if job_id exists
    let jobTitle = null;
    if (data.job_id) {
      try {
        const job = await jobsAPI.getById(data.job_id);
        jobTitle = job?.title || null;
      } catch (error) {
        console.warn('Could not fetch job title:', error);
      }
    }

    // Send email notification to company
    try {
      await sendApplicationNotificationEmail({
        applicantName: data.full_name,
        applicantEmail: data.email,
        applicantPhone: data.phone,
        jobTitle: jobTitle,
        cvUrl: data.cv_url,
        coverLetter: data.cover_letter,
        submittedAt: new Date(),
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

// PUT /api/applications - Update application status
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const application = await jobApplicationsAPI.updateStatus(id, status);

    return NextResponse.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE /api/applications - Delete application
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    await jobApplicationsAPI.delete(id);

    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
