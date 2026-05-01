import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, TrendingUp, Sparkles, ChefHat, BarChart3, Clock, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen -mt-8 pt-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white sm:pt-16 lg:pt-24 pb-20">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-50 to-white -z-10" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50/50 to-transparent -z-10" />
        
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={16} className="text-blue-500" />
            <span>Next-Gen Mess Management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Smart Food Data <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Mined & Visualized
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A comprehensive solution to track daily hostel meals, analyze food trends, and extract valuable insights with powerful built-in data mining tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link 
              to="/menu" 
              className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Calendar size={20} />
              <span>Explore Menu</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/analytics" 
              className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <TrendingUp size={20} className="text-indigo-600" />
              <span>View Analytics</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to manage meals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our platform provides the essential tools to track, visualize, and optimize hostel food distribution efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ChefHat size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Menu Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Log and organize breakfast, lunch, and dinner menus seamlessly across all days of the week.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Mining</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically process the dataset to extract the most frequently served items and consumption patterns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visual Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Understand the meal distribution instantly with beautifully rendered charts and stat cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-gray-200 bg-white text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} HostelMess Miner. Developed for modern hostel management.</p>
      </footer>
    </div>
  );
}
