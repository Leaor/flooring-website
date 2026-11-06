'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { EstimateErrors, EstimateField } from './estimate';
import type { SiteConfig } from './types';

const fieldLabels: Record<EstimateField, string> = {
  name: 'Full name', phone: 'Phone', email: 'Email', city: 'City / area',
  projectType: 'Type of flooring project', squareFootage: 'Approximate square footage',
  details: 'Project details', preferredContact: 'Preferred contact method', consent: 'Privacy consent',
};

export function EstimateForm({ config, deliveryAvailable }: { config: SiteConfig; deliveryAvailable: boolean }) {
  const startedAt = useRef(0);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<EstimateErrors>({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  useEffect(() => { if (message) summary.current?.focus(); }, [message]);

  const describedBy = (field: EstimateField) => errors[field] ? `${field}-error` : undefined;
  const errorFor = (field: EstimateField) => errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !deliveryAvailable || success) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setPending(true);
    setErrors({});
    setMessage('');
    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'), phone: values.get('phone'), email: values.get('email'),
          city: values.get('city'), projectType: values.get('projectType'), squareFootage: values.get('squareFootage'),
          details: values.get('details'), preferredContact: values.get('preferredContact'),
          consent: values.get('consent') === 'yes', website: values.get('website'), startedAt: startedAt.current,
        }),
      });
      const result = await response.json() as { message?: string; errors?: EstimateErrors };
      if (response.ok) {
        setSuccess(true);
        setMessage(result.message || 'Your request was accepted by the email service.');
        form.reset();
      } else {
        setErrors(result.errors || {});
        setMessage(result.message || 'Your request could not be sent. Please try again.');
      }
    } catch {
      setMessage('We could not confirm that your request was sent. Please check your connection and try again, or use a listed contact option.');
    } finally { setPending(false); }
  }

  return <div className="estimate-form-wrap">
    {!deliveryAvailable && <div className="form-notice" role="status">
      <strong>Online requests are not available yet.</strong>
      <p>This form will be ready when {config.shortName} enables email delivery. Nothing entered here will be sent. Please use a listed contact option if one is available.</p>
    </div>}
    {message && <div className={success ? 'form-result form-success' : 'form-result form-error'} tabIndex={-1} ref={summary} role={success ? 'status' : 'alert'}>
      <strong>{success ? 'Request received by the email service' : 'Please check your request'}</strong>
      <p>{message}</p>
      {!!Object.keys(errors).length && <ul>{Object.entries(errors).map(([field, error]) => <li key={field}><a href={`#${field}`}>{fieldLabels[field as EstimateField]}: {error}</a></li>)}</ul>}
    </div>}
    {!success && <form className="estimate-form" onSubmit={submit} aria-busy={pending} aria-describedby="estimate-form-help">
      <p id="estimate-form-help" className="form-help">All fields are required unless marked optional. An estimate request does not commit you to any work.</p>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} />{errorFor('name')}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')} />{errorFor('phone')}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={describedBy('email')} />{errorFor('email')}
        </div>
        <div className="form-field">
          <label htmlFor="city">City / area</label>
          <input id="city" name="city" autoComplete="address-level2" required minLength={2} maxLength={100} aria-invalid={!!errors.city} aria-describedby={describedBy('city')} />{errorFor('city')}
        </div>
        <div className="form-field">
          <label htmlFor="projectType">Type of flooring project</label>
          <select id="projectType" name="projectType" required defaultValue="" aria-invalid={!!errors.projectType} aria-describedby={describedBy('projectType')}>
            <option value="" disabled>Select a project type</option>
            {config.services.map(service => <option key={service.slug} value={service.slug}>{service.title}</option>)}
            <option value="not-sure">Not sure yet</option>
          </select>{errorFor('projectType')}
        </div>
        <div className="form-field">
          <label htmlFor="squareFootage">Approximate square footage <span>(optional)</span></label>
          <input id="squareFootage" name="squareFootage" type="number" min="1" max="999999" step="1" inputMode="numeric" aria-invalid={!!errors.squareFootage} aria-describedby={describedBy('squareFootage')} />{errorFor('squareFootage')}
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="details">Project details</label>
          <p id="details-help" className="field-help">Tell us about the rooms, your current floor, and what you have in mind. Please leave out financial or other sensitive information.</p>
          <textarea id="details" name="details" required minLength={10} maxLength={4000} rows={5} aria-invalid={!!errors.details} aria-describedby={['details-help', describedBy('details')].filter(Boolean).join(' ')} />{errorFor('details')}
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="preferredContact">Preferred contact method</label>
          <select id="preferredContact" name="preferredContact" required defaultValue="email" aria-invalid={!!errors.preferredContact} aria-describedby={describedBy('preferredContact')}>
            <option value="email">Email</option><option value="phone">Phone</option>
          </select>{errorFor('preferredContact')}
        </div>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, padding: 0, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap' }}>
        <label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="consent-field">
        <div className="checkbox-row"><input id="consent" name="consent" type="checkbox" value="yes" required aria-invalid={!!errors.consent} aria-describedby={describedBy('consent')} /><label htmlFor="consent">I agree that {config.shortName} may use these details to respond to my estimate request, as described in the <Link href="/privacy">Privacy Policy</Link>.</label></div>
        {errorFor('consent')}
      </div>
      <button className="button form-submit" type="submit" disabled={!deliveryAvailable || pending}>{pending ? 'Sending your request…' : 'Request a Free Estimate'}</button>
      <p className="form-help">Your details are used to respond to this request. This form does not sign you up for marketing.</p>
    </form>}
  </div>;
}

export default EstimateForm;
