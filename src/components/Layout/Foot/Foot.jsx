import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg p-6">
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and Name */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-3" />
            <span className="text-xl font-bold">Flytium</span>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {/* About Section */}
            <div>
              <h3 className="font-bold mb-2">ABOUT</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <h3 className="font-bold mb-2">FOLLOW US</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/flytium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/flytium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="font-bold mb-2">LEGAL</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-conditions"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping-policy"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p>© {new Date().getFullYear()} Flytium™. All rights reserved.</p>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com/flytium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/flytium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/flytium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/flytium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/flytium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
