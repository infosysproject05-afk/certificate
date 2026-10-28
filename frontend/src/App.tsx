import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, Brand, CertificatePreview, SiteFooter } from "./UI";
import "./App.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function App() {
  const [recipientName, setRecipientName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [duration, setDuration] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setCertificateId("");
    try {
      const response = await fetch(`${API}/api/certificates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientName, courseName, organizationName, issueDate, duration }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not create the certificate.");
      setCertificateId(data.certificateId);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return <div className="app-shell">
    <header className="site-header"><Brand /><nav className="site-nav" aria-label="Main navigation"><Link className="nav-item active" to="/generate">Create</Link><Link className="nav-item" to="/verify">Verify</Link></nav><Link className="header-action" to="/verify">Verify certificate <ArrowIcon /></Link></header>
    <main className="page-container">
      <section className="page-intro"><div className="eyebrow"><span className="eyebrow-dot" /> THE CERTIFICATE STUDIO</div><h1>Make achievement <em>official.</em></h1><p>Create a beautifully presented, verifiable certificate in moments. Add the details, preview the result, and issue with confidence.</p></section>
      <div className="workspace">
        <section className="panel form-panel" aria-labelledby="form-title">
          <div className="panel-topline"><span>01 / DETAILS</span><span>ALL FIELDS REQUIRED</span></div>
          <div className="panel-heading"><div className="heading-mark">✦</div><div><h2 id="form-title">Certificate details</h2><p>Tell us who and what we’re celebrating.</p></div></div>
          <form onSubmit={handleSubmit}>
            <div className="field"><label htmlFor="recipient">Recipient name</label><input id="recipient" autoComplete="name" placeholder="e.g. Alex Morgan" value={recipientName} onChange={event => { setRecipientName(event.target.value); setCertificateId(""); }} required /></div>
            <div className="field"><label htmlFor="course">Course or achievement</label><input id="course" placeholder="e.g. Advanced Web Development" value={courseName} onChange={event => { setCourseName(event.target.value); setCertificateId(""); }} required /></div>
            <div className="field"><label htmlFor="organization">Issuing organization</label><input id="organization" autoComplete="organization" placeholder="e.g. Northstar Academy" value={organizationName} onChange={event => { setOrganizationName(event.target.value); setCertificateId(""); }} required /></div>
            <div className="field-row"><div className="field"><label htmlFor="issue-date">Issue date</label><input id="issue-date" type="date" value={issueDate} onChange={event => { setIssueDate(event.target.value); setCertificateId(""); }} required /></div><div className="field"><label htmlFor="duration">Duration</label><input id="duration" placeholder="e.g. 6 months" value={duration} onChange={event => { setDuration(event.target.value); setCertificateId(""); }} required /></div></div>
            <button className="primary-button" type="submit" disabled={loading}>{loading ? "Creating certificate…" : "Create certificate"}<ArrowIcon /></button>
          </form>
          {error && <div className="feedback error" role="alert">{error}</div>}
          {certificateId && <div className="feedback success" role="status"><span className="feedback-icon">✓</span><div><strong>Certificate is ready</strong><p>ID: {certificateId}</p><div className="result-actions"><a href={`${API}/api/certificates/${certificateId}/download`} target="_blank" rel="noopener noreferrer">Download PDF <ArrowIcon /></a><Link to="/verify">Verify it <ArrowIcon /></Link></div></div></div>}
        </section>
        <aside className="preview-column" aria-label="Certificate details preview"><div className="preview-title"><div><span className="section-kicker">DETAILS PREVIEW</span><h2>A little look ahead.</h2></div><span className="preview-live"><span /> UPDATING LIVE</span></div><CertificatePreview recipientName={recipientName} courseName={courseName} organizationName={organizationName} issueDate={issueDate} duration={duration} certificateId={certificateId} /><div className="preview-note"><span className="note-icon">✦</span><p>This is an illustration of your details. Your downloadable PDF includes a unique ID for verification.</p></div></aside>
      </div>
      <div className="trust-strip"><div><span>01</span><strong>Create with ease</strong><small>A few details are all it takes.</small></div><div><span>02</span><strong>Issue instantly</strong><small>Download a ready-to-share PDF.</small></div><div><span>03</span><strong>Verify anywhere</strong><small>Every certificate has a unique ID.</small></div></div>
    </main><SiteFooter />
  </div>;
}
export default App;
