"use client";
import {useState} from 'react';

export default function CareersForm() {
  const [state, setState] = useState<{loading:boolean; ok:boolean; error?:string}>({loading:false, ok:false});
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setState({loading:true, ok:false});
    try {
      const res = await fetch('/api/careers', { method:'POST', body: formData });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setState({loading:false, ok:true});
      form.reset();
    } catch (err:any) {
      setState({loading:false, ok:false, error: err.message});
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl" encType="multipart/form-data">
      <input name="name" placeholder="Full Name" required className="border rounded px-3 py-2" aria-label="Full Name" />
      <input name="email" type="email" placeholder="Email" required className="border rounded px-3 py-2" aria-label="Email" />
      <input name="role" placeholder="Role Applying For" required className="border rounded px-3 py-2" aria-label="Role" />
      <textarea name="message" placeholder="Cover Letter" className="border rounded px-3 py-2" rows={5} aria-label="Cover Letter" />
      <input type="file" name="file" accept=".pdf,.doc,.docx" className="border rounded px-3 py-2" aria-label="Resume" />
      <input type="hidden" name="recaptchaToken" value="" />
      <button disabled={state.loading} className="bg-primary text-white px-4 py-2 rounded">
        {state.loading ? 'Submitting…' : 'Submit Application'}
      </button>
      {state.ok && <p className="text-green-600">Application received. We will contact you if shortlisted.</p>}
      {state.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
}



