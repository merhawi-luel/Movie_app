import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black px-8 py-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold text-white">
          CINEMA<span className="text-red-600">.</span>
        </Link>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Cinema. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex gap-8 text-sm text-gray-500">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>

          <Link to="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>

          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;