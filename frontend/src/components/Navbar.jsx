import { useState, useEffect, useCallback } from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useWishlistStore } from "../stores/useWishlistStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const ApparelsDropdown = () => {
    return (
      <div className="relative">
        <button
          className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          APPARELS
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-opacity duration-300 ease-in-out opacity-100">
            <Link
              to="/category/tops"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsDropdownOpen(false)}
            >
              TOP
            </Link>
            <Link
              to="/category/bottoms"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsDropdownOpen(false)}
            >
              BOTTOM
            </Link>
          </div>
        )}
      </div>
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left Column */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-300 hover:text-emerald-400 transition duration-300"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              to="/"
              className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex mr-7"
            >
              Cactus
            </Link>

            <nav className="hidden md:flex items-center gap-4 mt-1">
              <Link
                to={"/"}
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                HOME
              </Link>
              <Link
                to={"/category/caps"}
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                HATS & CAPS
              </Link>
              <Link
                to={"/category/skateboards"}
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                SKATEBOARDS
              </Link>
              <ApparelsDropdown />
              <Link
                to={"/category/eyewears"}
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                EYEWEAR
              </Link>
              <Link
                to={"/category/accessories"}
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                ACCESSORIES
              </Link>
              <Link
                to={"/aboutus"}
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                ABOUT US
              </Link>
            </nav>
          </div>

          {/* Right Column */}
          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 rounded-l-md border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-r-md transition duration-300"
              >
                Search
              </button>
            </form>

            <Link
  to={user ? "/wishlist" : "/signup"}  // Redirect to /signup if not logged in
  className="relative text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
>
  {/* Wishlist count */}
  {wishlist.length > 0 && (
    <span className="absolute -top-2 -left-3 bg-red-500 text-white rounded-full px-2 text-xs">
      {wishlist.length}
    </span>
  )}
  <Heart size={24} />
</Link>

            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-emerald-400"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isMobileMenuOpen && (
          <nav className="md:hidden flex flex-col space-y-2 mt-2">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center mb-4"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 rounded-l-md border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-r-md transition duration-300"
              >
                Search
              </button>
            </form>
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              HOME
            </Link>
            <Link
              to={"/category/caps"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              HATS & CAPS
            </Link>
            <Link
              to={"/category/skateboards"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              SKATEBOARDS
            </Link>
            <Link
              to={"/category/eyewears"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              EYEWEAR
            </Link>
            <Link
              to={"/category/accessories"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              ACCESSORIES
            </Link>
            <Link
              to={"/aboutus"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              ABOUT US
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
