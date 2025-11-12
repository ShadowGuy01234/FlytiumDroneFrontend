import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { useCart } from "../../Context/cart";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiHeart,
  FiPackage,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const { getCartCount, canAccessCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/");
    setUserMenuOpen(false);
  };

  const accessResult = canAccessCart();
  const cartCount = accessResult === true ? getCartCount() : 0;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Store", path: "/store" },
    { name: "Career", path: "/career" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <div className="w-full max-w-6xl rounded-[2.5rem] border border-white/15 bg-slate-950/40 px-4 py-3 shadow-[0_18px_45px_rgba(8,47,73,0.35)] backdrop-blur-2xl transition-all duration-300 supports-[backdrop-filter]:bg-slate-950/55 pointer-events-auto">
        <div className="flex min-h-[64px] items-center justify-between gap-4 md:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Flytium Drones" className="h-10 w-auto" />
            <span className="text-xl font-semibold tracking-wide text-white drop-shadow">
              Flytium Drones
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`relative z-10 font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-100/80 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Animated background for active state */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-bg"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/80 to-cyan-400/80 shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover effect for non-active items */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Animated underline indicator */}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 h-0.5 bg-emerald-400"
                    initial={false}
                    animate={{
                      width: isActive ? "70%" : "0%",
                      x: "-50%",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side - Cart, User Menu, Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <button
                onClick={() => {
                  const accessResult = canAccessCart();
                  if (accessResult === null) {
                    toast.error("Please wait, loading...");
                    return;
                  }
                  if (accessResult === true) {
                    navigate("/cart");
                  } else {
                    toast.error("Please login to access your cart");
                    navigate("/login");
                  }
                }}
                className="relative rounded-full p-2 text-white/80 transition-colors hover:text-white"
              >
                <FiShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs font-semibold text-slate-900"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </button>
            </motion.div>

            {/* User Menu */}
            {auth?.user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 rounded-full bg-white/5 px-3 py-2 text-slate-100/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <FiUser className="w-6 h-6" />
                  <span className="hidden md:block font-medium">
                    {auth.user.name}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">
                          {auth.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {auth.user.email}
                        </p>
                      </div>

                      <Link
                        to="dashboard/user/orders"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiPackage className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        to="dashboard/user/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiHeart className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>

                      {auth?.user?.role === 1 && (
                        <Link
                          to="dashboard/admin"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FiUser className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <hr className="my-2" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="font-medium text-slate-100/80 transition-colors hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-emerald-400 px-4 py-2 font-semibold text-slate-900 transition-colors hover:bg-emerald-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-full p-2 text-slate-100/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 px-2 py-3 backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-900/60"
            >
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 1,
                      }}
                      className="relative overflow-hidden rounded-lg"
                    >
                      <Link
                        to={item.path}
                        className={`group relative block px-4 py-3 transition-all duration-300 ${
                          isActive
                            ? "font-semibold text-white"
                            : "text-slate-100/80 hover:text-white"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative z-10">{item.name}</span>

                        {/* Active background with gradient */}
                        {isActive && (
                          <motion.div
                            layoutId="mobile-navbar-active"
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/80 to-cyan-400/80"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}

                        {/* Hover background for non-active */}
                        {!isActive && (
                          <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        )}

                        {/* Left accent bar for active */}
                        {isActive && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            className="absolute left-0 top-0 w-1 rounded-r bg-white/80"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {!auth?.user && (
                  <div className="px-4 py-2 space-y-2">
                    <Link
                      to="/login"
                      className="block w-full rounded-full border border-white/20 bg-white/5 py-2 text-center text-slate-100/80 transition-colors hover:bg-white/10 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full rounded-full bg-emerald-400 py-2 text-center font-semibold text-slate-900 transition-colors hover:bg-emerald-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
