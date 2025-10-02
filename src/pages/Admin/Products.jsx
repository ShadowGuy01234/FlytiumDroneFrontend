import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { API_URL } from "../../api";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { Package, Search, Plus, Edit2, Trash2, Eye, Filter } from "lucide-react";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = product.filter(prod => 
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(product);
    }
  }, [searchTerm, product]);

  return (
    <Layout title="Products" description="Products">
      <div className="min-h-screen bg-slate-950">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/5 bg-slate-900 border-r-2 border-slate-800">
            <AdminMenu />
          </div>
          
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-12 pb-8 border-b-2 border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h1 className="text-5xl font-black text-white mb-3">Products</h1>
                  <p className="text-xl text-slate-400">Manage your product inventory</p>
                </div>
                
                <NavLink
                  to="/dashboard/admin/create-product"
                  className="group relative px-6 py-4 bg-indigo-600 border-2 border-indigo-600 hover:bg-transparent text-white font-bold overflow-hidden flex items-center gap-3 w-fit"
                >
                  <Plus className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Add New Product</span>
                </NavLink>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-900 border-2 border-slate-800 focus:border-indigo-600 text-white placeholder-slate-500 font-medium outline-none transition-colors"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900 border-2 border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-5 h-5 text-indigo-400" />
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Total Products</p>
                </div>
                <p className="text-4xl font-black text-white">{product.length}</p>
              </div>
              
              <div className="bg-slate-900 border-2 border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Filtered Results</p>
                </div>
                <p className="text-4xl font-black text-white">{filteredProducts.length}</p>
              </div>

              <div className="bg-slate-900 border-2 border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-amber-400" />
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Categories</p>
                </div>
                <p className="text-4xl font-black text-white">
                  {[...new Set(product.map(p => p.category))].length}
                </p>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="border-2 border-slate-800 bg-slate-900 p-16 text-center">
                <Package className="w-24 h-24 mx-auto mb-6 text-slate-700" />
                <h3 className="text-2xl font-black text-white mb-4">
                  {searchTerm ? 'No Products Found' : 'No Products Yet'}
                </h3>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                  {searchTerm 
                    ? 'Try adjusting your search criteria' 
                    : 'Start by adding your first product to the inventory'}
                </p>
                {!searchTerm && (
                  <NavLink
                    to="/dashboard/admin/create-product"
                    className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
                  >
                    Add First Product
                  </NavLink>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts?.map((prod) => (
                  <div
                    key={prod._id}
                    className="group bg-slate-900 border-2 border-slate-800 hover:border-indigo-600 transition-all overflow-hidden"
                  >
                    {/* Image */}
                    <div className="aspect-square bg-slate-800 border-b-2 border-slate-800 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-white mb-3 line-clamp-2">
                        {prod.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {prod.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-800">
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase mb-1">Price</p>
                          <p className="text-2xl font-black text-white">₹{prod.price?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase mb-1">Stock</p>
                          <p className="text-2xl font-black text-cyan-400">{prod.quantity || 0}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <NavLink
                          to={`/dashboard/admin/product/${prod.slug}`}
                          className="group/btn relative px-4 py-3 border-2 border-indigo-600 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </NavLink>
                        
                        <NavLink
                          to={`/product/${prod.slug}`}
                          className="group/btn relative px-4 py-3 border-2 border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
