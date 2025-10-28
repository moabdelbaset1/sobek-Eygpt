"use client";
import {useState} from 'react';

export default function ContactForm() {
  const [state, setState] = useState<{loading:boolean; ok:boolean; error?:string}>({loading:false, ok:false});
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setState({loading:true, ok:false});
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setState({loading:false, ok:true});
      form.reset();
    } catch (err:any) {
      setState({loading:false, ok:false, error: err.message});
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
      <input name="name" placeholder="Name" required className="border rounded px-3 py-2" aria-label="Name" />
      <input name="email" type="email" placeholder="Email" required className="border rounded px-3 py-2" aria-label="Email" />
      <input name="subject" placeholder="Subject" required className="border rounded px-3 py-2" aria-label="Subject" />
      <textarea name="message" placeholder="Message" required className="border rounded px-3 py-2" rows={5} aria-label="Message" />
      <input type="hidden" name="recaptchaToken" value="" />
      <button disabled={state.loading} className="bg-primary text-white px-4 py-2 rounded">
        {state.loading ? 'Sending…' : 'Send Message'}
      </button>
      {state.ok && <p className="text-green-600">Thank you! We will get back to you shortly.</p>}
      {state.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
}



