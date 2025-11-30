import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8">
        
        {/* Hero Section */}
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          Never Miss a <span className="text-green-600">WhatsApp Lead</span> Again.
        </h1>
        
        <p className="text-xl text-gray-500">
          The free tool to rotate chats between multiple agents. 
          Perfect for Instagram businesses with support teams.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Link 
            href="/login" 
            className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
          >
            Start for Free
          </Link>
          
          <Link 
            href="/login" 
            className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="font-bold text-gray-900">Auto Rotation</h3>
            <p className="text-sm text-gray-500">Distribute leads equally between Agent A and Agent B.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-bold text-gray-900">Click Tracking</h3>
            <p className="text-sm text-gray-500">See exactly how many customers clicked your link.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold text-gray-900">Instant Edit</h3>
            <p className="text-sm text-gray-500">Change agent numbers anytime without changing your link.</p>
          </div>
        </div>

      </div>
    </div>
  );
}