import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { X, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Prices } from "../components/Prices";

const Store = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [radio, setRadio] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  // Fetch products and apply initial filters
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [checked, sortBy, searchTerm, products, radio]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [checked, sortBy, searchTerm]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/product/get-product`);

      if (response?.data?.success) {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/category/get-category`);
      if (response?.data?.success) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const filterAndSortProducts = () => {
    let tempProducts = [...products];

    // Apply search filter
    if (searchTerm) {
      tempProducts = tempProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter - make sure category exists before accessing _id
    if (checked.length > 0) {
      tempProducts = tempProducts.filter((prod) =>
        checked.includes(prod.category?._id)
      );
    }

    // Apply price range filter - use discounted price if available
    if (radio.length > 0) {
      const [min, max] = radio;
      tempProducts = tempProducts.filter((prod) => {
        const effectivePrice = prod.discountedPrice || prod.price;
        return effectivePrice >= min && effectivePrice <= max;
      });
    }

    // Apply sorting - consider discounted price when sorting by price
    switch (sortBy) {
      case "price-asc":
        tempProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        tempProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "discount-high":
        tempProducts.sort((a, b) => {
          const discountA = getDiscountPercentage(a);
          const discountB = getDiscountPercentage(b);
          return discountB - discountA;
        });
        break;
      case "name-asc":
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setFilteredProducts(tempProducts);
  };

  // Helper function to calculate discount percentage
  const getDiscountPercentage = (product) => {
    if (product.discountedPrice && product.price > product.discountedPrice) {
      return Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      );
    }
    return 0;
  };

  // Enhanced add to cart function
  const handleAddToCart = (product) => {
    try {
      const existingProductIndex = cart.findIndex(
        (item) => item._id === product._id
      );
      let updatedCart;

      if (existingProductIndex >= 0) {
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        toast.success(`Increased ${product.name} quantity in cart`, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
        toast.success(`${product.name} added to cart`, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      }

      setCart(updatedCart);
      localStorage.setItem("Flytium", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PaginationControls = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="w-10 h-10 border border-gray-300 hover:border-gray-900">
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`w-10 h-10 border-2 font-bold transition-colors ${
                currentPage === pageNumber
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 hover:border-gray-900"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="w-10 h-10 border border-gray-300 hover:border-gray-900">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-900"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Section */}
      <section className="pt-8 pb-8 border-b-2 border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mb-8"></div>
              <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                Store
              </h1>
              <p className="text-xl text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
              </p>
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => navigate('/cart')}
              className="relative group"
            >
              <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </div>
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                  {cart.length}
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
            
            {/* Left: Filters Toggle + Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 border-2 border-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors"
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 border border-gray-300 w-64 focus:outline-none focus:border-gray-900"
              />
            </div>

            {/* Right: Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 cursor-pointer"
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount-high">Highest Discount</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="flex gap-8">
            
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-72 flex-shrink-0">
                <div className="border-2 border-gray-900 p-6 sticky top-24">
                  
                  <h3 className="text-lg font-black text-gray-900 mb-6">Filters</h3>

                  {/* Categories */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-4">Categories</h4>
                    <div className="space-y-3">
                      {categories?.map((cat) => (
                        <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="w-5 h-5 border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 cursor-pointer"
                              checked={checked.includes(cat._id)}
                              onChange={() => {
                                const updatedChecked = checked.includes(cat._id)
                                  ? checked.filter((c) => c !== cat._id)
                                  : [...checked, cat._id];
                                setChecked(updatedChecked);
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-4">Price Range</h4>
                    <div className="space-y-3">
                      {Prices.map((p) => (
                        <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="price"
                            value={p.array}
                            checked={JSON.stringify(radio) === JSON.stringify(p.array)}
                            onChange={() => setRadio(p.array)}
                            className="w-5 h-5 border-2 border-gray-300 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{p.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => {
                      setChecked([]);
                      setRadio([]);
                      setSearchTerm("");
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    Reset All
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl font-bold text-gray-900 mb-2">No products found</p>
                  <p className="text-gray-600">Try adjusting your filters</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <div
                        key={product._id}
                        className="group border-2 border-gray-200 hover:border-gray-900 transition-all"
                      >
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Discount Badge */}
                          {product.discountedPrice && product.price > product.discountedPrice && (
                            <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 text-xs font-bold">
                              -{getDiscountPercentage(product)}%
                            </div>
                          )}

                          {/* Quick View Overlay */}
                          <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-90 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => navigate(`/product/${product.slug}`)}
                              className="px-6 py-3 bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                            {product.name}
                          </h3>

                          {/* Price */}
                          <div className="flex items-center gap-3 mb-4">
                            {product.discountedPrice && product.price > product.discountedPrice ? (
                              <>
                                <span className="text-2xl font-black text-gray-900">
                                  ₹{product.discountedPrice.toLocaleString()}
                                </span>
                                <span className="text-sm line-through text-gray-400">
                                  ₹{product.price.toLocaleString()}
                                </span>
                              </>
                            ) : (
                              <span className="text-2xl font-black text-gray-900">
                                ₹{product.price.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full group/btn relative px-6 py-3 bg-gray-900 text-white font-bold overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && <PaginationControls />}
                </>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Store;
