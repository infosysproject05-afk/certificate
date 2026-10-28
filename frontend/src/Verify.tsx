import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, Brand, SiteFooter } from "./UI";
import "./App.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
interface CertificateData { certificateId: string; recipientName: string; courseName: string; organizationName: string; issueDate: string; duration: string; }

function Verify() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CertificateData | null>(null);
  const handleVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/certificates/${encodeURIComponent(id.trim().toUpperCase())}/json`);
      const data = await response.json();
      if (!response.ok || !data.verified) throw new Error(data.message || "Certificate not found.");
      setResult(data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="app-shell">
    <header className="site-header"><Brand /><nav className="site-nav" aria-label="Main navigation"><Link className="nav-item" to="/generate">Create</Link><Link className="nav-item active" to="/verify">Verify</Link></nav><Link className="header-action" to="/generate">Create certificate <ArrowIcon /></Link></header>
    <main className="page-container verify-page">
      <section className="page-intro"><div className="eyebrow"><span className="eyebrow-dot" /> CERTIFICATE VERIFICATION</div><h1>Proof you can <em>trust.</em></h1><p>Every achievement deserves to be recognized. Enter a certificate ID below to confirm its details.</p></section>
      <div className="verify-layout">
        <section className="panel verify-panel" aria-labelledby="verify-title"><div className="panel-topline"><span>01 / LOOKUP</span><span>INSTANT VERIFICATION</span></div><div className="panel-heading"><div className="heading-mark">✦</div><div><h2 id="verify-title">Check a certificate</h2><p>Find the ID on your certificate PDF.</p></div></div>
          <form onSubmit={handleVerify}><div className="field"><label htmlFor="certificate-id">Certificate ID</label><input id="certificate-id" type="text" placeholder="CERT-2026-XXXXXXXX" value={id} onChange={event => setId(event.target.value)} autoComplete="off" required /></div><button className="primary-button" type="submit" disabled={loading}>{loading ? "Checking certificate…" : "Verify certificate"}<ArrowIcon /></button></form>
          {error && <div className="feedback error" role="alert"><strong>We couldn’t verify this ID.</strong><p>{error}</p></div>}
          {result && <div className="verified-result" role="status"><div className="verified-banner"><span className="verified-check">✓</span><div><span>VERIFICATION COMPLETE</span><h3>Certificate verified</h3><p>This certificate matches our records.</p></div></div><dl><div><dt>Recipient</dt><dd>{result.recipientName}</dd></div><div><dt>Achievement</dt><dd>{result.courseName}</dd></div><div><dt>Issued by</dt><dd>{result.organizationName}</dd></div><div><dt>Issue date</dt><dd>{new Date(`${result.issueDate.slice(0,10)}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</dd></div><div><dt>Duration</dt><dd>{result.duration}</dd></div><div><dt>Certificate ID</dt><dd className="result-id">{result.certificateId}</dd></div></dl><a className="result-download" href={`${API}/api/certificates/${result.certificateId}/download`} target="_blank" rel="noopener noreferrer">Download certificate <ArrowIcon /></a></div>}
        </section>
        <aside className="verify-aside"><div className="verify-art"><span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" /><span className="art-star">✦</span><div className="art-seal"><span>✦</span><strong>AUTHENTIC</strong><small>VERIFIED & SECURE</small></div></div><div className="verify-aside-copy"><span className="section-kicker">BUILT FOR CONFIDENCE</span><h2>Real credentials.<br /><em>Real peace of mind.</em></h2><p>Each certificate has its own unique ID, so anyone can confirm the achievement directly through Certify.</p></div></aside>
      </div>
    </main><SiteFooter />
  </div>;
}
export default Verify;
