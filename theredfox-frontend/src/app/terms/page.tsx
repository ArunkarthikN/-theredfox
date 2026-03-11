import Navbar from "@/components/Navbar";

export default function TermsAndConditions() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 py-16 prose prose-slate">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Terms and Conditions</h1>
        <p className="text-gray-500 font-bold">Last Updated: March 10, 2026</p>

        <section className="mt-8">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing theredfox.us, you agree to be bound by these terms. If you do not agree, please do not use the site.</p>
        </section>

        <section>
          <h2>2. Content & Intellectual Property</h2>
          <p>The Red Fox is a news aggregator. While we summarize and link to external content, the original articles belong to their respective publishers. Our original summaries, logos, and site design are the property of The Red Fox.</p>
        </section>

        <section>
          <h2>3. User Conduct</h2>
          <p>You agree not to use the site for any unlawful purpose or to conduct any activity that would impair the performance or security of the website.</p>
        </section>

        <section>
          <h2>4. Disclaimer of Warranties</h2>
          <p>The content provided is for informational purposes only. We do not guarantee the accuracy or completeness of any news gathered from external sources.</p>
        </section>

        <section>
          <h2>5. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.</p>
        </section>
      </div>
    </div>
  );
}
