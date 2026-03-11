import Navbar from "@/components/Navbar";

export default function ContactUs() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 py-16 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-4">
          Get in <span className="text-red-600">Touch</span>
        </h1>
        <p className="text-gray-500 text-lg mb-12">
          Have a suggestion, a news tip, or a business inquiry? We’d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-red-600 p-10 rounded-3xl text-white">
            <h2 className="text-2xl font-bold mb-4">Email Us</h2>
            <p className="opacity-90 mb-6">Our team typically responds within 24–48 hours during business days.</p>
            <a 
              href="mailto:hello@theredfox.us" 
              className="text-2xl font-bold underline hover:text-gray-200 transition-colors"
            >
              hello@theredfox.us
            </a>
          </div>

          <div className="bg-gray-900 p-10 rounded-3xl text-white">
            <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
            <p className="opacity-90">
              Monday — Friday<br />
              9:00 AM — 6:00 PM (IST)
            </p>
            <p className="mt-6 opacity-70 italic text-sm">
              Chennai, Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
