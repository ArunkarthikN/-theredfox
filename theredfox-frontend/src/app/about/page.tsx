import Navbar from "@/components/Navbar";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 py-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-8">
          About <span className="text-red-600">The Red Fox</span>
        </h1>
        
        <div className="prose prose-lg prose-slate">
          <p className="lead text-xl text-gray-600">
            Welcome to <strong>The Red Fox</strong>, your premier destination for automated, high-speed news aggregation. 
          </p>
          
          <p>
            In a world where information moves faster than ever, we believe in the power of automation and AI to filter through the noise. <strong>The Red Fox</strong> was built to deliver the most relevant updates in Technology, Artificial Intelligence, Business, and Finance—straight from the source to your screen.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 uppercase">Our Mission</h2>
          <p>
            Our mission is simple: To keep you informed without the clutter. We use advanced algorithms and the latest web technologies to crawl, categorize, and summarize the global news landscape, ensuring you never miss a beat in the industries that matter most.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 uppercase">Why "The Red Fox"?</h2>
          <p>
            The Fox is known for its agility, intelligence, and sharp senses. We embody those traits in our digital architecture—staying quick to the story and smart about the data we deliver.
          </p>

          <div className="bg-gray-50 p-8 rounded-2xl mt-12 border border-gray-100">
            <h3 className="text-lg font-bold mb-2">Editorial Integrity</h3>
            <p className="text-sm text-gray-500">
              While we leverage automation, we prioritize accuracy and transparency. Every article aggregated on our platform links back to its original source to support the hardworking journalists and publishers globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
