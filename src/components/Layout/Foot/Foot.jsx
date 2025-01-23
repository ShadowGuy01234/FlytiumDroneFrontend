

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg p-6">
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and Name */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/logo.png" // Replace this with your logo
              alt="Logo"
              className="h-10 w-10 mr-3"
            />
            <span className="text-xl font-bold">Flytium</span>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {/* About Section */}
            <div>
              <h3 className="font-bold mb-2">ABOUT</h3>
              <ul>
                <li>
                  <a href="#flowbite" className="text-gray-600 hover:underline">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a href="#tailwind" className="text-gray-600 hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <h3 className="font-bold mb-2">FOLLOW US</h3>
              <ul>
                <li>
                  <a href="#github" className="text-gray-600 hover:underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#discord" className="text-gray-600 hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="font-bold mb-2">LEGAL</h3>
              <ul>
                <li>
                  <a href="#privacy" className="text-gray-600 hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-gray-600 hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p>© 2024 YourBrand™</p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#facebook" className="hover:text-gray-700">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#instagram" className="hover:text-gray-700">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#twitter" className="hover:text-gray-700">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#github" className="hover:text-gray-700">
              <i className="fab fa-github"></i>
            </a>
            <a href="#dribbble" className="hover:text-gray-700">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
