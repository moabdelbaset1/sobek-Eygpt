import { NextResponse } from 'next/server';
import { jobsAPI } from '@/lib/appwrite'

// Transform camelCase from Appwrite to snake_case for frontend
function transformJob(job: any) {
  return {
    id: job.$id || job.id,
    title: job.title,
    title_ar: job.titleAr || job.title_ar,
    department: job.department,
    location: job.location,
    job_type: job.jobType || job.job_type,
    working_hours: job.workingHours || job.working_hours,
    description: job.description,
    description_ar: job.descriptionAr || job.description_ar,
    requirements: job.requirements,
    requirements_ar: job.requirementsAr || job.requirements_ar,
    is_active: job.isActive !== undefined ? job.isActive : job.is_active,
    created_at: job.$createdAt || job.created_at
  }
}

// GET /api/jobs - Get all jobs or active jobs only
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const jobs = activeOnly ? await jobsAPI.getActive() : await jobsAPI.getAll();

    return NextResponse.json(jobs.map(transformJob));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create new job
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const job = await jobsAPI.create(data);

    return NextResponse.json(transformJob(job), { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

// PUT /api/jobs - Update job
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const job = await jobsAPI.update(id, data);

    return NextResponse.json(transformJob(job));
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs - Delete job
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    await jobsAPI.delete(id);

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
