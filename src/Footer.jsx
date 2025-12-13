import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 pt-12 pb-6 px-6 md:px-20  relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        <div>
          <h2 className="text-white text-xl font-semibold mb-4 border-l-4 border-blue-500 pl-3">About Us</h2>
          <p className="text-sm leading-6">
            Welcome to <span className="text-blue-400 font-medium">Aanchal Alytcs</span>, your trusted partner in data analytics. We specialize in transforming raw data into actionable insights, empowering businesses with predictive modeling and business intelligence solutions since <span className="text-pink-400">2022</span>.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-4 border-l-4 border-pink-500 pl-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/Project" className="hover:text-blue-400 transition">
                Project
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-4 border-l-4 border-green-500 pl-3">Contact Info</h2>
          <ul className="space-y-2 text-sm">
            <li>India</li>
            <li><a href="mailto:alytcsaanchal@gmail.com" className="hover:text-green-400">alytcsaanchal@gmail.com</a></li>
            <li><a href="https://wa.me/919302984613" className="hover:text-green-400">+91 9302984613</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-4 border-l-4 border-yellow-500 pl-3">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="https://github.com/codekraft74" target="_blank" rel="noreferrer" className="hover:text-white transition transform hover:scale-125"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/aanchal-uke-b4892837b/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition transform hover:scale-125"><FaLinkedin /></a>
            <a href="https://www.youtube.com/@aanchaluke8000" target="_blank" rel="noreferrer" className="hover:text-red-500 transition transform hover:scale-125"><FaYoutube /></a>
            <a href="mailto:aanchaluke77@gmail.com" className="hover:text-yellow-400 transition transform hover:scale-125"><FaEnvelope /></a>
            <a
              href="https://wa.me/919302984613"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition transform hover:scale-125"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="my-8 border-t border-gray-700"></div>

      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} <span className="text-blue-400 font-medium">Aanchal Alytcs</span>. All rights reserved.</p>
        <p>Designed & Built with  using React & Tailwind CSS</p>
      </div>

      {/* Floating Animation */}
      <style>{`
        footer {
          animation: fadeInUp 1s ease-in-out;
        }
        @keyframes fadeInUp {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </footer>
  );
}
