import { Link } from "react-router-dom";

export function ArrowIcon() { return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h9m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
export function Brand() { return <Link to="/generate" className="brand" aria-label="Certify home"><span className="brand-symbol">✦</span><span className="brand-name">certify<span className="brand-period">.</span></span></Link>; }
export function SiteFooter() { return <footer className="site-footer"><span>© {new Date().getFullYear()} Certify Studio</span><span>Made for moments worth remembering.</span></footer>; }

type PreviewProps = { recipientName: string; courseName: string; organizationName: string; issueDate: string; duration: string; certificateId?: string };
export function CertificatePreview({ recipientName, courseName, organizationName, issueDate, duration, certificateId }: PreviewProps) {
  const formattedDate = issueDate ? new Date(`${issueDate}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Month Day, Year";
  return <div className="certificate-stage"><div className="certificate-paper">
    <div className="paper-corner corner-one" /><div className="paper-corner corner-two" />
    <div className="paper-top"><span className="paper-brand"><span>✦</span> CERTIFY STUDIO</span><span className="paper-serial">№ {certificateId || "000000"}</span></div>
    <div className="paper-body"><div className="paper-flourish">✦</div><div className="paper-kicker">CERTIFICATE OF ACHIEVEMENT</div><h3>{recipientName || "Your Name Here"}</h3><div className="paper-rule" /><p>is proudly recognized for completing</p><h4>{courseName || "Your Achievement"}</h4><p>presented by <strong>{organizationName || "Your Organization"}</strong></p></div>
    <div className="paper-bottom"><div><span>ISSUED ON</span><strong>{formattedDate}</strong></div><div className="paper-seal">✦<small>OFFICIAL</small></div><div><span>DURATION</span><strong>{duration || "Course duration"}</strong></div></div>
  </div></div>;
}
