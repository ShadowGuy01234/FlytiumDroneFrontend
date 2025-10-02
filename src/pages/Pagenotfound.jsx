import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Home, Search, Package, ArrowRight } from 'lucide-react';

const Pagenotfound = () => {
  const navigate = useNavigate();

  return (
    <Layout title={"404 Page Not Found"} description={"404 Page Not Found"}>
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          
          {/* Large 404 */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h1 className="text-[200px] lg:text-[280px] font-black text-gray-900 leading-none tracking-tighter">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Package className="w-32 h-32 lg:w-48 lg:h-48 text-gray-300" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-16">
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto mb-8"></div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Looks like this page took off without leaving a flight plan. Let's get you back on track.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <button
              onClick={() => navigate('/')}
              className="group p-8 border-2 border-gray-900 hover:bg-gray-50 transition-all text-left"
            >
              <Home className="w-8 h-8 mb-4 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Go Home</h3>
              <p className="text-gray-600 text-sm mb-4">Return to homepage</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <span>Home</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </button>

            <button
              onClick={() => navigate('/store')}
              className="group p-8 border-2 border-gray-900 hover:bg-gray-50 transition-all text-left"
            >
              <Package className="w-8 h-8 mb-4 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Browse Store</h3>
              <p className="text-gray-600 text-sm mb-4">Explore our products</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <span>Store</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="group p-8 border-2 border-gray-900 hover:bg-gray-50 transition-all text-left"
            >
              <Search className="w-8 h-8 mb-4 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">Contact our team</p>
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <span>Contact</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>
            </button>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="group relative inline-block px-12 py-6 bg-gray-900 text-white font-bold overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Home className="w-5 h-5" />
                Back to Homepage
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
