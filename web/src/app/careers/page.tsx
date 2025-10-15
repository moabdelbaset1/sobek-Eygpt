import CareersForm from '@/components/forms/CareersForm';

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Careers</h1>
      <p className="text-zinc-600 mb-6">Join a team committed to ethics, quality, and patient outcomes. Submit your application below.</p>
      <CareersForm />
    </div>
  );
}


