import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 py-16 prose prose-slate">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Privacy Policy</h1>
        <p className="text-gray-500 font-bold">Effective Date: March 10, 2026</p>

        <section className="mt-8">
          <h2>1. Introduction</h2>
          <p>Welcome to <strong>The Red Fox</strong> (theredfox.us). We value your privacy and are committed to being transparent about how we collect and use your data. This policy explains our practices regarding your information when you visit our website.</p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We collect information to provide better services to our users. This includes:</p>
          <ul>
            <li><strong>Log Files:</strong> We follow a standard procedure of using log files (IP addresses, browser type, ISP, date/time stamps).</li>
            <li><strong>Cookies and Web Beacons:</strong> We use cookies to store information about visitors' preferences and the pages accessed.</li>
          </ul>
        </section>

        <section className="bg-red-50 p-6 rounded-xl border-l-4 border-red-600">
          <h2 className="mt-0">3. Google AdSense & Third-Party Advertising</h2>
          <p>Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</p>
          <p><strong>Users may opt out of personalized advertising</strong> by visiting <a href="https://www.google.com/settings/ads" target="_blank" className="text-red-600 font-bold underline">Google Ad Settings</a>.</p>
        </section>

        <section>
          <h2>4. Data Protection (GDPR/CCPA)</h2>
          <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We comply with the latest IAB Transparency and Consent Framework (TCF v2.3) to ensure your consent is managed legally.</p>
        </section>

        <section>
          <h2>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at: <strong>hello@theredfox.us</strong></p>
        </section>
      </div>
    </div>
  );
}
